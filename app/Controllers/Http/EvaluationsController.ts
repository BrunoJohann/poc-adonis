import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Evaluation from 'App/Models/Evaluation'
import Location from 'App/Models/Location'
import CreateEvaluationValidator from 'App/Validators/Evaluations/CreateEvaluationValidator'

export default class EvaluationsController {

  async index({ params }: HttpContextContract) {
    const { location_id } = params

    const evaluation = location_id
      ? await Evaluation.query().where('location_id', location_id).preload('user')
      : await Evaluation.query().preload('user')

    return evaluation
  }

  async create({ request, response, auth, params }: HttpContextContract) {
    const location_id = Number(params.location_id)
    const { rating, comment } = request.body()

    const location = await Location.find(location_id)

    if (!location) return response.status(404).send({ message: 'Localização não encontrada' });

    await request.validate(CreateEvaluationValidator)

    const evaluation = await Evaluation.create({ user_id: auth.user?.id, location_id, rating, comment })

    return evaluation
  }

}
