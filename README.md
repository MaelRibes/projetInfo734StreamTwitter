# **![FrontEnd/public/logo.png](FrontEnd/public/favicon.ico) <span style="color: #1d9bf0">TweetDash</span> : Twitter Stream Dashboard**

[![Contributors](https://img.shields.io/github/contributors/xerox123dshdhwx/projetInfo734StreamTwitter)](https://github.com/xerox123dshdhwx/projetInfo734StreamTwitter/graphs/contributors)
[![Pull Requests](https://img.shields.io/github/issues-pr-closed/xerox123dshdhwx/projetInfo734StreamTwitter)](https://github.com/xerox123dshdhwx/projetInfo734StreamTwitter/pulls?q=is%3Apr+is%3Aclosed)
[![commits](https://badgen.net/github/commits/xerox123dshdhwx/projetInfo734StreamTwitter/main)](https://github.com/xerox123dshdhwx/projetInfo734StreamTwitter/commits/main)
[![GitHub Project](https://img.shields.io/badge/GitHub_Project-%23121011.svg?&logo=github&logoColor=white)](https://github.com/users/xerox123dshdhwx/projects/2)



## Présentation

Dans le cadre de ce projet, nous avons réalisé site permettant à n'importe qui de démarrer un stream Twitter afin de récupérer des tweets en fonction des règles qu'il aura définies. Pour cela, les utilisateurs ont à leur disposition un formulaire permettant de sélectionner des règles en fonction de plusieurs critères (mots clés, localisation géographique, hashtags etc...). Avant de démarrer un stream, les utilisateurs devront au préalable renseigner leur token Twitter sur leur page utilisateur.


## Frameworks utilisés

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/fr/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/fr-fr)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/products/docker-desktop/)
[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://fr.reactjs.org/)
[![Bulma](https://img.shields.io/badge/react_bulma-8a4d76?style=for-the-badge&logo=bulma&logoColor=white)](https://react-bulma.dev/en)
[![D3.js](https://img.shields.io/static/v1?style=for-the-badge&message=D3.js&color=222222&logo=D3.js&logoColor=F9A03C&label=)](https://d3js.org/)


Notre projet est intégralement codé en JavaScript. Nous utilisons la plateforme NodeJS les frameworks Express pour le BackEnd serveur, Next et React pour le FrontEnd. Nous utilisons MongoDB pour gérer la base de données et Redis pour gérer les sessions. Le style du site utilise les composent React du framework CSS Bulma. Le dashboard est créé en utilisant la bibliothèque graphique JavaScript D3.js.


## Installation

Dans le cas où vous ne possédez pas MongoDB ou Redis sur votre machine, créez des containers Docker pour MongoDB et Redis avec les commandes suivantes :

```dockerfile
docker run -d --name mongo-bdd -p 27017:27017 mongo
docker run -d --name redis-bdd -p 6379:6379 redis
```
L'utilisation de Docker Desktop facilite grandement le lancement et l'arrêt des images Docker.

Une fois le projet cloné, exécutez les commandes suivantes dans un terminal :

```bash
cd BackEnd/
npm install
npm run dev
```
Puis dans un autre terminal les commandes suivantes : 

```bash
cd FrontEnd/
npm install
npm run dev
```

## Difficultés et améliorations

Nous avons globalement réussi à aller au bout du projet, nous avons un code propre et optimisé pour la gestion des comptes, la création de règles et le lancement de streams. Néanmoins, notre dashboard aurait pu être amélioré. Avec plus de temps nous aurions aimé rajouter plusieurs choses :
1. **Problèmes avec les données :** Nous avons eu beaucoup de soucis à exploiter les données des tweets que l'on récupérait avec le stream. En effet, nous récupérons les tweets en temps réel au moment où ceux-ci sont postés. Cela ne nous permet donc pas d'analyser le nombre de likes, de RT ou de commentaires puisque ces champs sont nuls à la création du tweet. Nous étions donc assez limités par les données que l'on possédait et il a été difficile de trouver des graphiques pertinents à montrer.

    Nous aurions aimé exploiter les sources ou la géolocalisation des tweets, mais ces informations apparaissait extrêmement rarement. Il nous aurait fallu laisser tourner notre stream pendant des heures pour obtenir une visualisation intéressante.


2. **Dashboard interactif :** La forme des données que nous récupérons a également été un facteur limitant pour développer notre dashboard. En effet, D3.js est très efficace pour travailler sur des données propres et formatés dans un fichier csv, mais beaucoup moins lorsqu'il s'agit de données brutes comme dans notre cas. Nous avons eu beaucoup de difficultés à utiliser les crossfilter pour rendre notre dashboard interactif.


3. **Dashboard en temps réel :** Faire en sorte que le dashboard se mette à jour automatiquement quand les tweets sont récupérés sans avoir à recharger la page aurait aussi pu être intéressant. Cela aurait été possible en utilisant un socket.
