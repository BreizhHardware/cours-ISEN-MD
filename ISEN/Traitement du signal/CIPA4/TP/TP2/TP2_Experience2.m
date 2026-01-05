%% Experiment 2 : Recreation of a signal

clc;
clear;
close all;

Fs = 4000;                 % Sampling frequency (Hz)
N  = 2048;                 % Number of samples
t  = (0:N-1)/Fs;           % Time vector (s)

df = Fs/N;                 % Frequency resolution (Hz)

% --- 1) Desired peak frequencies (Hz) ---
f_target = [300 400 700 1300 1600 1700];

% Align each frequency with the closest FFT bin to avoid spectral leakage.
k = round(f_target/df);    % Integer FFT bin indices
f = k * df;                % Actual frequencies used (bin-aligned)

% --- 2) Desired peak heights in |FFT| ---
H = [1000 2000 3250 3250 2000 1000];

% --- 3) Amplitudes of the cosines for those peak heights ---
% For a cosine perfectly aligned to a bin, the peak in |FFT| is about N*A/2,
% so we choose A = 2*H/N to obtain the target height H. 
A = 2*H / N;

% --- 4) Build the time-domain signal y(t) as a sum of cosines ---
% Random phases are used because the magnitude spectrum does not depend on phase.
phi = 2*pi*rand(size(f));  % Random phase for each component
y   = zeros(size(t));      % Initialize signal

for i = 1:length(f)
    y = y + A(i) * cos(2*pi*f(i)*t + phi(i));
end

% --- 5) Compute FFT and plot the magnitude spectrum ---
Y  = fft(y);               % Complex FFT of y(t)
Py = abs(Y);               % Magnitude of the FFT (two-sided, unnormalized) 

f_axis = (0:N-1) * df;     % Frequency axis (Hz)

figure;
stem(f_axis, Py, 'g');     % Discrete spectrum as vertical lines
xlim([0 Fs/2]);            % Show only positive frequencies up to Nyquist
xlabel('Frequency (Hz)');
ylabel('|Y(f)|');
title('Magnitude spectrum with target peak heights');
grid on;
