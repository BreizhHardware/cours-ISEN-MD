%% Experiment 5 : Magnitude spectrum of x(t)
% x(t) = cos(2*pi + 20000*t) * sin(2*pi*30000*t) + 2*cos(22000*t)
% Time interval: [0, 0.4 s]

clc;
clear;
close all;

%% 1) Define continuous-time parameters (for information)
% Angular frequencies (rad/s)
w1 = 20000;              % from cos(2*pi + 20000*t) -> cos(20000*t)
w2 = 2*pi*30000;         % from sin(2*pi*30000*t)
w3 = 22000;              % from cos(22000*t)

% Corresponding frequencies (Hz)
f1 = w1/(2*pi) + 30000;  % highest frequency component
f2 = 30000 - w1/(2*pi);  % lower side frequency
f3 = w3/(2*pi);          % from cos(22000*t)

f_max = f1;              % maximum frequency in the signal

%% 2) Choose sampling frequency Fs and period Ts
Fs = 5 * 2 * f_max;      % Fs chosen well above 2*f_max (safety factor 5)
Ts = 1 / Fs;             % Sampling period (s)

%% 3) Build time vector on [0, 0.4 s]
T_end = 0.4;             
t = 0 : Ts : T_end;      % Time vector
N = length(t);           % Number of samples

%% 4) Generate sampled signal x[n] = x(t)
x = cos(2*pi + 20000*t) .* sin(2*pi*30000*t) + 2*cos(22000*t);

%% 5) Compute FFT and magnitude spectrum (single-sided)

X = fft(x);                      % N-point FFT of x
magX = abs(X);                   % Magnitude spectrum
halfN = floor(N/2) + 1;          % First half (real signal -> symmetric) 
magX_half = magX(1:halfN);

% Frequency axis in Hz
f = (0:halfN-1) * (Fs/N);        % f_k = k * Fs / N 

%% 6) Plot magnitude spectrum

figure;
plot(f, magX_half, 'g');         % Green magnitude spectrum
xlabel('Frequency (Hz)');
ylabel('|X(f)|');
title('Experiment 5 : Magnitude spectrum of x(t)');
grid on;
