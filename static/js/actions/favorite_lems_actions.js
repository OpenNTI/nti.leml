function favoriteLemsSelector(state) {
  return state.favoriteLems;
}
let favoriteLemsReduce = reducerCreator(favoriteLemsSelector);
let favoriteLemsActionCreator = createReducerSpecificActionCreator(favoriteLemsReduce);

function setFavoriteLemsDictAction(prevFavoriteLemsState, params) {
  return {
    ...prevFavoriteLemsState,
    dict: params.favoriteLemsDict
  }
}
let setFavoriteLemsDict = favoriteLemsActionCreator("Set favoite Lems Dict", setFavoriteLemsDictAction);
