import React from "react";
import './UserPageWithU.css'
import Avatar from '../../components/Avatar/Avatar'
import image from '../../assets/images/avatarImage.svg'
import BasicButton from '../../components/Button/BasicButton';
import Button from '../../components/Button/Button';
import UserNav from '../../components/UserNav/UserNav';
import { Link, useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import service from '../../service/Api'

const UserPageWithU = ({setLoggedIn, isLoggedIn}) => {
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await service.getUser();
                setUserName(user.name);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []); 

    const navigate = useNavigate();

    const clean = () => {
        localStorage.clear();
        setUserName('');
        setLoggedIn(false);
        navigate('/login');
    }

    return (
        <>
            <div className="avatar-container">
                <Avatar name={userName || 'Usuario'} image={image} />
                <div className="button-group">
                    <Link to="/newProduct">
                        <BasicButton text="+ Agregar producto" />
                    </Link>
                        <Button text="LogOut" onClick={clean}/>
                </div>
            </div>
            <div className="menu">
                <UserNav isLoggedIn={isLoggedIn}/>
            </div>
        </>
    );
};

export default UserPageWithU;