const initialState = {
    recipeAll: [],
    filterResult: [],
    recipeDetail: { },
    filtering: false,
    actualPage:0,
    actualPageContent:[]    
  };

function rootReducer(state = initialState, action) {

    if (action.type === "GET_ALL_RECIPES") {
        console.log('seteando todas las recetas')
        return {
            ...state,
            recipeAll: [action.payload]
        }
    }
    if (action.type === "SET_RECIPES_AND_FILTER") {
        console.log("SET_RECIPES_AND_FILTER")
        if (action.payload.filter.title.length) {//aplico filtro de título
            action.payload.recipes = action.payload.recipes.filter(r => r.title.toLowerCase().includes(action.payload.filter.title.toLowerCase()))
        }
        if (action.payload.filter.dietsArr.length) { //aplico filtro de dietas
            console.log('filtro de dietas',action.payload.filter.dietsArr)
            action.payload.filter.dietsArr.forEach( diet => {
                action.payload.recipes = action.payload.recipes.filter(r => r.diets.includes(diet.toLowerCase()))    
            });            
        }
        if (action.payload.filter.orderAlpha === 'az') {//aplico orden A->Z
            action.payload.recipes.sort(function(a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
        } else {
            action.payload.recipes.sort(function(a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                return 0;
            })
        } 
        if (action.payload.filter.orderScore === 'asc') {//aplico orden A->Z
            action.payload.recipes.sort(function (a, b) {
                if (a.spoonacularScore > b.spoonacularScore) return 1;
                if (a.spoonacularScore < b.spoonacularScore) return -1;
                return 0;
            })
        } else {
            action.payload.recipes.sort(function (a, b) {
                if (a.spoonacularScore < b.spoonacularScore) return 1;
                if (a.spoonacularScore > b.spoonacularScore) return -1;
                return 0;
            })
        }    
        return {
            ...state,
            filterResult: action.payload.recipes            
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
        console.log('seteando recetas filtradas',action.payload)
        return {
            ...state,
            filterResult: action.payload
        }
    }

    if (action.type === "RECIPE_DETAIL") {
        console.log(`seteando detalle de receta -> ${action.payload}`)
        console.log('DETAILS 11111',state.filterResult)
        // const details = state.filterResult.find(r => r.id === action.payload)
        // console.log('DETAILS',details)
        return {
            ...state,
            recipeDetail: {id:action.payload} //action.payload
        };
    }
    
    return state;
}

export default rootReducer;