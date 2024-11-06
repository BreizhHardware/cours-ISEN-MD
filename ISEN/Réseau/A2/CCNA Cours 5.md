#Réseau #A2 
[[CCNA Cours 4|Cours précédent]]

---
# Définition
CIDR (Classless Inter-Domain Routing)
VLSM (Variable Length Subnet Mask)

---
# Échauffement
172.16.27.0/24
	ADMIN: 8 utilisateurs
	USERS: 31 utilisateurs
	SERVERS: 16 utilisateur

|              | CIDR 1         | CIDR 2          | CIDR 3           | VLSM ADMIN     | VLSM USERS      | VLSM SERVERS    |
| :----------- | :------------- | --------------- | ---------------- | :------------- | --------------- | --------------- |
| réseau       | 172.16.27.0/26 | 172.16.27.64/26 | 172.16.27.128/26 | 172.16.27.0/28 | 172.16.27.16/26 | 172.16.27.80/27 |
| 1èr hôte     | 172.16.27.1    | 172.16.27.65    | 172.16.27.129    | 172.16.27.1    | 172.16.27.17    | 172.16.27.81    |
| Dernier hôte | 172.16.27.62   | 172.16.27.126   | 172.16.27.190    | 172.16.27.14   | 172.16.27.78    | 172.16.27.110   |
| Broadcast    | 172.16.27.63   | 172.16.27.127   | 172.16.27.191    | 172.16.27.15   | 172.16.27.79    | 172.16.27.111   |

---
&copy; Félix MARQUET