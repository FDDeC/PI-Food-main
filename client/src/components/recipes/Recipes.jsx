import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import RecipeIcon from "./RecipeIcon";
import { setPage } from "../../actions";

import './Recipes.css';

function mapDispatchToProps(dispatch) { //le doy al componente la capacidad de manejar el estado de redux
  return {
    setPage: page => dispatch(setPage(page)),// le envio el filtro al action creator
    //setStatus: boolean => dispatch(setFilteringStatus(boolean))//setea en "FILTRANDO" al componente 
  };
}

function mapStateToProps(state) { //el componente va a estar al tanto del estado de la variable "filtering" del estado de redux
  return {
      status: state.filtering,
      recipes: state.filterResult      
  }
}

function Recipes({ status, recipes }) {    
    
    const [ pages, setPages ] = useState([]) 
    const [ page, setPage ] = useState(0)  
    const [ content, setContent ] = useState([])
    
    
    useEffect(() => {        
            
        let p = []
        for (let i = 0; i < Math.ceil(recipes.length/9); i++) {
            p.push(i+1);                
        }            
        setPages(p)
        if(page>p.length) setPage(0)
        setContent(recipes.slice(page*9,page*9+9))
        
        return () => { }
    }, [recipes, page])
    
    function loadPage(value){
        setPage(value)
    }
    function nextPage() {
        if (page !== pages.length-1) {
            setPage(page+1)
        }
    }
    function prevPage() {
        if (page !== 0) {
            setPage(page-1)
        }
    }
    
    if (status) {
        return (
        <div className='container'>  
            <h2>OBTENIENDO RESULTADOS, AGUARDE POR FAVOR</h2>
        </div>
    )
    } else {
        return (
            <div className='container'>
                <div className='pagination'>
                    {pages.length > 1 ? <button disabled={ page===0 } onClick={()=>prevPage()}>Prev</button> : <></>}
                    {pages.length
                        ? pages.map((pag,i) =>
                            <button disabled={  page === i } className={ page === i? 'paginaActual' : ''} onClick={()=>loadPage(i)} key={i}>{ pag }</button>
                        )
                        : <></>
                    }  
                    {pages.length > 1 ? <button disabled={ page===pages.length-1 } onClick={() => nextPage()}>Next</button> : <></>}
                    {recipes.length>0 && <h4> Total {recipes.length}</h4>}
                </div>
                
                <div className='recipes'>                    
                    { content.length
                        ? content.map((recipe,i) => 
                            <RecipeIcon key={ i } recipe={ recipe }/>
                        )
                        : <h3>No existen Recetas con ese filtro</h3>
                    }                    
                </div>            
            </div>
    )
    }
    
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);