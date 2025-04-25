import { useState } from 'react';
import Button from '../Button/Button';
import InputWithName from '../InputWithName/InputWithName';
import registerService from '../../service/Api';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');

        try {
            const { token, user } = await registerService.register(name, email, password, image);
            toast.success('Usuario registrado:', user);
            localStorage.setItem('token', token);
        } catch (err) {
            setError('Credenciales inválidas, intenta nuevamente.');
            toast.error('Error en el register:' + (error.message || "Error desconocido"));
        }
    }

    return (
        <div className="RegisterForm">
            <h2>Register</h2>
            <InputWithName name="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <InputWithName name="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputWithName name="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <InputWithName name="Image" value={image} onChange={(e) => setImage(e.target.value)}/>
            {error && <p className="error-message">{error}</p>}
            <Link to="/login">
                <Button text="Create account" onClick={handleRegister} />
            </Link>
        </div>
    );
};

export default RegisterForm;