package org.tp1.dto

import model.User

class UserDTO (user: User) {
    var id = user.id
    var name =  user.name
    var email = user.email
    var image = user.image
    var purchaseHistory = user.purchaseHistory.map{PurchaseHistoryDTO(it)}
    var products = user.products.map{SimpleProductDTO(it)}
    var likedProducts = user.likedProducts.map{SimpleProductDTO(it)}
    var salesHistory = user.salesHistory.map{SaleHistoryDTO(it)}
}

class SimpleUserDTO (user : User) {
    var id = user.id
    var name = user.name
    var email = user.email
    var image = user.image
}