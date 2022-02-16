

var WanRecipes = [];

async function getWanRecipes() {
    try {
        if (!WanRecipes.length) {
            console.log('CONSULTO SERVER WAN')
            const consulta = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)
            const result = await consulta.json()
            WanRecipes = result.results
            return result.results
            // fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)
            //     .then(response => response.json())
            //     .then(json => {
            //         WanRecipes = json.results    
            //         return json.results
            //     })
        } else {
            console.log('NO HACE FALTA CONSULTAR SERVER WAN')               
            return WanRecipes;
        } 
    } catch (error) {
        //throw new Error(`error en getWanRecipes, ${error}`)        
        console.log(`error en getWanRecipes, ${error}`)
        return []
    }
    
}

async function getLanRecipes() {
    console.log('CONSULTO SERVER LAN')
    try {
        const consulta = await fetch(`http://localhost:3001/recipes`)
        const result = await consulta.json()
        return result        
    } catch (error) {
        //throw new Error(`error en getLanRecipes, ${error}`)
        console.log(`error en getLanRecipes, ${error}`)
        return []
    }    
}

// async function getWanRecipes() {
//     if (!WanRecipes.length) {      
//         const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`)
//         const results = await response.json().results;
//         WanRecipes = results
//         return results;
//     } else {
//         return WanRecipes;
//     }
//         // fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`)
//         //     .then(response => response.json())
//         //     .then(json => {
//         //         console.log('rrrrrrrr',json.results)
//         //         WanRecipes = json.results
//         //         return WanRecipes
//         //         });
    
// }

async function filtrar(arr, filter) {
    try {
        console.log('antes del filtrado ->',arr,filter)//muestro antes del filtro por consola
        return ['sarasa']
    } catch (error) {
        //throw new Error(`error en filtrar, ${error}`)
        console.log(`error en filtrar, ${error}`)
        return []         
    }    
}

export function getRecipes(filter) {
    //fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`)
        //busco recetas y filtro.
        //1º me fijo si el arreglo de recetas traido del endpoint esta vacio, en caso que se encuentre vacio solicito todas las recetas del endpoint.
            //1.1 formateo los datos de la manera que me sirvan.
        //2º busco recetas en la base de datos y cargo el arreglo de recetas de base de datos por mas que esté vasio o no.
            //2.1 formateo los datos de manera que me sirvan
        //3º aplico el filtro a ambos arreglos y el resultado se lo mando al reducer para que lo cargue en el arreglo filtrado
    return async function (dispatch) {
        try {
            const wanR = await getWanRecipes()
            const lanR = await getLanRecipes()
            console.log('asdasdasdasd', wanR, lanR)
            const allR = [...wanR, ...lanR] //aca meto todo lo que me trae el wan y el lan, luego aplico filtro
            const filterR = await filtrar(allR,filter)
            console.log('luego del filtrado ->',filterR)//muestro lo filtrado en consola
            dispatch({ type: 'SET_FILTERING_STATUS', payload: false })
            return dispatch({ type: "FILTERED_RECIPES", payload: wanR });
        } catch (error) {
            console.log(error) 
            return dispatch({ type:'ERROR', payload: error})
        }
        
        // if (!WanRecipes.length) {
        //     console.log('CONSULTO SERVER WAN')
        //     fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`)
        //         .then(response => response.json())
        //         .then(json => {
        //             WanRecipes = json.results    
        //             return dispatch({ type: "FILTERED_RECIPES", payload: WanRecipes });
        //         })
        // } else {
        //     console.log('NO HACE FALTA CONSULTAR SERVER WAN')   
        //     const filtradas = await filtrar()
        //     console.log(filtradas)
        //     return dispatch({ type: "FILTERED_RECIPES", payload: WanRecipes });
        // } 
        //https://api.spoonacular.com/recipes/716426/information?apiKey=1935ed9ce94545f687a1880a21ce1f74
        //https://api.spoonacular.com/recipes/complexSearch?diet=Vegetarian,Vegan&apiKey=1935ed9ce94545f687a1880a21ce1f74
    
};
}

export function setFilteringStatus(value) {
    return function (dispatch) {
        dispatch({ type: 'SET_FILTERING_STATUS', payload: value })
    }
}

export function getRecipeDetail(id) {
    return function (dispatch) {
    //https://api.spoonacular.com/recipes/324694/analyzedInstructions?apiKey=1935ed9ce94545f687a1880a21ce1f74
    return fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(json => {
        dispatch({ type: "GET_MOVIE_DETAIL", payload: json });
    });
};
}
  