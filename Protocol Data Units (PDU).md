# Protocol Data Units (PDU)
- Au niveau de chaque couche, des protocoles sont utilisés pour communiquer
- Information de contrôle est ajoutée aux données utilisateur a chaque couche
- La couche de transport peut fragmenter les données utilisateurs
## PDU transport
- La couche de transport peut fragmenter les données utilisateurs
- Chaque fragment a une entête transport ajoutée
	- SAP de destination
	- Numéro de séquence
	- Code de détection d'erreur

## PDU réseau
- Ajoute une entête réseau
	- Adresse réseau de destination
	- Type de service
	- Identificateur
	- Etc.