#AutomatiqueNumérique #CIPA4 

**Control system design in state space**

# 2.1 - Controllability

A system is said to be controllable if it is possible to transfer the system from a desired initial state $x(t_0)$ to a desired final state $x(t)$.

Requirements :

A system $\dot{x} = Ax + Bu$ is completely controllable if the controllability matrix $M = C_{m} = \begin{bmatrix}B & AB & A^2B & \cdots{}& A^{n-1}B\end{bmatrix}$ is of rank n

**Note: The rank of a matrix can be found by finding the highest order square submatrix that is nonsingular (det $\neq$ 0)**

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

**Condition :** It is prooved that the system $$
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

