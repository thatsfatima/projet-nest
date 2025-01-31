<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Swagger Documentation

```url
http://localhost:3000/api/docs
```

### Auth API
#### POST /auth/register
- **Description**: Enregistrer un nouvel utilisateur.
- **Request Body**:
  ```json
  {
    "username": "",
    "password": "",
    "role": ""
  }
- **Réponses**:
- 201: Utilisateur ajouté avec succès.
- 409: Le nom d'utilisateur existe déjà.
- 500: Erreur serveur.
#### POST /auth/login
- **Description**: Connexion d'un utilisateur.
- **Request Body**:
  ```json
  {
    "username": "",
    "password": ""
  }
- **Responses**:
- 200: User connecté avec succès.
- 401: Identifiants incorrects.
- 500: Erreur serveur.
#### GET /auth/:id
- **Description**: Recupérer un utilisateur par ID.
- **Responses**:
- 200: Liste des utilisateurs.
- 500: Erreur serveur.
#### GET /auth
- **Description**: Recupérer tous les utilisateurs.
- **Responses**:
- 200: Liste des utilisateurs.
- 500: Erreur serveur.
POST /auth/logout
- **Description**: Déconnecter un user.
- **Responses**:
- 200: Utilisateur déconnecté avec succès.
- 500: Erreur serveur.

### Book API
#### POST /book
- **Description**: Créer un nouveau livre.
- **Request Body**:
  ```json
  {
    "title": "",
    "author": "",
    "publishedDate": "",
    "category": ""
  }
- **Responses**:
- 201: Livre créé avec succès.
- 500: Erreur serveur interne.
#### GET /book
- **Description**: Récupérer une liste de livres.
- **Paramètres de requête** :
  - `page`: Numéro de la page pour la pagination.
  - `limit`: Nombre d'éléments par page.
  - `sortBy`: Champ par lequel trier les livres.
  - `order`: Ordre de tri (`asc` ou `desc`).
- **Réponses** :
  - 200: Retourne une liste de livres.
  - 500: Erreur serveur interne.
#### GET /book/:id
- **Description**: Récupérer un livre par ID.
- **Réponses**:
  - 200: Retourne le livre avec l'ID spécifié.
  - 404: Livre non trouvé.
  - 500: Erreur serveur interne.

#### PATCH /book/:id
- **Description**: Mettre à jour un livre par ID.
- **Request Body**:
  ```json
  {
    "title": "",
    "author": "",
    "publishedDate": "",
    "category": ""
  }
- **Responses**:
  - 200: Livre mis à jour avec succès.
  - 404: Livre non trouvé.
  - 500: Erreur serveur interne.
#### DELETE /book/:id
- **Description**: Supprimer un livre par ID.
- **Réponses**:
  - 204: Livre supprimé avec succès.
  - 404: Livre non trouvé.
  - 500: Erreur serveur interne.

### Review API
#### POST /review
- **Description**: Ajouter un commentaire.
- **Paramètres de requête** :
  - bookId: ID du livre.
  - userId: ID de l'utilisateur.
  - comment: Commentaire.
  - rating: Note.
- **Responses**:
  - 201: Commentaire ajouté avec succès.
  - 500: Erreur serveur interne.
#### GET /review/:bookId
- **Description**: Accéder à un commentaire.
- **Responses**:
  - 200: Commentaires du livre trouvés avec succès.
  - 404: Pas de commentaires pour ce livre.
  - 500: Erreur serveur interne.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
