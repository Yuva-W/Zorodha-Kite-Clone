import React from 'react';

function OpenAccount() {
    return ( 
        <div className="container p-5"> 
            <div className="row text-center">
                <img src="media/images/homeHero.png" alt="Hero-Image" className='mb-5 p-5'/>
                <h1 className='mt-5'>Open a Zerodha account</h1>
                <p className='mt-3 text-muted'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <button className='btn btn-primary mt-3 p-2 fs-5' style={{ width: '20%', margin: '0 auto' }}>SignUp Now</button>
            </div>
        </div>
     );
}

export default OpenAccount;