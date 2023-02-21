---
title: Le seuil de Doherty
category: rule
excerpt: La productivité augmente lorsque l'utilisateur et la machine intéragissent à un rythme inférieur à 0,4 secondes.
color: orange
---

Un dialogue entre une interface et un utilisateur doit s'apparanter à une partie de ping pong. Les allers retours ne doivent pas être trop lent. Doherty et Thadani (1982) indique un seuil de 400 millisecondes.

# A retenir

- Un logiciel ne doit surtout pas geler sur une action utilisateur.
- Quand l'utilisateur presse un bouton, l'interface doit montrer un retour visuel immédiat d'action prise en compte.
- Lors d'une action longue, il faut au moins mettre un spinner ou équivalent, et si l'action est probablement longue, il faut refleter une idée d'avancement, à l'aide par exemple d'une barre de progression.
- Lorsque l'utilisateur percoit l'action comme presque finie, il est plus volontaire pour être patient. Les loading skeletons sont des bonnes illusatrions de ce phénomène : ils affichent une très bonne idée du rendu en terme de layout, mais pas les données car pas encore reçues.
