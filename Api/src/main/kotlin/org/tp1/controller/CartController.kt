package org.tp1.controller

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import model.*
import org.tp1.body.CartBody
import org.tp1.body.PaymentBody
import org.tp1.dto.*
import service.MercadoLibreService
import java.time.DateTimeException
import java.time.LocalDateTime
import java.time.YearMonth
import java.time.format.DateTimeFormatter

class CartController(private val mercadoLibreService: MercadoLibreService) {

    fun getCart(ctx: Context) {
        val user = user(ctx)
        val cart = mercadoLibreService.getCart(user.id)
        ctx.json(CartDTO(cart))
    }

    fun addProductToCart(ctx: Context) {
        val user = user(ctx)
        val cartBody = ctx.bodyAsClass(CartBody::class.java)
        try {
            val cart = mercadoLibreService.updateItemCart(user.id, cartBody.productId, cartBody.amount)
            ctx.json(CartDTO(cart))
        }
        catch (ex: ProductException) {
            throw BadRequestResponse("Invalid product data or insufficient stock")
        }
    }

    fun removeProductFromCart(ctx: Context) {
        val user = user(ctx)
        try {
            val productId = ctx.pathParam("id")
            val newCart = mercadoLibreService.deleteItemFromCart(user.id, productId)
            ctx.json(CartDTO(newCart))
        } catch(ex: ProductException) {
            throw NotFoundResponse ("Product not found")
        }
    }

    fun purchaseCart(ctx: Context) {
        val user = user(ctx)
        val paymentBody = ctx.bodyValidator(PaymentBody::class.java)
            .check({it.cardNumber.isNotBlank()}, "Card number cannot be blank")
            .check({it.expirationDate.isNotBlank()}, "Expiration date cannot be blank")
            .check({it.cvv.isNotBlank()}, "Card CVV cannot be blank")
            .check({it.name.isNotBlank()}, "Name cannot be blank")
            .getOrThrow {
                throw BadRequestResponse("Invalid payment data")
            }
        val payment = Payment(
            paymentBody.cardNumber,
            expirationDateInLocalDateTime(paymentBody.expirationDate),
            paymentBody.cvv,
            paymentBody.name)

        try {
            mercadoLibreService.purchase(user.id, payment)
            ctx.json(UserDTO(user))
        } catch (ex: PurchaseException) {
            throw BadRequestResponse("Empty cart")
        }
    }

    private fun expirationDateInLocalDateTime(expirationDate: String): LocalDateTime {
        try {
            val formatter = DateTimeFormatter.ofPattern("yyyy/MM")
            val expirationDateInLocalDate = YearMonth.parse(expirationDate, formatter)
            val expirationDateInLocalDateTime = expirationDateInLocalDate.atDay(1).atStartOfDay()
            return expirationDateInLocalDateTime
        } catch (e: DateTimeException) {
            throw BadRequestResponse("Invalid expiration date")
        }
    }


}