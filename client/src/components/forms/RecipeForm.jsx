import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getDiets, addNewRecipe } from '../../actions'
import './RecipeForm.css'

// Nombre
// Resumen del plato
// Puntuación
// Nivel de "comida saludable"
// Paso a paso

function mapDispatchToProps(dispatch) { //le doy al componente la capacidad de manejar el estado de redux
  return {
    obtainDiets: () => dispatch(getDiets()),// para solicitar tipos de dietas
    addNewRecipe: obj => dispatch(addNewRecipe(obj))
  };
}

function mapStateToProps(state) { //el componente va a estar al tanto del estado de la variable "filtering" del estado de redux
  return {
    stateDiets: state.dietTypes
  }
}

async function sendRecipe(data) { 
  try {
    
    const result = await fetch('http://localhost:3001/recipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return result.json()
    
  } catch (error) {
    console.log(`error en sendRecipe() ${error}`)
  }
  
}

function RecipeForm({ stateDiets , obtainDiets, addNewRecipe }) {

  const [text, setText] = useState({
    title: '',//titulo
    summary: '',//resumen
    analyzedInstructions: { name: "", steps: [] }//paso a paso
  })

  const [step, setStep] = useState({
      number: undefined,
      step: '',
      ingredients: [],
      equipment: []
  })

  const [scores, setScores] = useState({
    spoonacularScore: 50.5,//puntuacion
    healthScore: 50.5,//nivel saludable
  })    

  const [dietsCheck, setDietsCheck] = useState({//solo para valor de checkbox     
    vegetarian: false,//vegetarian
    vegan: false,//vegan
    glutenfree: false,//Gluten Free
    ketogenic: false,//ketogenic    
    lactovegetarian: false,//lacto vegetarian 
    ovovegetarian: false,//ovo vegetarian     
    pescetarian: false,//pescetarian 
    paleolithic: false,//paleolithic 
    primal: false,//primal 
    lowfodmap: false,//low fodmap 
    whole30: false,//whole 30   
   })
  
  const [diets, setDiets] = useState([])

  const [errors, setErrors] = useState('');

  useEffect(() => {    
    if (stateDiets.length===0) {
      obtainDiets()
    }     
    if (scores.spoonacularScore > 100) {
      setScores({
        ...scores,
        spoonacularScore:100
      })
    }
    if (scores.healthScore > 100) {
      setScores({
        ...scores,
        healthScore:100
      })
    }
    return () => {}
  }, [text,step,scores,stateDiets,obtainDiets])

  async function addRecipe() {
    try {
        const newRecipe = {
        title: text.title,
        summary: text.summary,
        spoonacularScore: scores.spoonacularScore,
        healthScore: scores.healthScore,
        analyzedInstructions: JSON.stringify([text.analyzedInstructions]),
        diets: diets
      }    
    const sendResult = await sendRecipe(newRecipe)    
      if (sendResult.done && sendResult.done === true) {
      addNewRecipe(sendResult.data)
      setStep({//pongo en 0 el step para proximo paso
      number: undefined,
      step: '',
      ingredients: [],
      equipment: []
      })
      setDietsCheck({
        vegetarian: false,//vegetarian
        vegan: false,//vegan
        glutenfree: false,//Gluten Free
        ketogenic: false,//ketogenic    
        lactovegetarian: false,//lacto vegetarian 
        ovovegetarian: false,//ovo vegetarian     
        pescetarian: false,//pescetarian 
        paleolithic: false,//paleolithic 
        primal: false,//primal 
        lowfodmap: false,//low fodmap 
        whole30: false,//whole 30
      })      
      setText({
        title: '',//titulo
        summary: '',//resumen
        analyzedInstructions: { name: "", steps: [] }//paso a paso
      })
      setScores({
        spoonacularScore: 50.5,//puntuacion
        healthScore: 50.5,//nivel saludable
      })
      return alert('Receta añadida correctamente!!')
    } else {
      return alert(`error en server: ${sendResult.data}`)
    }      
    } catch (error) {
      console.log(`error en addRecipe() ${error}`)
    }    
  }

  const handleDiets = (e) => {  
    let formatedkey = e.target.name.split(' ').join('')
    setDietsCheck({
      ...dietsCheck,
      [formatedkey]: e.target.checked
    })
    if (e.target.checked) {
      if (!diets.find(a => a === parseInt(e.target.value))) {
        setDiets([...diets,parseInt(e.target.value)])
      } 
    } else {
      const arr = diets.filter(a => a !== parseInt(e.target.value))
      setDiets(arr)
    }
  }

  function validate(input) {
    
    let errors = {};
    let pattern = /[0-9]+/;
    let pattern2 = /<[^>]+>/;
    if (!input.title.length) {
      errors.title = 'Título es requerido';
    } else if (pattern.test(input.title)) {
      errors.title = 'Titulo inválido, no acepta números';
    } else if (pattern2.test(input.title)) {
      errors.title = 'Titulo inválido, no acepta <></>';
    }
    if (!input.summary.length) {
      errors.summary = 'Resumen es requerido';
    } else if (pattern.test(input.summary)) {
      errors.summary = 'Resumen inválido, no acepta números';
    } else if (pattern2.test(input.summary)) {
      errors.summary = 'Resumen inválido, no acepta <></>';
    } 
    return errors;
  };

  const handleText = (e) => {    
    setText({
      ...text,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...text,       
      [e.target.name]: e.target.value
    }));
  }

  const handleStep = (e) => {
    setStep({
      ...step,
      step : e.target.value.replace(/<[^>]+>/g, '')
    })
  }

  const addStep = (value) => {    
    value.number = text.analyzedInstructions.steps.length//obtengo el index para setearlo como number
    const pre1 = [...text.analyzedInstructions.steps,value] //añado paso dentro de los pasos anteriores
    const prestep = { name:'', steps:pre1 } //armo objeto nuevo con los nuevos pasos
    setText({
      ...text,
      analyzedInstructions: prestep //seteo el objeto armado
    })    
    setStep({//pongo en 0 el step para proximo paso
      number: undefined,
      step: '',
      ingredients: [],
      equipment: []
    })
  }

  const removeStep = (value) => { 
    const pre1 = text.analyzedInstructions.steps.splice(value)
    pre1.forEach((value, index) => {//al borrar un paso vuelvo a ordenar el indica en el valor number de cada paso
      value.number=index
    })
    const prestep = { name:'', steps:pre1 }
    setText({
      ...text,
      analyzedInstructions: prestep
    })
          
  }  

  const handleScores = (e) => {
    setScores({
      ...scores,
      [e.target.name]: e.target.value
    })    
  }

  return (
    <div className='addRecipeBar'>

      <div className='TitleAndError'>       
          
          <input
          id="inputSearch"
          type="text"       
          name='title'
          value={ text.title }
          placeholder="Título de receta..."        
          onChange={ e=> handleText(e) }
          />
                  
        <h4 
          style={
            Object.keys(errors).length ? { color: 'rgb(205, 50, 50)' } : { color:'limegreen'}
        }>
          {Object.keys(errors).length
            ? Object.keys(errors).map(v => errors[v]+', ')
            : 'Formulario sin errores'
          }          
          </h4>
        
        
        <button disabled={Object.keys(errors).length || !text.title.length || !text.summary.length} onClick={ () => addRecipe(text,scores) }className='buttonLink'>
              Añadir !
          </button>
        

      </div>
      <div className='summary'>
        <textarea
          id="inputSummary"
          type="text"       
          name='summary'
          value={ text.summary }
          placeholder="Resumen de receta..."        
          onChange={ e=> handleText(e) }
          />
      </div>
      <div className='diets'>
        { stateDiets.map((value,index) => { return (
          <div key={ index }>
            <input               
              type="checkbox"
              onChange={e => handleDiets(e)}              
              name={value.name}
              value={value.id}
              checked={dietsCheck[value.name.split(' ').join('')]}  
            />
            <label htmlFor={value.name}>{value.name}</label>
          </div>
        )})}
      </div>
            
      <div className='scores'>
        <div className='scoreDiv'>
        <label htmlFor='scoreSp'>Score: </label>
          <input
          id="scoreSp"
          type="number"
          min='0'
          max='100'
          name='spoonacularScore'
          value={ scores.spoonacularScore }
          onChange={ e=> handleScores(e) }
          />
        </div>
        <div className='scoreDiv'>
        <label htmlFor='scoreHt'>Healthy: </label>
          <input
          id="scoreHt"
          type="number"
          min='0'
          max='100'
          name='healthScore'
          value={ scores.healthScore }
          onChange={ e=> handleScores(e) }
          />
        </div>
        
      </div>
      <div className='addStep'>
        <input
          id="inputAddStep"
          type="text"       
          name='step'
          value={ step.step }
          placeholder="Añadir paso de preparación"        
          onChange={ e=> handleStep(e) }
        />
        <button disabled={ !step.step.length } onClick={()=>addStep(step)}>
          Añadir Paso!
        </button>
      </div>
      <div
        // hidden={text.analyzedInstructions.steps && !text.analyzedInstructions.steps.length}
        className='steps'>    
        {text.analyzedInstructions.steps.map((value, index) => <div key={ index } className='step'><label>Paso { index+1 }: { value.step }</label><button onClick={() => removeStep(index+1)}>Borrar paso!</button></div>)}  
        
      </div>
    </div>
    
  );      
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeForm)