import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/evaluation/:location_id?', 'EvaluationsController.index')
  Route.post('/evaluation/:location_id', 'EvaluationsController.create')
}).middleware('auth');
