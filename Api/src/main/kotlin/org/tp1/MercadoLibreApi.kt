package org.tp1

import io.javalin.Javalin
import data.initSystem
import io.javalin.apibuilder.ApiBuilder.*
import org.tp1.controller.*
import org.tp1.token.Role
import org.tp1.controller.TokenController

class MercadoLibre {

    private val app: Javalin
    private val mercadoLibre = initSystem()
    private val tokenController = TokenController(mercadoLibre)
    private val userController = UserController(mercadoLibre, tokenController)
    private val productController = ProductController(mercadoLibre)
    private val categoryController = CategoryController(mercadoLibre)
    private val cartController = CartController(mercadoLibre)

    init {
         app = Javalin.create {
             config-> config.http.defaultContentType = "application/json"
             config.bundledPlugins.enableCors { cors ->
                 cors.addRule { it ->
                     it.anyHost()
                     it.allowCredentials = true;
                     it.exposeHeader("Authorization");
                 }
             }
             config.router.apiBuilder{
                path("/login") {
                    post(userController::login, Role.ANYONE)
                }
                path("/register") {
                    post(userController::register, Role.ANYONE)
                }
                path("/user") {
                    get(userController::getUser, Role.USER)
                    path("/{id}") {
                        get(userController::getUserByID, Role.ANYONE)
                        path("/products") {
                            get(productController::getUserProducts, Role.ANYONE)
                        }
                    }
                }
                path("/products") {
                    get(productController::getAllProducts, Role.ANYONE)
                    post(productController::createProduct, Role.USER)
                    path("/{id}") {
                        get(productController::getProductByID, Role.ANYONE)
                        put(productController::updateProduct, Role.USER)
                        path("/related") {
                            get(productController::getRelatedProducts, Role.ANYONE)
                        }
                        path("/like") {
                            put(productController::likeProduct, Role.USER)
                        }
                        path("/question") {
                            post(productController::addProductQuestion, Role.USER)
                            path("/{questionId}") {
                                put(productController::addAnswerOfQuestion, Role.USER)
                            }
                        }
                    }
                }
                path("/search") {
                    get(productController::searchProducts, Role.ANYONE)
                }
                path("/categories") {
                    get(categoryController::getCategories, Role.ANYONE)
                    path("/{id}") {
                        get(categoryController::getCategoryByID, Role.ANYONE)
                    }
                }
                path("/cart") {
                    get(cartController::getCart, Role.USER)
                    put(cartController::addProductToCart, Role.USER)
                    path("/{id}") {
                        delete(cartController::removeProductFromCart, Role.USER)
                    }
                }
                path("/purchase") {
                    post(cartController::purchaseCart, Role.USER)
                }
            }
        }
        app.beforeMatched(tokenController:: validate)
    }

    fun start() {
        app.start(7070)
    }
}

fun main() {
    MercadoLibre().start()
}