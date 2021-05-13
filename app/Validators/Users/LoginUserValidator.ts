import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.exists({ table: 'users', column: 'email' })
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(5)
    ])
  })

  public messages = {
    'email.required': 'Email obrigatório',
    'email.exists': 'Email não cadastrado',
    'email.email': 'Formato de email invalido',
    'password.required': 'Senha obrigatória',
    'password.minLength': 'Senha muito curta'
  }
}
