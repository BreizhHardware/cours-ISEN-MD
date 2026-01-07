%% Experiment 3 : Recovery of a(t) from y1(t) and y2(t)

clc;
clear;
close all;

%% Load data from MAT-file

data = load('TP4cipaQ3.mat');
y1 = data.y1;
y2 = data.y2;
y1 = y1(:);                     
y2 = y2(:);

Fs = 96000;                      % Sampling frequency (Hz)
Ts = 1/Fs;                       % Sampling period (s)
N  = length(y1);                 % Number of samples
t  = (0:N-1)*Ts;                 % Time axis (s)

%% Recover a(t) using the hint cos^2 + sin^2 = 1
% a(t) is the envelope common to y1 and y2.

a = sqrt( y1.^2 + y2.^2 );   

%% Plot y1(t) and y2(t) in time domain

figure('Name','y1(t) and y2(t)');
subplot(2,1,1);
plot(t, y1, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('y1(t) = a(t) cos(2\pi 30000 t + A)');
grid on;

subplot(2,1,2);
plot(t, y2, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('y2(t) = a(t) sin(2\pi 30000 t + A)');
grid on;

%% Plot a(t) in time domain

figure('Name','a(t)');
plot(t, a, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('Recovered envelope a(t) = sqrt(y1(t)^2 + y2(t)^2)');
grid on;

%% Amplitude spectrum of a(t) in kHz and in dB

A_fft = fft(a);                  
magA   = abs(A_fft);             

halfN = floor(N/2) + 1;          % Positive frequencies only
magA_half = magA(1:halfN);

f_Hz  = (0:halfN-1)*(Fs/N);      % Frequency axis (Hz)
f_kHz = f_Hz / 1000;             % Convert to kHz

% Convert magnitude to dB scale (20*log10), avoid log(0) using eps
magA_dB = 20*log10(magA_half + eps);

figure('Name','Amplitude spectrum of a(t)');
plot(f_kHz, magA_dB, 'g');
xlabel('Frequency (kHz)');
ylabel('Amplitude (dB)');
title('Single-sided amplitude spectrum of a(t)');
grid on;
xlim([0 Fs/2000]);               % From 0 to Nyquist frequency in kHz
