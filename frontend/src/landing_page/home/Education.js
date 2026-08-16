import React from 'react';

function Education() {
    return ( 
        <div className='container'>
            <div className="row mt-5">
                <div className="col  p-5">
                    <img src='media\images\education.svg' alt="Education" className="img-fluid" />
                </div>

                <div className="col mt-5 p-5">
                    <h2>Free and open market education</h2>
                    <p className='mt-4'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <div>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="fs-4 mt-5" style={{ textDecoration: "none" }}>Varsity <i class="fa fa-angle-double-right " aria-hidden="true"></i></a>
                    </div>

                    <p className='mt-4'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <div>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="fs-4 mt-5" style={{ textDecoration: "none" }}>Trading Q&A <i class="fa fa-angle-double-right " aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Education;