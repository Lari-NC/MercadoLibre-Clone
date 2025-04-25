package org.tp1.dto

import model.Item

class ItemDTO (item: Item){
    var product = SimpleProductDTO(item.product)
    var amount = item.amount
}