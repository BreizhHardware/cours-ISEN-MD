%% Experiment 4 : Sampling and filtering (subject 1)

clc;
clear;
close all;

%% 1) Sampling parameters

Fe   = 1000;                 % Sampling frequency (Hz) for subject 1
Te   = 1 / Fe;               % Sampling period (s)
t    = (0:6400) * Te;        % Observation window (0 to 6400 samples -> 6.4 s)

%% 2) Generate x(t)
% x(t) = sin(2000 t^2) + sin(2000 t)^2/100 + sin(2000 t)/100
%        + cos(124000 t + pi/2) + sin(124000 t)

x = sin(2000*t.^2) ...
  + (sin(2000*t).^2)/100 ...
  + sin(2000*t)/100 ...
  + cos(124000*t + pi/2) ...
  + sin(124000*t);

%% 3) Amplitude spectrum of x(t) (0..Fe, axis in kHz)

N    = length(x);
Xfft = abs(fft(x)) / N;               % linear magnitude spectrum 
f_Hz = (0:N-1) * (Fe/N);              % frequency axis from 0 to Fe (Hz)
f_kHz = f_Hz / 1000;                  % in kHz

figure('Name','Amplitude spectrum of x(t)');
plot(f_kHz, Xfft, 'g');
title('Amplitude spectrum of x(t) (0 to Fe)');
xlabel('Frequency (kHz)');
ylabel('Magnitude');
xlim([0 Fe/1000]);                    % 0 .. Fe in kHz
grid on;

%% 4) 8th-order Butterworth low-pass filter (cutoff adapted)

% In the original statement Fe = 5 kHz with Fc = 800 Hz.
% Here Fe is 5 times smaller, so we scale the cutoff: Fc = 800/5 = 160 Hz.
Fc    = 160;                          % cutoff frequency (Hz)
order = 8;                            % filter order
Wn    = Fc / (Fe/2);                  % normalized cutoff (0..1) 

[b, a] = butter(order, Wn, 'low');    % Butterworth low-pass filter

%% 5) Filter the signal to obtain y(t)

y = filter(b, a, x);

%% 6) Amplitude spectrum of filtered signal y(t)

Yfft   = abs(fft(y)) / N;
figure('Name','Amplitude spectrum of filtered signal y(t)');
plot(f_kHz, Yfft, 'g', 'LineWidth', 1.2);
title(['Amplitude spectrum of filtered y(t) (cutoff ', num2str(Fc), ' Hz)']);
xlabel('Frequency (kHz)');
ylabel('Magnitude');
xlim([0 Fe/1000]);
grid on;
