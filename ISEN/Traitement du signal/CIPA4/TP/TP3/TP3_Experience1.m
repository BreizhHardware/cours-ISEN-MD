%% Experiment 1 : Extract narrow-band jamming noise from Q2noisy
% Objective:
%   - Load noisy audio file 'Q2noisy.wav'
%   - Plot magnitude spectrum to identify jamming frequency
%   - Design a Butterworth bandstop (notch) filter around that frequency
%   - Filter the signal and save result as 'E71yourname.wav'.

clc;
clear;
close all;

%% 1) Load the WAV file
% Q2noisy.wav must be in the same folder as this script.

[noisySig, Fs] = audioread('Q2noisy.wav');   % noisySig is a column vector, Fs in Hz

% If stereo, convert to mono (average of channels)
if size(noisySig,2) > 1
    noisySig = mean(noisySig, 2);
end

N = length(noisySig);                        % Number of samples
t = (0:N-1)/Fs;                              % Time axis (s)

%% 2) Plot magnitude spectrum to locate jamming frequency

% Compute FFT
X = fft(noisySig);
magX = abs(X);                               % Magnitude spectrum

% Only positive frequencies (single-sided)
halfN = floor(N/2) + 1;
magX_half = magX(1:halfN);
f = (0:halfN-1) * (Fs/N);                    % Frequency axis in Hz

figure('Name','Q2noisy - Magnitude spectrum');
plot(f, magX_half, 'g');
xlabel('Frequency (Hz)');
ylabel('|X(f)|');
title('Magnitude spectrum of Q2noisy');
grid on;
xlim([0 Fs/2]);

fJam = 5000;        

%% 3) Design a suitable Butterworth bandstop (notch) filter

% Choose a small stopband around the jamming frequency, e.g. ±50 Hz
deltaF = 50;            % half-width of stopband (Hz) - adjust if needed

f1 = (fJam - deltaF);   % lower edge of stopband (Hz)
f2 = (fJam + deltaF);   % upper edge of stopband (Hz)

% Normalise frequencies w.r.t Nyquist (Fs/2) for BUTTER.
Wn = [f1 f2] / (Fs/2);   % normalized stopband [0..1]

% Filter order (higher -> sharper notch but more phase distortion)
Nfilt = 4;               % 4th-order Butterworth bandstop (typical choice)

[b, a] = butter(Nfilt, Wn, 'stop');   % bandstop (notch) filter

% (Optionnel) Afficher la réponse fréquentielle du filtre
% figure; freqz(b,a,1024,Fs); grid on;

%% 4) Filter the noisy signal

cleanSig = filter(b, a, noisySig);    % Apply the filter to remove narrow-band noise

%% 5) Save the result

audiowrite('E71marquet.wav', cleanSig, Fs);   