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
&\underbrace{y''''}_{\color{red}{\dot{x_{4}}}} + a_{1}\underbrace{y'''}_{\color{red}{{x_{4}}}} + a_{2}\underbrace{y''}_{\color{red}{{x_{3}}}} + a_{3}\underbrace{y'}_{\color{red}{{x_{2}}}} + a_{4}\underbrace{y}_{\color{red}{{x_{1}}}} = u`
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
& v_{l} = L \frac{di}{dt} \\
&\text{write the output equation under the form } y = Cx + Du \\
& v_{l} = L \frac{di}{dt} = L \dot{x_{1}}\\
&\text{using eq {\color{red}{(2)}}:} \\
& v_{l} = -Rx_{1} + v(t) \text{ of the form: } \\
& y = Cx + Du \\
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
&\text{where i = }\frac{dq}{dt} \\
&\implies v(t) = R \frac{dq}{dt} + L \frac{d^2q}{dt^2} + \frac{1}{C}q \\
&v(t) = L \frac{d^2i}{dt^2} + R \frac{dq}{dt} + \frac{1}{C}q \color{red}{(1)}\\
&\text{diff. eq. of order 2 => 2 state variables}\\
&\text{we choose: }\\
&x_{1} = q \\
& x_{2} = \frac{dq}{dt} = \dot{x_{1}} {\color{red}{(2)}} \implies \dot{x_{2}} = \frac{d^2q}{dt^2} \\
&{\color{red}{(1)}:} v(t) = R x_{2} + L \dot{x_{2}} + \frac{1}{C} x_{1} \\
&\implies \dot{x_{2}} = -\frac{1}{LC}x_{1} - \frac{R}{L}x_{2} + \frac{1}{L} v(t) \color{red}{(3)}\\
&\text{Write eq {\color{red}{(2)}} and {\color{red}{(3)}} under the form } \dot{x} = Ax + Bu \\
&\dot{x} = \begin{bmatrix}
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
&\text{The output equation:} \\
&v(c) = \frac{1}{C}q \\
&\text{Write the output under the form } y = Cx + Du \\
&v(c) = \frac{1}{C}x_{1} \\
&v_{c} = \begin{bmatrix}
\frac{1}{C} & 0
\end{bmatrix} \begin{bmatrix}
x_{1}  \\
x_{2}
\end{bmatrix} + \begin{bmatrix}
0
\end{bmatrix}v(t) \\
&\text{C = } \begin{bmatrix}
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
&\sum \vec{Forces} = m.\vec{a}  \\
& -b \dot{y} - ky - u(t) = m \ddot{y} \\
&m \ddot{y} + b \dot{y} + ky = u(t)
\end{align}
$$