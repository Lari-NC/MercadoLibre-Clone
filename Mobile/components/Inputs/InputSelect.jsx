import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import ChevronDown from '../../assets/icons/chevronDownIcon.svg';

const InputSelectUnits = ({ quantity, onChange }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const quantities = Array.from({ length: quantity }, (_, i) => i + 1);

    const handleValueChange = (value) => {
        setSelectedQuantity(value);
        onChange(value);
        setShowOptions(false); 
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => setShowOptions(true)}>
                <Text style={styles.text}>{selectedQuantity} units</Text>
                <View style={styles.chevronDown}>
                    <ChevronDown />
                </View>
            </TouchableOpacity>

            {showOptions && (
                <Modal transparent={true} animationType="fade" visible={showOptions}>
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setShowOptions(false)}
                    />
                    <View style={styles.modalContent}>
                        <Picker
                            selectedValue={selectedQuantity}
                            onValueChange={(value) => handleValueChange(value)}
                        >
                            {quantities.map((item) => (
                                <Picker.Item key={item} label={`${item} units`} value={item} />
                            ))}
                        </Picker>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        color: '#000000',
        textAlign: 'left',
        marginRight: 4,
    },
    chevronDown: {
        marginTop: 2,
        width: 12,
        height: 7,
        marginLeft: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000050',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 24,
        alignSelf: 'center',
        width: '100%',
    },
});

export default InputSelectUnits;