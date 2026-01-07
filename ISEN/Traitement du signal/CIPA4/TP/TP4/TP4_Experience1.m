%% Experiment 1 : Baseband recovery from TP4cipaQ1.mat

clc;
clear;
close all;

%% 0) Load data

data = load('TP4cipaQ1.mat');
champs = fieldnames(data);
sig = data.(champs{1});
sig = sig(:);

Fs = 96000;                 % Sampling frequency in Hz (given)
Ts = 1/Fs;                  % Sampling period

N = length(sig);              % Number of samples
t = (0:N-1)*Ts;             % Time axis in seconds 

%% i) Plot y(t) over the whole duration

figure('Name','i) Full signal y(t)');
plot(t, sig, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('Full signal y(t) sampled at 96 kHz');
grid on;

%% ii) Plot the first 10000 samples

Nseg = min(10000, N);       % in case the file is shorter
t_seg = t(1:Nseg);
sig_seg = sig(1:Nseg);

figure('Name','ii) First 10000 samples of y(t)');
plot(t_seg, sig_seg, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('First 10000 samples of y(t)');
grid on;

%% iii) Amplitude spectrum of y(t) (frequencies in Hz)

Y  = fft(sig);
magY = abs(Y);              % magnitude spectrum

halfN = floor(N/2) + 1;     % positive frequencies only
magY_half = magY(1:halfN);
f = (0:halfN-1) * (Fs/N);   % frequency axis in Hz

figure('Name','iii) Amplitude spectrum of y(t)');
plot(f, magY_half, 'g');
xlabel('Frequency (Hz)');
ylabel('|Y(f)|');
title('Single-sided amplitude spectrum of y(t)');
grid on;
xlim([0 Fs/2]);

% Choose cutoff frequency for baseband, e.g. 5 kHz (adapt after seeing spectrum)
Fc = 5000;                       % cutoff in Hz
wc = 2*pi*Fc/Fs;                 % digital radian cutoff

r = 0.95;                        % pole radius (<1); closer to 1 => sharper LP

% Poles at r*exp(±j*wc)  => denominator:
a = [1, -2*r*cos(wc), r^2];

% Simple low-pass numerator (gain 1 - r)
b = (1 - r) * [1, 0, 0];        % two zeros at z=0, gives LP shape

%% Apply the low-pass filter

y_filt = filter(b, a, sig);

%% iv) Amplitude spectrum of filtered signal (frequencies in kHz)

YF  = fft(y_filt);
magYF = abs(YF);

magYF_half = magYF(1:halfN);
f_kHz = f / 1000;               % convert frequency axis to kHz

figure('Name','iv) Spectrum of filtered signal');
plot(f_kHz, magYF_half, 'g');
xlabel('Frequency (kHz)');
ylabel('|Y_{filt}(f)|');
title('Single-sided amplitude spectrum of filtered signal (baseband)');
grid on;
xlim([0 (Fs/2)/1000]);

%% v) Filtered signal versus time (seconds)

figure('Name','v) Filtered signal y\_filt(t)');
plot(t, y_filt, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('Filtered signal in time domain');
grid on;

%% vi) First 10000 samples of filtered signal

y_filt_seg = y_filt(1:Nseg);

figure('Name','vi) First 10000 samples of filtered signal');
plot(t_seg, y_filt_seg, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('First 10000 samples of filtered signal');
grid on;
