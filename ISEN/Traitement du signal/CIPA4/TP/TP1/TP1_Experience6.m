%% Expérience 6 : Génération des Signaux avec Ts = 10 ms (Fs = 100 Hz)

clc;        % Nettoie la fenêtre de commande
clear;      % Supprime toutes les variables de l'espace de travail
close all;  % Ferme toutes les figures ouvertes

% --- Paramètres d'Échantillonnage ---
Ts = 10 / 1000; % Période d'échantillonnage (10 ms = 0.01 s)

% =========================================================================
%% Signal 1 (Gauche) : Chirp Amorti
% Intervalle : [0, 14] secondes
T_start_1 = 0;
T_end_1 = 14;
t1 = T_start_1 : Ts : T_end_1;

% Modèle MIS À JOUR : y(t) = e^(-0.12t) * sin(2*pi * (0.5 + 0.05*t) * t)
% Fréquence initiale = 0.5 Hz (Période initiale = 2 s).
% Taux de balayage réduit à 0.05 pour que la première oscillation ne soit pas affectée.
amplitude_damp = exp(-0.12 * t1);

% Fréquence instantanée : 0.5 (initiale) + 0.05*t (balayage réduit)
frequency_sweep = (0.5 + 0.05 * t1); 

y1 = amplitude_damp .* sin(2 * pi * frequency_sweep .* t1);

% Tracé du Signal 1
figure('Name', 'Expérience 6 - Signal 1 (Chirp Amorti) - Période Initiale 2s');
plot(t1, y1, 'b-');
title('Signal 1 : Chirp Amorti (Période initiale T_{0} = 2 s)');
xlabel('Temps (s)');
ylabel('Amplitude');
ylim([-1, 1]); 
grid on;

% =========================================================================
%% Signal 2 (Droite) : Combinaison de Sinusoïde et Onde Rectangulaire
% Intervalle : [0, 10] secondes
T_start_2 = 0;
T_end_2 = 10;
t2 = T_start_2 : Ts : T_end_2;
N2 = length(t2);

% Initialisation du signal à zéro
y2 = zeros(1, N2);

% --- 1. Composante Sinusoïde (Actif sur [0, 3]) ---
idx_sin = (t2 >= 0) & (t2 <= 3);
% 0.5 * sin(pi*t) -> T=2s, F=0.5Hz, A=0.5
y2(idx_sin) = y2(idx_sin) + 0.5 * sin(pi * t2(idx_sin));

% --- 2. Composante Onde Rectangulaire (Segments carrés) ---
% Segment 1 : Amplitude = 1.0 sur [4, 6]
idx_rect1 = (t2 >= 4) & (t2 <= 6);
y2(idx_rect1) = y2(idx_rect1) + 1.0;

% Segment 2 : Amplitude = -1.0 sur [6, 8]
idx_rect2 = (t2 >= 6) & (t2 <= 8);
y2(idx_rect2) = y2(idx_rect2) - 1.0;

% Segment 3 : Amplitude = 0 sur les autres intervalles impliquant l'onde carrée.
% Le signal sinusoïdal est déjà inclus.

% Tracé du Signal 2
figure('Name', 'Expérience 6 - Signal 2 (Combiné)');
plot(t2, y2, 'b-');
title('Signal 2 : Sinusoïde + Onde Rectangulaire (F_{s}=100 Hz)');
xlabel('Temps (s)');
ylabel('Amplitude');
ylim([-2, 2]); % Ajustement des limites d'amplitude comme sur le graphique
grid on;