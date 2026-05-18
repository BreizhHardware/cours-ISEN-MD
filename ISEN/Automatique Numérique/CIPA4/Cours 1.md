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
