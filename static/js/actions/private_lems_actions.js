function privateLemsSelector(state) {
  return state.privateLems;
}
let privateLemsReduce = reducerCreator(privateLemsSelector);
let privateLemsActionCreator = createReducerSpecificActionCreator(privateLemsReduce);

function setPrivateLemsDictAction(prevPrivateLemsState, params) {
      loadLemsHtml(lems, true, false);

      return {
        ...prevPrivateLemsState,
        dict: params.privateLemsDict,
        status: dataRequestEnum.SUCCESS
      }
}
let setPrivateLemsDict = privateLemsActionCreator("Set Private Lems Dict", setPrivateLemsDictAction);

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

function loadPrivateLEMs() {
  $.get(lemuserRoute, function(data, status) {
    var lems = JSON.parse(data);

    lemsDict = {}

    for (lemIndex in lems) {
      var lem = JSON.parse(lems[lemIndex]);
      var lemID = lem._id.$oid;

      lemsDict[lemID] = lem;
    }

    setPrivateLemsDict({publicLemsDict: lemsDict});
  });
}
