%% Expérience 1 : Génération et Tracé des Signaux
% Ce script génère et trace les six signaux demandés dans le tableau,
% en utilisant la fonction subplot pour les organiser.

clc;        % Nettoie la fenêtre de commande
clear;      % Supprime toutes les variables de l'espace de travail
close all;  % Ferme toutes les figures ouvertes

% --- Paramètres Globaux ---
T_debut = 0;    % Temps de début (s)
T_fin = 10;     % Temps de fin (s)

% Crée une nouvelle figure
figure('Name', 'Expérience 1: Signaux Discrets');
sgtitle('Génération et Tracé des Signaux (Expérience 1)'); % Titre général

%% 1. Signal 1 : sin(2.pi.t) à 10 Hz
Fs1 = 10;                     % Fréquence d'échantillonnage (Hz)
Ts1 = 1/Fs1;                  % Période d'échantillonnage (s)
t1 = T_debut : Ts1 : T_fin;   % Vecteur temps
y1 = sin(2 * pi * t1);        % Calcul du signal

subplot(3, 2, 1);
plot(t1, y1, 'b-');
title('1. sin(2\pi t) à Fs = 10 Hz');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;

%% 2. Signal 2 : sin(2.pi.t) à 100 Hz
Fs2 = 100;                    % Fréquence d'échantillonnage (Hz)
Ts2 = 1/Fs2;                  % Période d'échantillonnage (s)
t2 = T_debut : Ts2 : T_fin;   % Vecteur temps
y2 = sin(2 * pi * t2);        % Calcul du signal

subplot(3, 2, 2);
plot(t2, y2, 'r-');
title('2. sin(2\pi t) à Fs = 100 Hz');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;

%% 3. Signal 3 : sin(t) à 10 Hz
Fs3 = 10;                     % Fréquence d'échantillonnage (Hz)
Ts3 = 1/Fs3;                  % Période d'échantillonnage (s)
t3 = T_debut : Ts3 : T_fin;   % Vecteur temps
y3 = sin(t3);                 % Calcul du signal

subplot(3, 2, 3);
plot(t3, y3, 'g-');
title('3. sin(t) à Fs = 10 Hz');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;

%% 4. Signal 4 : sin(t)cos(t) à 10 Hz
Fs4 = 10;                     % Fréquence d'échantillonnage (Hz)
Ts4 = 1/Fs4;                  % Période d'échantillonnage (s)
t4 = T_debut : Ts4 : T_fin;   % Vecteur temps
% Note: Utilisation de '.*' pour la multiplication terme à terme des vecteurs
y4 = sin(t4) .* cos(t4);      % Calcul du signal

subplot(3, 2, 4);
plot(t4, y4, 'm-');
title('4. sin(t)cos(t) à Fs = 10 Hz');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;

%% 5. Signal 5 : sin(t)/exp(t) à 10 Hz
Fs5 = 10;                     % Fréquence d'échantillonnage (Hz)
Ts5 = 1/Fs5;                  % Période d'échantillonnage (s)
t5 = T_debut : Ts5 : T_fin;   % Vecteur temps
% Note: Utilisation de './' pour la division terme à terme des vecteurs
y5 = sin(t5) ./ exp(t5);      % Calcul du signal

subplot(3, 2, 5);
plot(t5, y5, 'c-');
title('5. sin(t)/exp(t) à Fs = 10 Hz');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;

%% 6. Signal 6 : sin(t) + sin(t²) + sin²(t) à 10 Hz
Fs6 = 10;                     % Fréquence d'échantillonnage (Hz)
Ts6 = 1/Fs6;                  % Période d'échantillonnage (s)
t6 = T_debut : Ts6 : T_fin;   % Vecteur temps

% Nouvelle formule : sin(t) + sin(t²) + sin²(t)
% Attention : on utilise les opérateurs pointés (.*, .^, etc.)
y6 = sin(t6) + sin(t6.^2) + sin(t6).^2; % Calcul du signal

subplot(3, 2, 6);
plot(t6, y6, 'g-');
title('6. sin(t) + sin(t^2) + sin^2(t) à Fs = 10 Hz');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;