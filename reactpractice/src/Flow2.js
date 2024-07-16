import React, { useState, useContext, createContext } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom'
import nyan from './nyan-cat-rainbow.gif'
import nyanSound from './nyan-cat_1.mp3'

const UserContext = createContext({
    state: false,
    onLogin: () => {},
    onLogout: () => {},
});

function Login() { // pretend this is a different page
    const ctx = useContext(UserContext);
    const loggedIn = ctx.state;
    const createUser = ctx.onLogin;

    if (loggedIn) {
        console.log("already logged in");
        return null;
    }

    return(
            <>

                    <div>
                    <h1>Login</h1>
                    { <GoogleLogin
                    onSuccess={credentialResponse => {
                    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                        console.log('Start of credential Response!');
                        console.log(credentialResponseDecoded);
                    createUser();
                        // send this into some sort of database

                    }

                }

                    onError={() => {
                    console.log('Login Failed')
                    }}
                /> }
                
                    </div>
            </>
    );
}

function MainPage() { // pretend this is a different page 
    const ctx = useContext(UserContext);
    const loggedIn = ctx.state;
    const removeUser = ctx.onLogout;

    if (!loggedIn) {
        console.log("Please login");
        <Navigate to="/" replace={true} />
        return null;
    }
    return (<>  
                        <h2> Congrats, you've logged in! </h2>
                        <button className='gsi-material-button' onClick={() => new Audio(nyanSound).play()}> Click Me! </button> 
                        <img src={nyan}
                        alt="nyan cat" height={200} width={300} />

                        <button onClick={() => removeUser() }> Log Out </button>
    </>);

}


export default function Display() { // pretend this is the landing page 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => { setIsLoggedIn(true) };

    const handleLogout = () => {
        googleLogout();
        setIsLoggedIn(false);
        console.log("logging out");
    }

    const userCtx = {
        state: isLoggedIn,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <>
        <UserContext.Provider value={userCtx}>
        <div>
                {/* {user && (
                    <Navigate to="app/" replace={true} />
                )} */}

                {/* {!(myUser) && (
                <Navigate to="/" replace={true} />
                )} */}
                {console.log(useContext(UserContext).state)}
                <MainPage> </MainPage>


                <Login > </Login>

                                      
        </div>
        </UserContext.Provider>
        </>
    ) // end of return


}