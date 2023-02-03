import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
    userName:''
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    const storedUserName = localStorage.getItem('userName');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userName');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
        userName: storedUserName
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    let user;
    if (tokenData) {
        initialToken = tokenData.token;
        user = tokenData.userName;
    }
    const [token, setToken] = useState(initialToken);
    const [userName, setUserName] = useState(user);
    const userIsLoggedIn = !!token; // string not empty true, else false
    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserName(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userName');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime, enteredUserName) => {
        setToken(token);
        setUserName(enteredUserName);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userName', enteredUserName);
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
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