package org.tp1.body

import model.Characteristic
import model.Shipping

class ProductBody (var title: String, var description: String, var price: Double,
                   var images: MutableList<String>, var stock: Int, var shipping: Shipping,
                   var characteristics: MutableList<Characteristic>, var categoryId: String)