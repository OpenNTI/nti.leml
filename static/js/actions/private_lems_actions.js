function privateLemsSelector(state) {
  return state.privateLems;
}
let privateLemsReduce = reducerCreator(privateLemsSelector);
let privateLemsActionCreator = createReducerSpecificActionCreator(privateLemsReduce);

function setPrivateLemsDictAction(prevPrivateLemsState, params) {
      return {
        ...prevPrivateLemsState,
        dict: params.privateLemsDict
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
