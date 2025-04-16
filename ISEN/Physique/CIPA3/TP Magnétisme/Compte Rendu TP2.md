Matéo LETOUZIC, Maël MARAVAL, Félix MARQUET
**I. Introduction**

L'objectif de cette séance de travaux pratiques est d'étudier un transformateur réel et de le comparer au modèle du transformateur parfait.

**II. Préparation TP**

Le primaire d'un transformateur est alimenté sous une tension sinusoïdale d'environ :
$u_{1} = U_{eff1}.\sqrt2 .\sin(2.\pi.f.t)$ avec: $U_{eff1}= 150V$ et $f=50Hz$
Le secondaire, quant à lui, est en circuit ouvert.

Le bobinage primaire comporte 500 spires et le bobinage secondaire 250 spires.

**Hypothèses**

Le matériau ferromagnétique sera supposé linéaire, homogène et isotrope. Le section du tube de champ (S) est constante le long des lignes de champ magnétique et est considérée comme négligeable. Les résistances des bobinages seront supposées nulles.

### Expression reliant $u_{1}(t)$ et $B(t)$
La loi de Faraday nous donne :
$$u_{1}=-e=\frac{{d}}{dt}\int\int\vec{B}.\vec{S}.n_{1}$$
En simplifiant, nous obtenons :
$$u_{1}=S.n_{1}*\frac{dB}{dt}$$
En intégrant $u_{1}$​ par rapport au temps, nous avons :
$$\int u_{1} = \int n_{1}B$$
En utilisant $u_{1}=U_{eff1}\sqrt{2}\int \sin(2\pi ft)$, nous intégrons :
$$\int u_{1} = U_{eff1}\sqrt{2}\int \sin(2\pi ft)dt = -U_{eff1}\sqrt{2}\frac{\cos(2\pi ft)}{2\pi f}$$
### Q2. Valeur du champ magnétique maximal
La valeur maximale du champ magnétique $B_{max}$​ est donnée par :
$$B_{max} = \frac{\int u_{1}}{\int n_{1}} = 0,71T$$
### Q3. Courant du primaire et résistance équivalente
Le courant primaire $i1$​ est donné par :
$$i_{1} = \frac{H*l}{n_{1}}$$
Avec $H = \frac{B}{\mu_{0}\mu_{r}}$ et $\mu_{0} = 4\pi * 10^{-7}$:
$$H = \frac{B}{\mu_{0}\mu_{r}} = 556 A.m^{-1}$$
Le courant primaire est alors :
$$
i_{1} = \frac{556*l}{500}
$$
Pour une longueur $l≈0.1m$ (hypothèse typique) :
$$
i1​≈113mA
$$
Le courant efficace est :
$$
i_{eff1}​=\frac{113}{\sqrt{ 2 }}​≈80mA
$$
### Q4. Valeurs efficaces des courants au primaire et au secondaire
La tension efficace au secondaire est :
$$U_{eff2} = U_{eff1} \frac{n_{2}}{n_{1}} = 80 * \frac{250}{500} = 40V$$
Le courant efficace au secondaire est (Pour R = 20$\ohm$)
$$i_{eff2} = \frac{40}{20} = 2A$$
### Q5. Rapport de transformation
Le rapport de transformation est donné par :
$$\frac{}$$
$$
\oint\vec{H}.\vec{dl} = i_{1}n_{1}$$

$$H*l = i_{1}n_{1}$$
$$H = \frac{B}{\mu_{0}\mu_{1}} = 113 A.m^{-1}$$
$$i_{1} = \frac{H*l}{n_{1}} = 95 m.A$$
$$i_{eff1} = \frac{95}{\sqrt{ 2 }} = 97 m.A$$
$$U_{eff2} = U_{eff2} \frac{n_{2}}{n_{1}} = 150 * \frac{250}{500} = 75V$$
$$i_{eff2} = \frac{75}{20} = 3,75A$$
Pour $330\ohm$ -> 36% de rendement
Pour $165\ohm$ -> 49% de rendement
Pour $220\ohm$ -> 42% de rendement

| V principal | mA  | V secondaire | P1 (perte fer) |
| :---------: | :-: | :----------: | :------------: |
|     10      | 30  |      6       |      0.3       |
|     20      | 40  |      10      |      0.8       |
|     30      | 50  |      16      |      1.5       |
|     40      | 60  |      20      |      2.1       |
|     50      | 70  |      24      |      3.5       |
|     60      | 80  |      30      |      4.8       |
|     70      | 80  |      34      |      5.6       |
|     80      | 90  |      40      |      6.4       |
|     90      | 90  |      44      |      8.1       |
|     100     | 90  |      48      |       9        |
|     110     | 90  |      54      |      9.9       |
|     120     | 100 |      60      |       12       |
|     130     | 100 |      64      |       13       |
|     140     | 110 |      68      |      15.4      |
|     150     | 120 |      74      |       18       |

