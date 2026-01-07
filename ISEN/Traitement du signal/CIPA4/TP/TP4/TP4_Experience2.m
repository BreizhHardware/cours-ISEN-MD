%% Experiment 2 : Baseband recovery from TP4cipaQ2.wav

clc;
clear;
close all;

%% Load the audio
[y, Fs] = audioread('TP4cipaQ2.wav');
if size(y,2) > 1
    y = mean(y,2);                      % Switch to mono
end

N  = length(y);

%% i) Spectre of amplitude in kHz
Y  = fft(y);
magY = abs(Y);
halfN = floor(N/2)+1;
magY_half = magY(1:halfN);
f = (0:halfN-1)*(Fs/N);     % Hz
f_kHz = f/1000;             % kHz

figure;
plot(f_kHz, magY_half,'g');
xlabel('Frequence (kHz)');
ylabel('|Y(f)|');
title('Spectre amplitude du signal TP4cipaQ2');
grid on;
xlim([0 Fs/2000]);

%% Butterworth filter

Fc = 3000;                   
Wn = Fc/(Fs/2);              
ordre = 4;                   

[b,a] = butter(ordre, Wn, 'low');  

y_filt = filter(b,a,y);            

%% ii) Spectre of filtered signal
Yf = fft(y_filt);
magYf = abs(Yf);
magYf_half = magYf(1:halfN);

figure;
plot(f_kHz, magYf_half,'g');
xlabel('Frequence (kHz)');
ylabel('|Y_f(f)|');
title('Spectre amplitude du signal filtre');
grid on;
xlim([0 Fs/2000]);

sound(y_filt, Fs);