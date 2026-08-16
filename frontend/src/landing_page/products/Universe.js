import React from 'react';

function Universe() {
    return ( 
        <div className="container p-5"> 
            <div className="row text-center">
                <h4>Want to know more about our technology stack? Check out the <a href="#" style={{textDecoration: 'none'}}>Zerodha.tech</a> blog.</h4>
                <h1 className='mt-5'>The Zerodha Universe</h1>
                <p className='mt-2 text-muted'>Extend your trading and investment experience even further with our partner platforms.</p>

                <div className='row p-3 mt-3'>
                    <div className='col-4 p-3'>
                        <img src='media\images\smallcaseLogo.png' style={{width:'80%'}}/>
                        <p className='text-small mt-3 text-muted'>Thematic investing platformthat helps you invest in diversifiedbaskets of stocks on ETFs.</p>
                    </div>
                    <div className='col-4 p-3'>
                        <img src='media\images\sensibullLogo.svg' style={{width:'80%'}}/>
                        <p className='text-small mt-3 text-muted'>Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.
</p>
                    </div>
                    <div className='col-4 p-3'>
                        <img src='media\images\streakLogo.png' style={{width:'60%'}}/>
                        <p className='text-small mt-3 text-muted'>Systematic trading platform that allows you to create and backtest strategies without coding.
</p>
                    </div>
                </div>
                <div className='row p-3 mt-3'>
                    <div className='col-4 p-3'>
                        <img src='media\images\zerodhaFundhouse.png' style={{width:'60%'}}/>
                        <p className='text-small mt-3 text-muted'>Our asset management venture that is creating simple and transparent index funds to help you save for your goals.
</p>
                    </div>
                    <div className='col-4 p-3'>
                        <img src='media\images\goldenpiLogo.png' style={{width:'60%'}}/>
                        <p className='text-small mt-3 text-muted'>Investment research platform that offers detailed insights on stocks,sectors, supply chains, and more.
</p>
                    </div>
                    <div className='col-4 p-3'>
                        <img src='media\images\dittoLogo.png' style={{width:'40%'}}/>
                        <p className='text-small mt-3 text-muted'>Personalized advice on life and health insurance. No spam and no mis-selling.</p>
                    </div>
                </div>

                <button className='btn btn-primary mt-4 p-2 fs-5' style={{ width: '20%', margin: '0 auto' }}>Sign Up for free</button>
            </div>
        </div>
     );
}

export default Universe;