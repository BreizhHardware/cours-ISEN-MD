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
\dot{x} &= Ax + Bu \\
y &= Cx + Du \\
\\
x &: \text{states variables vector} = \begin{bmatrix} x_{1} \\ x_{2} \\ \vdots \\ x_{n} \end{bmatrix} \\
u &: \text{system input} \\
y &: \text{system output} \\
A, B, C, D &: \text{matrices} \\
A &: \text{system matrix} \\
B &: \text{input matrix} \\
C &: \text{output matrix} \\
D &: \text{feed forward matrix}
\end{aligned}
$$

**State space representation of a linear differential equation**
Consider the following differential equation:
$$
\begin{aligned}
\underbrace{y''''}_{\color{red}{\dot{x_{4}}}} + a_{1}\underbrace{y'''}_{\color{red}{{x_{4}}}} + a_{2}\underbrace{y''}_{\color{red}{{x_{3}}}} + a_{3}\underbrace{y'}_{\color{red}{{x_{2}}}} + a_{4}\underbrace{y}_{\color{red}{{x_{1}}}} = u`
\end{aligned}
$$

In this exemple we have a differential equation of order = 4 => we have 4 state variables
We define the state variables as:
$$
\begin{aligned}
x_{1} = y \\
x_{2} = y\prime = \frac{dy}{dt} = \dot{y} = \dot{x_{1}} \\
x_{3} = y\prime\prime = \frac{d^2y}{dt^2} = \dot{x_{2}} \\
x_{4} = y\prime\prime\prime = \frac{d^3y}{dt^3} = \dot{x_{3}} \\
\implies 
\dot{x_{4}} &= -a_{1}x_{4}-a_{2}x_{3}-a_{3}x_{2}-a_{4}x_{1}+u \\
\end{aligned}
$$
We obtain the following system of equation
$$
\begin{aligned}
\dot{x_{1}} = x_{2} \\
\dot{x_{2}} = x_{3} \\
\dot{x_{3}} = x_{4} \\
\dot{x_{4}} -a_{1}x_{4}-a_{2}x_{3}-a_{3}x_{2}-a_{4}x_{1}+u \\
\text{Write the above system under the form } \dot{X} = Ax + Bu \\
\dot{X} = \begin{matrix}
\dot{x_{1}} \\
\dot{x_{2}} \\
\dot{x_{3}} \\
\dot{x_{4}} \\
\end{matrix}
=
\begin{bmatrix}
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
1 & 0 & 0 & 0 
\end{bmatrix}

\end{aligned}
$$
