package org.tp1.dto

import model.Payment
import java.time.format.DateTimeFormatter

class PaymentDTO(payment: Payment) {
    var name = payment.name
    var cardNumber = payment.cardNumber
    var cvv = payment.cvv
    var expirationDate: String

    init {
        val formatter = DateTimeFormatter.ofPattern("yyyy/MM")
        expirationDate = payment.expirationDate.format(formatter)
    }
}