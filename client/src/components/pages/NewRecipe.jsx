import React from "react";
import RecipeForm from "../forms/RecipeForm";
import { Link } from 'react-router-dom'

export default function NewRecipe(){
    return (
        <>
            <div className='navBar'>
                <RecipeForm/>
            </div>
            <div className='content'>
                <Link to="../home">
                    <button className='buttonLink'>
                        Volver!
                    </button>
                </Link>
            </div>
        </>
    )
}