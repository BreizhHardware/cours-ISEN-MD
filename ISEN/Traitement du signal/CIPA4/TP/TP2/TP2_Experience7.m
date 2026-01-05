%% Experiment 7 : Spectral Analysis of the raised cosine waveform

clc;
clear;
close all;

%% Common parameters
T   = 2e-3;                 % Symbol period (s)
Ts  = 0.13 * T;             % Sampling period (s)
Fs  = 1 / Ts;               % Sampling frequency (Hz)
t   = -10*T : Ts : 10*T;    % Time vector from -10T to 10T
N   = length(t);            % Number of samples

%% Helper function: raised cosine pulse (inline)
% We handle the singularities at t = 0 and t = ±T/(2*beta) using limits. 
rc_pulse = @(beta) ...
    arrayfun(@(tt) ...
        raisedCosineSample(tt, T, beta), t);

%% ===== a) & b) for beta = 0.5 =====
beta1 = 0.5;

h1 = rc_pulse(beta1);       % Time-domain raised cosine pulse

% --- Time-domain plot (x-axis in ms) ---
figure('Name','Experiment 7 - Time domain, beta = 0.5');
plot(t*1e3, h1, 'g');       % t in ms
xlabel('Time (ms)');
ylabel('h(t)');
title('Raised cosine pulse h(t), \beta = 0.5');
grid on;

% --- Frequency-domain magnitude spectrum ---
H1 = fft(h1);               % FFT of the pulse
magH1 = abs(fftshift(H1));  % Center zero frequency; take magnitude

% Frequency axis in Hz, centered around 0
f_axis = (-N/2:N/2-1) * (Fs/N);

figure('Name','Experiment 7 - Frequency domain, beta = 0.5');
plot(f_axis, magH1, 'g');
xlabel('Frequency (Hz)');
ylabel('|H(f)|');
title('Magnitude spectrum of raised cosine pulse, \beta = 0.5');
grid on;

% --- c) Measure bandwidth (approximate)
% For a raised cosine with symbol rate Rs = 1/T, ideal theoretical
% baseband bandwidth is B = (Rs/2)*(1+beta). 
Rs      = 1/T;                    % Symbol rate (Hz)
BW_theo1 = (Rs/2) * (1 + beta1);  % Theoretical bandwidth (Hz)
fprintf('Theoretical bandwidth for beta=0.5: %.2f Hz\n', BW_theo1);

%% ===== d) Repeat for beta = 0.25 =====
beta2 = 0.25;

h2 = rc_pulse(beta2);

% Time-domain plot
figure('Name','Experiment 7 - Time domain, beta = 0.25');
plot(t*1e3, h2, 'g');
xlabel('Time (ms)');
ylabel('h(t)');
title('Raised cosine pulse h(t), \beta = 0.25');
grid on;

% Frequency-domain magnitude spectrum
H2 = fft(h2);
magH2 = abs(fftshift(H2));
figure('Name','Experiment 7 - Frequency domain, beta = 0.25');
plot(f_axis, magH2, 'g');
xlabel('Frequency (Hz)');
ylabel('|H(f)|');
title('Magnitude spectrum of raised cosine pulse, \beta = 0.25');
grid on;

BW_theo2 = (Rs/2) * (1 + beta2);
fprintf('Theoretical bandwidth for beta=0.25: %.2f Hz\n', BW_theo2);

%% ===== Local function for one sample of raised cosine =====
function h = raisedCosineSample(t, T, beta)
    % Raised cosine pulse sample at time t (scalar).
    % h(t) = sinc(t/T) * cos(pi*beta*t/T) / (1 - (4*beta^2*t^2)/T^2)
    % Special cases at t = 0 and t = ±T/(2*beta) use L'Hospital limits. 

    if abs(t) < 1e-12
        % Limit at t -> 0
        h = 1;  % sinc(0) = 1 and cos(0)/(1-0) = 1
    elseif beta ~= 0 && abs(abs(t) - T/(2*beta)) < 1e-12
        % Singularities at t = ±T/(2*beta) -> use known limit value 
        h = (beta/pi) * sin(pi/(2*beta));
    else
        x = t / T;
        h = sinc(x) * cos(pi*beta*x) / (1 - (4*beta^2*x^2));
    end
end
