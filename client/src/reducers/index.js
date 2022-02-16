const initialState = {
    recipeAll: [],
    filterResult: [],
    recipeDetail: {},
    filtering:false
  };

function rootReducer(state = initialState, action) {

    if (action.type === "GET_ALL_RECIPES") {
        console.log('seteando todas las recetas')
        return {
            ...state,
            recipeAll: [action.payload]
        }
    }
    if (action.type === "SET_FILTERING_STATUS") {
        console.log('seteando estado de filtrado')
        return {
            ...state,
            filtering: action.payload
        }
    }
    if (action.type === "FILTERED_RECIPES") {
        console.log('seteando recetas filtradas')
        return {
            ...state,
            filterResult: [action.payload]
        }
    }

    if (action.type === "RECIPE_DETAIL") {
        console.log(`seteando detalle de receta -> ${action.payload.title}`)
        return {
            ...state,
            recipeDetail: action.payload
        };
    }
    
    return state;
}

export default rootReducer;