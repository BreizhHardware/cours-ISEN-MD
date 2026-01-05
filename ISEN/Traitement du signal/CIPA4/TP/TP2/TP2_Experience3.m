%% Experiment 3 : Power spectrum of "holiday_offer"
% Plot the power spectrum with the same style as the TP figure. [web:81][web:155]

clc;
clear;
close all;

% 1) Load signal from MAT-file
data = load('holiday_offer.mat');
varNames   = fieldnames(data);
signalName = varNames{1};      
x = data.(signalName);         % time-domain signal vector

Fs = 11025;                    % Sampling frequency (Hz)

% 2) FFT-based power spectrum (periodogram)
N    = length(x);
Xdft = fft(x);
Pxx  = (1/N) * abs(Xdft).^2;   % power spectrum estimate [web:154]

% We keep the FULL spectrum (both sides) as in the given figure
f = (0:N-1) * (Fs/N);          % frequency axis from 0 to Fs (≈11025 Hz)

% 3) Plot
figure;                       
plot(f, Pxx, 'g');            
xlabel('Frequency (Hz)');
ylabel('Power');
title('Power spectrum of holiday\_offer signal');
grid on;
xlim([0 Fs]);                  
