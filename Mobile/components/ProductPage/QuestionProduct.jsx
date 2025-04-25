import React, { useEffect, useState } from "react";
import SectionWithName from "./SectionWithName";
import { View, StyleSheet, TextInput, Text, TouchableWithoutFeedback } from "react-native";
import CustomButton from "../CustomButton";
import service from "../../service/Api";
import ArrowResponse from "../../assets/icons/arrowResponse.svg";
import {useAuthContext} from "../../hooks/AuthContext";
import Toast from 'react-native-toast-message';

const QuestionProduct = ({ product }) => {

    const {user} = useAuthContext();

    const [text, setText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [productOwnerId, setProductOwnerId] = useState("");
    const [answer, setAnswer] = useState('');
    const [answeringQuestionId, setAnsweringQuestionId] = useState(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setQuestions(Array.isArray(product.question) ? product.question : []);
                setProductOwnerId(product.owner.id)
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProduct();
    }, [product]);

    const askQuestion = async () => {
        try {
            await service.addQuestionProduct(product.id, text);
            setQuestions([...questions, { text, response: null, id: questions.length + 1 }]);
            setText('');
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Message sent successfully',
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error sending message',
                text2: 'Please log in to complete the operation.',
                visibilityTime: 3000,
            });
        }
    };
    

    const answerQuestion = async (questionId) => {
        try {
            await service.addAnswerProduct(product.id, answer, questionId);
            const updatedQuestions = questions.map((question) => {
                if (question.id === questionId) {
                    return { ...question, response: answer };
                }
                return question;
            });
            setQuestions(updatedQuestions);
            setAnswer('');
            setAnsweringQuestionId(null);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Answer sent successfully',
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error sending answer',
                text2: error.message || 'Unknown error',
                visibilityTime: 3000,
            });
        }
    };
    

    return (
        <SectionWithName title="Questions">
            <View style={styles.container}>
                <View style={styles.askContainer}>
                    <TextInput 
                        placeholder="Make a question"
                        style={styles.input}
                        value={text}
                        onChangeText={(text) => setText(text)} 
                    />
                    <View style={styles.buttonContainer}>
                        <CustomButton title="Ask" onPress={askQuestion} />
                    </View>
                </View>
                <Text style={styles.lastQuestions}>Last questions</Text>
                {error ? (
                    <Text style={styles.errorText}>Error: {error}</Text>
                ) : questions.length > 0 ? (
                    questions.map((item) => (
                        <View style={styles.questionItem} key={item.id}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (user?.id === productOwnerId && item.response === null) {
                                        setAnsweringQuestionId(item.id);
                                    }
                                }}
                            >
                                <Text style={styles.questionText}>{item.text}</Text>
                            </TouchableWithoutFeedback>
                            {item.response && (
                                <View style={styles.responseItem}>
                                    <ArrowResponse />
                                    <Text style={styles.responseText}>{item.response}</Text>
                                </View>
                            )}
                            {answeringQuestionId === item.id && (
                                <View style={styles.answerContainer}>
                                    <View style={styles.answerTop}>
                                        <ArrowResponse />
                                        <TextInput
                                            style={styles.inputAnswer}
                                            value={answer}
                                            onChangeText={(text) => setAnswer(text)}
                                            placeholder="Answer"
                                        />
                                    </View>
                                    <View style={styles.buttonAnswerContainer}>
                                        <CustomButton title="Answer" onPress={() => answerQuestion(item.id)} />
                                    </View>
                                </View>
                            )}
                        </View>
                    ))
                ) : (
                    <Text>No questions available</Text>
                )}
            </View>
        </SectionWithName>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderRadius: 2,
        height: 100,
        borderWidth: 1,
        borderColor: "#00000026",
        paddingHorizontal: 8,
    },
    buttonContainer: {
        width: 57,
        height: 34,
        alignSelf: "flex-end",
    },
    buttonAnswerContainer: {
        width: 82,
        height: 34,
        alignSelf: "flex-end",
    },
    inputContainer: {
        marginBottom: 16,
    },
    lastQuestions: {
        fontSize: 16,
        marginVertical: 8,
    },
    questionItem: {
        padding: 8,
        marginBottom: 8,
        gap: 12,
    },
    responseItem: {
        flexDirection: 'row',
        gap: 16,
        paddingLeft: 16,
    },
    questionText: {
        fontSize: 14,
    },
    responseText: {
        fontSize: 12,
        marginTop: 4,
        bottom: 3,
    },
    errorText: {
        color: "red",
        marginTop: 8,
    },
    inputAnswer: {
        flex: 1, 
        borderRadius: 2,
        width:'100%',
        height: 40,
        borderWidth: 1,
        borderColor: "#00000026",
        paddingHorizontal: 10,
    },
    answerContainer: {
        flexDirection: 'column',
        gap: 16,
    },
    answerTop: {
        flexDirection: 'row',
        gap: 16,
        paddingLeft: 16,
    },
    askContainer: {
        height: 140,
        gap: 10,
    }
});

export default QuestionProduct;