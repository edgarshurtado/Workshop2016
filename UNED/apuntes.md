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

