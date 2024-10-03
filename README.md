[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/snPWRHYg)
# Examenopdracht Web Services

- Student: Robbe Van Duysen
- Studentennummer: 202289876
- E-mailadres: <mailto:robbe.vanduysen@student.hogent.be>

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)


## Voor het opstarten van dit project

Maak een `.env` bestand aan in de root van het project en vul volgende variabelen in:

```ini
NODE_ENV=development
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
```
> *Vervang eventueel DATABASE_USERNAME en DATABASE_PASSWORD door uw inloggegevens van uw local host connection*
## Start dit project

- Installeer de dependencies met `npm install`
- Start de server met `npm start`
- De server draait op poort `3306`


## Testen

- Installeer de dependencies met `npm install`
- Maak een `.env` bestand aan in de root van het project en vul volgende variabelen in:

```ini
NODE_ENV=test
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
```
> *Vervang eventueel DATABASE_USERNAME en DATABASE_PASSWORD door uw inloggegevens van uw local host connection*
- Start de server met `npm test`
- Voor de coverage van de testen: `npm run test:coverage`
