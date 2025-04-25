package org.tp1.controller

import io.javalin.http.*
import model.DraftNewUser
import model.User
import model.UserException
import org.tp1.body.LoginBody
import org.tp1.dto.*
import service.MercadoLibreService

class UserController(
    private val mercadoLibreService: MercadoLibreService,
    private val tokenController: TokenController
) {

    fun login(ctx: Context) {
        val logInBody = ctx.bodyValidator(LoginBody::class.java)
            .get()
        try {
            val user = mercadoLibreService.getUser(logInBody.email, logInBody.password)
            val token = tokenController.generateToken(user)
            ctx.header(HEADER,token)
            ctx.json(UserDTO(user))
        }
        catch (ex: UserException) {
            throw BadRequestResponse("Invalid login credentials ")
        }

    }

    fun register(ctx: Context) {
        val draftNewUser = ctx.bodyValidator(DraftNewUser::class.java)
            .check({it.name.isNotBlank()}, "Name cannot be blank")
            .check({it.email.isNotBlank()}, "Email cannot be blank")
            .check({it.email.contains("@")}, "Email does not contain the @ symbol")
            .check({!mercadoLibreService.users.any { user -> user.email == it.email }}, "Email is all ready registered")
            .check({it.password.isNotBlank()}, "Password cannot be blank")
            .check({it.image.startsWith("http://") ||
                    it.image.startsWith("https://") ||
                    it.image.startsWith("www.")}, "Image does not respect a valid format")
            .getOrThrow { throw BadRequestResponse("Invalid registration data") }
        try {
            val newUser = mercadoLibreService.registerNewUser(draftNewUser)
            val token = tokenController.generateToken(newUser)
            ctx.header(HEADER, token)
            ctx.json(UserDTO(newUser))
        } catch (ex: UserException) {
            throw BadRequestResponse("Invalid registration data or email already in use")
        }
    }

    fun getUser(ctx: Context) {
        val user = user(ctx)
        val userDTO = UserDTO(mercadoLibreService.getUser(user.email, user.password))
        ctx.json(userDTO)
    }

    fun getUserByID(ctx: Context) {
       val id = ctx.pathParam("id")
       try {
           val user = mercadoLibreService.getUser(id)
           ctx.json(UserDTO(user))
       }
       catch (ex: UserException) {
           throw NotFoundResponse("User not found")
       }
    }
}

fun user(ctx: Context): User {
    val user = ctx.attribute<User>("user") ?: throw UnauthorizedResponse("User not authenticated")
    return user
}























