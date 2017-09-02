function publicLemsSelector(state) {
  return state.publicLems;
}
let publicLemsReduce = reducerCreator(publicLemsSelector);
let publicLemsActionCreator = createReducerSpecificActionCreator(publicLemsReduce);

function setPublicLemsDictAction(prevPublicLemsState, params) {
      return {
        ...prevPublicLemsState,
        dict: params.publicLemsDict
      }
}
let setPublicLemsDict = publicLemsActionCreator("Set Public Lems Dict", setPublicLemsDictAction);

function setPublicLemsRatingAction(prevPublicLemsState, params) {
      let dict = prevPublicLemsState.dict;
      dict[params.lem_id].avgRating = params.rating;

      return {
        ...prevPublicLemsState,
        dict: dict
      }
}
let setPublicLemsRating = publicLemsActionCreator("Set Public Lems Rating", setPublicLemsRatingAction);
