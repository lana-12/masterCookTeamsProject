
# Principe de l'application et Stack Technique

Master Cook est une application de gestion de recettes de cuisine. Elle permet à ses utilisateurs de consulter une liste de recettes, de les filtrer par type de gastronomie, et par ingrédient. Les utilisateurs peuvent également ajouter leurs propre recette à la liste et la rendre accessible au public.

La stack technique de cette application est le HTML, le CSS, et le JS pour front-end, et NodeJS (Express) pour le back-end. Pour le stockage des données, on utilisera un fichier JSON qui sera stocké dans le projet back-end.

<br>

# Formalisme


Le JSON de stockage qui contiendra toutes les recettes se présentera de la façon suivante :

```json
"recipes": [
	"french": [
		{
			"id": 1,
			"title": "Raclette",
			"ingredients": [
				{
					"name": "potatoe",
					"quantity": 16,
					"unit": "UNIT_OBJECT"
				},
				{
					"name": "tomatoe",
					"quantity": 300,
					"unit": "UNIT_GRAM"
				},
				{
					...
				}
			]
		},
		{
			"id": 2,
			"title": "Boeuf Bourguinon"
			...
		}
	],
	"chinese": [
		{
			"id": 98,
			"title": "Bo Bun",
			...
		}
	]
]
```

Les recettes sont d'abord classées par type de gastronomie, puis listées avec la liste de leurs ingrédients. 

<br>

Chaque ingrédient est précisé avec sa quantité et son unité, suivant la nomenclature suivante :

```
gramme -> "UNIT_GRAM",
kilogramme -> "UNIT_KILOGRAM",
objet -> "UNIT_OBJECT" (exemple: 12 pommes de terre),
sachet -> "UNIT_PACK",
tranche -> "UNIT_SLICE",
millilitre -> "UNIT_MILLILITERS",
litre -> "UNIT_LITER",
cuillère à soupe -> "UNIT_TABLESPOON",
cuillère à café -> "UNIT_TEASPOON",
cube -> "UNIT_CUBE",
gousse -> "UNIT_POD",
pincée -> "UNIT_PINCH"
```

<br>

# URL exposées


<br>

### Obtenir toutes les recettes 
---

> Requête

```
GET {{url vers le serveur NodeJS}}/recipes
```


> Réponse

*Voir le JSON exposé dans "Formalisme"*

*Ressource non trouvée:*

```json
{
	"code": "404",
	"title": "Ressources non trouvées."
}
```

<br>

### Obtenir les recettes filtrées par gastronomie et par ingrédients
---

> Requêtes

```
GET {{url vers le serveur NodeJS}}/recipes?gastronomy=french
```

```
GET {{url vers le serveur NodeJS}}/recipes?ingredient=onion
```

*Paramètres*
- `gastronomy`: filtre les recettes par gastronomie
- `ingredient`: filtre les recettes par la présence de l'ingrédient recherché


> Réponse

```json
"recipes": [
	{
		"id": 1,
		"title": "Raclette",
		"ingredients": [
			{
				"name": "potatoe",
				"quantity": 16,
				"unit": "UNIT_OBJECT"
			},
			{
				"name": "tomatoe",
				"quantity": 300,
				"unit": "UNIT_GRAM"
			},
			{
				...
			}
		]
	},
	{
		"id": 2,
		"title": "Bouillabaisse",
		...
	}
]
```

*Ressource non trouvée:*

```json
{
	"code": "404",
	"title": "Ressources non trouvées."
}
```

<br>

### Création d'une  nouvelle recette
---

> Requête

```
POST {{url vers le serveur NodeJS}}/recipes
```


> Corps de la requête

```json
{
	"id": 47,
	"title": "Tiramisu",
	"ingredients": [
		{
			"name": "sugar",
			"quantity": 100,
			"unit": "UNIT_GRAM"
		},
		{
			"name": "vanilla sugar",
			"quantity": 1,
			"unit": "UNIT_PACK"
		},
		{
			...
		}
	]
}
```


> Réponses

