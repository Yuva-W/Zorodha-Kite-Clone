import React from 'react';

function Hero() {
    return ( 
        <div className="container border-bottom mb-5 p-5"> 
            <div className="row text-center">
                <p className='mt-5 fs-2 fw-bold text-muted'>Zerodha Products</p>
                <p className='mt-2 fs-5 text-muted'>Sleek, modern, and intuitive trading platforms</p>
                <p className='mt-1 fs-5 text-muted'>Check out our <a href="#" style={{textDecoration: 'none'}}>investment offerings <i class="fa fa-angle-double-right " aria-hidden="true"></i></a> </p>
            </div>
        </div>
     );
}

export default Hero;