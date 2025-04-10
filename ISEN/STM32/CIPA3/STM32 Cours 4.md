#CIPA3 #STM32

[Cours précédent](STM32%20Cours%203.md)

# Exercice 1:
## 1. A quel bus sont reliés les périphériques suivants ?
- RCC: AHB
- SYSCFG: APB2
- GPIOA: AHB
- GPIOB: AHB
- GPIOC: AHB
- TIM2: APB1
- TIM3: APB1
- TIM6: APB1
- ADC: APB2
- DAC: APB1
- EXTI: APB2
## 2. En regardant le périphérique RCC et les différents registres, nommer les trois registres qui permettent d'activer / désactiver les horloges des périphériques. Déterminer les bits à modifier.
[Ce doc de mort](https://www.st.com/resource/en/reference_manual/rm0038-stm32l100xx-stm32l151xx-stm32l152xx-and-stm32l162xx-advanced-armbased-32bit-mcus-stmicroelectronics.pdf)
Page 47
RCC: 0x4002 3800 - 0x4002 3BFF

- GPIOA: RCC_AHBENR, bit 0
- GPIOB: RCC_AHBENR, bit 1
- GPIOC: RCC_AHBENR, bit 2
- SYSCFG: RCC_APB2ENR, bit 0
- ADC: RCC_APB2ENR, bit 9
- TIM2: RCC_APB1ENR, bit 0
- TIM3: RCC_APB1ENR, bit 1
- TIM6: RCC_APB1ENR, bit 4
- DAC: RCC_APB1ENR, 29

## 3. Donner les adresses de ces 3 registres

Page 155
RCC_APB2ENR: 0x4002 3820
Page 157
RCC_APB1ENR: 0x4002 3824
Page 153
RCC_AHBENR: 0x4002 381C

# Exercice 2
## 1.
- MODER: configure I/O direction mode
- OTYPER: output type of the I/O port (push-pull or open drain)
- PUPDR: configure the I/O pull-up or pull-down
- IDR: Input
- ODR: Output
- AFRx: configure alternate function I/Os

## 2.
PA5 -> sortie push-pull
PA7 -> Alternate Push-Pull

# Exercice 3
## 1.
0V

# Timer
- Time based generation
- Measure the pulse lengths of input signal (input capture)
- Generate Output Wave Forms Signals (PWM, Output Compare and One-pulse mode)
- Interrupt capability on various events (capture, compare overflow)
## Timer Categories
Timer are split in 3 categories:
- Basic
- General Purpose
- Advanced
## Timer Basics
Any timer in any microcontroller has:
- Clock (souvent 16 Mhz)
- Prescaler to divide clock frequency 
- Counter to store the nimber of click tics (CNT) -> Increment à chaque coup d'horloge après prescaler
- Autoreload register to interact with the counter (compare timing, reload values) -> remet compteur à 0 quand ARR == CNT


---
&copy; Félix MARQUET