import React from "react";
import FilterBar from "../forms/FilterBar";
import Recipes from "../recipes/Recipes";

export default function HomePage(){
    return (
        <>
            <div className='navBar'>
                <FilterBar/>
            </div>
            <div className='content'>
                <Recipes/>
            </div>
        </>
    )
}