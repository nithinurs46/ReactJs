import { Form, useNavigation, useNavigate } from "react-router-dom";
import classes from './Login.module.css';
import { useContext } from "react";
import AuthContext from "../context/auth-context";

const Login = () => {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isSubmitting = navigation.state === 'submitting';
    const authCtx = useContext(AuthContext);

    const handleRegistration = (e) => {
        e.preventDefault();
        navigate('/register');
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (email && password) {
            authCtx.login(email);
            //return redirect('/home');
            navigate('/home', { replace: true });
        } else {
            alert("Invalid username or password");
        }
    }

    return (
        <>
            <Form method="post" className={classes.form} onSubmit={handleLogin}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" required />
                </p>
                <div className={classes.actions}>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Login'}
                    </button>
                    <button type="button" onClick={handleRegistration}>
                        Register
                    </button>
                </div>
            </Form>
        </>
    );
}

export default Login;