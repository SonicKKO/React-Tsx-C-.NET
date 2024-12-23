import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/pages/Register.css";

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState<FormValues>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!values.username.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!values.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!values.password) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!values.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (values.confirmPassword !== values.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit  = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('усе добра', values);
            try {
                await axios.post('http://localhost:5190/api/Auth/register', values);
                navigate('/shop')
                // const response = await axios.post('http://localhost:5190/api/User/register', values);
                // console.log('еть же');
            } catch(error) {
                console.log('nonono', error);
            }
        }
    };

    return (
        <div className='register-container'>
            <hr />
            <div className="inf">
                <p>REGISTER FORM</p>
                <p>Please, fill in the fields</p>                   
                <hr />
            </div>
         
            <form onSubmit={handleSubmit}>
                <label>
                    <b>NAME</b>
                    <input 
                        type="text"
                        name="username"
                        value={values.username} 
                        onChange={handleChange}
                    />       
                    {errors.name && <p className="error">{ errors.name }</p>}         
                </label>

                <label>
                    <b>EMAIL</b>
                    <input 
                        type="text" 
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{ errors.email }</p>}
                </label>

                <label>
                    <b>PASSWORD</b>
                    <div className="password-input">
                        <input 
                         type={showPassword ? "password" : "text"} 
                            name="password" 
                            value={values.password}
                            onChange={handleChange}
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🔒" : "🔓"}
                        </button>                        
                    </div>
                    {errors.password && <p className="error">{ errors.password }</p>}
                </label>

                <label>
                    <b>CONFIRM PASSWORD</b>
                    <input 
                        type={showPassword ? "password" : "text"} 
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error">{ errors.confirmPassword }</p>}
                </label>

                <button type="submit" className="submit-button">CREATE</button>
            </form>

            <hr />
        </div>
    );
};

export default Register;
