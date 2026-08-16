import React from 'react';

function Hero() {
    return ( 
        <div className='container mt-5 text-center'>
            <h2>Charges</h2>
            <p className='text-muted mt-2 fs-3 mb-5'>List of all charges and taxes</p>
            <div className="row p-5 mt-5 ">
                        <div className="col-4 fs-5 "> 
                            <img src="media\images\zero.svg" style={{width: '55%'}} alt="Pricing-Image" className=''/>
                            <h2 className='mt-3'>Free equity delivery</h2>
                            <p className='pt-3 text-muted'>All equity delivery investments (NSE, BSE),<br/> are absolutely free — ₹ 0 brokerage.</p>
                        </div>
                        <div className="col-4 fs-5">
                            <img src="media\images\zero.svg" style={{width: '55%'}} alt="Pricing-Image" className=''/>
                            <h2 className='mt-3'>Free equity delivery</h2>
                            <p className='pt-3 text-muted'>Flat ₹ 20 or 0.03% (whichever is lower) per <br/>executed order on intraday trades ,<br/>across equity, currency, and commodity trades. <br/>Flat ₹20 on all option trades.</p>
                        </div>
                        <div className="col-4 fs-5">
                            <img src="media\images\twenty.svg" style={{width: '55%'}} alt="Pricing-Image" />
                            <h2 className='mt-3'>Free equity delivery</h2>
                            <p className='pt-3 text-muted'>All direct mutual fund investments are<br/> absolutely free — ₹ 0 commissions & DP<br/> charges.</p>
                        </div>
                    </div>
        </div>
     );
}

export default Hero;