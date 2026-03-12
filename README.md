# Las mil y una imágenes

**Las mil y una imágenes** es una obra interactiva desarrollada con **p5.js** que explora la transformación de una imagen a partir de la intervención del espectador.
La pieza parte de una imagen inicial —un collage digital— que funciona como punto de partida para una serie de manipulaciones visuales generadas mediante programación.

A través del teclado, el usuario puede activar distintos efectos que alteran la imagen: cambios de color, inversión cromática, glitch, fragmentación flotante y pixel sorting. La obra propone así un espacio de experimentación donde cada interacción produce una nueva variación visual, expandiendo la imagen original hacia múltiples posibles estados.

El proyecto forma parte de una investigación artística sobre la relación entre **imagen, programación e interacción**, donde el código actúa como herramienta para generar transformaciones visuales abiertas.

---

## Tecnologías utilizadas

* **p5.js**
* **JavaScript**
* **HTML**

---

## Interacciones

Teclas disponibles durante la experiencia:

| Tecla | Acción                                      |
| ----- | ------------------------------------------- |
| **0** | Imagen inicial                              |
| **1** | Imagen 1                                    |
| **2** | Imagen 2                                    |
| **C** | Cambio de color                             |
| **I** | Invertir colores                            |
| **G** | Activar / desactivar glitch                 |
| **F** | Activar / desactivar fragmentación flotante |
| **P** | Activar / desactivar pixel sorting          |
| **R** | Reiniciar efectos                           |
| **S** | Guardar captura de la imagen                |

---

## Efectos visuales

**Cambio de color**
Aplica distintas variaciones cromáticas sobre la imagen.

**Inversión de color**
Invierte los valores RGB generando una imagen negativa.

**Glitch**
Introduce desplazamientos y cortes digitales inspirados en la estética del error.

**Fragmentación flotante**
Fragmentos de la imagen se separan y flotan en el espacio. Estos fragmentos reaccionan al movimiento del cursor, generando una dinámica de repulsión.

**Pixel sorting**
Reorganiza píxeles de la imagen generando distorsiones horizontales.

---

## Estructura del proyecto

```
index.html
sketch.js
imagen_0.png
imagen_1.png
imagen_2.png
```

---

## Ejecución

Para ejecutar el proyecto localmente se recomienda usar un servidor local, por ejemplo la extensión **Live Server** en Visual Studio Code.

1. Abrir la carpeta del proyecto en VS Code
2. Instalar la extensión **Live Server**
3. Abrir `index.html` con **Open with Live Server**

---

## Autor

**Paz de la Torre**

Artista visual y VJ radicada en Mar del Plata.
Su trabajo explora la creación de atmósferas visuales inmersivas a partir de la combinación de imagen, color y programación.

---

## Licencia

Proyecto artístico para fines de investigación y exhibición.
