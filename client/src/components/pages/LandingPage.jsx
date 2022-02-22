import React from "react";
import './LandingPage.css';
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div className='landing'>
            <h1>Gracias por visitar Henry Food!!</h1>
            <button className='homeButton'>
                <Link to='/home'><p>Ingresar</p></Link>
            </button>
        </div>
    )
}

export default Landing;