*Ressource recette créée : Code 200*
```json
{
	"id": 1,
	"title": "Tiramisu",
	"ingredients": [
		{
			"name": "sugar",
			"quantity": 100,
			"unit": "UNIT_GRAM"
		},
		{
			"name": "vanilla sugar",
			"quantity": 1,
			"unit": "UNIT_PACK"
		},
		{
			...
		}
	]
}
```

*Corps de requête invalide*: 
```json
{
	"code": "400",
	"title": "Corps de requête incorrect."
}
```

*Erreur serveur:*
```json
{
	"code": "500",
	"title": "Erreur serveur."
}
```

<br>

### Modification d'une recette
---

> Requête

```
PATCH {{url vers le serveur NodeJS}}/recipes/{{id}}
```


> Corps de la requête

```json
{
	"id": 12,
	"title": "Tiramisu",
	"ingredients": [
		{
			"name": "sugar",
			"quantity": 100,
			"unit": "UNIT_GRAM"
		},
		{
			"name": "vanilla sugar",
			"quantity": 2,
			"unit": "UNIT_PACK"
		},
		{
			...
		}
	]
}
```


> Réponses

*Ressource recette modifiée : Code 200*
```json
{
	"id": 1,
	"title": "Tiramisu",
	"ingredients": [
		{
			"name": "sugar",
			"quantity": 100,
			"unit": "UNIT_GRAM"
		},
		{
			"name": "vanilla sugar",
			"quantity": 2,
			"unit": "UNIT_PACK"
		},
		{
			...
		}
	]
}
```

*Corps de requête invalide*: 
```json
{
	"code": "400",
	"title": "Corps de requête incorrect."
}
```

*Ressource introuvable*: 
```json
{
	"code": "404",
	"title": "Ressource introuvable."
}
```

*Erreur serveur:*
```json
{
	"code": "500",
	"title": "Erreur serveur."
}
```

<br>

### Suppression d'une recette
---

> Requête

```
DELETE {{url vers le serveur NodeJS}}/recipes/{{id}}
```


> Réponses

*Ressource recette supprimée : Code 200*
```json
{
	"code": "200",
	"title": "Ressource recette supprimée.",
	"id": 2
}
```

*Ressource introuvable*: 
```json
{
	"code": "404",
	"title": "Ressource introuvable."
}
```

*Erreur serveur:*
```json
{
	"code": "500",
	"title": "Erreur serveur."
}
```

<br>

# Consignes


Créer une page web réduite à sa plus simple expression pour gérer les différentes recettes.

L'interrogation de votre back-end NodeJS se fera côté JavaScript en utilisant [L'API fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API). Une fois les données JSON obtenu, le JS sera responsable du rendu de la page web en intervenant sur le HTML. La responsabilité côté client se limite à exposer les informations de manière lisible pour l'utilisateur et à faire des requêtes HTTP.

Le back-end de votre application sera rédigée en NodeJS. Vous y dressez une liste de vos requêtes et la logique métier y sera centralisée. La responsabilité du back-end va être d'écrire et de lire dans le fichier JSON de stockage, et de restituer les données au front en suivant la nomenclature détaillée plus haut. En échange d'une requête http, le back-end reverra du JSON.

Pour manipuler le fichier JSON en back, on utilisera `JSON.parse` pour convertir le JSON en objet JavaScript et le manipuler facilement, et on utilisera `JSON.stringify` pour convertir des objects JavaScript en JSON.

<br>

# Critères de notation


Le HTML et le CSS sera minimaliste, et juste assez élaboré pour afficher convenablement les fonctionnalités de l'application.

Le JS côté front et côté back sera appréciée selon les critères suivants :
- Utilisation maîtrisée des `let` et des `const`
- Algorithmie de qualité
- Noms de variable et de fonction explicites
- Commentaires de code (à minima les fonctions)
- Utilisation judicieuse de l'API fetch
- Code côté serveur organisé
- Logique métier formalisé en plusieurs fonctions

Enfin, pour la gestion de version, il sera demandé d'utiliser git et github. Créer un repository de votre projet, et utiliser les fonctionnalités des branches pour répartir votre travail à minima par développeur, et si possible par fonctionnalité.
