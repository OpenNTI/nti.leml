function publicLemsSelector(state) {
  return state.publicLems;
}
let publicLemsReduce = reducerCreator(publicLemsSelector, "publicLems");
let publicLemsActionCreator = createReducerSpecificActionCreator(publicLemsReduce);

function publicLemsReceivedAction(prevPublicLemsState, params) {
      loadLemsHtml(params.publicLems, false, true);

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
