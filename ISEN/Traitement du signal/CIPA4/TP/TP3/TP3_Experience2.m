%% Experiment 2 : Raised cosine with jamming and ambient noise
% - Generate raised cosine h(t) on [-10T, 10T], T = 2 ms, beta = 0.5
% - Sampling period Ts = 0.13*T
% - Add narrowband jamming at 800 Hz and white noise
% - Design IIR notch filter (order 15 then 5) to remove the jamming tone
% - Use subplot to show time-domain signal and magnitude spectrum.

clc;
clear;
close all;

%% 1) Parameters and time vector

T   = 2e-3;                % Symbol period (s)
beta = 0.5;                % Roll-off factor
Ts  = 0.13 * T;            % Sampling period (s)
Fs  = 1 / Ts;              % Sampling frequency (Hz) 
t   = -10*T : Ts : 10*T;   % Time vector
N   = length(t);

% Frequency axis for spectra (centered)
f_axis = (-N/2 : N/2-1) * (Fs / N);   % Hz

%% 2) Raised cosine pulse h(t)

h = arrayfun(@(tt) raisedCosineSample(tt, T, beta), t);  

% Time-domain h(t) and magnitude spectrum
H  = fft(h);
magH = abs(fftshift(H));   % magnitude, zero frequency at center 

figure('Name','Experiment 2 - h(t) and |H(f)|');
subplot(2,1,1);
plot(t*1e3, h, 'g');
xlabel('Time (ms)');
ylabel('h(t)');
title('Raised cosine pulse h(t), \beta = 0.5');
grid on;

subplot(2,1,2);
plot(f_axis, magH, 'g');
xlabel('Frequency (Hz)');
ylabel('|H(f)|');
title('Magnitude spectrum |H(f)| of raised cosine');
grid on;

%% 3) Generate jamming and ambient noise, build z(t)

fJam = 800;                       % Jamming frequency (Hz)
x = 0.2 * cos(2*pi*fJam*t);       % narrowband jamming (adjust amplitude if needed)

n = 0.02 * randn(size(t));        % ambient white noise (low level) 

z = h + x + n;                    % corrupted signal

% Time-domain and magnitude spectrum of z(t)
Z  = fft(z);
magZ = abs(fftshift(Z));

figure('Name','Experiment 2 - z(t) and |Z(f)|');
subplot(2,1,1);
plot(t*1e3, z, 'g');
xlabel('Time (ms)');
ylabel('z(t)');
title('Noisy signal z(t) = h(t) + jamming + white noise');
grid on;

subplot(2,1,2);
plot(f_axis, magZ, 'g');
xlabel('Frequency (Hz)');
ylabel('|Z(f)|');
title('Magnitude spectrum |Z(f)| with jamming at 800 Hz');
grid on;

%% 4) Design 15th-order notch (bandstop) filter at 800 Hz (no butter)
% We build an IIR notch with zeros at exp(±j*w0) and poles at r*exp(±j*w0),
% then cascade enough sections to reach an effective order ≈ 15.

w0 = 2*pi*fJam/Fs;     % digital radian frequency
r  = 0.98;             % pole radius (controls notch width)

% One second-order notch section:
b_sec = [1, -2*cos(w0), 1];          % zeros at e^{±jw0}
a_sec = [1, -2*r*cos(w0), r^2];      % poles at r*e^{±jw0}

% Approximate 15th-order by cascading 8 sections (~16th order)
sections = 8;                        

b15 = 1;
a15 = 1;
for k = 1:sections
    b15 = conv(b15, b_sec);
    a15 = conv(a15, a_sec);
end

% Filter output zz(t) and its spectrum
zz15 = filter(b15, a15, z);

ZZ15   = fft(zz15);
magZZ15 = abs(fftshift(ZZ15));

figure('Name','Experiment 2 - Order ~15 notch filter');
subplot(2,1,1);
plot(t*1e3, zz15, 'g');
xlabel('Time (ms)');
ylabel('zz_{15}(t)');
title('Filtered signal (notch order ≈ 15)');
grid on;

subplot(2,1,2);
plot(f_axis, magZZ15, 'g');
xlabel('Frequency (Hz)');
ylabel('|ZZ_{15}(f)|');
title('Magnitude spectrum after order ≈ 15 notch filter');
grid on;

%% 5) Modify filter order to ~5 and update plot

% Fewer cascaded sections (e.g. 3 -> ~6th order)
sections2 = 3;

b5 = 1;
a5 = 1;
for k = 1:sections2
    b5 = conv(b5, b_sec);
    a5 = conv(a5, a_sec);
end

zz5 = filter(b5, a5, z);

ZZ5   = fft(zz5);
magZZ5 = abs(fftshift(ZZ5));

figure('Name','Experiment 2 - Order ~5 notch filter');
subplot(2,1,1);
plot(t*1e3, zz5, 'g');
xlabel('Time (ms)');
ylabel('zz_{5}(t)');
title('Filtered signal (notch order ≈ 5)');
grid on;

subplot(2,1,2);
plot(f_axis, magZZ5, 'g');
xlabel('Frequency (Hz)');
ylabel('|ZZ_{5}(f)|');
title('Magnitude spectrum after order ≈ 5 notch filter');
grid on;

%% ===== Local function: one sample of raised cosine pulse =====
function h = raisedCosineSample(t, T, beta)
    % Raised cosine pulse sample at time t (scalar).
    % h(t) = sinc(t/T) * cos(pi*beta*t/T) / (1 - (4*beta^2*t^2)/T^2)
    % with sinc(x) = sin(pi*x)/(pi*x).

    x = t / T;

    % Manual sinc(x)
    if abs(x) < 1e-12
        sx = 1;                           % limit at x -> 0
    else
        sx = sin(pi*x) / (pi*x);
    end

    % Handle critical points of the raised cosine denominator
    if abs(t) < 1e-12
        h = 1;
    elseif beta ~= 0 && abs(abs(t) - T/(2*beta)) < 1e-12
        h = (beta/pi) * sin(pi/(2*beta)); % limit at t = ±T/(2*beta)
    else
        h = sx * cos(pi*beta*x) / (1 - (4*beta^2*x^2));
    end
end
