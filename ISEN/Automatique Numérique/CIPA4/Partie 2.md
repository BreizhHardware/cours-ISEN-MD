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
$K = \begin{bmatrix}\alpha_{n}-a_{n} & \alpha_{n-1}-a_{n-1} & \cdots & \alpha_{2}-a_{2} & \alpha_{1}-a_{1}\end{bmatrix}T^{-1}$

**Method 3:** Determination of K using Ackermann's formula

- Step 3: determine K using the following expression

$$
\begin{align}
& K = \begin{bmatrix}
0 & 0 & \cdots & 0 & 1
\end{bmatrix}M^{-1}\phi(A) \\
& = \begin{bmatrix}
0 & 0 & \cdots & 0 & 1
\end{bmatrix}\begin{bmatrix}
B & AB & \cdots & A^{n-1}B
\end{bmatrix}^{-1}\phi(A)
\end{align}
$$

where

$$
\begin{align}
& \phi(A) = A^n+\alpha_{1}A^{n-1}+\cdots+\alpha_{n-1}A+\alpha_{n}I
\end{align}
$$

**Exercice 5**

Consider the following system

$$
\begin{align}
& \dot{x} = Ax + Bu \\
& \text{Where} \\
& A = \begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
-1 & -5 & -6
\end{bmatrix} \text{ and } B = \begin{bmatrix}
0 \\
0 \\
1
\end{bmatrix}
\end{align}
$$
The system uses the state feedback control $u = -Kx$

Let the desired closed-loop poles located at:

$$
\begin{align}
& s= -2 j_{4} & s= -2-j4
\end{align}
$$
Use the 3 methods to determine the state feedback gain matrix K

**Solution**

- Step 1: Controllability condition

$$
\begin{align}
& M = \begin{bmatrix}
B & AB & A^2B
\end{bmatrix} \\
& \text{Where } B = \begin{bmatrix}
0 \\
0 \\
1
\end{bmatrix} & AB = \begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
-1 & -5 & -6
\end{bmatrix}\begin{bmatrix}
0 \\
0 \\
1
\end{bmatrix} = \begin{bmatrix}
0 \\
1 \\
-6
\end{bmatrix} \\
& A^2B = A*AB = \begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
-1 & -5 & -6
\end{bmatrix}\begin{bmatrix}
0 \\
1 \\
-6
\end{bmatrix} = \begin{bmatrix}
1 \\
-6 \\
31
\end{bmatrix} \\
& \implies M = \begin{bmatrix}
0  & 0 & 1\\
0  & 1 & -6\\
1 & -6 & 31
\end{bmatrix} & \det(M) = 1[0*(-6)-1*1] = -1 \neq 0 \implies \text{M} \\
 &  & \text{is of rank 3 thus the system is completely state} \\
 &  & \text{controllable and arbitary pole placement is} \\
 &  & possible
\end{align}
$$
- Step 2: 

$$
\begin{align}
& (s-\mu_{1})(s-\mu_{2})(s-\mu_{3}) = s^3+\alpha_{1}s^2+\alpha_{2}s+\alpha_{3} \\
& (s+2-j4)(s+2+j4)(s+10) = ((s+2)^2-(j4)^2)(s+10) \\
& = (s^2+4s+2+16)(s+10) = (s^2+4s+18)(s+10) \\
& = s^3+10s^2+4s^2+40s+20s+200 \\
& = s^3+14s^2+60s+200
\end{align}
$$

of the form $s^3 + \alpha_{1}s^2 + \alpha_{2}s + \alpha_{3}$ where $\alpha_{1} = 14, \alpha_{2} = 60, \alpha_{3} = 200$

**Method 1:**

- Step 3:

$$
\begin{align}
& \det(sI - (A-BK)) = s^3 + \alpha_{1}s^2+\alpha_{2}s+\alpha_{3} \\
& \det(sI - A + BK) = s^3 + 14s^2 + 60s + 200 \color{red}{(1)}\\
& \text{where } \det(sI - A + BK) = \det(\begin{bmatrix}
s & 0 & 0 \\
0 & s & 0 \\
0 & 0 & s
\end{bmatrix} - \begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
-1 & -5 & -6
\end{bmatrix}+ \begin{bmatrix}
0 \\
0 \\
1
\end{bmatrix}\begin{bmatrix}
K_{1} & K_{2} K_{3}
\end{bmatrix}) \\
& = \det(\begin{bmatrix}
s & -1 & 0 \\
0 & s & -1 \\
1 & 5 & s+6
\end{bmatrix}+\begin{bmatrix}
0  & 0 & 0\\
0  & 0 & 0\\
K_{1} & K_{2} & K_{3}
\end{bmatrix}) \\
& = \det(\begin{bmatrix}
s & -1 & 0 \\
0 & s & -1 \\
1+K_{1} & 5+K_{2} & s+6+K_{3}
\end{bmatrix})  \\
& = s[s(s+6+K_{3}) - (-1)(5+K_{2})-(-1)]-(-1)[0(s+6+K_{3}) - (-1)(1+K_{1})]+0 \\
& = s[s^2+6s+K_{3}s+5+K_{2}]+(1+K_{1}) = s^3+6s^2+K_{3}s^2+5s+K_{2}s+1+K_{1} \\
& = s^3 + (6+K_{3})s^2 + (5+K_{2})s + (1+K_{1}) \\
& \text{Eq \color{red}{(1)} \color{black} becomes:} \\
& \det(sI-A+BK) = s^3+14s^2+60s+200 \\
& s^3 + (6+K_{3})s^2 + (5+K_{2})s + (1+K_{1}) = s^3+14s^2+60s+200 \\
& K_{3} = 8, K_{2} = 55, K_{1} = 199 \\
& \fcolorbox{red}{white}{$
K = \begin{bmatrix}
199 & 55 & 8
\end{bmatrix}
$} \\
\end{align}
$$

**Method 2:** Using the transformation matrix $T$

- Step 3:

$$
\begin{align}
& \det(sI - A) = \det(\begin{bmatrix}
s & 0 & 0 \\
0 & s & 0 \\
0 & 0 & s
\end{bmatrix} - \begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
-1 & -5 & -6
\end{bmatrix}) \\
& = \det(\begin{bmatrix}
s & -1 & 0 \\
0 & s & -1 \\
1  & 5 & s+6
\end{bmatrix}) = s[s(s+6)-(-1)5] - (-1)[0(s+6)-(-1)(1)] + 0 \\
& = s(s^2+6s+5) + 1 = s^3 + 6s^2 + 5s + 1 \\
& \text{Of the form } s^3+a_{1}s^2+a_{2}s+a_{3} \\
& \text{With } a_{1} = 6, a_{2} = 5, a_{3} = 1
\end{align}
$$
- Step 4:

$$
\begin{align}
& T = MW = I \text{ because the state equation is given in the controllable canonical form}
\end{align}
$$

- Step 5:

$$
\begin{align}
& K = \begin{bmatrix}
\alpha_{3} - a_{3} & \alpha_{2}- a_{2} & \alpha_{1}-a_{1}
\end{bmatrix}T^{-1} \\
& = \begin{bmatrix}
200 - 1 & 60 - 5 & 14 - 6
\end{bmatrix}I^{-1} \\
& \fcolorbox{red}{white}{$
K = \begin{bmatrix}
199 & 55 & 8
\end{bmatrix}
$} 
\end{align}
$$

**Method 3:**

- Step 3:

$$
\begin{align}
& K = \begin{bmatrix}
0 & 0 & 1
\end{bmatrix}M^{-1}\phi(A) \\
& \text{Where } M = \begin{bmatrix}
0  & 0 & 1\\
0  & 1 & -6\\
1 & -6 & 31
\end{bmatrix} (Step 1) \\
& \text{And } \phi(A) = A^3+\alpha_{1}A^2+\alpha_{2}A + \alpha_{3}I \\
& = A^3 + 14A^2+60A+200I \\
& A = \begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
-1 & -5 & -6
\end{bmatrix} A^2=\begin{bmatrix}
0 & 0 & 1 \\
-1 & -5 & -6 \\
6 & 29 & 31
\end{bmatrix} A^3 = \begin{bmatrix}
-1 & -5 & -6 \\
6 & 29 & 31 \\
-31 & -149 & -157
\end{bmatrix} \\
& \phi(A) = A^3+14a^2+60A+200I \\
& = \begin{bmatrix}
-1 & -5 & -6 \\
6 & 29 & 31 \\
-31 & -149 & -157
\end{bmatrix} + 14 \begin{bmatrix}
0 & 0 & 1 \\
-1 & -5 & -6 \\
6 & 29 & 31
\end{bmatrix} + 60 \begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
-1  & -5 & -6
\end{bmatrix} + 200 \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix} \\
& \phi(A) = \begin{bmatrix}
199 & 55 & 8 \\
-8 & 159 & 7 \\
-7 & -43 & 117
\end{bmatrix}  \\
& \text{Calcul of } M^{-1} \\
& M^{-1} = \begin{bmatrix}
0 & 0 & 1 \\
0 & 1 & -6 \\
1 & -6 & 31
\end{bmatrix} = \frac{1}{\det}.[cof(A)]^T \\
& cof(A) = \begin{bmatrix}
\det(\begin{bmatrix}
1 & -6 \\
-6 & 31
\end{bmatrix}) & -\det(\begin{bmatrix}
0 & -6 \\
1 & 31
\end{bmatrix}) & \det(\begin{bmatrix}
0 & 1 \\
1 & -6
\end{bmatrix}) \\
-\det(\begin{bmatrix}
0 & 1 \\
-6 & 31
\end{bmatrix}) & \det(\begin{bmatrix}
0 & 1 \\
1 & 31
\end{bmatrix}) & -\det(\begin{bmatrix}
0 & 0 \\
1 & -6
\end{bmatrix}) \\
\det(\begin{bmatrix}
0 & 1 \\
1 & -6
\end{bmatrix}) & -\det(\begin{bmatrix}
0 & 1 \\
0 & -6
\end{bmatrix}) & \det(\begin{bmatrix}
0 & 0 \\
0 & 1
\end{bmatrix})
\end{bmatrix} \\
& = \begin{bmatrix}
-5 & -6 & -1 \\
-6 & -1 & 0 \\
-1 & 0 & 0
\end{bmatrix} \\
& cof(A)^T = \begin{bmatrix}
-5 & -6 & -1 \\
-6 & -1 & 0 \\
-1 & 0 & 0
\end{bmatrix} \\
& \det(A) = -1 \\
& M^{-1} = \frac{1}{-1}\begin{bmatrix}
-5 & -6 & -1 \\
-6 & -1 & 0 \\
-1 & 0 & 0
\end{bmatrix} = \begin{bmatrix}
5 & 6 & 1 \\
6 & 1 & 0 \\
1 & 0 & 0
\end{bmatrix} \\
& K = \begin{bmatrix}
0 & 0 & 1
\end{bmatrix}M^{-1}\phi(A) = \begin{bmatrix}
0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
5 & 6 & 1 \\
6 & 1 & 0 \\
1 & 0 & 0
\end{bmatrix}\begin{bmatrix}
199 & 55 & 8 \\
-8 & 159 & 7 \\
-7 & -43 & 117
\end{bmatrix} \\
& \fcolorbox{red}{white}{$
K = \begin{bmatrix}
199 & 55 & 8
\end{bmatrix}
$} 
\end{align}
$$

# 2.5 - State observer
- In pole-placement design, we assumed that all state variables are measurable and available for feedback
- In many practical cases , not all state variables are measurable, and in this case we need to estimate state variables
- A device (or computer program) that estimates the state variables based on the measurements of the output and control variables, is called a state observer
- A device that estimates all the states is called a full-order state observer

Consider the system defined by:

$$
\begin{align}
& \dot{x} = Ax + Bu \\
& y = Cx \\
\end{align}
$$

Let $\tilde{x}$ denotes the observed state vector $x$

Let's define the mathematical model of the observer to be:

$$
\begin{align}
& \dot{\tilde{x}} = A \tilde{x} + Bu + K_{e}(y-c \tilde{x}) \\
& \dot{\tilde{x}} = (A - K_{e}C)\tilde{x} + Bu + K_{e} y \\
& K_{e} \text{ : is called the observer gain matrix} \\
& C \tilde{x} \text{ : is called the estimated output}
\end{align}
$$

> Note that the model of the observer is basically the same as that of the plant, except that we included an additional term that include the estimation error

Foll order state observer $\color{red}{\text{(FOSO)}}$

$$
\begin{align}
& \dot{x} - \dot{\tilde{x}} = Ax + Bu - A \tilde{x} - Bu - K_{e}(y-C \tilde{x}) \\
& = A(x - \tilde{x}) - K_{e}(y - C \tilde{x}) \\
& = A(x - \tilde{x}) - K_{e}(Cx - C \tilde{x}) \\
& = A(x - \tilde{x}) - K_{e}C(x-\tilde{x}) \\
& = (A-K_{e}C)(x - \tilde{x}) \\
& \dot{x} - \dot{\tilde{x}} = (A-K_{e}C)(x - \tilde{x}) 
\end{align}
$$

Defined the error vector $e = x - \tilde{x}$, we can write:

$$
\begin{align}
& \dot{e} = (A - K_{e}c)e \\
& \text{The solution is given by } e(t) = \exp[(A - K_{e}C)t].e(0) \\
& \implies \text{The dynamic behaviour of the error is determined by the eigen values of the maxtrix } A-K_{e}C 
\end{align}
$$
If the plant is completely observable, then it is possible to choose matrix $K_{e}$ such that $A-K_{e}C$ has arbitrarely design eigen values (desired poles).

