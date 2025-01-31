import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenue dans l\'API de la bibliothèque!';
  }

  getStatus(): string {
    return (
      'L\'API fonctionne correctement. Voici les fonctionnalités disponibles :\n' +
      '\n' +
      '1. **Gestion des livres**:\n' +
      '   - **POST /book**: Créer un nouveau livre.\n' +
      '   - **GET /book**: Récupérer une liste de livres avec pagination et tri.\n' +
      '   - **GET /book/:id**: Récupérer un livre par son ID.\n' +
      '   - **PATCH /book/:id**: Mettre à jour un livre existant.\n' +
      '   - **DELETE /book/:id**: Supprimer un livre.\n' +
      '   - **GET /book/top-rated**: Récupérer les livres les mieux notés.\n' +
      '   - **GET /book/search**: Recherche avancée de livres.\n' +
      '\n' +
      '2. **Gestion des utilisateurs**:\n' +
      '   - **POST /auth/register**: Enregistrer un nouvel utilisateur.\n' +
      '   - **POST /auth/login**: Authentifier un utilisateur et obtenir un JWT.\n' +
      '\n' +
      '3. **Ajout de notes et commentaires**:\n' +
      '   - **POST /books/:id/review**: Ajouter une note et un commentaire pour un livre.\n' +
      '   - **GET /reviews/:bookId**: Récupérer les commentaires d\'un livre.\n'
    );
  }
}