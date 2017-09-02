function favoriteLemsReduce(action, name) {
    reduce(function(prevState) {
      let prevFavoriteLemsState = prevState.favoriteLems;
      return {
        ...prevState,
        favoriteLems: action(prevFavoriteLemsState)
      }
    },
    name
  );
}

function setFavoriteLemsDict(params) {
  favoriteLemsReduce(function(prevFavoriteLemsState) {
      return {
        ...prevFavoriteLemsState,
        dict: params.favoriteLemsDict
      }
    },
    "Set favorite Lems Dict"
  );
}

function setFavoriteLemsRating(params) {
  favoriteLemsReduce(function(prevFavoriteLemsState) {
      let dict = prevFavoriteLemsState.dict;
      dict[params.lem_id].avgRating = params.rating;

      return {
        ...prevFavoriteLemsState,
        dict: dict
      }
    },
    "Set favorite Lems Rating"
  );
}
