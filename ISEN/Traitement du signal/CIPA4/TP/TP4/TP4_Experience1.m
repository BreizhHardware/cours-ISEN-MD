%% Experiment 1 : Baseband recovery from TP4cipaQ1.mat

clc;
clear;
close all;

%% 0) Load data

data   = load('TP4cipaQ1.mat');   
fields = fieldnames(data);         % Get field names
sig    = data.(fields{1});         
sig    = sig(:);                   

Fs = 96000;                        % Sampling frequency (Hz)
Ts = 1/Fs;                         % Sampling period (s)

N = length(sig);                   % Number of samples
t = (0:N-1) * Ts;                  % Time axis (s)

%% i) Plot full signal y(t)

figure('Name','i) Full signal y(t)');
plot(t, sig, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('Full signal y(t) sampled at 96 kHz');
grid on;

%% ii) Plot first 10000 samples of y(t)

Nseg    = min(10000, N);           % Limit to 10000 samples
t_seg   = t(1:Nseg);
sig_seg = sig(1:Nseg);

figure('Name','ii) First 10000 samples of y(t)');
plot(t_seg, sig_seg, 'g');
xlabel('Time (s)');
ylabel('Amplitude');
title('First 10000 samples of y(t)');
grid on;

%% iii) Amplitude spectrum of y(t) (frequencies in Hz)

Y    = fft(sig);                   % FFT of signal 
magY = abs(Y);                     % Magnitude spectrum 

halfN     = floor(N/2) + 1;        % Positive-frequency part
magY_half = magY(1:halfN);
f        = (0:halfN-1) * (Fs/N);   % Frequency axis (Hz)

figure('Name','iii) Amplitude spectrum of y(t)');
plot(f, magY_half, 'g');
xlabel('Frequency (Hz)');
ylabel('|Y(f)|');
title('Single-sided amplitude spectrum of y(t)');
grid on;
xlim([0 Fs/2]);

%% Low-pass filter design with Butterworth (baseband extraction)

Fc    = 5000;                      % Cutoff frequency (Hz)
Wn    = Fc / (Fs/2);               % Normalized cutoff (0..1) relative to Nyquist 
order = 4;                         % Filter order 

[b, a] = butter(order, Wn, 'low'); % Low-pass Butterworth filter

%% Apply the low-pass filter

y_filt = filter(b, a, sig);

%% iv) Amplitude spectrum of filtered signal (frequencies in kHz)

YF    = fft(y_filt);
magYF = abs(YF);

magYF_half = magYF(1:halfN);
f_kHz      = f / 1000;            % Frequency axis in kHz

figure('Name','iv) Spectrum of filtered signal');
plot(f_kHz, magYF_half, 'g');
xlabel('Frequency (kHz)');
ylabel('|Y_{filt}(f)|');
title('Single-sided amplitude spectrum of filtered signal (baseband)');
grid on;
xlim([0 (Fs/2)/1000]);

%% v) Filtered signal y_filt(t) versus time (s)

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
