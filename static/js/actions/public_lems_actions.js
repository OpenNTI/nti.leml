function publicLemsReduce(action, name) {
    reduce(function(prevState) {
      let prevPublicLemsState = prevState.publicLems;
      return {
        ...prevState,
        publicLems: action(prevPublicLemsState)
      }
    },
    name
  );
}

function setPublicLemsDict(params) {
  publicLemsReduce(function(prevPublicLemsState) {
      return {
        ...prevPublicLemsState,
        dict: params.publicLemsDict
      }
    },
    "Set Public Lems Dict"
  );
}

function setPublicLemsRating(params) {
  publicLemsReduce(function(prevPublicLemsState) {
      let dict = prevPrivateLemsState.dict;
      dict[params.lem_id].avgRating = params.rating;

      return {
        ...prevPrivateLemsState,
        dict: dict
      }
    },
    "Set Public Lems Rating"
  );
}
