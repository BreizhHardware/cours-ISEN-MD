%% Expérience 4 : Analyse du Signal 'holiday_offer.mat'

clc;        % Nettoie la fenêtre de commande
clear;      % Supprime toutes les variables de l'espace de travail
close all;  % Ferme toutes les figures ouvertes

% --- 1. Chargement et Paramètres ---
try
    % Charge le fichier .mat. Il contiendra probablement une variable de signal
    % (souvent nommée 'y' ou 'data')
    load('holiday_offer.mat'); 
    
    % On suppose que la variable contenant le signal est nommée 'y' ou 'data'.
    % Si votre fichier .mat a un nom de variable différent, changez 'y' ci-dessous.
    % Par exemple, si la variable s'appelle 'signal_data', utilisez signal_data = y;
    if exist('y', 'var')
        signal = y;
    elseif exist('data', 'var')
        signal = data;
    else
        % Si le nom de la variable est inconnu, cela pourrait causer une erreur.
        % Vous devriez vérifier le nom de la variable après le 'load'.
        error('Variable de signal non trouvée (attendue: y ou data). Vérifiez le fichier .mat.');
    end
    
catch
    error('Erreur lors du chargement de ''holiday_offer.mat''. Assurez-vous que le fichier est présent.');
end

Fs = 11025; % Fréquence d'échantillonnage (samples/second)
N = length(signal); % Longueur totale du signal
Ts = 1/Fs; % Période d'échantillonnage

% --- 2. Tracé i/ : Échantillons 18100 à 18300 ---

index_i_start = 18100;
index_i_end = 18300;
t_i = (index_i_start : index_i_end) * Ts; % Vecteur temps

figure('Name', 'Expérience 4 - i/');
plot(t_i, signal(index_i_start : index_i_end), 'b');
title('i/ Portion du signal : Échantillons 18100 à 18300');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;

% --- 3. Tracé ii/ : Échantillons 18300, 18280, 18260, ..., 18100 ---

% Création du vecteur d'indices avec un pas de -20
indices_ii = 18300 : -20 : 18100;
t_ii = indices_ii * Ts; % Vecteur temps

figure('Name', 'Expérience 4 - ii/');
plot(t_ii, signal(indices_ii), 'r.'); % Utilisation de points pour montrer les échantillons discrets
title('ii/ Portion du signal : Échantillons [18300 : -20 : 18100]');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;

% --- 4. Tracé iii/ : Échantillons 18100, 18101...18300, 8100, 8101...8300 ---

% Création du premier bloc (continu) : 18100 à 18300
indices_iii_1 = 18100 : 18300;
% Création du second bloc (continu) : 8100 à 8300
indices_iii_2 = 8100 : 8300;

% Combinaison des deux blocs d'indices
indices_iii = [indices_iii_1, indices_iii_2];

% Vérification que les indices sont valides (entre 1 et N)
indices_iii = indices_iii(indices_iii >= 1 & indices_iii <= N);

t_iii = (1 : length(indices_iii)) * Ts; % Un nouveau vecteur temps pour le tracé combiné

figure('Name', 'Expérience 4 - iii/');
% Le tracé d'un vecteur d'indices non consécutifs donne des lignes étranges
% Par conséquent, nous traçons le signal en utilisant un index linéaire
% et notons que la représentation temporelle est "segmentée"
plot(indices_iii, signal(indices_iii), 'g-'); 
title('iii/ Portion du signal : Échantillons [18100:18300] et [8100:8300]');
xlabel('Indice d''échantillon (n)'); % Changement d'étiquette pour plus de clarté
ylabel('Amplitude');
grid on;

% --- 5. Tracé iv/ : Période 1.9 sec à 2 sec ---

T_start = 1.9; % Temps de début (s)
T_end = 2.0;   % Temps de fin (s)

% Conversion des temps en indices d'échantillons
index_iv_start = round(T_start * Fs) + 1; % +1 car MATLAB commence à l'index 1
index_iv_end = round(T_end * Fs);

% Assurer que les indices sont dans les limites du signal
index_iv_start = max(1, index_iv_start);
index_iv_end = min(N, index_iv_end);

indices_iv = index_iv_start : index_iv_end;
t_iv = indices_iv * Ts; % Vecteur temps

figure('Name', 'Expérience 4 - iv/');
plot(t_iv, signal(indices_iv), 'm');
title('iv/ Portion du signal : Temps 1.9 s à 2.0 s');
xlabel('Temps (s)');
ylabel('Amplitude');
grid on;