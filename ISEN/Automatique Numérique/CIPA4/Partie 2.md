#AutomatiqueNumérique #CIPA4 

**Control system design in state space**

# 2.1 - Controllability

A system is said to be controllable if it is possible to transfer the system from a desired initial state $x(t_0)$ to a desired final state $x(t)$.

Requirements :

A system $\dot{x} = Ax + Bu$ is completely controllable if the controllability matrix $M = C_{m} = \begin{bmatrix}B & AB & A^2B & \cdots{}& A^{n-1}B\end{bmatrix}$ is of rank n

**Note: The rank of a matrix can be found by finding the highest order square submatrix that is nonsingular (det =/= 0)**

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

The controlability matrix $M = \begin{bmatrix}B & AB\end{bmatrix} =\begin{bmatrix}\begin{bmatrix}1 \\ 0\end{bmatrix}\begin{bmatrix}1 \\ 0\end{bmatrix}\end{bmatrix}$