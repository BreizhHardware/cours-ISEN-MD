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
RCC: 0x4002 3800 - 0x4002 3BFF
APB2: 0x4002 3820
APB1: 0x4002 3818
AHB: 0x4002 3810

- GPIOA: RCC_AHBENR, bit 0
- GPIOB: RCC_AHBENR, bit 1
- GPIOC: RCC_AHBENR, bit 2
- SYSCFG: RCC_APB2ENR, bit 0
- ADC: RCC_APB2ENR, bit 9
- TIM2: RCC_APB1ENR, bit 0
- TIM3: RCC_APB1ENR, bit 1
- TIM6: RCC_APB1ENR, bit 4
- DAC: RCC_APB1ENR, 29

---
&copy; Félix MARQUET