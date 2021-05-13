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

### URIs
```
  - GET   -  /evaluation/:location_id?   -   auth
  - POST  -  /evaluation/:location_id    -   auth
  - GET   -  /locations/:id?             -   auth
  - POST  -  /locations                  -   auth
  - POST  -  /user
  - POST  -  /user/login
  - GET   -  /user/logout                -   auth
  - PUT   -  /user/:id                   -   auth
 ```
