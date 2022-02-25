import React ,{ useEffect, useState } from "react";
import { setRecipeDetail } from '../../actions'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'


function mapDispatchToProps(dispatch) { //le doy al componente la capacidad de manejar el estado de redux
  return {
    getRecipeDetail: (id) => dispatch(setRecipeDetail(id)),// le envio el filtro al action creator
  };
}

function mapStateToProps(state) { //el componente va a estar al tanto del estado de la variable "filtering" del estado de redux
    return {
        filteredRecipes: state.filterResult
    }
}

function RecipeDetail({ filteredRecipes }) {
    
    const[ recipe, setRecipe ] = useState({id:null})

    let { recipeId } = useParams();
    
    useEffect(() => {
        
        setRecipe( filteredRecipes.find(r => r.id === parseInt(recipeId)) || {id:null} )               
        return () => { }
    }, [recipeId,filteredRecipes])
    
    if (filteredRecipes.length) {        
    
        if (recipe.id !== null && recipe.id === parseInt(recipeId)) {        
            return (        
                <div className="recipeIcon">
                    <div className="recipeIcon-img">
                        <img className="recipeImg" src={recipe.image} alt='' />
                    </div>
                    <h5 className="recipeIcon-title">{recipe.title}</h5>
                    <div className="recipeIcon-diets">
                        <h3 if={recipe.vegan}>Vegan</h3>
                        <h3 if={recipe.vegetarian}>Vegetarian</h3>
                        <h3 if={recipe.glutenFree}>glutenFree</h3>
                    </div>
                    <div className="recipeIcon-extraDiets">
                        {recipe.diets && recipe.diets.length
                            ? recipe.diets.map((diet,i) =>
                                <h5 key={i}>{diet}</h5>
                            )
                            : <h5>No dispone de dietas extras</h5>
                        }
                    </div>
                    <Link to='../home'><p>Volver</p></Link>
                </div >    
            )
        } else {      
            return <><Link to='../home'><p>Volver</p></Link></>//<Redirect to='../home' />
        }
    } else {
        return <Redirect to='../home' />
    }    
    
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetail);