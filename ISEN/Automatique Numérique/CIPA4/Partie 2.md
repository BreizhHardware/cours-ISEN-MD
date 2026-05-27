#AutomatiqueNumérique #CIPA4 

**Control system design in state space**

# 2.1 - Controllability

A system is said to be controllable if it is possible to transfer the system from a desired initial state $x(t_0)$ to a desired final state $x(t)$.

Requirements :

A system $\dot{x} = Ax + Bu$ is completely controllable if the controllability matrix $M = C_{m} = \begin{bmatrix}B & AB & A^2B & \cdots{}& A^{n-1}B\end{bmatrix}$ is of rank n

>Note: The rank of a matrix can be found by finding the highest order square submatrix that is nonsingular (det $\neq$ 0)

**Exercice 1 :**

Consider the system given by

$$
\dot{x} = \begin{bmatrix}
1 & 1 \\
0 & -1
\end{bmatrix}x + \begin{bmatrix}
1 \\
0
\end{bmatrix}u
$$

determine its controllability

**Solution**

The controllability matrix $M = \begin{bmatrix}B & AB\end{bmatrix} =\begin{bmatrix}\begin{bmatrix}1 \\ 0\end{bmatrix}\begin{bmatrix}1 \\ 0\end{bmatrix}\end{bmatrix} = \begin{bmatrix}1 & 1 \\ 0 & 0\end{bmatrix}$ M is of rank $1 < 2$ therefore the system is not completely controllable.

**Exercice 2 :**

Determine the controllability of the following system :

$$
\dot{x} = \begin{bmatrix}
1 & 1 \\
2 & -1
\end{bmatrix}x + \begin{bmatrix}
0 \\
1
\end{bmatrix}u
$$

**Solution**

The controllability matrix $M = \begin{bmatrix}B & AB\end{bmatrix} = \begin{bmatrix}\begin{bmatrix}0 \\ 1\end{bmatrix}\begin{bmatrix}1 \\ -1\end{bmatrix}\end{bmatrix} = \begin{bmatrix}0 & 1 \\ 1  &  -1\end{bmatrix}$ $M$ is non singular because $\det(M) = -1 \neq 0 \implies rank(M) = n = 2$ therefore the system is completely state controllable.

# 2.2 - Observability

If $x(t_0)$ can be found from the observation of $y(t)$ (and $u(t)$) over a limite interval of time, the system is said to be observation.

**Condition :** It is prooved that the system 

$$
\begin{align}
& \dot{x} = Ax + Bu \\
& y = Cx
\end{align}
$$
is completely observable if the observability matrix, defined by

$$
\begin{align}
& O = O_{m} = \begin{bmatrix}
C \\
CA \\
CA^2 \\
\vdots \\
CA^{n-1}
\end{bmatrix}  \\
& \text{or } O_{m} = \begin{bmatrix}
C^T & A^TC^T & \cdots & (A^T)^{n-1}C^T
\end{bmatrix}
\end{align}
$$

is of rank n 

**Exercice 3**

Consider the system described by

$$
\begin{align}
& \dot{x} = \begin{bmatrix}
1 & 1 \\
2 & -1
\end{bmatrix}x + \begin{bmatrix}
0 \\
1
\end{bmatrix}u \\
& y = \begin{bmatrix}
1 & 0
\end{bmatrix}x
\end{align}
$$

is the system controllable and observable ?

**Solution**

The controllability matrix $M = \begin{bmatrix}B & AB\end{bmatrix} = \begin{bmatrix}\begin{bmatrix}0 \\ 1\end{bmatrix}\begin{bmatrix}1 \\ -1\end{bmatrix}\end{bmatrix} = \begin{bmatrix}0 & 1 \\ 1  &  -1\end{bmatrix}$ $M$ is non singular because $\det(M) = -1 \neq 0 \implies rank(M) = n = 2$ therefore the system is completely state controllable.

