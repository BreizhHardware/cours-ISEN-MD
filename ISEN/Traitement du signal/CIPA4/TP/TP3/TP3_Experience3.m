%% Experiment 3 : Modulation and demodulation of a guitar signal
% Load guitar signal y(t) from 'guitar.wav'
% Fmod = 8820 Hz
% ym(t) = y(t) * sin(2*pi*Fmod*t)
% ys(t) = ym(t) * sin(2*pi*Fmod*t)
% yc(t) = ym(t) * cos(2*pi*Fmod*t)
% Plot amplitude spectrum of y, ym, ys, yc and listen to each. 

clc;
clear;
close all;

%% 1) Load audio file

[y, Fs] = audioread('guitar.wav');      % y: audio vector, Fs: sampling rate

if size(y,2) > 1
    y = mean(y,2);                      % convert to mono if stereo
end

N  = length(y);
t  = (0:N-1)/Fs;                        % time vector

Fmod = 8820;                            % modulation frequency in Hz

%% 2) Generate modulated signals

ym = y .* sin(2*pi*Fmod*t.');           % column vector; DSB-SC around ±Fmod

ys = ym .* sin(2*pi*Fmod*t.');          % second multiplication by sin
yc = ym .* cos(2*pi*Fmod*t.');          % multiplication by cos

%% 3) Helper to compute single-sided amplitude spectrum |Y(f)|

computeSpec = @(sig) ...
    deal( ...
        (0:floor(length(sig)/2)) * (Fs/length(sig)), ...   % f axis
        abs(fft(sig)) / length(sig) ...                   % scale
    );

[f_y,  P_y]  = computeSpec(y);
[f_ym, P_ym] = computeSpec(ym);
[f_ys, P_ys] = computeSpec(ys);
[f_yc, P_yc] = computeSpec(yc);

P_y  = P_y(1:length(f_y));
P_ym = P_ym(1:length(f_ym));
P_ys = P_ys(1:length(f_ys));
P_yc = P_yc(1:length(f_yc));

%% 4) Plot amplitude spectra

figure('Name','Amplitude spectra of y, ym, ys, yc');

subplot(4,1,1);
plot(f_y, P_y(1:numel(f_y)), 'g');
xlim([0 Fs/2]);
xlabel('Frequency (Hz)');
ylabel('|Y(f)|');
title('Original signal y(t) - spectrum');
grid on;

subplot(4,1,2);
plot(f_ym, P_ym(1:numel(f_ym)), 'g');
xlim([0 Fs/2]);
xlabel('Frequency (Hz)');
ylabel('|Y_m(f)|');
title('ym(t) = y(t) * sin(2\pi F_{mod} t)');
grid on;

subplot(4,1,3);
plot(f_ys, P_ys(1:numel(f_ys)), 'g');
xlim([0 Fs/2]);
xlabel('Frequency (Hz)');
ylabel('|Y_s(f)|');
title('ys(t) = ym(t) * sin(2\pi F_{mod} t)');
grid on;

subplot(4,1,4);
plot(f_yc, P_yc(1:numel(f_yc)), 'g');
xlim([0 Fs/2]);
xlabel('Frequency (Hz)');
ylabel('|Y_c(f)|');
title('yc(t) = ym(t) * cos(2\pi F_{mod} t)');
grid on;

%% 5) Listen to the signals (uncomment in MATLAB to hear)
% sound(y,  Fs);  pause(length(y)/Fs + 1);
% sound(ym, Fs);  pause(length(y)/Fs + 1);
% sound(ys, Fs);  pause(length(y)/Fs + 1);
% sound(yc, Fs);

%% 6) Demodulation to recover original sound
% Theory:
%   - ym(t) = y(t)*sin(2*pi*Fmod*t) is DSB-SC modulation.
%   - Multiplying again by sin(2*pi*Fmod*t) gives:
%       ys(t) = ym(t)*sin(2*pi*Fmod*t)
%             = y(t)*sin^2(2*pi*Fmod*t)
%             = 0.5*y(t) - 0.5*y(t)*cos(4*pi*Fmod*t)
%     => low-frequency term 0.5*y(t) + high-frequency image around 2*Fmod.
%   - A low-pass filter on ys(t) recovers a scaled version of y(t).
%
% So ys(t) is the best candidate for demodulation.

% Simple low-pass filter: moving average (FIR) without toolboxes.
% Choose window length so cut-off is << Fmod (keep audio band, remove 2*Fmod).
LpOrder = 101;                      % odd length for symmetry
h_lp = ones(LpOrder,1)/LpOrder;    % simple averaging filter

y_rec = filter(h_lp, 1, ys);       % demodulated / low-passed version

% Optionally compensate scaling (~0.5) by multiplying by 2
y_rec = 2 * y_rec;

%% 7) Spectrum of demodulated signal

[f_rec, P_rec] = computeSpec(y_rec);
P_rec = P_rec(1:length(f_rec));

figure('Name','Demodulated signal spectrum');
plot(f_rec, P_rec, 'g');
xlim([0 Fs/2]);
xlabel('Frequency (Hz)');
ylabel('|Y_{rec}(f)|');
title('Amplitude spectrum of demodulated signal (approx. original y(t))');
grid on;

%% 8) Listen to recovered sound (optional)
% sound(y_rec, Fs);
