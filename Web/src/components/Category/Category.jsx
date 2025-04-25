import './Category.css';

const Category = ({ icon, text }) => {
    return (
        <div className="Category">
            <img src={icon} alt="Category Icon" className="category-icon" />
            <p className='name'>{text}</p>
        </div>
    );
};

export default Category;