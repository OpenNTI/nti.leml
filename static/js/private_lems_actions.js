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

function setprivateLemsDict(params) {
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
      let newDict = prevPrivateLemsState.dict.map(function(lem) {
        if (lem.id === params.lemId) {
          return {
            ...lem,
            rating: params.rating
          }
        } else {
          return lem;
        }
      });

      return {
        ...prevPrivateLemsState,
        dict: newDict
      }
    },
    "Set Private Lems Rating"
  );
}
