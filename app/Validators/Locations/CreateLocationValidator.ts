import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateLocationValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    name: schema.string({ trim: true },[
      rules.required(),
    ]),
    latitude: schema.number([
      rules.required(),
    ]),
    longitude: schema.number([
      rules.required()
    ])
  })

  public messages = {
    required: '{{ field }} obrigatório'
  }
}
