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

  
function FilterBar({ applyFilter, status, setStatus }) {
  
  const [filterGral, setFilter] = useState({
    title: '',

    vegetarian: false,
    vegan: false,
    glutenFree: false, 

    ketogenic: false,    
    lactoVegetarian: false,
    ovoVegetarian: false,    
    pescetarian: false,
    paleo: false,
    primal: false,
    lowFODMAP: false,
    whole30: false
  }); 
  const [diets, setDiets] = useState([])
  
  const[typing, setTyping] = useState(false)

  useEffect(() => {
    let timeout = null;    
    if (typing) {      
      console.log(filterGral,diets)
      timeout = setTimeout(() => {        
        setTyping(false)
        setStatus(true)
        applyFilter({op1:filterGral,op2:diets})
      }, 1500);         
    }    
    return () => clearTimeout(timeout) 
  }, [typing,setStatus,applyFilter,filterGral,diets])

  const handleFilterChange = (e) => {
    setTyping(true)
    setFilter({
      ...filterGral,
      [e.target.name]: e.target.name==='title' ? e.target.value : e.target.checked //aca agarro o el valor del evento.target o el checked dependiendo del nombre del e.target
    })       
    //refreshRecipes()     
    // setErrors(validate({//le paso a la funcion validate el estado modificado
    //   ...input,         
    //   [e.target.name]: e.target.value 
    // }));   
  }
  const handleDiets = (e) => {
    setTyping(true)
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
        <label for="vegetarian">Vegetarian</label>

        <input type="checkbox" 
        onChange={e=> handleFilterChange(e)}
          id="vegan" name="vegan" value={filterGral.vegan}
        />
        <label for="vegan">Vegan</label>

        <input type="checkbox" 
        onChange={e=> handleFilterChange(e)}
          id="glutenFree" name="glutenFree" value={filterGral.glutenFree}
        />
        <label for="glutenFree">Gluten-free</label>

        <input type="checkbox" 
          onChange={e => { handleFilterChange(e); handleDiets(e) }}
          id="ketogenic" name="ketogenic" value={filterGral.ketogenic}
        />
        <label for="ketogenic">Ketogenic</label>

        <input type="checkbox" 
        onChange={e=>{ handleFilterChange(e); handleDiets(e) }}
          id="lactoVegetarian" name="lactoVegetarian" value={filterGral.lactoVegetarian}
        />
        <label for="lactoVegetarian">Lacto-vegetarian</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="ovoVegetarian" name="ovoVegetarian" value={filterGral.ovoVegetarian}
        />
        <label for="ovoVegetarian">Ovo-vegetarian</label>

        <input type="checkbox" 
        onChange={e=>{ handleFilterChange(e); handleDiets(e) }}
          id="pescetarian" name="pescetarian" value={filterGral.pescetarian}
        />
        <label for="pescetarian">Pescetarian</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="paleo" name="paleo" value={filterGral.paleo}
        />
        <label for="paleo">Paleo</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="primal" name="primal" value={filterGral.primal}
        />
        <label for="primal">Primal</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="lowFODMAP" name="lowFODMAP" value={filterGral.lowFODMAP}
        />
        <label for="lowFODMAP">LowFODMAP</label>

        <input type="checkbox" 
        onChange={e=> { handleFilterChange(e); handleDiets(e) }}
          id="whole30" name="whole30" value={filterGral.whole30}
        />
        <label for="whole30">LowFODMAP</label>
</div>
      
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
