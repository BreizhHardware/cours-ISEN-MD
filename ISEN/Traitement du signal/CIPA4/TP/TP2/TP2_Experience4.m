%% Experiment 4 : Magnitude spectra of composed signals

clc;
clear;
close all;

%% ========================== PART i ==========================
% i) Set the sampling period to 0.5 ms and time interval [0, 2 s]
%    x(t) = sin(4000 t) + 2 cos(4000 t - 32) + cos^2(2000 t)

Ts1 = 0.5e-3;               % Sampling period (s)
Fs1 = 1 / Ts1;              % Sampling frequency (Hz) -> 2000 Hz
t1  = 0 : Ts1 : 2;          % Time vector (s)
N1  = length(t1);           % Number of samples

% Define the signal x1(t)
x1 = sin(4000*t1) + 2*cos(4000*t1 - 32) + cos(2000*t1).^2;

% FFT and magnitude spectrum (single-sided)
X1    = fft(x1);                       % Complex FFT of x1
magX1 = abs(X1);                       % Magnitude spectrum
halfN1 = floor(N1/2) + 1;              % First half (real signal) [web:171]
magX1_half = magX1(1:halfN1);
f1 = (0:halfN1-1) * (Fs1/N1);          % Frequency axis in Hz

figure('Name','Experiment 4 - Part i');
plot(f1, magX1_half, 'g');             % Green magnitude spectrum
xlabel('Frequency (Hz)');
ylabel('|X_1(f)|');
title('Experiment 4 - Part i : Magnitude spectrum of x(t)');
grid on;

%% ========================== PART ii ==========================
% ii) Set the sampling frequency to 5 kHz and time interval [0, 2 s]
%     x(t) = 0.1 sin(2000 * sqrt(t)) + 0.01 sin(4000 t) + 0.01 cos(7000 t)
% Note: Interpret "2000 t1/2" as 2000 * sqrt(t), i.e., t^(1/2).

Fs2 = 5000;                 % Sampling frequency (Hz)
Ts2 = 1 / Fs2;              % Sampling period (s)
t2  = 0 : Ts2 : 2;          % Time vector (s)
N2  = length(t2);           % Number of samples

% Avoid sqrt(0) issues in instantaneous frequency by allowing t = 0 (OK in MATLAB)
x2 = 0.1 * sin(2000 * sqrt(t2)) + 0.01 * sin(4000*t2) + 0.01 * cos(7000*t2);

% FFT and magnitude spectrum (single-sided)
X2    = fft(x2);
magX2 = abs(X2);
halfN2 = floor(N2/2) + 1;
magX2_half = magX2(1:halfN2);
f2 = (0:halfN2-1) * (Fs2/N2);          % Frequency axis in Hz

figure('Name','Experiment 4 - Part ii');
plot(f2, magX2_half, 'g');             % Green magnitude spectrum
xlabel('Frequency (Hz)');
ylabel('|X_2(f)|');
title('Experiment 4 - Part ii : Magnitude spectrum of x(t)');
grid on;
