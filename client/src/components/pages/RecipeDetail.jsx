import React ,{ useEffect, useState } from "react";
import { setRecipeDetail } from '../../actions'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import './RecipeDetail.css'
import img from '../../cooking-small.png'

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
    
    const [recipe, setRecipe] = useState({ id: null })
    const [ steps, setSteps ] = useState([]) 
    const [ step, setStep ] = useState(0)
    
    let { recipeId } = useParams();
    
    useEffect(() => {
        //console.log('recipes in detail page', filteredRecipes)
        // setRecipe({id:null})
        // filteredRecipes.forEach(r => {
        //     if (r.id.toString() === recipeId.toString()) {
        //         console.log('correcto!')
        //         setRecipe(r)
        //     }
        // });        
        // console.log(recipeId.toString())
        const recipeSelected = filteredRecipes.find(r => r.id.toString() === recipeId.toString()) || { id: null }
        setRecipe(recipeSelected)        
        let s = []
        for (let i = 0; i < recipeSelected.analyzedInstructions[0].steps.length; i++) {
            s.push(i+1);                
        }            
        setSteps(s)
        
        return () => { }
    }, [recipeId, filteredRecipes, setSteps])

    function loadStep(value){
        setStep(value)
    }
    
    function nextStep() {
        if (step !== steps.length-1) {
            setStep(step+1)
        }
    }
    function prevStep() {
        if (step !== 0) {
            setStep(step-1)
        }
    }
    
    if (filteredRecipes.length) {        
    
        if (recipe.id !== null && recipe.id.toString() === recipeId.toString()) {        
            return (        
                <div className="recipeDetail"
                style={{
                backgroundImage: `linear-gradient(
                    rgba(255, 255, 255, 0.75),
                    rgba(255, 255, 255, 0.75)
                    )
                    , url(${(recipe.image && recipe.image) || img})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`
                    }}>
                    <div className='recipeDetail-top'>

                        <div className="recipeDetail-img">
                        <img className="recipeImg" src={recipe.image || img} alt=''/>
                        </div>
                        <div className="recipeDetail-details"
                        >
                            <div className="recipeDetail-title">{recipe.title}</div>
                            <div className="recipeDetail-extras">
                                <div className="recipeDetail-extraDiets">
                                    <div className='listTitle'>Diets:</div>
                                    <ul>
                                    {recipe.diets && recipe.diets.length
                                        ? recipe.diets.map((diet,i) =>
                                            <li key={i}>{diet}</li>
                                        )
                                        : <h5>No dispone de dietas extras</h5>
                                    }
                                    </ul>
                                </div>
                                <div className="recipeDetail-dishType">
                                    <div className='listTitle'>Dish types:</div>
                                    <ul>
                                    {recipe.dishTypes && recipe.dishTypes.length
                                        ? recipe.dishTypes.map((dishType,i) =>
                                            <li key={i}>{dishType}</li>
                                        )
                                        : <h5>No dispone de tipo</h5>
                                    }
                                    </ul>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div className='recipeDetail-bottom'>

                        <div className='recipeDetail-scores'>
                            <div>Score: { recipe.spoonacularScore }</div>
                            <div>Healthly: { recipe.healthScore }</div>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{ __html: recipe.summary && recipe.summary }}
                            className='recipeDetail-summary'
                        >
                        </div>                                                       
                        
                        <div className='recipeDetail-steps'>
                            <div className='steps'>
                                {steps.length>1? <button onClick={()=>prevStep()}>Prev Step</button> : <></>}
                                {steps.length
                                    ? steps.map((ste,i) =>
                                        <button disabled={  step === i } onClick={()=>loadStep(i)} key={i}>{ ste }</button>
                                    )
                                    : <h4>No steps</h4>
                                }  
                                {steps.length > 1 ? <button onClick={() => nextStep()}>Next Step</button> : <></>}                    
                            </div>
                            <div className='step'>
                                {steps.length > 1 ? <p>{ recipe.analyzedInstructions[0].steps[step].step }</p> : <></>} 
                            </div>
                        </div>
                         <Link className='backButton' to='../home'><button>Volver</button></Link>
                    </div>                    
                </div >    
            )
        } else {      
            return <Link className='backButton' to='../home'><p>Volver</p></Link>//<Redirect to='../home' />
        }
    } else {
        return <Redirect to='../home' />
    }    
    
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetail);