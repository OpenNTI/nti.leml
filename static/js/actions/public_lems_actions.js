function publicLemsSelector(state) {
  return state.publicLems;
}
let publicLemsReduce = reducerCreator(publicLemsSelector, "publicLems");
let publicLemsActionCreator = createReducerSpecificActionCreator(publicLemsReduce);

function publicLemsReceivedAction(prevPublicLemsState, params) {
      // Call this once the state is updated
      setTimeout(
        function() {
          loadLemsHtml(params.publicLems, false, true);
        },
        100);

      return {
        ...prevPublicLemsState,
        dict: params.publicLemsDict
      }
}
let publicLemsReceived = publicLemsActionCreator("Public Lems Recieved", publicLemsReceivedAction);

function setPublicLemsRatingAction(prevPublicLemsState, params) {
      let dict = prevPublicLemsState.dict;
      dict[params.lem_id].avgRating = params.rating;

      return {
        ...prevPublicLemsState,
        dict: dict
      }
}
let setPublicLemsRating = publicLemsActionCreator("Set Public Lems Rating", setPublicLemsRatingAction);

function requestPublicLemsAction(prevPublicLemsState) {
  loadPublicLEMs();

    return {
      ...prevPublicLemsState,
      status: dataRequestEnum.WAITING
    }
}
let requestPublicLems = publicLemsActionCreator("Request private lems", requestPublicLemsAction);

function setPublicLemStatusAction(prevPublicLemsState, params) {
  return {
    ...prevPublicLemsState,
    status: params.status
  }
}
let setPublicLemStatus = publicLemsActionCreator("Set private lems status", setPublicLemStatusAction);

function applyPublicSearchTextAction(prevPublicLemsState, params) {
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
    ...prevPublicLemsState,
    searchText: params.searchText
  }
}
let applyPublicSearchText = publicLemsActionCreator("Apply public search text", applyPublicSearchTextAction);

function loadPublicLEMs() {
  $.get(lemallRoute).
    success(function(data, status) {
    var lems = JSON.parse(data);

    lemsDict = {}

    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);
      var lemID = lem._id.$oid;

      lemsDict[lemID] = lem;
    }

    publicLemsReceived({publicLemsDict: lemsDict, publicLems: lems});
  })
  .error(function(jqXHR, textStatus, errorThrown) {
    setPublicLemStatus({status: dataRequestEnum.FAILURE});
  });
}
