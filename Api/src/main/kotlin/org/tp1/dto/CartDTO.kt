package org.tp1.dto

import model.Cart

class CartDTO (cart: Cart) {
    var user = SimpleUserDTO(cart.user)
    var items = cart.items.map { ItemDTO(it) }
}
