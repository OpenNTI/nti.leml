function privateLemsReduce(action, name) {
    reduce(function(prevState) {
      let prevPrivateLemsState = prevState.privateLems;
      return {
        ...prevState,
        privateLems: action(prevPrivateLemsState)
      }
    },
    name
  );
}

function setPrivateLemsDict(params) {
  privateLemsReduce(function(prevPrivateLemsState) {
      return {
        ...prevPrivateLemsState,
        dict: params.privateLemsDict
      }
    },
    "Set Private Lems Dict"
  );
}

function setPrivateLemsRating(params) {
  privateLemsReduce(function(prevPrivateLemsState) {
      let dict = prevPrivateLemsState.dict;
      dict[params.lem_id].avgRating = params.rating;

      return {
        ...prevPrivateLemsState,
        dict: dict
      }
    },
    "Set Private Lems Rating"
  );
}
