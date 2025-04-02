from scipy.optimize import minimize
import math
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm


# htetamax est la fonction à minimiser
def htetamax(X): # Le paramètre X est une liste de deux floats

#nous avons rentré les variables que l'on cherche
    r1= X[0]
    r2= X[1]
    ro1=X[2]
    ro2=X[3]
    h1=X[4]
    h2=X[5]
    v1=math.pi*(r1**2)*h1
    v2=math.pi*(r2**2)*h2
    m1=v1*ro1
    m2=v2*ro2
    teta=25     #car d'après le cahier des charges, on sait que la canne doit revenir à la verticale lors d'une inclinaison de 25° par rapport de sol

    return math.sqrt((r1**2)+((1/m1+m2)*((1/2*h1*m1)+(h1+1/2*h2*m2)))**2)*math.cos(math.atan(1/r1*((1/m1+m2)*(1/2*h1*m1)+(h1+1/2*h2*m2))))+teta  #la fonction qu'on veut minimiser



# Les contraintes sont regroupées dans un dictionnaire
cons=(
    {'type': 'ineq','fun': lambda x:2-x[1]*2},           #cette contrainte est : r2*2<2cm
    {'type': 'ineq','fun': lambda x:x[1]*2-1},           #cette contrainte est : r2*2>1cm
    {'type': 'ineq','fun': lambda x:(x[4]+x[5])-75},     #cette contrainte est : h1+h2>75cm
    {'type': 'ineq','fun': lambda x:90-(x[4]+x[5])},     #cette contrainte est : h1+h2<90cm
    {'type': 'ineq', 'fun': lambda x:400-((x[2]*(math.pi*x[0]**2*x[4]))+(x[3]*(math.pi*x[1]**2*x[5])))}, #cette contrainte est : m1+m2<400g
    {'type': 'ineq', 'fun': lambda x:30-(math.pi*x[0]**2)},    #cette contrainte est : pi*r1**2 <30cm**2
    {'type': 'ineq', 'fun': lambda x:3-(x[4])},                #cette contrainte est : h1<3cm

    {'type': 'eq', 'fun': lambda x:x[3]-2.7},            #cette contrainte est : ro2=2,7cm/g (pour que la tige soit en aluminium)
    {'type': 'eq', 'fun': lambda x:x[2]-11},            #cette contrainte est : ro1=2,7 (on considère que c'est de l'aluminium)
    {'type': 'ineq', 'fun': lambda x:(x[4])-1},          #cette contrainte est : h1>1  (sinon on obtient des valeurs très petites qu'on ne peut pas étudier avec le modeleur 3D paramétrique)

#ces contraintes permettent de nous assurer qu'on a des valeurs positives
    {'type': 'ineq','fun': lambda x: x[0]},
    {'type': 'ineq','fun': lambda x: x[1]},
    {'type': 'ineq','fun': lambda x: x[2]},
    {'type': 'ineq','fun': lambda x: x[3]},
    {'type': 'ineq','fun': lambda x: x[4]},
    {'type': 'ineq','fun': lambda x: x[5]},
    )



X0 = [2.5,0.75,11,2.7,2,85]  #valeur initiale qui respecte les contraintes


res = minimize(htetamax, X0, constraints=cons)


print(res)


