%% Expérience 5 : Génération et Tracé des Signaux par Morceaux et Retardés
% Ce script implémente les questions i/, ii/ et iii/ en utilisant
% T=1s et une fréquence d'échantillonnage élevée.

clc;        % Nettoie la fenêtre de commande
clear;      % Supprime toutes les variables de l'espace de travail
close all;  % Ferme toutes les figures ouvertes

% --- 1. Paramètres Généraux ---
T = 1;         % Période T (choisie à 1 seconde)
Fs = 1000;     % Fréquence d'échantillonnage (pour un tracé lisse)
Ts = 1/Fs;     % Période d'échantillonnage

% Définition du vecteur temps global : [0, 5T] pour couvrir tous les signaux
T_global_start = 0;
T_global_end = 5 * T; 
t = T_global_start : Ts : T_global_end; % Vecteur temps en secondes
N = length(t); % Nombre d'échantillons

% Initialisation des signaux à zéro
m = zeros(1, N);
n = zeros(1, N);
p = zeros(1, N);

% =========================================================================
%% Question i/ : Générer et Tracer le signal m(t)
% m(t) = 1, si t in [T, 2T]
% m(t) = t/T - 3, si t in [3T, 4T]
% m(t) = 0, sinon

% 1. Partie Rectangulaire : m(t)=1, si t in [T, 2T]
idx_m1 = (t >= T) & (t <= 2*T);
m(idx_m1) = 1;

% 2. Partie Linéaire : m(t)=t/T - 3, si t in [3T, 4T]
idx_m2 = (t >= 3*T) & (t <= 4*T);
% On utilise l'opération terme à terme (./ et -)
m(idx_m2) = t(idx_m2) ./ T - 3; 

% Tracé i/
figure('Name', 'Expérience 5 - i/ Signal m(t)');
plot(t, m, 'b-', 'LineWidth', 2); 
title('i/ Signal m(t) défini par morceaux');
xlabel('Temps (s)');
ylabel('Amplitude m(t)');
ylim([-3.5, 1.5]); % Ajustement des limites
grid on;

% =========================================================================
%% Question ii/ : Générer et Tracer le signal n(t)
% n(t) = sin(2*pi*t/T), si t in [0, T/2]
% n(t) = 0, sinon

% Définition n(t) = sin(2*pi*t/T), si t in [0, T/2]
idx_n = (t >= 0) & (t <= T/2);
n(idx_n) = sin(2 * pi * t(idx_n) / T);

% Tracé ii/
figure('Name', 'Expérience 5 - ii/ Signal n(t)');
plot(t, n, 'm-', 'LineWidth', 2); % Trace en magenta
title('ii/ Signal n(t) = sin(2\pi t/T) sur [0, T/2]');
xlabel('Temps (s)');
ylabel('Amplitude n(t)');
ylim([-0.2, 1.2]); 
grid on;

% =========================================================================
%% Question iii/ : Générer et Tracer le signal retardé p(t)
% p(t) = n(t - d), avec d = T/4

d = T / 4; % Retard d = T/4

% Le signal p(t) est n(t-d)
% La condition pour p(t) est que l'argument (t-d) doit être dans [0, T/2]
% Condition sur t : d <= t <= T/2 + d
idx_p = (t >= d) & (t <= T/2 + d);

% Dans cette plage d'indices, p(t) = sin(2*pi*(t-d)/T)
t_delayed = t - d;
p(idx_p) = sin(2 * pi * t_delayed(idx_p) / T);

% Tracé iii/ (n(t) et p(t) ensemble pour montrer le retard)
figure('Name', 'Expérience 5 - iii/ Signal n(t) et sa version retardée p(t)');

% Tracé de n(t) (référence)
plot(t, n, 'b-', 'LineWidth', 2);
hold on; 

% Tracé de p(t) (retardé)
plot(t, p, 'r--', 'LineWidth', 2);
hold off;

title('iii/ Signal n(t) et sa version retardée p(t) = n(t - T/4)');
xlabel('Temps (s)');
ylabel('Amplitude');
legend('n(t) (Référence)', ['p(t) = n(t - ', num2str(d), 's)'], 'Location', 'NorthEast');
grid on;