%% Expérience 7 : Signal à Haute Fréquence et Traitement Non Linéaire

clc;        % Nettoie la fenêtre de commande
clear;      % Supprime toutes les variables de l'espace de travail
close all;  % Ferme toutes les figures ouvertes

% --- 1. Paramètres d'Échantillonnage et Temps ---
F_max = 50000;      % Fréquence maximale du signal (50 kHz)
Fs = F_max * F_max;    % Fréquence d'échantillonnage choisie (1.25 MHz)
Ts = 1/Fs;          % Période d'échantillonnage (0.8 µs)

T_start = 0;
T_end = 0.0005;     % Intervalle de temps [0, 0.0005 s]
t = T_start : Ts : T_end; % Vecteur temps

% --- 2. Génération du Signal d'Entrée x(t) ---
% x(t) = cos(2*pi*20000t) * sin(2*pi*30000t) + 2 * cos(22000t)
F1 = 20000;
F2 = 30000;
F3 = 22000 / (2*pi); % La fréquence angulaire est déjà en radians/s. 

x = cos(2*pi*F1*t) .* sin(2*pi*F2*t) + 2 * cos(22000*t);

% --- 3. Définition du Signal de Sortie y(t) (Traitement Non Linéaire) ---
% y(t) = 2 * x(t) si |x(t)| >= 0.5
% y(t) = x(t) sinon
y = zeros(size(x)); % Initialisation de y(t)

% Création d'un masque pour les conditions
% Condition 1: |x(t)| >= 0.5
idx_condition1 = (abs(x) >= 0.5);

% Application de la condition 1
y(idx_condition1) = 2 * x(idx_condition1);

% Application de la condition 2 (l'inverse de la condition 1)
idx_condition2 = ~idx_condition1;
y(idx_condition2) = x(idx_condition2);

% --- 4. Tracé des Signaux x(t) et y(t) ---
figure('Name', 'Expérience 7: Signal Original et Transformé');
plot(t, x, 'b-', 'LineWidth', 1.5);
hold on; 
plot(t, y, 'r--', 'LineWidth', 1.5);
hold off;

title('Expérience 7: Signal x(t) et Signal Transformé y(t)');
xlabel('Temps (s)');
ylabel('Amplitude');
legend('x(t) (Original)', 'y(t) (Transformé)', 'Location', 'NorthEast');
grid on;