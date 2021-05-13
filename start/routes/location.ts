import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/locations/:id?', 'LocationsController.index')
  Route.post('/locations', 'LocationsController.create')
}).middleware('auth');
