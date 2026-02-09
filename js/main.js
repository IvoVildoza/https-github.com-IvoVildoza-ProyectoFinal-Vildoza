const productos = [
    {id: 1, nombre: "AK-47", precio: 2700},
    { id: 2, nombre: "M4A1", precio: 3100},
    { id: 3, nombre: "AWP", precio: 4750},
    { id: 4, nombre: "Chaleco + Casco", precio: 1000},
    { id: 5, nombre: "Granada HE", precio: 300},
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



const botonVaciar = document.getElementById("vaciar");

botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
    
});


const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito");


function mostrarProductos() {
  contenedorProductos.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}">Agregar</button>
    `;

    contenedorProductos.appendChild(div);
  });
}


function disminuirCantidad(id) {
  const producto = carrito.find(p => p.id === id);

  producto.cantidad--;

  if (producto.cantidad === 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}



function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);

  const productoEnCarrito = carrito.find(p => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>No hay productos en el carrito</p>";
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>${producto.nombre} - $${producto.precio}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <button onclick="agregarAlCarrito(${producto.id})">+</button>
      <button onclick="disminuirCantidad(${producto.id})">-</button>
      <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
    `;

    contenedorCarrito.appendChild(div);
    total += producto.precio * producto.cantidad;
  });

  contenedorCarrito.innerHTML += `<h3>Total: $${total}</h3>`;
}

document.getElementById("login").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  const usuario = usuarios.find(
    u => u.email === email && u.password === pass
  );

  if (!usuario) {
    Swal.fire("Error", "Credenciales incorrectas", "error");
    return;
  }

  Swal.fire("Bienvenido", `Hola ${usuario.nombre}`, "success");

  manejarRol(usuario.rol);
});

function manejarRol(rol) {

  document.getElementById("productos").style.display = "flex";

  if (rol === "admin") {
    document.getElementById("panelAdmin").style.display = "block";
  } else {
    document.getElementById("panelAdmin").style.display = "none";
  }
}



contenedorProductos.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = Number(e.target.dataset.id);
        agregarAlCarrito(id);
    }
});

mostrarProductos();
mostrarCarrito();
