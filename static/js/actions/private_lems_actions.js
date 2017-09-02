function privateLemsSelector(state) {
  return state.privateLems;
}
let privateLemsReduce = reducerCreator(privateLemsSelector);
let privateLemsActionCreator = createReducerSpecificActionCreator(privateLemsReduce);

function privateLemsReceivedAction(prevPrivateLemsState, params) {
      loadLemsHtml(lems, true, false);

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
