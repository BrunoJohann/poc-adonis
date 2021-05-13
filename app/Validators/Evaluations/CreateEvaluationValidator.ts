import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEvaluationValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    rating: schema.number([
      rules.required(),
      rules.range(0, 10)
    ]),
    comment: schema.string.optional(({ trim: true }))
  })

  public messages = {
    'rating.required': '{{ field }} obrigatório',
    'rating.range': 'Avaliação deve ser de 0 a 10'
  }
}
