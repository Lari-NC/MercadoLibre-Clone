import React, { useState } from 'react';
import BasicButton from '../Button/BasicButton';
import Button from '../Button/Button';
import InputWithName from '../InputWithName/InputWithName';
import loginService from '../../service/Api';
import './LoginForm.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({setLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleLogin = async () => {
        setError('');
        try {
            const user = await loginService.login(email, password);
            setLoggedIn(true);
            toast.success('Usuario logueado', user);
            navigate("/")
        } catch (err) {
            setError('Credenciales inválidas, intenta nuevamente.');
            toast.error('Error en el login: credenciales incorrectas');
        }
    };

    return (
        <div className="LoginForm">
            <h2>Login</h2>
            <InputWithName
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputWithName
                name="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
                <Button text="Login" onClick={handleLogin} />
            <Link to="/register">
                <BasicButton text="Create new Account" />
            </Link>
        </div>
    );
};

export default LoginForm;