The observability matrix $O_{m} = \begin{bmatrix}C \\ CA\end{bmatrix} = \begin{bmatrix}\begin{bmatrix}1 & 0\end{bmatrix} \\ \begin{bmatrix}1 & 1\end{bmatrix}\end{bmatrix} = \begin{bmatrix}1 & 0 \\ 1 & 1\end{bmatrix}$ $O_{m}$ is of rank $2$ because $\det(O_{m}) \neq 0$ therefore the system is completely observable.

# 2.3 - Controllable and observable canonical forms
Consider a system defined by its transfer function:

$$
\begin{align}
\frac{Y(s)}{U(s)} = \frac{b_{0}s^n + b_{1}s^{n-1} + \cdots + b_{n-1}s + b_{n}}{s^n+a_{1}s^{n-1}+\cdots + a_{n-1}s + a_{n}}
\end{align}
$$

The following state space representation is called controllable canonical form: 

$$
\begin{align}
& \dot{x} = \begin{bmatrix}
0 & 1 & 0 \cdots & 0 \\
0 & 0 & 1 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & \ddots & 1 \\
-a_{n} & -a_{n-1} & -a_{n-2} & \cdots & -a_{1}
\end{bmatrix}x + \begin{bmatrix}
0 \\
0 \\
0 \\
\vdots \\
0 \\
1
\end{bmatrix}u \\
& y = \begin{bmatrix}
b_{n} - a_{n}b_{0} & b_{n-1}-a_{n-1}b_{0} & \cdots & b_{1}-a_{1}b_{0}
\end{bmatrix}x + b_{0}u
\end{align}
$$

The following state space representation is called an observable canonical form:

$$
\begin{align}
& \dot{x} = \begin{bmatrix}
0 & 0 & \cdots & 0 & -a_{n} \\
1 & 0 & \cdots & 0 & -a_{n-1} \\
0 & 1 & \ddots & \vdots & \vdots \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
0 & 0 & \cdots & 1 & -a_{1}
\end{bmatrix}x + \begin{bmatrix}
b_{n}-a_{n}b_{0} \\
b_{n-1}-a_{n-1}b_{0} \\
\vdots \\
b_{1}-a_{1}b_{0}
\end{bmatrix}u \\
& y = \begin{bmatrix}
0 & 0 & \cdots & 0 & 1
\end{bmatrix}x + b_{0}u
\end{align}
$$

**Exercice 4 :**

Consider the system given by :

$$
\begin{align}
& \frac{Y(s)}{U(s)} = \frac{s+3}{s^2+3s+2}
\end{align}
$$

Obtain state space representation in controllable dans observable canonical forms.

**Solution**

We have n = 0 $b_{0}$ = 0 $b_{1}$ = 1 $b_2$ = 3 $a_1$ = 3 $a_2$ = 2
controllable canonical form with n = 2:

$$
\begin{align}
& \dot{x} = \begin{bmatrix}
0 & 1 \\
-a_{2} & -a_{1}
\end{bmatrix}x + \begin{bmatrix}
0 \\
1
\end{bmatrix}u = \begin{bmatrix}
0 & 1 \\
-2 & -3
\end{bmatrix}x + \begin{bmatrix}
0 \\
1
\end{bmatrix}u \\
& y = \begin{bmatrix}
b_{2}-a_{2}b_{0} & b_{1}-a_{1}b_{0}x + b_{0}u
\end{bmatrix}  = \begin{bmatrix}
3-2*0 & 1-3*0
\end{bmatrix}x + 0u = \begin{bmatrix}
3 & 1
\end{bmatrix}x
\end{align}
$$

observable canonical form:

$$
\begin{align}
& \dot{x} = \begin{bmatrix}
0 & -a_{2} \\
1 & -a_{1}
\end{bmatrix}x + \begin{bmatrix}
b_{2}-a_{2}b_{0} \\
b_{1}-a_{1}b_{0}
\end{bmatrix}u = \begin{bmatrix}
0 & -2 \\
1 & -3
\end{bmatrix}x + \begin{bmatrix}
3 \\
1
\end{bmatrix}u \\
& y = \begin{bmatrix}
0 & 1
\end{bmatrix}x + b_{0}u = \begin{bmatrix}
0 & 1
\end{bmatrix}x
\end{align}
$$

