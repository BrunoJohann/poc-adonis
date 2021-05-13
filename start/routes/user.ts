
import Route from '@ioc:Adonis/Core/Route'

Route.post('/user', 'UsersController.create')

Route.post('/user/login', 'UsersController.login')

Route.group(() => {
  Route.get('/user/logout', 'UsersController.logout')
  Route.put('/user/:id', 'UsersController.update')
}).middleware('auth')
