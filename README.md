# Projet de base de donnée

L'objectif est de mettre à disponisition une base de données sous Postgres SQL avec des données. La base de donnée génère automatique ces données.

Les étapes pour la mise en place

```bash
# copie le projet en local
git clone https://github.com/clemFormation/BDD-liveAddict.git

# Lancez la base de donnée
docker-compose --project-name liveaddict_bdd  up -d --remove-orphans
```

Le projet contient une base de donnée MariaDB qui tourne sur le port 4000 ainsi qu'un client web phpMyAdmin accéssible depuis l'adresse http://localhost:4001/ (login : root, password : rootpwd).

Vous devez ensuite générer la base de donnée suivante via le script SQL déjà prêt (liveAddict.sql). Copiez son contenu dans l'éditeur SQL de PHPMyAdmin.  
La base devrait normalement être en place 🎉.
