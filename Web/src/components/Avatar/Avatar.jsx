import './Avatar.css';

const Avatar = ({image, name}) => {
    return (
        <div className="Avatar">
            <div className="avatar-img">
                <img src={image} alt="userImage"></img>
            </div>
            <span className="avatar-name">{name}</span>
        </div>
    );
};

export default Avatar;