import './Pagination.css';
import leftArrowIcon from '../../assets/icons/leftArrowIcon.svg';
import rightArrowIcon from '../../assets/icons/rightArrowIcon.svg';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="Pagination">
        <button 
            onClick={goToPreviousPage} 
            className="Pagination-button" 
            disabled={currentPage === 1}
        >
            <img src={leftArrowIcon} alt="Previous" />
        </button>
        <span className="Pagination-text">
            {currentPage} de {totalPages}
        </span>
        <button 
            onClick={goToNextPage} 
            className="Pagination-button" 
            disabled={currentPage === totalPages}
        >
            <img src={rightArrowIcon} alt="Next" />
        </button>
    </div>
    );
};


export default Pagination;