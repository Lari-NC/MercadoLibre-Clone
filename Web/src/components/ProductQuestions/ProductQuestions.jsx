import './ProductQuestions.css';
import InputPlaceholder from '../InputPlaceholder/InputQuestion';
import Button from '../Button/Button';
import service from '../../service/Api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import arrowResponse from '../../assets/icons/arrowResponse.svg';

const ProductQuestionsWithoutQ = ({ isLoggedIn }) => {
    const { id } = useParams();
    const [text, setText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [answer, setAnswer] = useState('');
    const [answeringQuestionId, setAnsweringQuestionId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [productOwnerId, setProductOwnerId] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await service.getProductByID(id);
                setQuestions(Array.isArray(productData.question) ? productData.question : []);
                setProductOwnerId(productData.owner.id);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchUser = async () => {
            if(isLoggedIn) {
                try {
                    const userData = await service.getUser();
                    setUserId(userData.id);
                } catch (err) {
                    toast.error('Error al obtener el usuario');
                }
            }
        };

        fetchProduct();
        fetchUser();
    }, [id]);

    const askQuestion = async () => {
        if(isLoggedIn) {
            try {
                await service.addQuestionProduct(id, text);
                setQuestions([...questions, { text, response: null, id: questions.length + 1 }]);
                setText('');
                toast.success('Pregunta enviada con éxito');
            } catch (error) {
                toast.error('Error al enviar la pregunta');
            }
        } else {
            toast.error('Iniciar sesión para poder preguntar');
        }
    };

    const answerQuestion = async (questionId) => {
        try {
            await service.addAnswerProduct(id, answer, questionId);
            const updatedQuestions = questions.map((question) => {
                if (question.id === questionId) {
                    return { ...question, response: answer };
                }
                return question;
            });
            setQuestions(updatedQuestions);
            setAnswer('');
            setAnsweringQuestionId(null);
            toast.success('Respuesta enviada con éxito');
        } catch (error) {
            toast.error('Error al enviar la respuesta: ' + (error.message || "Error desconocido"));
        }
    };

    return (
        <div className="ProductQuestionsWithoutQ">
            <h1>Preguntas</h1>
            <div className='horizontal-line'></div>
            <div className='q-box'>
                <div className='your-q'>
                    <InputPlaceholder value={text} onChange={(e) => setText(e.target.value)} />
                    <Button text="Preguntar" onClick={askQuestion}></Button>
                </div>
                <div className='qs'>
                    <p className='lq'>Últimas preguntas</p>
                    <div className='qs-box'>
                        {questions.length > 0 ? (
                            questions.map((question) => (
                                <div key={question.id} className='question-block'>
                                    <p 
                                        className='nq' 
                                        onClick={() => {
                                           
                                            if (userId === productOwnerId && question.response === null) {
                                                setAnsweringQuestionId(question.id);
                                            }
                                        }}
                                    >
                                        {question.text}
                                    </p>
                                    {question.response && (
                                        <p className='response'>
                                            <img src={arrowResponse} className='arrow-response' />
                                            {question.response}
                                        </p>
                                    )}
                                    {answeringQuestionId === question.id && (
                                        <div className='answer-question-product'>
                                            <img src={arrowResponse} className='arrow-response' />
                                            <input className='input-answer'
                                                value={answer} 
                                                onChange={(e) => setAnswer(e.target.value)} 
                                                placeholder="Answer" 
                                            />
                                            <Button text="Responder" onClick={() => answerQuestion(question.id)} />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className='nq'>Este producto no tiene preguntas</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuestionsWithoutQ;