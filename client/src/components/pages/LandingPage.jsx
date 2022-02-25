import React from "react";
import './LandingPage.css';
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <>
            
                <div className='landing'>
                    <h1>Gracias por visitar Henry Food!!</h1>
                    <Link className='homeButton' to="/home">
                        <button className='buttonLink'>
                            Comenzar!!
                        </button>
                    </Link>
                </div>
                       
        </>
        
    )
}

export default Landing;