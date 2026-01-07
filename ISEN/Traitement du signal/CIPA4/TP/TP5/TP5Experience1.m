%% Experience 1 : Concatenate three audio files into one

clc;
clear;
close all;

%% Load audio data (Q2, holiday_offer, CLAVES)

[y1, Fs1] = audioread('Q2.wav');
[y2, Fs2] = audioread('holiday_offer.wav');
[y3, Fs3] = audioread('CLAVES.wav');

% Play sound (debug)
%sound(y1, Fs1); % Play the first audio file
%pause(length(y1)/Fs1); % Wait until the first audio finishes
%sound(y2, Fs2); % Play the second audio file
%pause(length(y2)/Fs2); % Wait until the second audio finishes
%sound(y3, Fs3); % Play the third audio file
%pause(length(y3)/Fs3); % Wait until the third audio finishes

%% Force all signals to mono and to the same sampling rate 44100 Hz (CD quality)

Fs_target = 44100;   % desired sampling frequency

% Convert to mono
if size(y1,2) > 1, y1 = mean(y1,2); end
if size(y2,2) > 1, y2 = mean(y2,2); end
if size(y3,2) > 1, y3 = mean(y3,2); end

% If needed, resample to 44100 Hz
if Fs1 ~= Fs_target
    y1 = resample(y1, Fs_target, Fs1);
end
if Fs2 ~= Fs_target
    y2 = resample(y2, Fs_target, Fs2);
end
if Fs3 ~= Fs_target
    y3 = resample(y3, Fs_target, Fs3);
end

%% Concatenate the three sounds

y_all = [y1; y2; y3];

%% Save combined sound

audiowrite('Q1marquetfelix.wav', y_all, Fs_target);

%% Play the combined sound

sound(y_all, Fs_target);
