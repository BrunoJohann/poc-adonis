import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required()
    ]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(5),
      rules.confirmed('passwordConfirmation')
    ])
  })

  public messages = {
    'name.required': 'Nome obrigatório',
    'email.required': 'Email obrigatório',
    'email.email': 'Formato de email invalido',
    'email.unique': 'Email já cadastrado',
    'password.required': 'Senha obrigatória',
    'password.minLength': 'Senha muito curta',
    confirmed: '{{ field }} inválido'
  }
}
