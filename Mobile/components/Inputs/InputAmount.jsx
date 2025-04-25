import InputSelect from './InputSelect';
import { View, Text, StyleSheet } from 'react-native';

const InputAmount = ({ quantity, onChange }) => {
    return (
            <View style={styles.container}>
                <View style={styles.input}>
                    <Text style={styles.text}>Amount: </Text>
                    <InputSelect quantity={quantity} onChange={onChange}/>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({ 
    container:{
        width: '100%',
        height: 40,
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 4,
        backgroundColor: '#E7E7E7',
        borderColor: '#00000040',
        borderWidth: 1,
        borderRadius: 8,
        zIndex: 10,
    },
    text:{
        fontSize: 14,
        textAlign: 'left',
    },
    input: {
        gap: 4,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
    }
});

export default InputAmount