The problem is mathematically similar to the pole placement problem.

The block diagram of the full order state observer is given by:

![](https://cdn.breizhhardware.fr/FAKA3/DIbitiQO35.png/raw)

**Determination of the observer gain matrix $K_e$**

- Step 1: Examine the observability matrix. If the system is completly observabile, then the determination of $K_e$ is possible.
- Step 2: Write the desired characteristic polynomial as:

$$
\begin{align}
& (s - \mu_{1})(s - \mu_{2})\cdots(s-\mu_{n}) = s^n+\alpha_{1}s^{n-1}+\cdots+\alpha_{n-1}s+\alpha_{n}
\end{align}
$$

**Method 1:**

- Step 3:

$$
\begin{align}
& \det(sI-(A-K_{e}C)) = (s-\mu_{1})(s-\mu_{2})\cdots(s-\mu_{n}) \\
& = s^n+\alpha_{1}s^{n-1}+\cdots+\alpha_{n-1}s+\alpha_{n} \\
& \text{Where }K_{e} \text{ is of size n*1}
\end{align}
$$

**Method 2:**

- Step 3: Write the characteristic polynomial of matrix $A$ as:

$$
\begin{align}
& \det(sI-A) = s^n+\alpha_{1}s^{n-1}+\cdots+\alpha_{n-1}s+\alpha_{n}
\end{align}
$$

- Step 4: Determine the transformation matrix $Q$ that transforms the system state equation into observability canonical form:

$$
\begin{align}
& Q=(W.O_{n}^T)^{-1} \\
& \text{Where } Q_{n} \text{ is the observability matrix} \\
& O_{n} = \begin{bmatrix}
C^T & A^TC^T & \cdots & (A^T)^{n-1}C^T
\end{bmatrix} \text{ and } W = \begin{bmatrix}
a_{n-1} & a_{n-2} & \cdots & a_{1} & 1 \\
a_{n-2} & a_{n-3} & \cdots & 1 & 0 \\
\vdots & \vdots & \vdots & \vdots & \vdots \\
a_{1} & 1 & \cdots & 0 & 0 \\
1 & 0 & \cdots & 0 & 0
\end{bmatrix}
\end{align}
$$

- Step 5: $K_{e}$ is determined using:

$$
\begin{align}
& K_{e} = Q\begin{bmatrix}
\alpha_{n}-a_{n} \\
\alpha_{n-1}-a_{n-1} \\
\vdots \\
\alpha_{1}-a_{1}
\end{bmatrix}
\end{align}
$$

**Method 3:**

- Step 3: Determine $K_{e}$ using Ackermann's formula:

$$
\begin{align}
& K_{e} = \phi(A)O_{n}\begin{bmatrix}
0 \\
0 \\
\vdots \\
0 \\
1
\end{bmatrix} \\
& \text{Where } \phi(A) = A^n+\alpha_{1}A^{n-1}+\cdots+\alpha_{n-1}A+\alpha_{n}I \\
& \text{and }O_{n}=\begin{bmatrix}
C \\
CA \\
\vdots  \\
CA^{n-2} \\
CA^{n-1}
\end{bmatrix} \text{ is the observability matrix}
\end{align}
$$

The design problem becomes a two stage process:

1. Determination of the feedback gain matrix $K$ to yield the desired characteristic equation
2. Determination of the observer gain matrix $K_{e}$ to yield the desired observer characteristic equation

![](https://cdn.breizhhardware.fr/FAKA3/rIZukEBe03.png/raw)

**Exercice 6**

Consider the system

$$
\begin{align}
& \dot{x} = Ax + Bu \\
& y = Cx \\
& \text{Where } A = \begin{bmatrix}
0 & 12,5 \\
1 & 0
\end{bmatrix} B = \begin{bmatrix}
0 \\
1
\end{bmatrix} C = \begin{bmatrix}
0 & 1
\end{bmatrix} \\
& \text{The system uses the observed feedback } u = -k \tilde{x} \\
& \text{The eigen values of the observed matrix are } \mu_{1} = -10 \text{ and } \mu_{2} = -10 \\
& \text{Design a full order state observer}
\end{align}
$$

**Solution**

- Step 1:

$$
\begin{align}
& O_{n} = \begin{bmatrix}
C \\
CA
\end{bmatrix} \\
& CA = \begin{bmatrix}
0 & 1 \\
\end{bmatrix} \begin{bmatrix}
0 & 12,5 \\
1 & 0
\end{bmatrix} = \begin{bmatrix}
1 & 0
\end{bmatrix} \\
& O_{n} = \begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix} \text{is of rank 2 because } \det(O_{n}) = -1 \neq 0
\end{align}
$$

Hence the system is completely observable and the determination of the desired observer gain matrix is possible

- Step 2: 

$$
\begin{align}
& (s - \mu_{1})(s - \mu_{2}) = s^2+\alpha_{1}s+\alpha_{2} \\
& (s + 8)(s + 8) \\
& \implies s^2+16s+64 = s^2+\alpha_{1}s+\alpha_{2} \\
& \implies \alpha_{1} = 16 \text{ and } \alpha_{2} = 64
\end{align}
$$

**Method 1**

- Step 3:

$$
\begin{align}
& \det(sI - (A-K_{e}C)) = s^2+\alpha_{1}s+\alpha_{2} \\
& \det(sI - A + K_{e}C) = s^2+16s+64 \\
& sI - A + K_{e}C = \begin{bmatrix}
s & 0 \\
0 & S
\end{bmatrix} - \begin{bmatrix}
0 & 12,5 \\
1 & 0
\end{bmatrix} + \begin{bmatrix}
K_{e_{1}} \\
K_{e_{2}}
\end{bmatrix}\begin{bmatrix}
0 & 1
\end{bmatrix} \\
& = \begin{bmatrix}
s & 0 \\
0 & s
\end{bmatrix} - \begin{bmatrix}
0 & 12,5 \\
1 & 0
\end{bmatrix} + \begin{bmatrix}
0 & K_{e_{1}} \\
0 & K_{e_{2}}
\end{bmatrix} = \begin{bmatrix}
s & K_{e_{1}}-12,5 \\
-1 & K_{e_{2}}-s
\end{bmatrix} \\
& \det(sI-A+K_{e}C) = s(s+K_{e_{2}})-(K_{e_{1}}-12,5)(-1) \\
& = s^2+K_{e_{2}}s+K_{e_{1}}-12,5 = s^2+16s+64 \\
& \implies K_{e_{2}} = 16 \text{ and } K_{e_{1}} = 76,5 \\
& K_{e} = \begin{bmatrix}
76,5 \\
16
\end{bmatrix}
\end{align}
$$

**Method 2**

- Step 3:

$$
\begin{align}
& \det(sI-A) = s^2+a_{1}s+a_{2} \\
& sI - A = \begin{bmatrix}
s & 0 \\
0 & s
\end{bmatrix}-\begin{bmatrix}
0 & 12,6 \\
1 & 0
\end{bmatrix} = \begin{bmatrix}
s & -12,5 \\
-1 & s
\end{bmatrix} \\
& \det(sI - A) = s^2 -12,5 \implies a_{1} = 0 \text{ and } a_{2} = -12,5
\end{align} 
$$

- Step 4:

$$
\begin{align}
& Q = (WO_{m}^T)^{-1} \\
& \text{Under the canonical form } Q = I
\end{align}
$$

- Step 5:

$$
\begin{align}
& K_{e} = Q^{-1}\begin{bmatrix}
\alpha_{2} - a_{2} \\
\alpha_{1} - a_{1}
\end{bmatrix}  \\
& I^{-1}\begin{bmatrix}
76,5 \\
16
\end{bmatrix} = \begin{bmatrix}
76,5 \\
16
\end{bmatrix}
\end{align}
$$

**Method 3**

- Step 3:

$$
\begin{align}
& K_{e} = \phi(A)O_{m}^{-1}\begin{bmatrix}
0 \\
1
\end{bmatrix} \\
& \phi(A) = A^2+\alpha_{1}A+\alpha_{2}I \\
& A^2 = \begin{bmatrix}
0 & 12,5 \\
1 & 0
\end{bmatrix}\begin{bmatrix}
0 & 12,5 \\
1 & 0
\end{bmatrix} = \begin{bmatrix}
12,5 & 0 \\
0 & 12,5
\end{bmatrix} \\
& K_{e} = \begin{bmatrix}
76,5 & 200 \\
16 & 76,5
\end{bmatrix}\begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}\begin{bmatrix}
0 \\
1
\end{bmatrix} \\
& = \begin{bmatrix}
76,5 & 200 \\
16 & 76,5
\end{bmatrix} \begin{bmatrix}
1 \\
0
\end{bmatrix} = \begin{bmatrix}
76,5 \\
16
\end{bmatrix}
\end{align}
$$