# POC ADONIS

### Rodar projeto
```
npm run dev || yarn dev
```

### Subir banco de dados Postgres e PG Admin
```
docker-compose up
```

### Subir tabelas banco de dados
```
node ace migration:run
```

### HEROKU URL
```
https://mesa-adonis.herokuapp.com
```

### Rotas
┌───────────┬───────────────────────────┬──────────────────────────────┬────────────┐
│ Method    │ Route                     │ Handler                      │ Middleware │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ HEAD, GET │ /evaluation/:location_id? │ EvaluationsController.index  │ auth       │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ POST      │ /evaluation/:location_id  │ EvaluationsController.create │ auth       │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ HEAD, GET │ /locations/:id?           │ LocationsController.index    │ auth       │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ POST      │ /locations                │ LocationsController.create   │ auth       │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ POST      │ /user                     │ UsersController.create       │            │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ POST      │ /user/login               │ UsersController.login        │            │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ HEAD, GET │ /user/logout              │ UsersController.logout       │ auth       │
├───────────┼───────────────────────────┼──────────────────────────────┼────────────┤
│ PUT       │ /user/:id                 │ UsersController.update       │ auth       │
└───────────┴───────────────────────────┴──────────────────────────────┴────────────┘
