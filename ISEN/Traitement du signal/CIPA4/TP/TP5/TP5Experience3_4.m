%% Experiment 3 : Root-raised cosine (RRC) filter (subject 1)

clc;
clear;
close all;

%% Parameters

T   = 2e-3;              % Symbol period (2 ms)
al  = 0.1;               % Roll-off factor alpha (subject 1)
Te  = 1.4e-3;            % Sampling period (s) (near 1.6ms)
Fs  = 1 / Te;            % Sampling frequency (Hz)

t = -10*T : Te : 10*T;   % Time vector from -10T to +10T

%% Impulse response h(t) using the given formula

num = sin(pi*t/T * (1 - al)) + (4*al*t/T) .* cos(pi*t/T * (1 + al));
den = (pi*t/T) .* (1 - (4*al*t/T).^2);

h = (al / sqrt(T)) * (num ./ den);

% Handle singularity at t = 0 using theoretical limit
h(t == 0) = (1/sqrt(T)) * (1 - al + 4*al/pi);

%% 1) Time-domain visualization of h(t)

figure('Name','Impulse response h(t)');
plot(t, h, 'g', 'LineWidth', 1.2);
grid on;
xlabel('Time (s)');
ylabel('h(t)');
title('Impulse response h(t) for root-raised cosine filter');

%% 2) Amplitude spectrum of h(t)

NFFT = 2^12;                          % FFT length
H_freq = abs(fftshift(fft(h, NFFT))); % Magnitude spectrum (centered)
f = linspace(-Fs/2, Fs/2, NFFT);      % Frequency axis (Hz)

figure('Name','Amplitude spectrum of h(t)');
plot(f, H_freq / max(H_freq), 'g', 'LineWidth', 1.2);
grid on;
xlabel('Frequency (Hz)');
ylabel('Normalized magnitude');
title('Normalized amplitude spectrum of h(t)');

%% Theoretical maximum frequency of the RRC filter

f_max_theoretical = (1 + al) / (2 * T);   % Hz
fprintf('Theoretical maximum frequency : %.2f Hz (%.3f kHz)\n', ...
        f_max_theoretical, f_max_theoretical/1000);