# 2.4 - Pole placement design
- In conventional approach, we design a controller such that dominant poles meet the desired criteria ($\delta$, $\omega_{n}$)
- If all state variables are mesurable and are available for feedback, it can be shown that if the system is completely state controllable, then poles can be placed at any desired location by mean of state feedback
- The present pole-placement approach specifies all closed loop poles (and not only dominant poles in the conventional approach)

Consider a control system :

$$
\begin{align}
& \dot{x} = Ax + Bu \color{red}{(1)}\\
& y = Cx + Du \color{red}{(2)}
\end{align}
$$

We choose the control signal to be : 

$$
\begin{align}
& u = -Kx \color{red}{(3)}
\end{align}
$$

K is called the state feedback gain matrix.

size(k) = $1*n$

The block diagram becomes :

![](https://cdn.breizhhardware.fr/FAKA3/vImiZoLi37.png/raw)

$$
\begin{align}
& \text{eq } \color{red}{(1)} \text{ \color{black}and } \color{red}{(3)} \\
& \dot{x} = Ax + B(-Kx) \\
& \dot{x} = Ax - BKx \\
& \dot{x} = (A - BK)x
\end{align}
$$

The solution is given by :
$$
\begin{align}
& x(t) = e^{(A-BK)t}.x(0) \\
& \implies \text{The stability and transient response characteristics are determined} \\
& \text{by the eigenvalues (valeurs propres) of matrix A-BK}
\end{align}
$$

**Determination of K matrix :**

- Step 1: First check the controllability condition of the system. If the system is completely state controllable, then K matrix can be determined.
- Step 2: Let the desired closed-loop poles be $\mu_{1}, \mu_{2}, \cdots, \mu_{n}$ write the desired characteristic polynomial $(s-\mu_{1})(s-\mu_{2}\cdots(s-\mu_{n}))$ under the developped form $s^n+\alpha_{1}s^{n-1}+\alpha_{2}s^{n-2}+\cdots+\alpha_{n-1}s+\alpha_{n}$

**Method 1:** Determination of K using direct substitution method

- Step 3: K can be found by equating the characteristic polynomials $\det(sI-(A-BK)) = (s-\mu_{1})(s-\mu_{2})\cdots(s-\mu_{n}) = s^n+\alpha_{1}s^{n-1}+\cdots+\alpha_{n-1}s^1+\alpha_{n}$ where $I$ is the identity matrix

**Method 2:** Determination of K using transformation matrix $T$

- Step 3: Write the characteristic polynomial of matrix $A$ under the form: $\det(sI-A) = s^n+a_{1}s^{n-1}+\cdots+a_{n-1}s+a_{n}$
- Step 4: Determine the transformation matrix $T$ that transforms the system state equation into controllable canonical form.

$$
\begin{align}
& T = MW
\end{align}
$$

Where $M$ is the controllability matrix :

$$
\begin{align}
& M = \begin{bmatrix}
B & AB & A^2B & \cdots & A^{n-1}B
\end{bmatrix}
\end{align}
$$

and $W = \begin{bmatrix}a_{n-1} & a_{n-2} & \cdots & a_{1} & 1 \\  a_{n-2} & a_{n-3} & \cdots & 1 & 0  \\  \vdots \\  a_{1} & 1 & \cdots & 0 & 0 \\  1 & \cdots & \cdots & 0 & 0\end{bmatrix}$

Where $a_i$ are the coefficients of the characteristic polynomial $\det(sI-A) = s^n+a_{1}s^{n-1}+\cdots+a_{n-1}s+a_{n}$

>Note that if the system is already in the controllable canonical form, then $T = I$ where $I$ is the identity matrix.

- Step 5: Determine K using:
$K = \begin{bmatrix}\alpha_{n}-a_{n} & \alpha_{n-1}-a_{n-1} & \cdots & \alpha\end{bmatrix}$