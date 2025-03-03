# Sylvain Lanneau
# 16/10/2023
# Exemple d'utilisation de la fonction minimize() du package scipy.optimize

from scipy.optimize import minimize
import math
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm


# Fonction à minimiser
def f(X):  # Le paramètre X est une liste de deux floats

    x = X[0]
    y = X[1]

    return 0.5 + x * y * math.exp(-(x ** 2 + y ** 2))


def h0max(X):
    r1 = X[0]
    h1 = X[1]
    p1 = X[2]
    r2 = X[3]
    h2 = X[4]
    p2 = X[5]
    thetamax = 25
    detoile = 0.5

    vc1 = math.pi * r1 ** 2 * h1
    vc2 = math.pi * r2 ** 2 * h2

    mc1 = vc1 * p1
    mc2 = vc2 * p2
    mtot = mc1 + mc2

    OcG = ((1 / 2) * mtot) * (mc1 * h1 + mc2 * (2 * h1 + h2))

    return abs(math.cos(math.atan(OcG / r1) + thetamax) * (math.sqrt((r1 ** 2 + OcG ** 2))))


# Les contraintes sont regroupées dans un dictionnaire
# Une contrainte par entrée
# On peut mettre autant de contraintes que l'on veut, à condition qu'elles ne soient pas contradictoires
cons = (
    {'type': 'ineq', 'fun': lambda x: 3 - x[1]},  # h1 < 3 cm
    {'type': 'ineq', 'fun': lambda x: - (75 - (x[1] + x[4]))},  # h1 + h2 > 75 cm
    {'type': 'ineq', 'fun': lambda x: 90 - (x[1] + x[4])},  # h1 + h2 < 90 cm
    {'type': 'ineq', 'fun': lambda x: 30 - (math.pi * x[0] ** 2)},  # aireBaseC1 < 30 cm²
    {'type': 'ineq', 'fun': lambda x: x[3] - 0.5},  # r2 > 0.5 cm
    {'type': 'ineq', 'fun': lambda x: 1 - x[3]},  # r2 < 1 cm
    {'type': 'eq', 'fun': lambda x: x[5] - 2.7},  # p2 = 2.698 g/cm³
    {'type': 'ineq', 'fun': lambda x: 6 - x[2]},  # p1 = 2.698 g/cm³
    {'type': 'ineq', 'fun': lambda x: x[1] - 1},  # h1 > 1 cm
    {'type': 'ineq',
     'fun': lambda x: 400 - (math.pi * (x[0] ** 2) * x[1] * x[2] + math.pi * (x[3] ** 2) * x[4] * x[5])},
    # mc1 + mc2 < 400 g
    {'type': 'ineq', 'fun': lambda x: x[0]},
    {'type': 'ineq', 'fun': lambda x: x[1]},
    {'type': 'ineq', 'fun': lambda x: x[2]},
    {'type': 'ineq', 'fun': lambda x: x[3]},
    {'type': 'ineq', 'fun': lambda x: x[4]},
    {'type': 'ineq', 'fun': lambda x: x[5]}

)

# L'algorithme d'optimisation a besoin d'une valeur initiale pour démarrer
# On choisi ici une valeur pas trop éloignée de ce que l'on s'attend à obtenir
# Il est nécessaire de cette valeur initiale respecte les contraites
# X0 = [2, -2]
# r1, h1, p1, r2, h2, p2
# X0 = [2.5, 2, 0,95, 1.5, 79, 2,698]
X0 = [5, 2, 2.7, 1.5, 72, 2.7]

# On exécute la fonction d'optimisation.
# Les paramètres sont : la fonction à minimiser, la valeur initiale et le dictionnaire des contraintes
# La fonction retourne un objet de type OptimizeResult
# res = minimize(f, X0, constraints=cons)
res = minimize(h0max, X0, constraints=cons)

# On affiche le contenu de l'objet
print(res)

# Code pour tracer la fonction à minimiser
'''
# Make data
x = np.arange(-3, 3, 0.1)
y = np.arange(-3, 3, 0.1)
Xmesh, Ymesh = np.meshgrid(x, y)
Z = np.zeros_like(Xmesh)
for i, xi in enumerate(x):
    for j, yi in enumerate(y):
        Z[j, i] = f([xi, yi])

# Plot the surface
fig1, ax1 = plt.subplots(subplot_kw={"projection": "3d"})
surf = ax1.plot_surface(Xmesh, Ymesh, Z, cmap=cm.coolwarm, linewidth=1, antialiased=False)
# Add a color bar which maps values to colors.
fig1.colorbar(surf, shrink=0.5, aspect=5)
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.set_zlabel('z')
ax1.set_title('Vue 3D')

# Plot the contour
fig2, ax2 = plt.subplots()
cont = ax2.contourf(Xmesh, Ymesh, Z, cmap=cm.coolwarm, antialiased=False)
plt.grid()
# Add a color bar which maps values to colors.
fig2.colorbar(cont, shrink=0.5, aspect=5)
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title('Contour')

plt.show()
'''
