<h1>Piiquante</h1>

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

<h2>Initalisation de l'application web</h2>

Après avoir récupéré le projet, il faut initialiser le frontend avec "ng serve".
Puis il faut initialiser le Backend avec "node server"

Exceptionnellement, le fichier .env qui permet de se connecter à la base de donnée et d'accéder au Token
est présent afin de permettre la vérification du bon fonctionnement du projet.

<h2>Exigences de sécurité</h2>

<li>Le mot de passe de l'utilisateur doit être haché.</li>
<li>L'authentification doit être renforcée sur toutes les routes sauce requises.</li>
<li>Les adresses électroniques dans la base de données sont uniques et un plugin Mongoose approprié 
est utilisé pour garantir leur unicité et signaler les erreurs.</li>
<li>La sécurité de la base de données MongoDB (à partir de MongoDB Atlas) ne doit pas empêcher 
l'applicaton de se lancer sur la machine d'un utilisateur.</li>
<li>Le plugin Mongoose doit assurer la remontée des erreurs issues de la base de données.</li>
<li>Les versions les plus récentes des logiciels sont utilisés avec des correctifs de sécurité acutalisés.</li>
<li>Le contenu du dossier images ne doit pas être téléchargé sur Github</li>
