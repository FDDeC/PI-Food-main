import React ,{ useEffect, useState } from "react";
import { getRecipeDetail } from '../../actions'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import './RecipeDetail.css'
import img from '../../cooking-small.png'

function mapDispatchToProps(dispatch) { //le doy al componente la capacidad de manejar el estado de redux
  return {
    getRecipeDetail: (id) => dispatch(getRecipeDetail(id)),// le envio el filtro al action creator
  };
}

function mapStateToProps(state) { //el componente va a estar al tanto del estado de la variable "filtering" del estado de redux
    return {
        filteredRecipes: state.filterResult,
        recipeDetail : state.recipeDetail
    }
}

function RecipeDetail({ filteredRecipes, getRecipeDetail, recipeDetail }) {
    
    const [ recipe, setRecipe ] = useState({ id: null })
    const [ steps, setSteps ] = useState([]) 
    const [ step, setStep ] = useState(0)
    
    let { recipeId } = useParams();
    
    useEffect(() => {
        if ((recipeDetail.id && recipeDetail.id.toString() !== recipeId.toString()) || recipeDetail.id===null) {
            getRecipeDetail(recipeId)
        } else {
            let s = []
            for (let i = 0; i < recipeDetail.analyzedInstructions[0].steps.length; i++) {
                s.push(i+1);                
            }            
            setSteps(s)
        }
        //const recipeSelected = filteredRecipes.find(r => r.id.toString() === recipeId.toString()) || { id: null }
        //setRecipe(recipeSelected)        
        
        
        return () => { }
    }, [recipeId, filteredRecipes, setSteps,recipeDetail,getRecipeDetail])

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
    
        if (recipeDetail.id !== null && recipeDetail.id.toString() === recipeId.toString()) {        
            return (        
                <div className="recipeDetail"
                style={{
                backgroundImage: `linear-gradient(
                    rgba(255, 255, 255, 0.75),
                    rgba(255, 255, 255, 0.75)
                    )
                    , url(${(recipeDetail.image && recipeDetail.image) || img})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`
                    }}>
                    <div className='recipeDetail-top'>

                        <div className="recipeDetail-img">
                        <img className="recipeImg" src={recipeDetail.image || img} width="400" height="230" alt=''/>
                        </div>
                        <div className="recipeDetail-details"
                        >
                            <div className="recipeDetail-title">{recipeDetail.title && recipeDetail.title.replace(/<[^>]+>/g, '')}</div>
                            <div className="recipeDetail-extras">
                                <div className="recipeDetail-extraDiets">
                                    <div className='listTitle'>Diets:</div>
                                    <ul>
                                    {recipeDetail.diets && recipeDetail.diets.length
                                        ? recipeDetail.diets.map((diet,i) =>
                                            <li key={i}>{diet}</li>
                                        )
                                        : <h5>No dispone de dietas extras</h5>
                                    }
                                    </ul>
                                </div>
                                <div className="recipeDetail-dishType">
                                    <div className='listTitle'>Dish types:</div>
                                    <ul>
                                    {recipeDetail.dishTypes && recipeDetail.dishTypes.length
                                        ? recipeDetail.dishTypes.map((dishType,i) =>
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
                            <div>Score: { recipeDetail.spoonacularScore }</div>
                            <div>Healthly: { recipeDetail.healthScore }</div>
                        </div>
                        <div                            
                            className='recipeDetail-summary'
                        >
                            {recipeDetail.summary && recipeDetail.summary.replace(/<[^>]+>/g, '')}
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
                                {steps.length > 1 ? <p>{ recipeDetail.analyzedInstructions[0].steps[step].step }</p> : <></>} 
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