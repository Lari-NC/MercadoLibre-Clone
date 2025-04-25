import './InputQuestion.css';

const InputQuestion = ({ value, onChange }) => {
    return (
        <textarea
            className="InputQuestion"
            value={value}
            onChange={onChange}
            placeholder="Placeholder..."
        />
    );
};

export default InputQuestion;