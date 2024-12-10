import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
    userName:''
});


const retrieveStoredToken = () => {
    const storedUserName = localStorage.getItem('userName');
    return {
        userName: storedUserName
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let user;
    if (tokenData) {
        user = tokenData.userName;
    }
    const [userName, setUserName] = useState(user);
    const userIsLoggedIn = !!userName; // string not empty true, else false
    const logoutHandler = useCallback(() => {
        setUserName(null);
        localStorage.removeItem('userName');
    }, []);

    const loginHandler = (enteredUserName) => {
        setUserName(enteredUserName);
        localStorage.setItem('userName', enteredUserName);
    };

    useEffect(() => {
        if (tokenData) {
            //logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        userName: userName
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;