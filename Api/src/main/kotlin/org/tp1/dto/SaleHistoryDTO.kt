package org.tp1.dto

import model.SaleHistory
import java.time.format.DateTimeFormatter

class SaleHistoryDTO(saleHistory: SaleHistory) {
    var product = SimpleProductDTO(saleHistory.product)
    var amount = saleHistory.amount
    var payment = PaymentDTO(saleHistory.payment)
    var date: String
    var user = SimpleUserDTO(saleHistory.user)

    init {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        date = saleHistory.date.format(formatter)
    }
}