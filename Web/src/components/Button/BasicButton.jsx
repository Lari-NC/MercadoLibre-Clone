import './BasicButton.css'

const BasicButton = ({text, onClick}) => {
    return (
        <button className="BasicButton" onClick={onClick}>{text}</button> 
    );
}

export default BasicButton; 