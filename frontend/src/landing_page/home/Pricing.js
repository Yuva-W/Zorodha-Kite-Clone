import React from 'react';

function Pricing() {
    return ( 
        <div className="container">
            <div className="row mt-5">
                <h1>Unbeatable pricing</h1>
                <div className="col-4">
                    <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="fs-5" style={{ textDecoration: "none" }}> See pricing <i class="fa fa-angle-double-right " aria-hidden="true"></i></a>
                </div>

                <div className="col-8">
                    <div className="row ">
                        <div className="col-4 d-flex fs-5 "> 
                             <img src="media\images\zero.svg" style={{width: '55%'}} alt="Pricing-Image" className=''/>
                             <p className='pt-5'>Free account<br/> opening</p>
                        </div>
                        <div className="col-4 d-flex fs-5">
                            <img src="media\images\zero.svg" style={{width: '55%'}} alt="Pricing-Image" className=''/>
                            <p className='pt-3'>Free equity delivery<br/> and direct mutual funds</p>
                        </div>
                        <div className="col-4 d-flex fs-5">
                            <img src="media\images\twenty.svg" style={{width: '55%'}} alt="Pricing-Image" />
                            <p className='pt-4'>Discounted intraday and <br/>F&O trading</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;