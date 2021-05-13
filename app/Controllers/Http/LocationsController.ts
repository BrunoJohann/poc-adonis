import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Location from 'App/Models/Location'
import CreateLocationValidator from 'App/Validators/Locations/CreateLocationValidator';

export default class LocationsController {

  async index({ params }: HttpContextContract) {
    const { id } = params

    const query = Location.query().preload('user').preload('evaluations')

    const locations = id
      ? await query.apply((scope) => scope.nearBy(id))
      : await query.orderBy('name')

    return locations;
  }

  async create({ request, response, auth }: HttpContextContract) {
    await request.validate(CreateLocationValidator)

    const { name, latitude, longitude } = request.body()

    const existsLocation = await Location.query()
      .where('name', name)
      .andWhere('latitude', latitude)
      .andWhere('longitude', longitude)

    if (!!existsLocation.length) return response.status(401).send({ message: 'Localização já existe' })

    const location = await Location.create({ user_id: auth.user?.id, name, latitude, longitude })

    return location
  }

}
