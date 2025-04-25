import { useState } from 'react';
import Button from '../Button/Button';
import InputWithName from '../InputWithName/InputWithName';
import './PaymentMethod.css';
import service from '../../service/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PaymentMethod = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateExpirationDate = (date) => {
        const regex = /^\d{4}\/(0[1-9]|1[0-2])$/;
        return regex.test(date);
    };

    const handleOnClick = async () => {
        if (!name.trim()) {
            toast.error('El nombre no puede estar vacío');
            return;
        }

        if (!cardNumber.trim()) {
            toast.error('El número de tarjeta no puede estar vacío');
            return;
        }

        if (!cvv.trim()) {
            toast.error('El CVV no puede estar vacío');
            return;
        }

        if (!expirationDate.trim()) {
            toast.error('La fecha de expiración no puede estar vacía');
            return;
        }

        if (!validateExpirationDate(expirationDate)) {
            toast.error("Formato de fecha de expiración inválido. Use 'yyyy/MM'.");
            return;
        }

        setError('');

        try {
            await service.purchaseCart(cardNumber, expirationDate, cvv, name);
            toast.success('Compra realizada con éxito');
            navigate('/cart');
        } catch (error) {
            toast.error('Error al realizar la compra: ' + (error.message || 'Error desconocido'));
        }
    };

    return (
        <div className="paymentMethod">
            <p className="paymentMethodTitle">Elegí cómo pagar</p>
            <div className="inputsData">
                <InputWithName
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputWithName
                    name="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    type='number'
                />
                <InputWithName
                    name="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    type='number'
                />
                <InputWithName
                    name="Expiration date"
                    value={expirationDate}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="buttonShop">
                <Button text="Comprar" onClick={handleOnClick} />
            </div>
        </div>
    );
};

export default PaymentMethod;