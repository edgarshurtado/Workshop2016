# LÓGICA Y ESTRUCTURAS DISCRETAS

## 1. Lógica de Proposiciones. LENGUAJE: Sintaxis y Semántica

### 1.1a Cómo generar y analizar fórmulas proposicionales

Vocabulario:
    - Proposiciones atómicas: p1, p2, p3, ..., pn
    - Operadores:
        * Unarios: ~    (niega una fórmula previa)
        * Binarias:
            - &&        (p1 Y p2)
            - ||        (p1 Ó p2)
            - =>        (Si p1 entonces p2)
            - <=>       (p1 solo si p2)

Reglas de formación:
    - Las proposiciones atómicas son fórumalas **p**
    - La negación de una fórmula previa es una fórmula **~p**
    - La composición binaria de dos fórmulas previas es una fórmula **(p · q)**

En una fórmula bien formada, siempre seremos capaces de saber cuál fue el
último paso que se realizó para generarla. Por tanto seremos capaces de
descomponerla

```
1.      ((p5 && p3) <=> (p3 || T))      Se utilizó una conectiva binaria
2.      (p5 && p3)       (p3 || T)      Se utilizaron 2 conectivas binarias 
3.      p5   p3      p3      T          Unidades atómicas
```

Esta descomposición nos genera un árbol sintáctico en el cual podemos contar
el número de nodos que generan la fórmula. En el caso del ejemplo anterior
tendríamos 7 nodos.

> Un nodo es cada una de las unidades del lenguaje de proposiciones.

#### Ejemplos

1. Dada la siguiente secuencia de fórmulas, observe cómo cada una se ha 
formado a partir de una o dos anteriores (excepto las 3 primeras) aplicando 
un solo paso de formación (una sola conectiva):

p,q,r,(p && q), (~r), (q || q), ((q || q) => (p && q)), ...

¿qué fórmula podría añadir a continuación (entre las diversas posibles)? 
Añado: ((~r) <=> (q || q))

¿Por qué no puede ser (((~r) && q) || p)?
Porque para formar esa fórmula a partir de una o dos anteriores deberíamos de
contar con las fórmula ((~r) && q) y p. La segunda la tenemos pero la primera
no, lo que implicaría un paso más para poder formar esa fórmula antes de
obtener la que se pregunta

2. Dada la fórmula (((~r) && q) || p), su conectiva principal es una disyunción
, ||. Y sus dos subfórmulas inmediatas son: ((~r) && q) y p. Si se contínua 
este proceso de análisis y se registra en un árbol sintáctico, éste resulta 
con 6 nodos:

```

    (((~r) && q) || p)
    ((~r) && q)     p
    (~r)    q

    r
```

### 1.2a Valor de verdad de fórmulas con una conectiva

Las proposiciones se valuan a *verdadera* o *falsa*

La negación cambia el valor de una proposición *verdadera* a *falsa* y viceversa

#### Valor de la conjunción "&&"

Sólo es verdadera cuando ambas proposiciones que une son verdaderas

T && T -> *verdadera*

#### Valor del operador Ò "||"

Sólo es falso en el caso de que ambas proposiciones sean falsas

F || F -> *falso*

#### Valor de la conectiva condicional "=>"

Sólo es falsa cuando la primera proposición es verdadera y la segunda es falsa

T => F -> *falso*

Si nos dan esta conectiva y nos dicen que el conjunto es *falso*, podemos afirmar
que el antecedente es verdadero y el otro componente (consecuente) es *falso*

---

Para el bicondicional "<=>" será verdadera cuando ambas proposiciones tienen el
mismo valor. Es decir. O ambas verdaderas o ambas falsas:

T <=> T -> *verdadero*
F <=> F -> *verdadero*

En este caso (que es como pedir el condicional hacia los dos lados). Si nos
dan esta conectiva afirmando que es verdadero, sólo podremos afirmar que las
2 componentes tienen el mismo valor entre ellas, pero no sabemos si ambas son
*verdaderas* o *falsas*.

### 1.2b

El valor de una fórmula se puede sacar a partir de su árbol sintáctico empezando
desde sus valores atómicos y luego ir operando hacia arriba

Ejemplos:

(( p => q ) || ((~r) && q))

siendo p=0 q=0 y r=0

(p => q) -> T

(~r) -> T
T && q -> F

T || F -> T

I ⊨ φ  (Esto se lee: I satisface φ. La Interpretación hace verdadera la fórmula)

Ahora siendo p=1,q=0,r=0

(p => q) -> F
(~r) ->  T
T && q -> F
F || F -> F

I ⊭ φ  (Esto se lee: I no satisface φ) La interpretación no hace verdadera la
        fórmula

#### Eliminación de los paréntesis

Una fórmula que no tiene preferencias de operaciones, se dice que es asociativa
ya que cualquier combinación a la hora de ir realizando las operaciones, da el
mismo resultado final.

Esto ocurre así siempre que todos los operadores sean lo mismo.

Si no es así el caso, hay que establecer un orden de prioridad. Sino caeríamos 
en una ambigüedad.

`~` > `&&` > `||` > `=>` > `<=>`

Siguiendo este orden para colocar los paréntesis podremos obtener la fórmula
que trata de representar una en la que los paréntesis se hayan omitido

Ejercicio: Dónde habría que colocar los paréntesis en la siguiente fórmula
`p -> q && (p || ~r && q)` --> `(p -> (q && (p || ((~r) && q))))`

#### Test

1. `(p || ~q) && (~p || r)`
    * p=0, q=0, r=0
    * p=0, q=1, r=0
    * p=0, q=1, r=1
    * p=1, q=1, r=0
