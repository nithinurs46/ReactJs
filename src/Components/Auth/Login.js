import { useNavigate, NavLink  } from "react-router-dom";
import './Login.css';
import useInput from '..//..//hooks/use-input';
import { useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Spinner from 'react-bootstrap/Spinner';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');
const passwordVal = (value) => isNotEmpty && value.length>=8;

const LoginComponent =(props)=>{
  const apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=<ENTER_KEY_HERE>';
  const [isLoading, setIsLoading] = useState(false);
  const {
    value: enteredUserName,
    isValid: enteredUserNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserName,
  } = useInput(isNotEmpty);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(passwordVal);


  let formIsValid = false;

  if (enteredUserNameIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }
  const authCtx = useContext(AuthContext);

  const [saveMsg, setSaveMsg] = useState('');
  const SubmitFormHandler = (event) => {
    
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setIsLoading(true);
    resetUserName();
    resetPassword();
    
    fetch(apiUrl, {
      method: 'POST',
      body : JSON.stringify({
        email: enteredUserName,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers:({
        'Content-Type': 'application/json',
      })
    }).then(async (res) => {
      if(res.ok){
        //navigate('/dashboard', {replace: true}); replaces history, cannot go back
        //navigate('/dashboard', {state:{username:enteredUserName}});
        return await res.json();
      } else {
        const data = await res.json();
        setSaveMsg(data.error.message);
        setIsLoading(false);
        throw new Error(saveMsg);
      }
    })
    .then((data) => {
      const expirationTime = new Date(
        new Date().getTime() + (+data.expiresIn * 1000)
      );
      authCtx.login(data.idToken, expirationTime.toISOString(), enteredUserName);
      setIsLoading(false);
      navigate('/dashboard', {state:{username:enteredUserName}, replace:true});
    })
    .catch((err) => {
      console.log(err.message);
    });

    
  };
  const nameInputClasses = userNameHasError
  ? 'form-control invalid'
  : 'form-control';

const passwordInputClasses = passwordHasError
  ? 'form-control invalid'
  : 'form-control';
  const navigate = useNavigate();


  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={SubmitFormHandler}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className={nameInputClasses}>
            <label>User Name</label>
            <input
              id='name'
              type="text"
              className="form-control mt-1"
              placeholder="Enter user name"
              onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
          value={enteredUserName}
            />
            {userNameHasError && (
          <p className='error-text'>Name must not be empty.</p>
        )}
          </div>
          <div className={passwordInputClasses}>
            <label>Password</label>
            <input
              id='password'
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
            />
             {passwordHasError && (
          <p className='error-text'>Please enter a valid password.</p>
        )}
          </div>
          { (
          <p className='error-text'>{saveMsg}</p>
        )}
          <br />
          <div className="d-grid gap-2 mt-6">
            {!isLoading &&
            <button disabled={!formIsValid}type="submit" className="btn btn-primary">
              Login
            </button>}
            {isLoading &&
            <button className="btn btn-primary">
              <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
            </button>}
            {/*<button type="button" className="btn btn-primary" 
              onClick={() => navigate("/signup")}>
              SignUp
             </button>*/}
            <p>New User? <NavLink to="/signup" >
            SignUp
            </NavLink></p>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
};

export default LoginComponent;
