import React, { useState, useEffect } from 'react';

function RecipeForm() {

  const [input, setInput] = useState({
    title: '',//nombre

    vegetarian: false,
    vegan: false,
    glutenFree: false,

    spoonacularScore: 50.5,//puntuacion
    healthScore: 50.5,//nivel saludable

    summary: '',//resumen
  });

  const [diets, setDiets] = useState([])

  const [dietsCheck, setDietsCheck] = useState({
    ketogenic: false,//solo para valor de checkbox    
    lactoVegetarian: false,//solo para valor de checkbox 
    ovoVegetarian: false,//solo para valor de checkbox 
    pescetarian: false,//solo para valor de checkbox 
    paleo: false,//solo para valor de checkbox 
    primal: false,//solo para valor de checkbox 
    lowFODMAP: false,//solo para valor de checkbox 
    whole30: false,//solo para valor de checkbox     
  })

  const [analyzedInstructions, setAnalyzedInstructions] = useState('')
  
  const [errors, setErrors] = useState('');

  useEffect(() => {
     console.log(diets,dietsCheck,input,errors)
  }, [diets,dietsCheck,input,errors])

  function validate(input) {
    let errors = {};
    let pattern = /[0-9]+/;
    if (!input.title) {
      errors.title = 'Título es requerido';
    } else if (pattern.test(input.title)) {
      errors.title = 'Titulo invalido, no acepta números';
    } 
    return errors;
  };

  const handleInputChange = (e) => {    
    setInput({
      ...input,
      [e.target.name]: e.target.type==='checkbox' ? e.target.checked : e.target.value
    })
    setErrors(validate({
      ...input,       
      [e.target.name]: e.target.type==='checkbox' ? e.target.checked : e.target.value
    }));
    
    //console.log(input)       
       
  }
  const handleSteps = (value) => {
    console.log(value)
  }

  const handleDiets = (e) => { 
    setDietsCheck({
      ...dietsCheck,
      [e.target.name]: e.target.checked
    })

    if (e.target.checked) {
      if (!diets.find(a => a === e.target.name)) {
        setDiets([...diets,e.target.name]
          //...diets,
          //diets.arr.push(e.target.name)
        )
      } 
    } else {
      //const arr = diets.filter(a => a !== e.target.name)
      setDiets(diets.filter(a => a !== e.target.name))
      }
  }  

  return (
    <form
      className='newRecipe'
      onSubmit={e => {
          e.preventDefault()
        }
      }
    >
      <input
        id="title"        
        type="text"       
        name='title'
        value={ input.title }
        placeholder="Título de la Receta..."        
        onChange={e => handleInputChange(e)}       
      />
      {/* { !errors ? null : <span>{ errors }</span> } */}
      <div className='checkboxs'>
        <input
          type="checkbox" 
          onChange={e=> handleInputChange(e)}
          id="vegetarian"
          name="vegetarian"
          value={input.vegetarian}
          
        />
        <label htmlFor="vegetarian">Vegetarian</label>

        <input type="checkbox" 
        onChange={e=> handleInputChange(e)}
          id="vegan" name="vegan" value={input.vegan}
        />
        <label htmlFor="vegan">Vegan</label>

        <input type="checkbox" 
        onChange={e=> handleInputChange(e)}
          id="glutenFree" name="glutenFree" value={input.glutenFree}
        />
        <label htmlFor="glutenFree">Gluten-free</label>

        <input type="checkbox" 
          onChange={e => handleDiets(e)}
          id="ketogenic" name="ketogenic" value={dietsCheck.ketogenic}
        />
        <label htmlFor="ketogenic">Ketogenic</label>

        <input type="checkbox" 
        onChange={e=> handleDiets(e)}
          id="lactoVegetarian" name="lactoVegetarian" value={dietsCheck.lactoVegetarian}
        />
        <label htmlFor="lactoVegetarian">Lacto-vegetarian</label>

        <input type="checkbox" 
        onChange={e => handleDiets(e)}
          id="ovoVegetarian" name="ovoVegetarian" value={dietsCheck.ovoVegetarian}
        />
        <label htmlFor="ovoVegetarian">Ovo-vegetarian</label>

        <input type="checkbox" 
        onChange={e => handleDiets(e)}
          id="pescetarian" name="pescetarian" value={dietsCheck.pescetarian}
        />
        <label htmlFor="pescetarian">Pescetarian</label>

        <input type="checkbox" 
        onChange={e => handleDiets(e)}
          id="paleo" name="paleo" value={dietsCheck.paleo}
        />
        <label htmlFor="paleo">Paleo</label>

        <input type="checkbox" 
        onChange={e => handleDiets(e)}
          id="primal" name="primal" value={dietsCheck.primal}
        />
        <label htmlFor="primal">Primal</label>

        <input type="checkbox" 
        onChange={e => handleDiets(e)}
          id="lowFODMAP" name="lowFODMAP" value={dietsCheck.lowFODMAP}
        />
        <label htmlFor="lowFODMAP">LowFODMAP</label>

        <input type="checkbox" 
        onChange={e => handleDiets(e)}
          id="whole30" name="whole30" value={dietsCheck.whole30}
        />
        <label htmlFor="whole30">whole30</label>
      </div>
      
    <input type="submit" />
      </form>
  );          
}

export default RecipeForm