const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

// CARGADOR
cargarEventListener();
function cargarEventListener() {
  // Cuando agregas un curso presionando "agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
  // Eliminar cursos
  carrito.addEventListener("click", eliminarCurso);
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //reseteamos todo el array
    limpiarHTML(); // limpiamos todo el html
  });
}

// funciones
function agregarCurso(e) {
  e.preventDefault();
  //   detecta si el click es el boton para agregar el curso
  if (e.target.classList.contains("agregar-carrito")) {
    // construye un objeto a partir del boton para obtener sus datos yendo hacia arriba del html utilizando parentElement
    const cursoSeleccionado = e.target.parentElement.parentElement;
    // pasamos el objeto como parametro a la funcion que va a filtrar los datos que necesitamos
    leerDatosCurso(cursoSeleccionado);
    carritoHTML();
  }
}
// Eliminar curso
function eliminarCurso(e) {
  // e trackea el current event
  // utilizamos e para comprobar si el click fue hecho sobre un boton con la clase "borrar-curso"
  if (e.target.classList.contains("borrar-curso")) {
    // creamos una constante con el contenido de "data-id"
    const cursoId = e.target.getAttribute("data-id");
    // filtramos con .filter() iterando en cada articulo del carrito
    // nuestra funcion filter va a devolver cada objeto del array siempre y cuando la condicion sea true
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); //vuelve a leer los articulos del carrito e imprime con los cambios
  }
}

// FUNCION que Lee el contenido del curso al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
  // lee los datos del html y extrae los datos necesarios
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //   verifica que no exista un curso repetido con some
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // actualizamos la cantidad si se repite utilizando map
    // map itera cada objeto del array y guarda esa copia en un nuevo array (en este caso; cursos)
    const cursos = articulosCarrito.map((curso) => {
      // si el curso de iteracion actual es igual a algun curso ya dentro de info curso; se procede a cambiar la cantidad del curso

      if (curso.id === infoCurso.id) {
        // aumentamos la cantidad del curso +1
        curso.cantidad++;
        // retornamos el valor de curso fuera de la condicional
        return curso;
      } else {
        // retornamos curso sin realizar el cambio
        return curso;
      }
    });
    // cursos se convierte en una version modificada de articulosCarrito con los cambios necesarios
    articulosCarrito = [...cursos];
  } else {
    // cuando existe da false, se retornan los articulos del carrito sin nimguna modificacion en cantidades
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  // Agrega elementos al arreglo carrito
  console.log(articulosCarrito);
}

// Muestra el carrito de compras en ek HTML

function carritoHTML() {
  // limpia la plantilla de todos los datos interiores antes del nuevo ingreso
  limpiarHTML();
  //   itera el array articulosCarrito y por cada articulo crea una pieza html que es injectada al documento
  articulosCarrito.forEach((curso) => {
    let row = document.createElement("tr");
    row.innerHTML = `   
        <td>
        <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// limpiar Html

function limpiarHTML() {
  //   contenedorCarrito.innerHTML = "";
  //   siempre y cuando contenedor carritos tenga un hijo: se empieza a limpiar de arriba para abajo
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
