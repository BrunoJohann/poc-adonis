import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed, HasMany, hasMany, scope } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

import User from 'App/Models/User'
import Evaluation from './Evaluation'

export default class Location extends BaseModel {

  static nearBy = scope((query, id: number) => {
    const haversine = `(6371 * acos(cos(radians((SELECT latitude FROM locations WHERE id = :id )))
                      * cos(radians(latitude))
                      * cos(radians(longitude)
                      - radians((SELECT longitude FROM locations WHERE id = :id )))
                      + sin(radians((SELECT latitude FROM locations WHERE id = :id )))
                      * sin(radians(latitude))))`
    query
      .select('*', Database.raw(`${haversine} as distance`, { id: id }))
      .from('locations')
      .orderBy('distance')
  })

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public user_id: number

  @column()
  public latitude: number

  @column()
  public longitude: number

  @column()
  public distance: number

  @computed()
  public get averageGrade(): number {
    const evaluations = this.evaluations || []
    const sum = evaluations.reduce((acc, cur) => acc + cur.rating, 0)
    return (sum / evaluations.length)
  }

  @hasMany(() => Evaluation, {
    foreignKey: 'location_id'
  })
  public evaluations: HasMany<typeof Evaluation>

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
