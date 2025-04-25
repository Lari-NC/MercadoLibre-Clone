package org.tp1.dto

import model.PurchaseHistory
import java.time.format.DateTimeFormatter

class PurchaseHistoryDTO(purchaseHistory: PurchaseHistory) {
    var items = purchaseHistory.items.map { ItemDTO(it) }
    var payment = PaymentDTO(purchaseHistory.payment)
    var date: String

    init {
        val formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd")
        date = purchaseHistory.date.format(formatter)
    }
}