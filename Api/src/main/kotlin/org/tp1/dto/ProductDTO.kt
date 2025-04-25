package org.tp1.dto

import model.Product

class ProductDTO (product: Product) {
    var id = product.id
    var owner = SimpleUserDTO(product.owner)
    var title = product.title
    var description = product.description
    var images = product.images
    var stock = product.stock
    var price = product.price
    var shipping = product.shipping
    var characteristics = product.characteristics
    var category = product.category
    var question = product.questions.map {QuestionDTO(it)}
}

class SimpleProductDTO (product: Product) {
    var id = product.id
    var title = product.title
    var description = product.description
    var price = product.price
    var images = product.images
    var category = product.category.name
    var owner = SimpleUserDTO(product.owner)
    var shipping = product.shipping.price
}
