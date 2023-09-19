import React, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        if(user != null) {
            navigate('/');
        }
    }, [user, navigate]);


    return (
        <div className="App">
          <div className="signin-container">
            <h1>Welcome to EmotiChat</h1>
            <p>Sign in to get started!</p>
            <button onClick={handleGoogleSignIn} type="button" className="login-with-google-btn">
              Sign in with Google
            </button>
          </div>
        </div>
      );
      
};

export default Login;