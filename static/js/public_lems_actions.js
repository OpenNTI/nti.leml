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
      let newDict = prevPublicLemsState.dict.map(function(lem) {
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
        ...prevPublicLemsState,
        dict: newDict
      }
    },
    "Set Public Lems Rating"
  );
}
