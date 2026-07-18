# Expense Tracker

[Link del proyecto]()

## Descripción del proyecto

**Expense Tracker** es una aplicación web desarrollada con HTML, CSS y JavaScript cuyo objetivo es permitir al usuario llevar un control detallado de sus finanzas personales. La aplicación permite registrar ingresos y gastos en tiempo real, calculando automáticamente el balance total y presentando la información de forma organizada mediante tarjetas dinámicas y una lista de transacciones recientes.

Este proyecto fue realizado con el propósito de fortalecer los conocimientos en desarrollo web, especialmente en la manipulación del DOM, el manejo de arreglos, el formateo de datos nativo y la persistencia de información en el navegador web utilizando la API de LocalStorage.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* LocalStorage API

## Conceptos de programación aplicados

Durante el desarrollo de este proyecto se implementaron diversos conceptos fundamentales de programación que permiten comprender cómo funciona una aplicación web interactiva que procesa, renderiza y almacena datos localmente.

### Manipulación del DOM

El proyecto realiza múltiples modificaciones dinámicas del documento. Inicialmente se seleccionan distintos elementos utilizando `querySelector()`, como el formulario, los botones de filtro y el contenedor donde se muestran las transacciones.
Cada vez que el usuario agrega, elimina o filtra un movimiento, el contenedor de la interfaz se limpia y se generan nuevos componentes HTML utilizando *template literals*. Estos son insertados directamente en la página mediante la propiedad `innerHTML`. Además, se modifican las clases CSS dinámicamente con `classList.add()` y `classList.remove()` para cambiar los estilos de los saldos (verde para positivo, rojo para negativo).

### Manejo de eventos

La interacción con el usuario fue implementada mediante distintos *Event Listeners*. 
El formulario principal intercepta el evento `submit`, previniendo la recarga automática de la página mediante `preventDefault()` y capturando los valores ingresados. Además, se implementaron eventos de tipo `click` en los botones inferiores para aplicar filtros de vista (Todos, Ingresos, Gastos), eliminar elementos específicos de la lista y restablecer todo el historial con el botón "Reset Transactions".

### Almacenamiento de datos (LocalStorage)

Uno de los aspectos más importantes del proyecto es la persistencia de datos. Para evitar que la información se borre cuando el usuario recarga la página, se hace uso de la API de LocalStorage.
Cada vez que el arreglo de transacciones sufre una modificación, los datos se convierten a una cadena de texto utilizando `JSON.stringify()` para almacenarlos. Al inicializar la aplicación, la función `cargarMovimientos()` verifica si existen datos previos y, en caso afirmativo, los convierte nuevamente a un arreglo de objetos JavaScript utilizando `JSON.parse()`.

### Estructuras condicionales

El proyecto utiliza diversas estructuras `if/else` para controlar la lógica del negocio.
Estas condiciones permiten:
* Determinar si un movimiento debe sumarse a los ingresos o sumarse a los gastos al calcular el balance total.
* Validar el estado del filtro actual (All, Income, Expense) para mostrar únicamente los registros solicitados.
* Cambiar visualmente el color del balance general dependiendo de si el saldo es mayor/igual a cero o si es negativo.
* Confirmar, mediante un cuadro de diálogo nativo (`confirm`), si el usuario realmente desea borrar el historial completo.

### Ciclos

Para recorrer, procesar y mostrar las transacciones se implementaron diferentes ciclos.
Se utiliza un ciclo `for...of` en la función `actualizarResumen()` para iterar de forma limpia y rápida sobre el arreglo completo calculando el total de ingresos y gastos. Adicionalmente, se emplea un ciclo `for` tradicional al momento de renderizar las tarjetas HTML, accediendo a cada elemento del arreglo ya filtrado y generando la interfaz correspondiente.

### Manipulación de arreglos

Se aplican varios métodos fundamentales para la gestión de colecciones de datos. 
Se utiliza el método `push()` para incorporar cada nueva transacción al historial. Para la funcionalidad de borrado, se combinan `indexOf()` para ubicar la posición exacta del elemento que el usuario desea eliminar, y `splice()` para retirarlo del arreglo. Finalmente, el sistema de categorías de visualización emplea el método `filter()` para crear rápidamente sub-arreglos que contienen únicamente los ingresos o los gastos.

### Formateo de datos

Para mejorar la experiencia del usuario final, los datos puros son formateados antes de imprimirse en pantalla.
Se utiliza el objeto `Date` en conjunto con el método `toLocaleString()` configurado con parámetros regionales (`es-CO`) para registrar automáticamente la fecha y hora de cada transacción de manera legible. Así mismo, se creó una función encargada de formatear los números mediante `toLocaleString("es-CO", {style:"currency", currency:"COP"})`, garantizando que todos los montos se lean con la moneda y símbolos adecuados.

### Diseño de la interfaz

La apariencia visual fue desarrollada completamente con CSS.
Se implementó un diseño moderno en modo oscuro con una clara jerarquía visual, utilizando contenedores con sombras, bordes redondeados y tipografía sin serifas (`Poppins`).
El proyecto se apoya en CSS Grid para maquetar el panel superior de resumen (Ingresos y Gastos), distribuyéndolos de forma equitativa y logrando un diseño *responsive* capaz de adaptarse a pantallas pequeñas. También incluye efectos de transición sutiles al pasar el cursor (hover) por encima de los botones y de las tarjetas de historial.

## Funcionamiento general

El flujo completo de la aplicación puede resumirse de la siguiente manera:
1. El usuario visualiza su balance general y el historial cargado previamente desde el navegador.
2. Escribe una descripción, ingresa un monto y selecciona si se trata de un "Income" (Ingreso) o "Expense" (Gasto).
3. Al hacer clic en agregar, el programa previene la recarga de la web, crea un objeto y le adjunta una fecha y hora generadas automáticamente.
4. El objeto se guarda en la memoria del navegador y se inserta en el flujo de la aplicación.
5. Se recorren los movimientos para sumarizar los ingresos y gastos y deducir el saldo real.
6. La interfaz se limpia y se repinta dibujando las tarjetas dinámicamente con los números y la fecha formateada.
7. El usuario puede utilizar los botones de filtro para ver solo un tipo de transacción, borrar un movimiento específico o limpiar toda la aplicación al instante.

## Aprendizajes obtenidos

Este proyecto permitió reforzar conocimientos esenciales del desarrollo web moderno, entre ellos:
* Manipulación dinámica del DOM y de atributos de clase.
* Persistencia de información local sin bases de datos externas utilizando LocalStorage y el objeto JSON.
* Intercepción y manejo de eventos (`submit`, `click`).
* Algoritmos básicos de suma, resta y calculo de totales utilizando ciclos `for` y `for...of`.
* Filtrado, inserción y eliminación de elementos en arreglos (`push`, `splice`, `filter`, `indexOf`).
* Generación de contenido HTML reutilizable mediante *Template Literals*.
* Internacionalización de la presentación de fechas, horas y monedas (`toLocaleString`).
* Maquetación flexible y responsiva utilizando CSS Grid y Flexbox.
* Mejora de la experiencia de usuario mediante cuadros de confirmación y transiciones de CSS.