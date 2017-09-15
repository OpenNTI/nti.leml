function privateLemsSelector(state) {
  return state.privateLems;
}
let privateLemsReduce = reducerCreator(privateLemsSelector, "privateLems");
let privateLemsActionCreator = createReducerSpecificActionCreator(privateLemsReduce);

function privateLemsReceivedAction(prevPrivateLemsState, params) {
      // Call this once the state is updated
      setTimeout(
        function() {
          loadLemsHtml(params.privateLems, true, false);
        },
        100);

      return {
        ...prevPrivateLemsState,
        dict: params.privateLemsDict,
        status: dataRequestEnum.SUCCESS
      }
}
let privateLemsReceived = privateLemsActionCreator("Private Lems Received", privateLemsReceivedAction);

function setPrivateLemsRatingAction(prevPrivateLemsState, params) {
      let dict = prevPrivateLemsState.dict;
      dict[params.lem_id].avgRating = params.rating;

      return {
        ...prevPrivateLemsState,
        dict: dict
      }
}
let setPrivateLemsRating = privateLemsActionCreator("Set Private Lems Rating", setPrivateLemsRatingAction);

function requestPrivateLemsAction(prevPrivateLemsState) {
  loadPrivateLEMs();

    return {
      ...prevPrivateLemsState,
      status: dataRequestEnum.WAITING
    }
}
let requestPrivateLems = privateLemsActionCreator("Request private lems", requestPrivateLemsAction);

function setPrivateLemStatusAction(prevPrivateLemsState, params) {
  return {
    ...prevPrivateLemsState,
    status: params.status
  }
}
let setPrivateLemStatus = privateLemsActionCreator("Set private lems status", setPrivateLemStatusAction);

function applyPrivateSearchTextAction(prevPrivateLemsState, params) {
  $(".lems").each(function(){
    if($(this).html().toLowerCase().indexOf(params.searchText.toLowerCase()) > -1){
     $(this).removeClass('hidden');
    } else {
      $(this).addClass('hidden');
    }
  });

  if (params.searchText.length > 0) {
    $("#clearSearchButton").show();
  } else {
    $("#clearSearchButton").hide();
  }

  $("#search_field").val(params.searchText);

  return {
    ...prevPrivateLemsState,
    searchText: params.searchText
  }
}
let applyPrivateSearchText = privateLemsActionCreator("Apply private search text", applyPrivateSearchTextAction);

function loadPrivateLEMs() {
  $.get(lemuserRoute)
    .success(function(data, status) {
    var lems = JSON.parse(data);

    lemsDict = {}

    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);
      var lemID = lem._id.$oid;

      lemsDict[lemID] = lem;
    }

    privateLemsReceived({privateLemsDict: lemsDict, privateLems: lems});
  })
  .error(function(jqXHR, textStatus, errorThrown) {
    setPrivateLemStatus({status: dataRequestEnum.FAILURE});
  });
}
