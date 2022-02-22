import React, { useState, useEffect } from "react";

import { getRecipes, setFilteringStatus } from '../../actions'

import { connect } from "react-redux";

function mapDispatchToProps(dispatch) { //le doy al componente la capacidad de manejar el estado de redux
  return {
    applyFilter: obj => dispatch(getRecipes(obj)),// le envio el filtro al action creator
    setStatus: boolean => dispatch(setFilteringStatus(boolean))//setea en "FILTRANDO" al componente 
  };
}

function mapStateToProps(state) { //el componente va a estar al tanto del estado de la variable "filtering" del estado de redux
  return {
    status: state.filtering
  }
}

function validate(input) {
    let errors = {};
    let pattern = /[0-9]+/;
    if (pattern.test(input.title)) {
      errors.title = 'Titulo invalido, no acepta números';
    } 
    return errors;
  };

  
function FilterBar({ applyFilter, status, setStatus }) {
  
  const [filterGral, setFilter] = useState({
    title: '',
    vegetarian: false,
    vegan: false,
    glutenFree: false, 
  }); 

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

  const [diets, setDiets] = useState([])
  const [errors, setErrors] = useState('')
  
  const[typing, setTyping] = useState(false)

  useEffect(() => {
    let timeout = null;    
    if (typing) {      
      console.log(filterGral,diets,errors)
      timeout = setTimeout(() => {        
        setTyping(false)
        
        if (!Object.keys(errors).length) {
          setStatus(true)
          applyFilter({op1:filterGral,op2:diets})
        }
        
      }, 1500);         
    }    
    return () => clearTimeout(timeout) 
  }, [typing,setStatus,applyFilter,filterGral,diets,errors])

  const handleFilterChange = (e) => {
    setTyping(true)
    console.log(e.target)
    setFilter({
      ...filterGral,
      [e.target.name]: e.target.name==='title' ? e.target.value : e.target.checked //aca agarro o el valor del evento.target o el checked dependiendo del nombre del e.target
    })       
    //refreshRecipes()     
    setErrors(validate({//le paso a la funcion validate el estado modificado
      ...filterGral,         
      [e.target.name]: e.target.name==='title' ? e.target.value : e.target.checked
    }));   
  }
  const handleDiets = (e) => {
    setTyping(true)
    setDietsCheck({
      ...dietsCheck,
      [e.target.name]: e.target.checked
    })
    if (e.target.checked) {
      if (!diets.find(a => a === e.target.name)) {
        setDiets([...diets,e.target.name])
      } 
    } else {
      const arr = diets.filter(a => a !== e.target.name)
      setDiets(arr)
    }
  }

  return (
    <div
      className='filters'
    >
      <input
        id="inputSearch"
        className="form"
        type="text"       
        name='title'
        value={ filterGral.title }
        placeholder="Receta..."        
        onChange={e=> handleFilterChange(e)}        
        //onChange={e => refreshRecipes()}
      />
      <div className='checkboxs'>
        <input
          type="checkbox" 
          onChange={e=> handleFilterChange(e)}
          id="vegetarian"
          name="vegetarian"
          value={filterGral.vegetarian}          
        />
        <label htmlFor="vegetarian">Vegetarian</label>

        <input type="checkbox" 
        onChange={e=> handleFilterChange(e)}
          id="vegan" name="vegan" value={filterGral.vegan}
        />
        <label htmlFor="vegan">Vegan</label>

        <input type="checkbox" 
        onChange={e=> handleFilterChange(e)}
          id="glutenFree" name="glutenFree" value={filterGral.glutenFree}
        />
        <label htmlFor="glutenFree">Gluten-free</label>

        <input type="checkbox" 
          onChange={e => { handleDiets(e) }}
          id="ketogenic" name="ketogenic" value={dietsCheck.ketogenic}
        />
        <label htmlFor="ketogenic">Ketogenic</label>

        <input type="checkbox" 
        onChange={e=>{ handleFilterChange(e); handleDiets(e) }}
          id="lactoVegetarian" name="lactoVegetarian" value={dietsCheck.lactoVegetarian}
        />
        <label htmlFor="lactoVegetarian">Lacto-vegetarian</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="ovoVegetarian" name="ovoVegetarian" value={dietsCheck.ovoVegetarian}
        />
        <label htmlFor="ovoVegetarian">Ovo-vegetarian</label>

        <input type="checkbox" 
        onChange={e=>{ handleFilterChange(e); handleDiets(e) }}
          id="pescetarian" name="pescetarian" value={dietsCheck.pescetarian}
        />
        <label htmlFor="pescetarian">Pescetarian</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="paleo" name="paleo" value={dietsCheck.paleo}
        />
        <label htmlFor="paleo">Paleo</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="primal" name="primal" value={dietsCheck.primal}
        />
        <label htmlFor="primal">Primal</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="lowFODMAP" name="lowFODMAP" value={dietsCheck.lowFODMAP}
        />
        <label htmlFor="lowFODMAP">LowFODMAP</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="whole30" name="whole30" value={dietsCheck.whole30}
        />
        <label htmlFor="whole30">whole30</label>
</div>
      
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
