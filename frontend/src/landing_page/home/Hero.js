import React from 'react';

function Hero() {
    return ( 
        <div className="container p-5"> 
            <div className="row text-center">
                <img src="media/images/homeHero.png" alt="Hero-Image" className='mb-5 p-5'/>
                <h1 className='mt-5'>Invest in everything</h1>
                <p className='mt-3 text-muted'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <button className='btn btn-primary mt-3 p-2 fs-5' style={{ width: '20%', margin: '0 auto' }}>Sign Up for free</button>
            </div>
        </div>
     );
}

export default Hero;