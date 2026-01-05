%% Experiment 1 : FFT of sinusoidal mixtures (magnitude spectra only)

clc;
clear;
close all;

%% ========================== PART i ==========================
%% i) Ts = 0.2 ms, t in [0, 4 s]

Ts1   = 0.2e-3;               % Sampling period (s)
Fs1   = 1 / Ts1;              % Sampling frequency (Hz)
t1    = 0 : Ts1 : 4;          % Time vector
N1    = length(t1);           % Number of samples

fi1   = Fs1 / N1;             % Frequency resolution (Hz)
k1    = 0 : (N1-1);           % FFT index vector
f_full_1 = k1 * fi1;          % Full frequency axis

% Signal: x(t) = sin(2000 t + 56) * sin(56 - 6000 t) + 2 cos(4000 t)
x1 = sin(2000*t1 + 56) .* sin(56 - 6000*t1) + 2*cos(4000*t1);

%% i-a) Magnitude spectrum of x(t)  (single-sided)

X1 = fft(x1);                     % N-point FFT
half_N1   = floor(N1/2) + 1;      % Length of single-sided spectrum
X1_half   = X1(1:half_N1);        % Positive frequencies only
f1_half   = f_full_1(1:half_N1);  % Frequency axis (Hz)
magX1     = abs(X1_half);         % Magnitude of complex spectrum

figure('Name','Part i-a: |X(f)| of x(t)');
plot(f1_half, magX1, 'r-');
title('Part i-a: magnitude spectrum |X(f)| of x(t)');
xlabel('Frequency (Hz)');
ylabel('|X(f)|');
grid on;

%% i-b) Magnitude spectrum of x^2(t)  (single-sided)

x2 = x1.^2;                   % x^2(t)
X2 = fft(x2);                 % FFT of x^2(t)

X2_half   = X2(1:half_N1);
magX2     = abs(X2_half);
% Same frequency axis f1_half

figure('Name','Part i-b: |X_2(f)| of x^2(t)');
plot(f1_half, magX2, 'm-');
title('Part i-b: magnitude spectrum |X_2(f)| of x^2(t)');
xlabel('Frequency (Hz)');
ylabel('|X_2(f)|');
grid on;

%% ========================== PART ii ==========================
%% ii) Fs = 5 kHz, t in [0, 2 s]
% x(t) = cos(2000 t^2) + 0.01 sin(2000 t) + 0.01 sin(10000 t)

Fs2   = 5000;                % Sampling frequency (Hz)
Ts2   = 1 / Fs2;             % Sampling period (s)
t2    = 0 : Ts2 : 2;         % Time vector
N2    = length(t2);          % Number of samples

fi2   = Fs2 / N2;            % Frequency resolution
k2    = 0 : (N2-1);
f_full_2 = k2 * fi2;

x3 = cos(2000*t2.^2) + 0.01*sin(2000*t2) + 0.01*sin(10000*t2);

X3 = fft(x3);                % FFT

half_N2   = floor(N2/2) + 1;
X3_half   = X3(1:half_N2);
f2_half   = f_full_2(1:half_N2);
magX3     = abs(X3_half);

figure('Name','Part ii: |X(f)| of chirp signal');
plot(f2_half, magX3, 'b-');
title('Part ii: magnitude spectrum |X(f)| of x(t)');
xlabel('Frequency (Hz)');
ylabel('|X(f)|');
grid on;
