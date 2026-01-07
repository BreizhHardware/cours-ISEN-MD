%% Experience 2 : Remove high-frequency jamming from Q2noiz810KA

clc;
clear;
close all;

%% 1) Load audio file with audioread

[x, fs] = audioread('Q2noiz810KA.wav');  

% Convert to mono if stereo
if size(x,2) > 1
    x = mean(x,2);
end

N = length(x);

%% 2) Listen to the noisy signal

soundsc(x, fs); % Not working on my computer

%% 3) Visualize the spectrum of x and locate the jamming

X = fft(x);
magX = abs(X);

halfN = floor(N/2) + 1;
magX_half = magX(1:halfN);
f = (0:halfN-1) * (fs/N);    % frequency axis in Hz

figure('Name','Spectrum of x (noisy signal)');
plot(f/1000, magX_half, 'g');           % in kHz
xlabel('Frequency (kHz)');
ylabel('|X(f)|');
title('Single-sided amplitude spectrum of x');
grid on;
xlim([0 fs/2000]);

%% 4) Find the jamming frequency and filter

fjam = 4000;                 
ordre = 6; 
[b, a] = butter(ordre, fjam/(fs/2), 'low');
y = filter(b, a, x);

%% 5) Listen to the filtered signal

soundsc(y, fs);                  % Not working on my computer
%audiowrite('test.wav', y, fs);  % To avoid using soundsc

%% 6) Plot spectrum of y 

Y = fft(y);
magY = abs(Y);
magY_half = magY(1:halfN);

figure('Name','Spectrum of y (filtered signal)');
plot(f/1000, magY_half, 'g');         % in kHz
xlabel('Frequency (kHz)');
ylabel('|Y(f)|');
title('Single-sided amplitude spectrum of filtered signal y');
grid on;
xlim([0 fs/2000]);
