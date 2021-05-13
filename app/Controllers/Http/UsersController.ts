import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from '../../Models/User'

import CreateUserValidator from 'App/Validators/Users/CreateUserValidator'
import LoginUserValidator from 'App/Validators/Users/LoginUserValidator'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'

export default class UsersController {

  async create({ request }: HttpContextContract) {
    await request.validate(CreateUserValidator)

    const data = request.only(['name', 'email', 'password'])

    return await User.create(data)
  }

  async login({ request, auth }: HttpContextContract) {
    await request.validate(LoginUserValidator)

    const { email, password } = request.body()

    return await auth.use('api').attempt(email, password, {
      expiresIn: '200min'
    })
  }

  async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
  }

  async update({ request, response, auth, params }: HttpContextContract) {
    await request.validate(UpdateUserValidator)

    const { id } = params
    const { email, password, newEmail, newPassword } = request.body()

    if (auth.user?.id != id) return response.status(401).send({ message: 'Usuário não autorizado!' });

    await auth.verifyCredentials(email, password)

    const user = await User.findOrFail(auth.user?.id)

    user.email = newEmail || email
    user.password = newPassword || password

    await user.save()

    return user
  }

}
