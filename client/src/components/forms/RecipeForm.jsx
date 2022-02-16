import React, { useState } from 'react';

export default function CreateRecipeForm() {
  // const [title, setTitle] = useState('');//Nombre
  // const [spoonacularScore, setSpoonacularScore] = useState('');//Puntuacion
  // const [healthScore, setHealthScore] = useState('');//Nivel Saludable
  // const [summary, setSummary] = useState('');//Resumen
  // const [analyzedInstructions, setAnalyzedInstructions] = useState([]);//Paso a paso 
  const [errors, setErrors] = React.useState({});
  const [input, setInput] = React.useState({
    title: '',//nombre
    spoonacularScore: '',//puntuacion
    healthScore: '',//nivel saludable
    summary: '',//resumen
    analyzedInstructions:[]//paso a paso 
  });

  function validate(input) {
  let errors = {};
  if (!input.username) {
      errors.username = 'Username is required';
    } else if (!/\S+@\S+\.\S+/.test(input.username)) {
      errors.username = 'Username is invalid';
    } 
    if (!input.password) {
      errors.password = 'Password is required';
    } else if (!/(?=.*[0-9])/.test(input.password)) {
      errors.password = 'Password is invalid';
    }   
    return errors;
  };

  const handleInputChange = (e) => {    
    // setInput({
    //   ...input,
    //   [e.target.name]: e.target.value
    // }) 
    setInput((input) => {
      return input[e.target.name]=e.target.value
    })
    console.log(input)       
    // setErrors(validate({
    //   ...input,         //de lo que hay en input
    //   [e.target.name]: e.target.value //cambio el valor de esa propiedad y le paso el input entero a validate
    // }));   
  }
  re
  
  return (
      <form>
        <input className={error && 'danger'}
          name="username" value={username} placeholder="username" onChange={(e) => validateUser(e.target.value)}/>
        {!error ? null : <span>{error}</span>}
        <input name="password" value={password} placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" />
      </form>
    );
}