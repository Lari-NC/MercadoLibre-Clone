package org.tp1.controller

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import model.User
import model.UserException
import org.tp1.token.Role
import service.MercadoLibreService

const val HEADER = "Authorization"

class UserGenerator : JWTGenerator<User> {
    override fun generate(user: User, algorithm: Algorithm): String {
        val token = JWT.create().withClaim("id", user.id)
        return token.sign(algorithm)
    }
}

class TokenController(private val mercadoLibreService: MercadoLibreService) {
    private val algorithm = Algorithm.HMAC256("xoxo")
    private val verifier  = JWT.require(algorithm).build()
    private val generator = UserGenerator()
    private val provider  = JWTProvider(algorithm, generator, verifier)

    fun generateToken(user: User): String {
        return provider.generateToken(user)
    }

    fun validate(ctx : Context) {
        val header = ctx.header(HEADER)
        when {
            ctx.routeRoles().contains(Role.ANYONE) -> {
                return
            }
            header == null -> {
                throw UnauthorizedResponse("Invalid Token")
            } else -> {
                val user = tokenToUser(header)
                ctx.attribute("user", user)
                return
            }
        }
    }

    private fun tokenToUser(header: String): User {
        val token = provider.validateToken(header)
        try {
            val userId = token.get().getClaim("id").asString()
            return mercadoLibreService.getUser(userId)
        } catch (error: UserException) {
             throw UnauthorizedResponse("Unauthorized User")
        }
    }
}