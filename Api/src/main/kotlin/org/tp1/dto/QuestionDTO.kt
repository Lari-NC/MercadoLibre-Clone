package org.tp1.dto

import model.Question

class QuestionDTO (question: Question) {
    var id = question.id
    var user = SimpleUserDTO(question.user)
    var text = question.text
    var response = question.response
}

