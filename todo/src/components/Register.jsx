import { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
const Register = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            //alert('Form data submitted' + JSON.stringify(formData));
            fetch('https://api.restful-api.dev/objects', {
                method: 'POST',
                body: JSON.stringify({
                    "name": formData.email,
                    //password: formData.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            ).then(async (res) => {
                if (res.ok) {
                    setMessage({ text: 'User Saved Successfully!', type: 'success' });
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                    });
                    return await res.json();
                } else {
                    const data = await res.json();
                    setMessage({ text: data.error.message, type: 'error' });
                    console.log(data.error.message);
                }
            }).catch((error) => {
                setMessage({ text: 'An error occurred. Please try again later. ' + error, type: 'error' });
            });
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateForm = () => {
        const formErrors = {};
        if (!formData.firstName) {
            formErrors.firstName = 'First name is required';
        } else if (formData.firstName.length < 4) {
            formErrors.firstName = 'First name should be atleast 4 characters';
        }

        if (!formData.lastName) {
            formErrors.lastName = 'Last name is required';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        }

        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email is not valid';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <div className="input-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName"
                        value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName"
                        value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password"
                        value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <button type="submit" className="submit-btn">Submit</button>&nbsp;
                <Link to="/login" className="login-btn">Login</Link>
            </form>

            {/* Display the message conditionally */}
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default Register;