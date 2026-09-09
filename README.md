# Mot de PassARI
Ce projet est un gestionnaire de mot de passe qui ne stocke pas vos mots de passe.

## Fonctionnement
Au lieu de stocker les mots de passe, les mots de passe sont générés à l'aide du mot de passe principal, du site et de la version.
La fonction de hachage Argon2id est utilisée à l'aide du projet [Argon2id-JS](https://github.com/Rabbit-Company/Argon2id-JS/tree/main).
Changer le site ou la version donnera un mot de passe différent. Il est presque impossible de retrouver le mot de passe principale car la fonction de hachage est irréversible.