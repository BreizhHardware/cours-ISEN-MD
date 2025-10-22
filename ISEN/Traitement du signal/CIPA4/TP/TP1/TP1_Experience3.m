%% Expérience 3 : Implémentation du Système et Tracé

clc;        % Nettoie la fenêtre de commande
clear;      % Supprime toutes les variables de l'espace de travail
close all;  % Ferme toutes les figures ouvertes

% --- 1. Paramètres du Système ---
T_ms = 1;                     % Période T en millisecondes
T = T_ms / 1000;              % Conversion de T en secondes (0.001 s)
K = 1/100;                    % Constante K (0.01)

% Fréquence et période d'échantillonnage
Ts = T / 10;                  % Période d'échantillonnage Ts (1e-4 s)

% Intervalle de temps
T_debut = Ts;                 % Temps de début (Ts)
T_fin = 10 * T;               % Temps de fin (10*T = 0.01 s)

% Vecteur temps en secondes
t = T_debut : Ts : T_fin;

% Vecteur temps en millisecondes pour le tracé (comme demandé)
t_ms = t * 1000;

% --- 2. Génération du Signal d'Entrée x(t) ---
% x(t) = K * sin(2*pi*t/T) / t

% Le terme de division est géré pour éviter la division par zéro si t commençait à 0.
% Comme t commence à Ts, nous utilisons directement l'opérateur de division terme à terme (./).
x = K * (sin(2 * pi * t / T) ./ t);

% --- 3. Tracé du Signal d'Entrée x(t) (Question a/) ---
figure('Name', 'Expérience 3: Signaux Entrée et Sortie');

% Subplot pour l'entrée
subplot(2, 1, 1);
plot(t_ms, x, 'r:'); % Ligne pointillée (:) et couleur rouge (r)
title('a) Signal d''Entrée x(t)');
xlabel('Temps (ms)'); % Proper label en ms
ylabel('Amplitude x(t)');
grid on;

% --- 4. Calcul du Signal de Sortie y(t) (Question c/) ---
% y(t) = x(t) * [1 + sin(2*pi*t/T)]

modulation_term = 1 + sin(2 * pi * t / T);
y = x .* modulation_term; % Multiplication terme à terme avec l'opérateur .*

% --- 5. Tracé du Signal de Sortie y(t) (Question c/) ---
% Subplot pour la sortie
subplot(2, 1, 2);
plot(t_ms, y, 'b-'); % Ligne continue (standard) et couleur bleue (b)
title('c) Signal de Sortie y(t)');
xlabel('Temps (ms)');
ylabel('Amplitude y(t)');
grid on;

% Ajuster la figure pour une meilleure lisibilité
sgtitle('Expérience 3: Analyse du Système');