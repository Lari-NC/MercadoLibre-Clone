package org.tp1.controller

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import io.javalin.http.UnauthorizedResponse
import model.*
import org.tp1.body.ProductBody
import org.tp1.body.QuestionBody
import org.tp1.dto.*
import service.MercadoLibreService

class ProductController(private val mercadoLibreService : MercadoLibreService) {

    fun getUserProducts(ctx: Context) {
        val id = ctx.pathParam("id")
        val page = (ctx.queryParam("page")?.toIntOrNull() ?: 1).coerceAtLeast(1)
        try {
            val products = mercadoLibreService.getProductsByUser(id,page)
            ctx.json(PageDTO(products))
        }
        catch (ex: UserException) {
            throw NotFoundResponse("User not found")
        }
    }

    fun getAllProducts(ctx: Context) {
        val page = (ctx.queryParam("page")?.toIntOrNull() ?: 1).coerceAtLeast(1)
        ctx.json(PageDTO(mercadoLibreService.getAllProducts(page)))
    }

    fun createProduct(ctx: Context) {
        val user = user(ctx)
        val productBody = ctx.bodyValidator(ProductBody::class.java)
            .check({it.price > 0}, "Price must be over 0")
            .check({it.shipping.price > 0}, "Shipping price must be over 0")
            .check({it.title.isNotBlank()}, "Title cannot be blank")
            .check({it.description.isNotBlank()}, "Description cannot be blank")
            .check({it.stock > 0}, "Stock must be over 0")
            .check({it.images.isNotEmpty()}, "Images cannot be empty")
            .getOrThrow { throw BadRequestResponse("Invalid data creation") }
        try {
            val category = mercadoLibreService.getCategory(productBody.categoryId)
            val draftProduct = DraftProduct(
                productBody.title,
                productBody.description,
                productBody.price,
                productBody.images,
                productBody.stock,
                productBody.shipping,
                productBody.characteristics,
                category
            )
            val product =  mercadoLibreService.addProduct(user.id, draftProduct)
            ctx.json(ProductDTO(product))
        } catch (ex : CategoryException) {
            throw NotFoundResponse("Category not found")
        }

    }

    fun getProductByID(ctx: Context) {
        val id = ctx.pathParam("id")
        try {
            val product = mercadoLibreService.getProduct(id)
            ctx.json(ProductDTO(product))
        } catch (ex: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }

    fun updateProduct(ctx: Context) {
        val user = user(ctx)
        val productBody = ctx.bodyValidator(ProductBody::class.java)
            .check({it.price > 0}, "Price must be over 0")
            .check({it.shipping.price > 0}, "Shipping price must be over 0")
            .check({it.description.isNotBlank()}, "Description cannot be blank")
            .check({it.stock > 0}, "Stock must be over 0")
            .check({it.title.isNotBlank()}, "Title cannot be blank")
            .check({it.images.isNotEmpty()}, "Images cannot be empty")
            .getOrThrow { throw BadRequestResponse("Invalid data") }
        val productId = ctx.pathParam("id")

        try {
            val draftProduct = DraftProduct(
                productBody.title,
                productBody.description,
                productBody.price,
                productBody.images,
                productBody.stock,
                productBody.shipping,
                productBody.characteristics,
                mercadoLibreService.getCategory(productBody.categoryId)
            )
            val product = mercadoLibreService.editProduct(user.id, productId, draftProduct)
            ctx.json(ProductDTO(product))
        } catch (ex: CategoryException) {
            throw NotFoundResponse("Category not found")
        } catch (ex: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }

    fun getRelatedProducts(ctx: Context) {
        val id = ctx.pathParam("id")
        try {
            val products = mercadoLibreService.getRelatedProducts(id)
            ctx.json(products.map { ProductDTO(it) })
        } catch (ex: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }

    fun likeProduct(ctx: Context) {
        val user = user(ctx)
        val productId = ctx.pathParam("id")
        try {
            val updateUserWithLikedProducts = mercadoLibreService.toggleLike(user.id, productId)
            ctx.json(UserDTO(updateUserWithLikedProducts))
        } catch (ex: ProductException) {
            throw NotFoundResponse("Product not found")
        }
    }

    fun addProductQuestion(ctx: Context) {
        val user = user(ctx)
        val productId = ctx.pathParam("id")
        val questionBody = ctx.bodyValidator(QuestionBody::class.java)
            .check({it.text.isNotBlank()}, "Title cannot be blank")
            .getOrThrow { throw BadRequestResponse("Invalid data") }
        try {
            val productWithQuestion = mercadoLibreService.addQuestion(user.id, productId, questionBody.text)
            ctx.json(ProductDTO(productWithQuestion))
        } catch (ex: ProductException) {
            throw NotFoundResponse("Product not found")
        } catch (ex: QuestionException) {
            throw BadRequestResponse("Invalid comment data or try to comment on your own product")
        }
    }

    fun searchProducts(ctx: Context) {
        val text = ctx.queryParam("query") ?: throw BadRequestResponse("Missing query parameter")
        val page = (ctx.queryParam("page") ?.toIntOrNull() ?: 1).coerceAtLeast(1)
        try {
            val newPage = mercadoLibreService.searchProducts(text, page)
            ctx.json(PageDTO(newPage))
        } catch (ex: Exception) {
            throw BadRequestResponse("Invalid page number")
        }
    }

    fun addAnswerOfQuestion(ctx: Context) {
        val user = user(ctx)
        val productId = ctx.pathParam("id")
        val questionId = ctx.pathParam("questionId")
        val answerBody = ctx.bodyValidator(QuestionBody::class.java)
            .check({it.text.isNotBlank()}, "Title cannot be blank")
            .getOrThrow { throw BadRequestResponse("Invalid data") }
        try {
            val productWithAnswer = mercadoLibreService.addAnswer(user.id, productId, questionId, answerBody.text)
            ctx.json(ProductDTO(productWithAnswer))
        } catch (ex: ProductException) {
            throw NotFoundResponse("Comment not found")
        } catch (ex: QuestionException) {
            throw BadRequestResponse("Invalid comment data or user is not the owner of the product")
        }
    }
}
