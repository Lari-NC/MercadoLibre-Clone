import Header from '../../components/Header/Header'
import './PageTemplate.css';
import { Outlet } from 'react-router-dom'

const PageTemplate = ({ isLoggedIn , setLoggedIn }) => {
    return (
        <div className="PageTemplate">
            <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default PageTemplate;