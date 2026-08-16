import React from 'react';

function Award() {
    return ( 
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 ">
                    <img src="media\images\largestBroker.svg" alt="Largest-Broker" className='mb-5 p-5'/>
                </div>
                <div className="col-6 mt-5"> 
                    <h1 className='mt-5'>Largest Broker</h1>
                    <p>We are the largest broker in India with over 10 million customers and 2 million trades executed daily.</p>

                    <div className="row mt-5">
                        <div className="col-6">
                            <ul>
                                <li>Futures and Options</li>
                                <li>Commodities derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>

                        <div className="col-6">
                            <ul>
                                <li>Stocks and IPOs</li>
                                <li>Direct mutual funds</li>
                                <li>Bonds and Government securities</li>
                            </ul>
                        </div>
                    </div>
                    <img src='media\images\pressLogos.png' style={{width: '94%'}} alt='Press-Logos' className='mt-5'/>
                </div>
            </div>
        </div>
     );
}

export default Award;