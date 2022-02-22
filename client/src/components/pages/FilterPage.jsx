import React from "react";
import FilterBar from "../forms/FilterBar";
import Recipes from "../recipes/Recipes";

export default function FilterPage(){
    return (
        <>
            <div className='navbar'>
                <FilterBar/>
            </div>
            <div className='recipes'>
                <Recipes/>
            </div>
        </>
    )
}