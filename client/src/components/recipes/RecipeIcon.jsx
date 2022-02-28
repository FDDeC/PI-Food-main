import React from "react";
import { Link } from 'react-router-dom'
import './RecipeIcon.css';
import img from '../../cooking-small.png'

function RecipeIcon({recipe}) {
    return (
        <div className="recipeIcon"
            style={{
                backgroundImage: `linear-gradient(
                    rgba(255, 255, 255, 0.75),
                    rgba(255, 255, 255, 0.75)
                    )
                    , url(${(recipe.image && recipe.image) || img})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`
            }}>
                
            <div className="recipeIcon-title">{recipe.title}</div>
            
            <div className="recipeIcon-extraDiets">
                <ul>
                    {recipe.diets && recipe.diets.length
                        ? recipe.diets.map((diet,i) =>
                            <li key={i}>{`${diet}`}</li>
                        )
                        : <h5>No dispone de dietas extras</h5>
                    }
                </ul>
                Score: { recipe.spoonacularScore }
                </div>
            <Link className='detailLink' to={`../recipe/${recipe.id}`}>Detalles</Link>
            </div > 
    )
}
export default RecipeIcon;