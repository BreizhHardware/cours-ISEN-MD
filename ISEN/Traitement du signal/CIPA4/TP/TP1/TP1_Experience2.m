%% Expérience 2 : Génération et Tracé d'un Signal Complexe

clc;        % Nettoie la fenêtre de commande
clear;      % Supprime toutes les variables de l'espace de travail
close all;  % Ferme toutes les figures ouvertes

% --- Paramètres ---
T_debut = 0;    % Temps de début (s)
T_fin = 10;     % Temps de fin (s)
Fs = 10;        % Fréquence d'échantillonnage (Hz)

% Calcul de la période et du vecteur temps
Ts = 1/Fs;                  % Période d'échantillonnage (s)
t = T_debut : Ts : T_fin;   % Vecteur temps échantillonné

% --- Calcul du Signal y(t) ---
% y(t) = sin²(t) * [sin(t²)] / [eᵗ + e⁻ᵗ]

% Le dénominateur [eᵗ + e⁻ᵗ] est égal à 2 * cosh(t)
% On utilise l'expression originale eᵗ + e⁻ᵗ pour la clarté et l'adhérence
% au signal :

% Numérateur (Partie 1) : sin²(t)
Num1 = sin(t) .^ 2; 

% Numérateur (Partie 2) : sin(t²)
Num2 = sin(t .^ 2); 

% Dénominateur : eᵗ + e⁻ᵗ
Den = exp(t) + exp(-t);

% Assemblage du signal y(t)
y = Num1 .* (Num2 ./ Den);

% --- Tracé du Signal ---
figure('Name', 'Expérience 2: Signal Complexe');

plot(t, y, 'b-'); % Trace la courbe en bleu
title('Expérience 2: Signal y(t) = sin^{2}(t) \frac{sin(t^{2})}{e^{t} + e^{-t}} à Fs = 10 Hz');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;