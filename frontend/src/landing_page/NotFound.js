import React from 'react';

function NotFound() {
    return ( 
        <div className="container p-5"> 
            <div className="row">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p className='mt-3 text-muted'>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <button className='btn btn-primary mt-3 p-2 fs-5' style={{ width: '20%' }}>Go Back Home</button>
            </div>
        </div>
     );
}

export default NotFound;