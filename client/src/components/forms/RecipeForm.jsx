import React, { useState, useEffect } from 'react';

import './RecipeForm.css'
// Nombre
// Resumen del plato
// Puntuación
// Nivel de "comida saludable"
// Paso a paso

function RecipeForm() {

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
  
  const [errors, setErrors] = useState('');

  useEffect(() => {
    validate(text)
    const newRecipe = {
      title: text.title,
      summary: text.summary,      
      spoonacularScore: scores.spoonacularScore,
      healthScore: scores.healthScore,   
      analyzedInstructions: text.analyzedInstructions
    }
    console.log(newRecipe)    
    return () => {}
  }, [text,step,scores])

  function validate(input) {
    let errors = {};
    let pattern = /[0-9]+/;
    if (!input.title.length) {
      errors.title = 'Título es requerido';
    } else if (pattern.test(input.title)) {
      errors.title = 'Titulo invalido, no acepta números';
    }  
    if (!input.summary.length) {
      errors.summary = 'Resumen es requerido';
    } else if (pattern.test(input.summary)) {
      errors.summary = 'Resumen invalido, no acepta números';
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
      step : e.target.value
    })
  }

  const addStep = (value) => {    
    value.number = text.analyzedInstructions.steps.length//obtengo el index para setearlo como number
    const pre1 = [...text.analyzedInstructions.steps,value] //añado paso
    const prestep = { name:'', steps:pre1 } //seteo el arreglo previamente modificado
    setText({
      ...text,
      analyzedInstructions: prestep //seteo el objeto completo ya que solo se puede modificar le valor de una key pura
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
                  
          <h4>
          {Object.keys(errors).length
            ? Object.keys(errors).map(v => errors[v]+', ')
            : 'Formulario sin errores'
          }          
          </h4>
        
        
          <button disabled={ Object.keys(errors).length || !text.title.length || !text.summary.length} className='buttonLink'>
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
      
      <div className='scores'>
        <div className='scoreDiv'>
        <label for='scoreSp'>spoonacular Score</label>
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
        <label for='scoreHt'>Healthy Score </label>
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
        {text.analyzedInstructions.steps.map((value, index) => <div className='step'><label>Paso { index+1 }: { value.step }</label><button onClick={() => removeStep(index+1)}>Borrar paso!</button></div>)}  
        
      </div>
    </div>
    
  );      
}

export default RecipeForm