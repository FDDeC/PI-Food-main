import React, { useState, useEffect } from "react";

import { getRecipes, setFilteringStatus } from '../../actions'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import './FilterBar.css'

function mapDispatchToProps(dispatch) { //le doy al componente la capacidad de manejar el estado de redux
  return {
    applyFilter: obj => dispatch(getRecipes(obj)),// le envio el filtro al action creator
    setStatus: boolean => dispatch(setFilteringStatus(boolean))//setea en "FILTRANDO" al componente 
  };
}

function mapStateToProps(state) { //el componente va a estar al tanto del estado de la variable "filtering" del estado de redux
  return {
    status: state.filtering,
    result: state.filterResult
  }
}

function validate(input) {
    let errors = {};
    let pattern = /[0-9]+/;
    if (pattern.test(input.title)) {
      errors.title = 'Titulo inválido, no acepta números';
    } 
    return errors;
  };

  
function FilterBar({ applyFilter, status, result, setStatus }) {
  
  const [filterGral, setFilter] = useState({
    title: '',
    vegetarian: false,
    vegan: false,
    glutenFree: false, 
  }); 

  const [alphaOrder, setAlphaOrder] = useState('az')

  const [scoreOrder, setScoreOrder] = useState('dsc')

  const [dietsCheck, setDietsCheck] = useState({//solo para valor de checkbox     
    vegetarian: false,//vegetarian
    vegan: false,//vegan
    glutenfree: false,//Gluten Free
    ketogenic: false,//ketogenic    
    lactovegetarian: false,//lacto vegetarian 
    ovovegetarian: false,//ovo vegetarian 
    lactoovovegetarian: false,//lacto ovo vegetarian
    pescetarian: false,//pescetarian 
    paleolithic: false,//paleolithic 
    primal: false,//primal 
    lowfodmap: false,//low fodmap 
    whole30: false,//whole 30   
    dairyfree: false//dairy free
  })

  const [diets, setDiets] = useState([])
  const [errors, setErrors] = useState('')
  
  const[typing, setTyping] = useState(true)

  useEffect(() => {
    let timeout = null;    
    if (typing) {      
      console.log(filterGral,diets,errors)
      timeout = setTimeout(() => {        
        setTyping(false)
        
        if (!Object.keys(errors).length) {
          setStatus(true)
          let filter = {
            title: filterGral.title,
            orderAlpha: alphaOrder,
            orderScore: scoreOrder,
            diets: dietsCheck,
            dietsArr: diets
          }
          applyFilter(filter)
        }
        
      }, 1500);         
    }    
    return () => clearTimeout(timeout) 
  }, [typing,alphaOrder,scoreOrder,setStatus,applyFilter,filterGral,diets,dietsCheck,errors])

  const handleFilterChange = (e) => {
    setTyping(true)
    
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
    let formatedkey = e.target.name.split(' ').join('')    
    setDietsCheck({
      ...dietsCheck,
      [formatedkey]: e.target.checked
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
  function changeAlpha() {
    if (filterGral.title.length || result.length) {
      setTyping(true)
    }
    alphaOrder==='az' ? setAlphaOrder('za') : setAlphaOrder('az')
  }
  function changeScore() {
    if (filterGral.title.length || result.length) {
      setTyping(true)
    }
    scoreOrder==='dsc' ? setScoreOrder('asc') : setScoreOrder('dsc')
  }

  return (
    <div className='filterBar'>
      <div className='searchAdd'>
        <div className='searchOrder'>

          <div>
          <input
          id="inputSearch"
          type="text"       
          name='title'
          value={ filterGral.title }
          placeholder="Buscar receta..."        
          onChange={e=> handleFilterChange(e)}
          />
          </div>
          
          <button onClick={() => changeAlpha()}>{alphaOrder === 'az' ? 'Orden A-Z' : 'Orden Z-A'}</button>
          
          <button onClick={() => changeScore()}>{scoreOrder === 'asc' ? 'Peores primero' : 'Mejores primero'}</button>
          
        </div>
        
          <h4>
          {typing ? 'Seteando filtro' : Object.keys(errors).length ? errors.title :'Solicitud enviada'}          
          </h4>
        

        <Link to="../new">
          <button className='buttonLink'>
              Crear una Receta!
          </button>
        </Link>        

      </div>

      <div
        className='filters'>
        <div>
        <input
          type="checkbox" 
          onChange={e=> handleDiets(e)}
          id="vegetarian"
          name="vegetarian"
          value={dietsCheck.vegetarian}          
        />
        <label htmlFor="vegetarian">Vegetarian</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={ e=> handleDiets(e) }
          id="vegan" name="vegan" value={dietsCheck.vegan}
        />
        <label htmlFor="vegan">Vegan</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={ e=> handleDiets(e) }
          id="glutenfree" name="gluten free" value={dietsCheck.glutenfree}
        />
        <label htmlFor="glutenfree">Gluten free</label>
        </div>
        <div>
        <input type="checkbox" 
          onChange={ e => handleDiets(e) }
          id="ketogenic" name="ketogenic" value={dietsCheck.ketogenic}
        />
        <label htmlFor="ketogenic">Ketogenic</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={ e=> handleDiets(e) }
          id="lactovegetarian" name="lacto vegetarian" value={dietsCheck.lactovegetarian}
        />
        <label htmlFor="lactovegetarian">Lacto vegetarian</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e) }
          id="ovovegetarian" name="ovo vegetarian" value={dietsCheck.ovovegetarian}
        />
        <label htmlFor="ovovegetarian">Ovo vegetarian</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e) }
          id="lactoovovegetarian" name="lacto ovo vegetarian" value={dietsCheck.lactoovovegetarian}
        />
        <label htmlFor="lactoovovegetarian">Lacto ovo vegetarian</label>
        </div>
        
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e) }
          id="pescetarian" name="pescetarian" value={dietsCheck.pescetarian}
        />
        <label htmlFor="pescetarian">Pescetarian</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e)}
          id="paleolithic" name="paleolithic" value={dietsCheck.paleolithic}
        />
        <label htmlFor="paleolithic">Paleo</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e) }
          id="primal" name="primal" value={dietsCheck.primal}
        />
        <label htmlFor="primal">Primal</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e) }
          id="lowfodmap" name="low fodmap" value={dietsCheck.lowfodmap}
        />
        <label htmlFor="lowfodmap">Low fodmap</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e) }
          id="whole30" name="whole 30" value={dietsCheck.whole30}
        />
        <label htmlFor="whole30">Whole 30</label>
        </div>
        <div>
        <input type="checkbox" 
        onChange={e=> handleDiets(e) }
          id="dairyfree" name="dairy free" value={dietsCheck.dairyfree}
        />
        <label htmlFor="dairyfree">Dairy free</label>
        </div>
        
      </div>
      </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
