package org.tp1.token
import io.javalin.security.RouteRole

enum class Role : RouteRole {
    USER,
    ANYONE,
}