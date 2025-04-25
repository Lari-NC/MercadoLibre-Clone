package org.tp1.dto

import model.Product
import utilities.Page

class PageDTO (page: Page<Product>) {
    var products = page.items.map {SimpleProductDTO(it)}
    var currentPage = page.currentPage
    var amountOfPages = page.amountOfPages
    var amountOfElements = page.amountOfElements
}
