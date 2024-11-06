# -*- coding: utf-8 -*-

# Source : https://www.costadoat.fr/systeme/26/

import numpy as np
import matplotlib.pyplot as plt
import math

# Lire le fichier de données Maxpid (données expérimentales)
data = []
mon_fichier = open("./maxpid_exp.txt", "r")
contenu = mon_fichier.read()
ligne = contenu.split('\n')
for i in range(len(ligne) - 1):
    data.append(ligne[i].split('     ')[1:8])
mon_fichier.close()

# Récupération des données
temps_exp = np.zeros(len(data))  # Temps en ms
cons_exp = np.zeros(len(data))  # Consigne de position angulaire du bras en rad
theta_exp = np.zeros(len(data))  # Position angulaire du bras en rad
commande_exp = np.zeros(len(data))  # Commande du moteur en V
courant_exp = np.zeros(len(data))  # Courant moteur en mA
omegab_exp = np.zeros(len(data))  # Vitesse de rotation du bras en rad/s
omegam_exp = np.zeros(len(data))  # Vitesse de rotation du moteur en rad/s
for i in range(len(data)):
    temps_exp[i] = data[i][0]
    cons_exp[i] = data[i][1]
    theta_exp[i] = data[i][2]
    commande_exp[i] = data[i][3]
    courant_exp[i] = data[i][4]
    omegab_exp[i] = data[i][5]
    omegam_exp[i] = data[i][6]


# Fonction de filtrage des données par moyenne mobile
def filtre(data, r):
    data_f = np.zeros(len(data))
    for i in range(1, len(data) - 1):

        if i < r or i > len(data) - r:
            data_f[i] = (data[i] + data[i + 1]) / 2
        else:
            data_f[i] = sum(data[i - r:i + r + 1]) / (2 * r + 1)
    return data_f


# Période d'échantillonage
dt = (temps_exp[1] - temps_exp[0]) / 1000  # secondes

# Conversion des consigne et position du bras en radians car fournis en degrés dans le fichier de mesure
for i in range(len(temps_exp)):
    cons_exp[i] = cons_exp[i] * np.pi / 180
    theta_exp[i] = theta_exp[i] * np.pi / 180

# Calcul de l'angle moteur par intégration numérique de la vitesse de rotation
beta_exp = np.zeros(len(temps_exp))
beta_exp[0] = 0
for i in range(1, len(omegam_exp)):
    beta_exp[i] = beta_exp[i - 1] + dt * omegam_exp[i]  # en radians

# Calcul de l'accélération moteur par dérivation numérique de la vitesse de rotation
omegam_p_exp = np.zeros(len(temps_exp))
omegam_p_exp[0] = 0
for i in range(1, len(temps_exp) - 1):
    omegam_p_exp[i + 1] = (omegam_exp[i] - omegam_exp[i - 1]) / dt  # en radians
omegam_p_exp = filtre(omegam_p_exp, 2)

# Filtrage de la vitesse du bras
omegab_exp = filtre(omegab_exp, 2)

# Calcul de l'accélération du bras par dérivation numérique de la vitesse de rotation
omegab_p_exp = np.zeros(len(temps_exp))
omegab_p_exp[0] = 0
for i in range(len(temps_exp) - 1):
    omegab_p_exp[i + 1] = (omegab_exp[i] - omegab_exp[i - 1]) / dt  # en radians
# Filtrage de l'accélération du bras
omegab_p_exp = filtre(omegab_p_exp, 2)

# Filtrage du courant
courant_exp = filtre(courant_exp, 2)

# Tracés des données expérimentales
plt.figure(1)

plt.subplot(421)
plt.plot(temps_exp / 1000, beta_exp)  # Position angulaire du moteur en fonction du temps
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$\beta (rad)$')
plt.title(r'Position du moteur $\beta$')
plt.grid()

plt.subplot(422)
plt.plot(temps_exp / 1000, cons_exp, label='Consigne')  # Position angulaire (consigne) du bras en fonction du temps
plt.plot(temps_exp / 1000, theta_exp, label='Mesuré')  # Position angulaire (mesurée) du bras en fonction du temps
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$\theta (rad)$')
plt.title(r'Position du bras $\theta$')
legend = plt.legend(loc='upper left')
plt.grid()

plt.subplot(423)
plt.plot(temps_exp / 1000, omegam_exp)  # Vitesse de rotation du moteur en fonction du temps
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$\Omega_m (rad/s)$')
plt.title(r'Vitesse du moteur $\Omega_m$')
plt.grid()

