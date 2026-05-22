#AutomatiqueNumérique #CIPA4 

**Modern control engineering**
Classical control system: based on transfer function approach
Transfer function approach is used:
- single input -> single output
- time invariant system
- Linear systems 

Modern system can be used for both:
- single-input -> single output systems (SISO) 
- multiple input -> multiple output systems linear and non-linear systems, time invariant or time varying systems

Modern control systems is based on state space approach

**Definitions:**
- State: The state of a dynamic system is the smallest set of variables, called state variables such that knowledge of these variables together with knowledge of input, completely determine the behavior of the systems

**State space equations:**
We can proove that the general state space representation of a dynamic system is written under the following form:

$$
\begin{aligned}
&\dot{x} = Ax + Bu \\
&y = Cx + Du \\
\\
&x : \text{states variables vector} = \begin{bmatrix} x_{1} \\ x_{2} \\ \vdots \\ x_{n} \end{bmatrix} \\
&u : \text{system input} \\
&y : \text{system output} \\
&A, B, C, D : \text{matrices} \\
&A : \text{system matrix} \\
&B : \text{input matrix} \\
&C : \text{output matrix} \\
&D : \text{feed forward matrix}
\end{aligned}
$$

**State space representation of a linear differential equation**
Consider the following differential equation:

$$
\begin{aligned}
&\underbrace{y''''}_{\color{red}{\dot{x_{4}}}} + a_{1}\underbrace{y'''}_{\color{red}{{x_{4}}}} + a_{2}\underbrace{y''}_{\color{red}{{x_{3}}}} + a_{3}\underbrace{y'}_{\color{red}{{x_{2}}}} + a_{4}\underbrace{y}_{\color{red}{{x_{1}}}} = u
\end{aligned}
$$

In this exemple we have a differential equation of order = 4 => we have 4 state variables
We define the state variables as:

$$
\begin{aligned}
&x_{1} = y \\
&x_{2} = y\prime = \frac{dy}{dt} = \dot{y} = \dot{x_{1}} \\
&x_{3} = y\prime\prime = \frac{d^2y}{dt^2} = \dot{x_{2}} \\
&x_{4} = y\prime\prime\prime = \frac{d^3y}{dt^3} = \dot{x_{3}} \\
&\implies\dot{x_{4}} = -a_{1}x_{4}-a_{2}x_{3}-a_{3}x_{2}-a_{4}x_{1}+u \\
\end{aligned}
$$

We obtain the following system of equation

$$
\begin{aligned}
&\dot{x_{1}} = x_{2} \\
&\dot{x_{2}} = x_{3} \\
&\dot{x_{3}} = x_{4} \\
&\dot{x_{4}} = -a_{1}x_{4} - a_{2}x_{3} - a_{3}x_{2} - a_{4}x_{1} + u \\
&\text{Write the above system under the form } \dot{X} = AX + BU \\
&\dot{X} =
\begin{bmatrix}
\dot{x_{1}} \\
\dot{x_{2}} \\
\dot{x_{3}} \\
\dot{x_{4}}
\end{bmatrix}
=
\begin{bmatrix}
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
-a_{4} & -a_{3} & -a_{2} & -a_{1}
\end{bmatrix}
\begin{bmatrix}
x_{1} \\
x_{2} \\
x_{3} \\
x_{4}
\end{bmatrix}
+
\begin{bmatrix}
0 \\
0 \\
0 \\
1
\end{bmatrix}
u \\
&\implies A =
\begin{bmatrix}
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
-a_{4} & -a_{3} & -a_{2} & -a_{1}
\end{bmatrix}
\text{ and } B =
\begin{bmatrix}
0 \\
0 \\
0 \\
1
\end{bmatrix}
\end{aligned}
$$

**Problem 1**

![](https://cdn.breizhhardware.fr/FAKA3/JolIsUKI53.png/raw)
Find the state space representation of the given RL circuit if $v(t)$ is the system input and $v_{l}$ is the system output

**Solution:**

First fin the diff. eq. of the system
Apply Kirchhoff's voltage low (KVL)

$$
\begin{aligned}
& v(t) = v_{r} + v_{l} \\
& v(t) = Ri + L \frac{di}{dt} \color{red}{(1)}
\end{aligned}
$$

We have a differential equation of order 1 => 1 state variable
We choose $x_{1} = i$

$$
\begin{aligned}
& {\color{red}{(1)}:} v(t) = Rx_{1} + L \dot{x_{1}} \implies \dot{x_{1}} = -\frac{R}{L}x_{1} + \frac{1}{L}v(t) {\color{red}{(2)}}\\
&\text{of the form } \dot{x} = Ax + Bu \text{ where } A = 
\begin{bmatrix}
-\frac{R}{L}
\end{bmatrix}
\text{and B =}
\begin{bmatrix}
\frac{1}{L}
\end{bmatrix} \\
\end{aligned}
$$

The output equation:

$$
\begin{aligned}
& v_{l} = L \frac{di}{dt} \\\\
&\text{write the output equation under the form } y = Cx + Du \\\\
& v_{l} = L \frac{di}{dt} = L \dot{x_{1}}\\\\
&\text{using eq {\color{red}{(2)}}:} \\\\
& v_{l} = -Rx_{1} + v(t) \text{ of the form: } \\\\
& y = Cx + Du \\\\
& \text{where C} = \begin{bmatrix}
-R
\end{bmatrix} \text{ and } D = \begin{bmatrix}
1
\end{bmatrix}
\end{aligned}
$$

**Problem 2**

Find the state and output equation of the given RLC circuit if $v(t)$ is the input and $v(c)$ is the output.
![](https://cdn.breizhhardware.fr/FAKA3/DEXilUyI79.png/raw)

**Solution**

$$
\begin{aligned}
& v(t) = v_{r} + v_{l} + v_{c} \\
& v(t) = Ri + L \frac{di}{dt} + \frac{1}{C}q \\
& \text{where i = }\frac{dq}{dt} \\
& \implies v(t) = R \frac{dq}{dt} + L \frac{d^2q}{dt^2} + \frac{1}{C}q \\
& v(t) = L \frac{d^2i}{dt^2} + R \frac{dq}{dt} + \frac{1}{C}q \color{red}{(1)}\\
& \text{diff. eq. of order 2 => 2 state variables}\\
& \text{we choose: }\\
& x_{1} = q \\
& x_{2} = \frac{dq}{dt} = \dot{x_{1}} {\color{red}{(2)}} \implies \dot{x_{2}} = \frac{d^2q}{dt^2} \\
& {\color{red}{(1)}:} v(t) = R x_{2} + L \dot{x_{2}} + \frac{1}{C} x_{1} \\
& \implies \dot{x_{2}} = -\frac{1}{LC}x_{1} - \frac{R}{L}x_{2} + \frac{1}{L} v(t) \color{red}{(3)}\\
& \text{Write eq } {\color{red}{(2)}} \text{ and } {\color{red}{(3)}} \text{ under the form } \dot{x} = Ax + Bu \\
& \dot{x} = \begin{bmatrix}
\dot{x_{1}} \\
\dot{x_{2}}
\end{bmatrix} = \begin{bmatrix}
0 & 1 \\
-\frac{1}{LC} & -\frac{R}{L}
\end{bmatrix}
\begin{bmatrix}
x_{1} \\
x_{2}
\end{bmatrix} + 
\begin{bmatrix}
0 \\
\frac{1}{L}
\end{bmatrix}
v(t)\\
& \implies A = \begin{bmatrix}
0 & 1 \\
-\frac{1}{LC} & -\frac{R}{L}
\end{bmatrix} \text{ and B = } \begin{bmatrix}
0 \\
\frac{1}{L}
\end{bmatrix} \\
& \text{The output equation:} \\
& v(c) = \frac{1}{C}q \\
& \text{Write the output under the form } y = Cx + Du \\
& v(c) = \frac{1}{C}x_{1} \\
& v_{c} = \begin{bmatrix}
\frac{1}{C} & 0
\end{bmatrix} \begin{bmatrix}
x_{1}  \\
x_{2}
\end{bmatrix} + \begin{bmatrix}
0
\end{bmatrix}v(t) \\
& \text{C = } \begin{bmatrix}
\frac{1}{C} & 0
\end{bmatrix} \text{ and D = } \begin{bmatrix}
0
\end{bmatrix} 
\end{aligned}
$$

**Problem 3**

Find the state and output equation for the mechanical system shown.
The external force $u(t)$ is the input and the displacement $y(t)$ is the output

![](https://cdn.breizhhardware.fr/FAKA3/GUBEWIZI82.png/raw)
**Solution**

Free body diagram

![](https://cdn.breizhhardware.fr/FAKA3/BIWEGONi54.png/raw)

Apply Newton's 2nd law:

$$
\begin{align}
&\sum \vec{Forces} = m.\vec{a}  \\\\
& -b \dot{y} - ky - u(t) = m \ddot{y} \\\\
&m \ddot{y} + b \dot{y} + ky = u(t) \\\\
&\text{Diff. eq. of order 2 => 2 state variables:} \\\\
&m\underbrace{\ddot{y}}_{\color{red}{\dot{x_{2}}}} + b\underbrace{\dot{y}}_{\color{red}{{x_{2}}}} + k\underbrace{y}_{\color{red}{{x_{1}}}} = u(t) \\\\
&x_{1} = y \\\\
&x_{2} = \dot{y} = \dot{x_{1}} \color{red}{(1)}\\\\
&\dot{x_{2}} = -\frac{K}{m} x_{1} - \frac{b}{m}x_{2} + \frac{1}{m}u(t) \color{red}{(2)} \\\\
&\text{Write eq {\color{red}{(1)}} and {\color{red}{(2)}} under the form } \dot{x} = Ax + Bu  \\\\
&\dot{x} = \begin{bmatrix}
0 & 1 \\\\
-\frac{K}{m} & -\frac{b}{m}
\end{bmatrix}
\begin{bmatrix}
x_{1} \\\\
x_{2}
\end{bmatrix} + \begin{bmatrix}
0 \\\\
\frac{1}{m}
\end{bmatrix} u \\\\
&A = \begin{bmatrix}
0 & 1 \\\\
-\frac{K}{m} & -\frac{b}{m}
\end{bmatrix} \text{ and B = } \begin{bmatrix}
0 \\\\
\frac{1}{m}
\end{bmatrix} \\\\
&\underline{\text{Output equation:}} \\\\
&y = x_{1} \\\\
&y = \begin{bmatrix}
1 & 0
\end{bmatrix}
\begin{bmatrix}
x_{1} \\\\
x_{2}
\end{bmatrix} + \begin{bmatrix}
0
\end{bmatrix} u \\\\
&C = \begin{bmatrix}
1 & 0
\end{bmatrix} \text{ and D = } \begin{bmatrix}
0
\end{bmatrix}
\end{align}
$$

# 2 - Converting a transfer function to state space
To convert a transfer function, with a constant numeration, into a state equation in phase-variable form, we first convert the transfer function to a differential equation by cross-multiplying and taking the inverse Laplace transform, assuming zero initial conditions.

**Problem 4**

Find the state-space representation in phase-variable form of the following transfer function:

![](https://cdn.breizhhardware.fr/FAKA3/SAdutoxA76.png/raw)

solution:

The transfer function $\frac{C(s)}{R(s)} = \frac{24}{s^3+9s^2+26s+24}$

cross multiplying yields:

$$
\begin{align}
&(s^3 + 9s^2 + 26s + 24)C(s) = 24R(s) \\\\
&s^3C(s) + 9s^2C(s) + 26sC(s) + 24C(s) = 24R(s) \\\\
&\text{Taking the inverse Laplace transform yields:} \quad \color{red}{\text{(Review } L[f^{m}(t)] = s^mF(s) \text{ with zero I.C.)}} \\\\
&\dddot{c}+9\ddot{c}+26\dot{c}+24c = 24r \\\\
&\text{We get a diff. eq. of order 3 => 3 state variables} \\\\
&\text{We select: } \\\\
&x_{1} = c \\\\
&x_{2} = \dot{c} \\\\
&x_{3} = \ddot{c} \\\\
&\text{We can write the state equation } \dot{x} = Ax + Bu \\\\
&\dot{x_{1}} = x_{2} \\\\
&\dot{x_{2}} = x_{3} \\\\
&\dot{x_{3}} = -24x_{1} - 26x_{2} - 9x_{3} + 24r \\\\
&\text{In matrix form: } \\\\
&\dot{x} = \begin{bmatrix}
\dot{x_{1}} \\\\
\dot{x_{2}} \\\\
\dot{x_{3}}
\end{bmatrix} =
\begin{bmatrix}
0 & 1 & 0 \\\\
0 & 0 & 1 \\\\
-24 & -26 & -9
\end{bmatrix} 
\begin{bmatrix}
x_{1} \\\\
x_{2} \\\\
x_{3}
\end{bmatrix} + \begin{bmatrix}
0 \\\\
0 \\\\
24
\end{bmatrix} r \\\\
&y = c =x_{1} \\\\
&\text{In matrix form: } \\\\
&y = \begin{bmatrix}
1 & 0  & 0
\end{bmatrix} \begin{bmatrix}
x_{1} \\\\
x_{2} \\\\
x_{3}
\end{bmatrix} + \begin{bmatrix}
0
\end{bmatrix}r
\end{align}
$$

If a transfer function has a polynomial in $s$ in the numerator that is of order less than the polynomial in the denominator, the numerator and the denominator can be handled seperately.
First seperate the transfer function into two cascaded transfer functions:

The first is the denominator, and the second is just the numerator
![](https://cdn.breizhhardware.fr/FAKA3/QOjEJafE04.png/raw)
![](https://cdn.breizhhardware.fr/FAKA3/wuPebiyi24.png/raw)


**Problem 5**

Find the state space representation of the transfer function shown: ![](https://cdn.breizhhardware.fr/FAKA3/GODuNuMU97.png/raw) **Solution** We seperate the system into two cascaded blocks ![](https://cdn.breizhhardware.fr/FAKA3/lUyePaRo39.png/raw) The first block gives:

$$ \begin{align} &\frac{X(s)}{R(s)} = \frac{1}{s^3+9s^2+26s+24} \\ &(s^3+9s^2+26s+24)X(s) = R(s) \\ &s^3X(s)+9s^2X(S)+26sX(s)+24X(s) = R(s) \\ &\text{Taking the inverse Laplace transfer, with zero initial condition, yields} \\ &\dddot{x_{3}}+9\ddot{x}+26\dot{x}+24x = r(t) \\ &\text{We select the following state variables} \\ &x_{1} = x \\ &x_{2} = \dot{x} \\ &x_{3} = \ddot{x} \\ &\text{The state equations:} \\ &\dot{x_{1}} = x_{2} \\ &\dot{x_{2}} = x_{3} \\ &\dot{x_{3}} = -24x_{1} - 26x_{2} - 9x_{3} + r(t) \\ &\text{under matrix form: } \dot{x} = Ax + Bu \\ &\dot{x} = \begin{bmatrix} \dot{x_{1}} \\ \dot{x_{2}} \\ \dot{x_{3}} \end{bmatrix} = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ -24 & -26 & -9 \end{bmatrix} \begin{bmatrix} x_{1} \\ x_{2} \\ x_{3} \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} r(t) \end{align} $$

For the second block:
![](https://cdn.breizhhardware.fr/FAKA3/puFEtOka33.png/raw)

$$
\begin{align}
&C(s) = (s^2+7s+2)X(s) \\
&C(s) = s^2X(s) + 7sX(s) + 2X(s) \\
&\text{Taking the Laplace inverse transform:} \\
&C(t) = \ddot{x}(t) + 7\dot{x}(t) + 2x(t) \\
&\text{In matrix form: } y = Cx + Du \\
&C(t) = \begin{bmatrix}
2 & 7 & 1
\end{bmatrix}\begin{bmatrix}
x_{1} \\
x_{2} \\
x_{3}
\end{bmatrix} + \begin{bmatrix}
0
\end{bmatrix}r(t)
\end{align}
$$

# 3 - Converting from state space to a transfer function 
Given the state and output equations

$$
\begin{align}
&\dot{x} = Ax + Bu \\
&y = Cx + Du \\
&\text{Take Laplace transform assuming zero initial condition: } \\
&sX(s) = AX(s) + BU(s) \color{red}{(1)}\\
& Y(s) = CX(s) + DU(s) \color{red}{(2)} \\
&{\color{red}{(1):}} (sI-A)X(s) = BU(s) \text{where I is the identity matrix} \\
&X(s) = (sI-A)^{-1}BU(s) \\
&\text{substitute X(s) into eq} \color{red}{(2) :} \\
&Y(s) = C(SI-A)^{-1}BU(s)+DU(s) = [C(SI-A)^{-1}B+D]U(s) \\
&\text{Transfer function} = \frac{output}{input} = \frac{Y(s)}{U(s)} = C(SI-A)^{-1}B+D \\
&\color{red}{\text{If Y and U are vectors, } C(SI-A)^{-1}B \text{is called transfer matrix}}
\end{align}
$$

**Problem 6**

Convert the state and output equations to a transfer function

$$
\begin{align}
&\dot{x} = \begin{bmatrix}
-4 & -1.5 \\
4 & 0
\end{bmatrix}x + \begin{bmatrix}
2 \\
0
\end{bmatrix} u(t) \\
&y = \begin{bmatrix}
1.5 & 0.625
\end{bmatrix}x \\
&sX(s) = \begin{bmatrix}
-4 & -1.5 \\
4 & 0
\end{bmatrix}X(S) + \begin{bmatrix}
2 \\
0
\end{bmatrix}U(s) \\
&Y(s) = \begin{bmatrix}
1.5 & 0.625
\end{bmatrix}X(S) + \begin{bmatrix}
0
\end{bmatrix} U(s) \\
&\text{Transfer function} = \begin{bmatrix}
1.5 & 0.625
\end{bmatrix}(SI-\begin{bmatrix}
-4 & -1.5 \\
4 & 0
\end{bmatrix})^{-1}\begin{bmatrix}
2 \\
0
\end{bmatrix}  \\
&= \begin{bmatrix}
1.5 & 0.625
\end{bmatrix}\left( \frac{1}{s^2+4s+6}\begin{bmatrix}
s & -1.5 \\
4 & s+4
\end{bmatrix} \right)\begin{bmatrix}
2 \\
0
\end{bmatrix} \\
&= \frac{1}{s^2+4s+6}\begin{bmatrix}
1.5 & 0.625
\end{bmatrix} \begin{bmatrix}
 2s \\
8
\end{bmatrix} \\
&= \frac{1}{s^2+4s+6}(3s+5) = \frac{3s+5}{s^2+4s+6} \\
&\color{red}{\text{Note that the denominator of the transfer function represent the characterstic equation of the system, given by} \det(SI-A)} \\
&\color{red}{\text{The characteristic eq. determines the system poles and thus the performence and stability of the system}}
\end{align}
$$

# 4 - Laplace transform solution of state equation
Consider the following state and output equations:

$$
\begin{align}
&\dot{x} = Ax + Bu \color{red}{(1)}\\
&y = Cx + Du \color{red}{(2)} \\
&\text{Taking Laplace transform of eq {\color{red}{(1)}} yields:} \\
&sX(s) - X(0) = AX(s) + BU(s) \\
&(SI-A)X(s) = X(0)+BU(s) \\
&X(s) = (SI-A)^{-1}[X(0) + BU(s)] \\
&\text{We get the output solution by taking the inverse Laplace transformation of the output equation {\color{red}{(eq 2)}}:} \\
&Y(s) = CX(s) + DU(s) \\
&y(t) = L^{-1}[Y(s)]
\end{align}
$$

**Problem 7**

Find the response y(t) of the following system represented in state space

$$
\begin{align}
&\dot{x} = \begin{bmatrix}
0 & 2 \\
-3 & -5
\end{bmatrix}x + \begin{bmatrix}
0 \\
1
\end{bmatrix}e^{-t} \\
&y = \begin{bmatrix}
1 & 3
\end{bmatrix}x \\
&X(0) = \begin{bmatrix}
2 \\
1
\end{bmatrix}
\end{align}
$$

**Solution**

The state solution is given by:

$$
\begin{align}
&X(s) = (SI - A)^{-1}[X(0)+BU(s)] \\
&\text{where } SI-A = \begin{bmatrix}
s & 0 \\
0 & s
\end{bmatrix} - \begin{bmatrix}
0 & 2 \\
-3 & -5
\end{bmatrix} = \begin{bmatrix}
s & -2 \\
3 & s+5
\end{bmatrix} \\
&(SI-A)^{-1} = \frac{1}{s(s+5)-3(-2)}\begin{bmatrix}
s+5 & 2 \\
-3 & s
\end{bmatrix} = \frac{1}{s^2+5s+6}\begin{bmatrix}
s+5 & 2 \\
-3 & s
\end{bmatrix} \\
&X(0)+BU(s) = \begin{bmatrix}
2 \\
1
\end{bmatrix} + \begin{bmatrix}
0 \\
1
\end{bmatrix} \frac{1}{s+1} = \begin{bmatrix}
2 \\
1+ \frac{1}{s+1}
\end{bmatrix} = 
\begin{bmatrix}
2 \\
\frac{s+2}{s+1}
\end{bmatrix} \\
&X(s) = (SI-A)^{-1}[X(0) + BU(s)] \\
&= \frac{1}{s^2+5s+6}\begin{bmatrix}
s+5 & 2 \\
-3 & s
\end{bmatrix} \begin{bmatrix}
2 \\
\frac{s+2}{s+1}
\end{bmatrix} \\
&= \frac{1}{s^2+5s+6}\begin{bmatrix}
2(s+5)+2 \frac{s+2}{s+1} \\
-3*2+s \frac{s+2}{s+1}
\end{bmatrix} \\
&= \frac{1}{s^2+5s+6}\begin{bmatrix}
\frac{2(s+5)(s+1)+2(s+2)}{s+1} \\
\frac{-6(s+1)+s(s+2)}{s+1}
\end{bmatrix} \\
&= \frac{1}{(s^2+5s+6)(s+1)}\begin{bmatrix}
2s^2 + 14s + 14 \\
s^2 - 4s - 6
\end{bmatrix}
\end{align}
$$

The output equation:

$$
\begin{align}
&Y(s) = CX(s) + DU(s) \\
&= \begin{bmatrix}
1 & 3
\end{bmatrix} \frac{1}{(s^2+5s+6)(s+1)}\begin{bmatrix}
2s^2+14s+14 \\
s^2-4s-6
\end{bmatrix} \\
&= \frac{2s^2+14s+14+3s^2-12s-18}{(s^2+5s+6)(s+1)} \\
&= \frac{5s^2+2s-4}{(s^2+5s+6)(s+1)} \\
&\text{The response y(t) is given by :} \\
&y(t) = L^{-1}[Y(s)] = L^{-1}\left[ \frac{5s^2+2s-4}{(s^2+5s+6)(s+1)} \right]=L^{-1}\left[ \frac{5s^2+2s-4}{(s+2)(s+3)(s+1)} \right] \\
&= L^{-1}\left[  \frac{a_{1}}{s+1} + \frac{a_{2}}{s+2} + \frac{a_{3}}{s+3} \right] \\
&\text{avec } a_{1} = \left[    \frac{5s^2+2s-4}{(s+2)(s+3)} \right]_{s=-1} = -\frac{1}{2} \\
&a_{2} = \left[    \frac{5s^2+2s-4}{(s+1)(s+3)} \right]_{s=-2} = -12 \\
&a_{3} = \left[    \frac{5s^2+2s-4}{(s+1)(s+2)} \right]_{s=-3} = \frac{35}{2} \\
&y(t) = L^{-1}\left[ -\frac{\frac{1}{2}}{s+1} - \frac{12}{s+2} + \frac{\frac{35}{2}}{s+3} \right] \\
&y(t) = -\frac{1}{2}e^{-t} -12 e^{-2t} + \frac{35}{2} e^{-3t}
\end{align}
$$

# 5 - Time domain solution of state equation
We can prove that the time domain solution can be computed using the following equation:

$$
\begin{align}
&x(t) = e^{A}.x(0) + \int_{0}^{t} e^{A(t-z)}.B.u(z)dz \\
&x(t) = \phi(t).x(0)+\int_{0}^{t} \phi(t-z).B.u(z)dz
\end{align}
$$

Where $\phi(t) = e^{At}$ is called the state transition matrix

The state transition matrix $\phi(t)$ can be evaluated using the following expression:

$$
\begin{align}
&\phi(t) = L^{-1}[(sI-A)^{-1}]
\end{align}
$$

Properties of the state transition matrix:

$$
\begin{align}
&* \phi(0) = I \text{ where I is the identity matrix} \\
&* \phi^{-1}(t) = \phi(-t) \\
&* \phi(t_{1} + t_{2}) = \phi(t_{1}).\phi(t_{2}) \\
&* [\phi(t)]^n = \phi(nt)
\end{align}
$$

**Problem 8**

a) Find the state transition matrix of the following system
$$
\begin{align}
& \dot{x} = \begin{bmatrix}
0 & 1 \\
-8 & -6
\end{bmatrix} x(t) + \begin{bmatrix}
0 \\
1
\end{bmatrix} u(t)
\end{align}
$$

Solution

$$
\begin{align}
&\phi(t) = L^{-1}[(sI - A)^{-1}] \\
& sI - A = \begin{bmatrix}
s & 0 \\
0 & s
\end{bmatrix} - \begin{bmatrix}
0 & 1 \\
-8 & -6
\end{bmatrix} = \begin{bmatrix}
s & -1 \\
8 & s+6
\end{bmatrix} \\
&(sI-A)^{-1} = \frac{1}{s(s+6)-1(-8)}\begin{bmatrix}
s+6 & 1 \\
-8 & s
\end{bmatrix} = \frac{1}{s^2+6s+8}\begin{bmatrix}
s+6 & 1 \\
-8 & s
\end{bmatrix} \\
&(sI-A)^{-1} = \begin{bmatrix}
\frac{{s+6}}{s^2+6s+8} & \frac{{1}}{s^2+6s+8} \\
\frac{{-8}}{s^2+6s+8} & \frac{{s}}{s^2+6s+8}
\end{bmatrix} \\
&\text{To find the inverse Laplace transform of each term, we need to apply a partital fraction expension} \\
&\Delta = b^2 - 4ac = 36 - 32 = 4 \\
& x_{1} = \frac{{-6-2}}{2} = -4 \\
& x_{2} = \frac{{-6+2}}{2} = -2 \\
&(sI-A)^{-1} = \begin{bmatrix}
\frac{{s+6}}{(s+2)(s+4)} & \frac{{1}}{(s+2)(s+4)} \\
\frac{{-8}}{(s+2)(s+4)} & \frac{{s}}{(s+2)(s+4)}
\end{bmatrix} \\
&(sI-A)^{-1} = \begin{bmatrix}
\frac{{a_{1}}}{s+2}+\frac{a_{2}}{s+4} & \frac{a_{3}}{s+2} + \frac{a_{4}}{s+4} \\
\frac{{a_{5}}}{s+2}+\frac{a_{6}}{s+4} & \frac{{a_{7}}}{s+2}+{\frac{a_8}{s+4}}
\end{bmatrix} \\
&\text{where } a_{1} = \left[ \frac{{s+6}}{s+4} \right]_{s=-2} = \frac{4}{2} = 2 \\
&a_{2} = \left[ \frac{{s+6}}{s+2} \right]_{s=-4} = \frac{2}{-2} = -1 \\
&a_{3} = \left[ \frac{{1}}{s+4} \right]_{s=-2} = \frac{1}{2} \\
&a_{4} = \left[ \frac{{1}}{s+2} \right]_{s=-4} = \frac{1}{-2} \\
&a_{5} = \left[ \frac{{-8}}{s+4} \right]_{s=-2} = \frac{-8}{2} = -4 \\
&a_{6} = \left[ \frac{{-8}}{s+2} \right]_{s=-4} = \frac{-8}{-2} = 4 \\
&a_{7} = \left[ \frac{{s}}{s+4} \right]_{s=-2} = \frac{-2}{2} = -1 \\
&a_{8} = \left[ \frac{{s}}{s+2} \right]_{s=-4} = \frac{-4}{-2} = 2 \\
&(sI-A)^{-1} = \begin{bmatrix}
\frac{{2}}{s+2}+\frac{-1}{s+4} & \frac{\frac{1}{2}}{s+2} + \frac{-\frac{1}{2}}{s+4} \\
\frac{{-4}}{s+2}+\frac{4}{s+4} & \frac{{-1}}{s+2}+{\frac{2}{s+4}}
\end{bmatrix} \\
&L^{-1}[(sI-A)^{-1}] = L^{-1}\begin{bmatrix}
\frac{{2}}{s+2}+\frac{-1}{s+4} & \frac{\frac{1}{2}}{s+2} + \frac{-\frac{1}{2}}{s+4} \\
\frac{{-4}}{s+2}+\frac{4}{s+4} & \frac{{-1}}{s+2}+{\frac{2}{s+4}}
\end{bmatrix} = \fcolorbox{red}{white}{$
\begin{bmatrix}
2e^{-2t}-e^{-4t} & \frac{1}{2}e^{-2t}-\frac{1}{2}e^{-4t} \\
-4e^{-2t}+4e^{-4t} & -e^{-2t}+2e^{-4t}
\end{bmatrix} = \phi(t)
$} \\
\end{align}
$$

# 6 - Stability in state space
In section [3](#3---converting-from-state-space-to-a-transfer-function), we have shown that state space representation is converted to a transfer function $G(s)$ using:

$$
\begin{align}
&G(s) = C(sI-A)^{-1}B + D \\
&= C \frac{{[cof(sI-1)]^TB}}{\det(sI-A)}+D \\
&= \frac{C[cof(sI-A)]^TB+D\det(sI-A)}{\det(sI-A)} \\
\end{align}
$$

Stability condition is determined using the characteristic equation of the system, which is given by settings the denominator of $G(s)$ to zero :

$$
\begin{align}
&\det(sI-A) = 0
\end{align}
$$

The above equation determine the system poles.

**Review: stability**

A system is stable if an only if the real part of all the poles is negative. If at least one of the poles has a positive real part, then the system is unstable.
![](https://cdn.breizhhardware.fr/FAKA3/SAkoraDi82.png/raw)

**Problem 9**

The state space representation of a system is given by:

$$
\begin{align}
&\dot{x} = \begin{bmatrix}
0 & 3 & 1 \\
2 & 8 & 1 \\
-10 & -5 & -2
\end{bmatrix}x + \begin{bmatrix}
10 \\
0 \\
0
\end{bmatrix}u \\
&y = \begin{bmatrix}
1 & 0 & 0
\end{bmatrix}x
\end{align}
$$

Check if the system is stable.

$$
\begin{align}
&sI-A = \begin{bmatrix}
s & 0 & 0 \\
0 & s & 0 \\
0 & 0 & s
\end{bmatrix} - \begin{bmatrix}
0 & 3 & 1 \\
2 & 8 & 1 \\
-10 & -5 & -2
\end{bmatrix} = \begin{bmatrix}
s & -3 & -1 \\
-2 & s-8 & -1 \\
10 & 5 & s+2
\end{bmatrix} \\
&\det(sI-A) = \det \begin{bmatrix}
s & -3 & -1 \\
-2 & s-8 & -1 \\
10 & 5 & s+2
\end{bmatrix}  \\
&= s*\det \begin{bmatrix}
s-8 & -1 \\
5 & s+2
\end{bmatrix} + 3*\det \begin{bmatrix}
-2 & -1 \\
10 & s+2
\end{bmatrix} - \det \begin{bmatrix}
-2 & s-8 \\
10 & 5
\end{bmatrix} \\
&= s ((s-8)(s+2)+5) + 3(-2(s+2) + 10) - (-10 - 10(s-8)) \\
&= s^3-6s^2-11s - 6s + 18 + 10s - 70 = s^3 - 6s^2 - 7s - 52 \\
&\det(sI - A) = 0 \implies s^3 - 6s^2 - 7s - 52 = 0 \\
&\text{Since we have a polynomial of order >= 2, we cannot determine the poles, thus we have to use} \\
&\text{Routh criterion} \\
&\begin{array}{c|cc}
s^3 & 1 & -7 \\
s^2 & -6 & -52 \\
s^1 & \frac{(-6)(-7) - (1)(-52)}{-6} = \frac{42 + 52}{-6} = -\frac{94}{6} = -\frac{47}{3} & 0 \\
s^0 & \frac{(-\frac{47}{3})(-52) - (-6)0}{-\frac{47}{3}} = \frac{\frac{2444}{3} - 0}{-\frac{47}{3}} = -52 & 0 \\
\end{array}
\end{align}
$$

The system is stable if all coefficients of the first column have the same sign.

Since we have one sign change this implies that we have one pole with positive real part => The system is unstable.

# 7 - Steady state error for systems in state space

Consider the following closed-loop system represented in state space:

$$
\begin{align}
& \dot{x} = Ax + Bu \color{red}{(1)}\\
& y = Cx \color{red}{(2)}
\end{align}
$$

![](https://cdn.breizhhardware.fr/FAKA3/xodUREwE10.png/raw)

The error is given by:

$$
\begin{align}
& E(s) = U(s)-Y(s) \color{red}{(2')}
\end{align}
$$

Taking the Laplace transform of eq $\color{red}{(1)}$ leads:

$$
\begin{align}
& sX(s) = AX(s) + BU(s) \\
& (sI - A)X(s) = BU(s) \\
& X(s) = (sI-A)^{-1}BU(s) \color{red}{(3)}
\end{align}
$$

Taking Laplace transform of eq $\color{red}{(2)}$:

$$
\begin{align}
& Y(s) = CX(s) \\
& Y(s)= C(sI-A)^{-1}BU(s) \color{red}{(4)}
\end{align}
$$

Plugging eq $\color{red}{(2')}$ and $\color{red}{(4)}$:

$$
\begin{align}
& E(s) = U(s) - C(sI - A)^{-1}BU(s) \\
& = U(s) [1 - C(sI-A)^{-1}B] \\
\end{align}
$$

To find $e(\infty)$ we apply the final value theorem:

$$
\begin{align}
& e(\infty) = \lim_{ t \to \infty } e(t) = \lim_{ s \to 0 } sE((s)) \\
& e(\infty) = \lim_{ s \to 0 } sU(s)[1-C(sI-A)^{-1}B]
\end{align}
$$

Where $U(s)$ is the input

|  $u(t)$   |        $U(s)$        |
| :-------: | :------------------: |
|    $1$    |    $\frac{1}{s}$     |
|    $t$    |   $\frac{1}{s^2}$    |
|   $t^n$   | $\frac{n!}{s^{n+1}}$ |
| $e^{-at}$ |   $\frac{1}{s+a}$    |

![](https://cdn.breizhhardware.fr/FAKA3/Pakokete50.png/raw)

**Problem 10**

Evaluate the steady-sate error for the system described by:

$$
\begin{align}
& \dot{x} = \begin{bmatrix}
1 & 0 \\
1 & 2
\end{bmatrix} x + \begin{bmatrix}
0 \\
1
\end{bmatrix}u \\
& y = \begin{bmatrix}
-1 & 0
\end{bmatrix}x
\end{align}
$$

for umit step input.

**Solution**

The steady state error is given by:

$$
\begin{align}
& e(\infty) = \lim_{ t \to \infty } e(t) = \lim_{ s \to 0 } sE((s)) \\
& e(\infty) = \lim_{ s \to 0 } sU(s)[1-C(sI-A)^{-1}B]
\end{align}
$$

$$
\begin{align}
& (sI - A) = \begin{bmatrix}
s & 0 \\
0 & s
\end{bmatrix} - \begin{bmatrix}
1 & 0 \\
1 & 2
\end{bmatrix} = \begin{bmatrix}
s-1 & 0 \\
-1 & s-2
\end{bmatrix} \\
& (sI - A)^{-1} = \frac{1}{(s-1)(s-2)}\begin{bmatrix}
s-2 & 0 \\
1 & s-1
\end{bmatrix} = \frac{1}{s^2 - 3s +2}\begin{bmatrix}
s-2 & 0 \\
1 & s-1
\end{bmatrix} \\
& e(\infty) = \lim_{ s \to 0 } sU(s)\left( 1-\begin{bmatrix}
-1 & 0
\end{bmatrix} \frac{1}{s^2-3s+1} \begin{bmatrix}
s-2 & 0 \\
1 & s-1
\end{bmatrix} \begin{bmatrix}
0 \\
1
\end{bmatrix} \right)  \\
& e(\infty) = \lim_{ s \to 0 } sU(s)\left( 1- \frac{1}{s^2-3s+1} \right)
\end{align}
$$