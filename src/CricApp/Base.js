import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPage() {

    const navigate = useNavigate();
    const [view, setView] = useState(null); 
    const buttonStyle = {
        width: '400px',   
        height: '120px',  
        fontSize: '2rem'   
    };
    useEffect(() => 
    {
        if (view === 'History') {
        navigate('/history');  
        }
        if(view==='NewMatch'){
        navigate('/Home')
        }
        if(view==='International'){
        navigate('/International')
        }
    }, [view, navigate]);

  return (
    <div className=" align-items-center justify-content-center">
      {!view && (
        <>
          <button className="btn btn-primary mb-4" style={buttonStyle} onClick={() => setView('NewMatch')}>Start New Match</button> 
          <br/>
          <button className="btn btn-info mb-4" style={buttonStyle} onClick={() => setView('History')}>Go To Previous Matches</button>
          <br />
          <button className="btn btn-secondary" style={buttonStyle} onClick={() => setView('International')}>International Matches</button>
        </>
      )}
      {view === 'NewMatch'}
      {view === 'History'}
    </div>
  );
}