plt.subplot(424)
plt.plot(temps_exp / 1000, omegab_exp)  # Vitesse de rotation du bras en fonction du temps
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$\Omega_B (rad/s)$')
plt.title(r'Vitesse du bras $\Omega_B$')
plt.grid()

plt.subplot(425)
plt.plot(temps_exp / 1000, omegam_p_exp)  # Accélération du moteur en fonction du temps
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$\dot{\Omega_m} (rad/s)$')
plt.title(r'Accélération du moteur $\dot{\Omega_m}$')
plt.grid()

plt.subplot(426)
plt.plot(temps_exp / 1000, courant_exp)  # Courant moteur en fonction du temps
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$I (mA)$')
plt.title(r'Courant moteur $I$')
plt.grid()


def couple_moteur(constante_coupe, intensite):
    # Retourne un tableau pour chaque valeur de couple en fonction de l'intensité du courant (en mNm/A et en mA)
    couple = np.zeros(len(intensite))
    for i in range(len(intensite)):
        couple[i] = constante_coupe * intensite[i] * 10 ** -6  # en Nm
    return couple


plt.subplot(427)
couple = couple_moteur(52.5, courant_exp)
plt.plot(temps_exp / 1000, couple)
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$Nm')
plt.title(r'Couple moteur expérimental')
plt.grid()

plt.subplot(428)
plt.plot(temps_exp / 1000, omegab_p_exp)  # Accélération du bras en fonction du temps
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$\dot{\Omega_B} (rad/s)$')
plt.title(r'Accélération du bras $\dot{\Omega_B}$')
plt.grid()

# Calcul de la vitessse angulaire du bras par dérivation numérique de la position du bras
theta_exp_derive = np.zeros(len(temps_exp))
theta_exp_derive[0] = 0
for i in range(len(temps_exp) - 1):
    theta_exp_derive[i + 1] = (theta_exp[i] - theta_exp[i - 1]) / dt  # en radians
# Filtrage de la vitesse angulaire du bras
theta_exp_derive = filtre(theta_exp_derive, 2)

# Calcul de l'accélération angulaire du bras par dérivation numérique de la vitesse angulaire du bras
theta_exp_derive_p = np.zeros(len(temps_exp))
theta_exp_derive_p[0] = 0
for i in range(len(temps_exp) - 1):
    theta_exp_derive_p[i + 1] = (theta_exp_derive[i] - theta_exp_derive[i - 1]) / dt  # en radians
# Filtrage de l'accélération angulaire du bras
theta_exp_derive_p = filtre(theta_exp_derive_p, 2)


def NP(theta):
    NP = np.zeros(len(theta))
    for i in range(len(theta)):
        NP[i] = -240 * 0.65 * 9.81 * abs(math.sin(theta[i]))
    return NP


def C23(Np, acceleration_bras, delta):
    # N * mm
    C23 = np.zeros(len(Np))
    for i in range(len(Np)):
        C23[i] = ((-(0.65 * 240) ** 2 * acceleration_bras[i] - Np[i]) * 4) / (2 * math.pi * 80 * math.sin(delta[i]))
    return C23


def Delta(theta):
    delta = np.zeros(len(theta))
    for i in range(len(theta)):
        delta[i] = theta[i] - math.atan((80 * math.sin(theta[i]) - 80) / (80 * math.cos(theta[i]) + 70))
    return delta


def couple_moteur_th(acceleration_bras, c23):
    couple = np.zeros(len(acceleration_bras))
    for i in range(len(acceleration_bras)):
        couple[i] = (240 * 0.65 * acceleration_bras[i] + c23[i]) * 10 ** -7
    return couple

np_data = NP(theta_exp)
c23 = C23(np_data, theta_exp_derive_p, Delta(theta_exp))
couple_th = couple_moteur_th(theta_exp_derive_p, c23)
plt.figure(2)

plt.subplot(311)
plt.plot(temps_exp / 1000, couple_th)
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$Nm')
plt.title(r'Couple moteur théorique')
plt.grid()

plt.subplot(312)
couple = couple_moteur(52.5, courant_exp)
plt.plot(temps_exp / 1000, couple)
plt.xlabel(r'$t(s)$')
plt.ylabel(r'$Nm')
plt.title(r'Couple moteur expérimental')
plt.grid()


plt.subplots_adjust(hspace=0.4)

plt.show()
