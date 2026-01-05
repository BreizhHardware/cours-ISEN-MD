%% Experiment 6 : Magnitude spectrum of x(t)
% Sampling period Ts = 0.5 ms, time interval [0, 2 s]
% x(t) = sin(4000 t) + 2 cos(4000 t - 32) + cos^2(2000 t)

clc;
clear;
close all;

%% 1) Sampling parameters

Ts = 0.5e-3;              % Sampling period (s)
Fs = 1 / Ts;              % Sampling frequency (Hz) -> 2000 Hz
t  = 0 : Ts : 2;          % Time vector from 0 to 2 s
N  = length(t);           % Number of samples

%% 2) Generate the signal x(t)

x = sin(4000*t) + 2*cos(4000*t - 32) + cos(2000*t).^2;

%% 3) Compute FFT and magnitude spectrum (single-sided)

X = fft(x);                       % N-point FFT of x(t) 
magX = abs(X);                    % Magnitude spectrum
halfN = floor(N/2) + 1;           % First half (real signal -> symmetric) 
magX_half = magX(1:halfN);

% Frequency axis in Hz
f = (0:halfN-1) * (Fs/N);         % f_k = k * Fs / N  

%% 4) Plot magnitude spectrum

figure;
plot(f, magX_half, 'g');          % Green magnitude spectrum
xlabel('Frequency (Hz)');
ylabel('|X(f)|');
title('Experiment 6 : Magnitude spectrum of x(t)');
grid on;
