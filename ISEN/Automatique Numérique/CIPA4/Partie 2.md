#AutomatiqueNumérique #CIPA4 

**Control system design in state space**

# 2.1 - Controllability

A system is said to be controllable if it is possible to transfer the system from a desired initial state $x(t_0)$ to a desired final state $x(t)$.

Requirements :

A system $\dot{x} = Ax + Bu$ is completely controllable if the controllability matrix $M = C_{m} = \begin{bmatrix}B & AB & A^2B & \cdots{}& A^{n-1}B\end{bmatrix}$ is of rank n

**Note: The ran