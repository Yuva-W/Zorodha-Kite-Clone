import React from 'react';

function Team() {
    return ( 
        <div className="container  p-5">
                <h1 className='text-center fs-1'>People</h1>
            <div className="row  mt-5">
                <div className="col mt-5 p-4">
                    <div style={{width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
                        <img src='media/images/nithinKamath.jpg' alt="Nithin Kamath" className="img-fluid" style={{borderRadius: '100%', width: '59%',}}/>
                    </div>
                    <h3 className='mt-3 text-center'>Nithin Kamath</h3>
                    <h4 className='text-center' >Founder, CEO</h4>
                </div>
                <div className="col mt-5 p-4 m-4"  style={{lineHeight: '2.0', fontSize: '1rem'}}>
                    <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
                    <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
                    <p>Playing basketball is his zen.</p>
                    <p>Connect on <a href="#" style={{textDecoration: 'none'}}>Homepage</a> / <a href="#" style={{textDecoration: 'none'}}>TradingQnA</a> / <a href="#" style={{textDecoration: 'none'}}>Twitter</a></p>
                </div>

            </div>
            
        </div>
     );
}

export default Team;