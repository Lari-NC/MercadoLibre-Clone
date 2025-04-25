package org.tp1.controller

import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.CategoryException
import org.tp1.dto.PageDTO
import service.MercadoLibreService

class CategoryController(private val mercadoLibreService: MercadoLibreService) {

    fun getCategories(ctx: Context) {
        val categories = mercadoLibreService.getAllCategories()
        ctx.json(categories)
    }

    fun getCategoryByID(ctx: Context) {
        val id = ctx.pathParam("id")
        val page = (ctx.queryParam("page")?.toIntOrNull() ?: 1).coerceAtLeast(1)
        try {
            val productsByCategory = mercadoLibreService.getProductsByCategory(id,page)
            ctx.json(PageDTO(productsByCategory))
        } catch (ex: CategoryException) {
            throw NotFoundResponse("Category not found")
        }
    }
}