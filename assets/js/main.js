window.addEventListener('load', () => {
    cargarProductos();
});

const nodoBtnComprar = document.getElementById('btnComprar');
nodoBtnComprar.addEventListener('click', () => {
    
    //1. Recolecatr los datos del formulario
    const datos = getDataRegistroCompra();

    //2.validar datos
    const validacion = validarDatosCompra( datos );
    if( !validacion.status ){
        Swal.fire({
            title: "Oops!",
            text: validacion.message,
            icon: "error"
        });
        return;
    }

    //3. Crear HtmlDinamico para el carrito de compras
    const htmlOrden = crearHtmlOrden( datos );

    //4. Insertar html dinamico
    const nodoCarrito = document.getElementById('carrito');
    nodoCarrito.innerHTML += htmlOrden;


    //5. Resetear el formulario
    setDataRegistroProducto();

    //6.Mostrar una alerta informativa
    Swal.fire({
        title: "Bien Hecho!",
        text: "Orden registrada correctamente",
        icon: "success"
    });
});


const getProductos = () => {
    return [
        {
            "id": 1,
            "nombre": "Computadora AZUS"
        },
        {
            "id": 2,
            "nombre": "Iphone 15"
        },
        {
            "id": 3,
            "nombre": "Apple Watch S9"
        },
        {
            "id": 4,
            "nombre": "Auriculares Sony"
        },
        {
            "id": 5,
            "nombre": "Microfono SURE Usb 3.0"
        },
        {
            "id": 6,
            "nombre": "Mackbook Pro"
        },
        {
            "id": 7,
            "nombre": "Mackbook Air"
        },
        {
            "id": 8,
            "nombre": "Ipad Pro"
        },
        {
            "id": 9,
            "nombre": "Computadora HP"
        },
        {
            "id": 10,
            "nombre": "Maimboard Azus"
        },
        {
            "id": 11,
            "nombre": "Xiomi Watch"
        },
        {
            "id": 12,
            "nombre": "Mouse Genius"
        },
        {
            "id": 13,
            "nombre": "Memoria RAM 32GB"
        },
        {
            "id": 14,
            "nombre": "SSD 1T SAMSUNG"
        },
        {
            "id": 15,
            "nombre": "Teclado Luminoso HP"
        }
    ];
}

const cargarProductos = () => {
    const productos = getProductos();
    let opcionesProductos = '';

    productos.forEach( ({ id, nombre }) => {
        opcionesProductos += `<option value="${ id }">${ nombre }</option>`;
    });
    
    const nodoListaProductos = document.getElementById('producto');
    nodoListaProductos.innerHTML = opcionesProductos;
}

const getDataRegistroCompra = () => {
    const idProducto    = document.getElementById('producto').value;
    const producto      = showProducto( idProducto );
    const cantidad      = Number( document.getElementById('cantidad').value );
    const observacion   = document.getElementById('observacion').value;

    const nombre        = document.getElementById('nombre').value;
    const email         = document.getElementById('email').value;
    const telefono      = document.getElementById('telefono').value;
    const direccion     = document.getElementById('direccion').value;

    return {
        producto,
        cantidad,
        observacion,
        nombre,
        email,
        telefono,
        direccion
    }
}

const setDataRegistroProducto = () => {
    document.getElementById('cantidad').value       = 1;
    document.getElementById('observacion').value    = '';
    document.getElementById('nombre').value         = '';
    document.getElementById('email').value          = '';
    document.getElementById('telefono').value       = '';
    document.getElementById('direccion').value      = '';
}

const validarDatosCompra = ({
    producto,
    cantidad,
    nombre,
    email
}) => {

    const respuesta = {
        status: true,
        message: ''
    }

    try {

        if( !producto ){
            throw new Error('Debe seleccionar un producto');
        }

        if( !producto.id ){
            throw new Error('El producto no tiene identificador');
        }

        if( !producto.nombre ){
            throw new Error('El producto no tiene nombre');
        }
        
        if( cantidad <= 0 ){
            throw new Error('La cantidad debe ser mayor a cero');
        }

        if( !nombre ){
            throw new Error('El nombre del usuario es obligatorio');
        }

        if( !email ){
            throw new Error('El email del usuario es obligatorio');
        }

    } catch (error) {
        respuesta.status = false;
        respuesta.message = error.message;
    }

    return respuesta;
}

const showProducto = ( id ) => {
    const productos = getProductos();
    return productos.find( ( product ) => product.id == id );
}

const generarNumeroOrden = () => btoa( Math.random() ).slice(0, 6);

const crearHtmlOrden = ({
    producto,
    cantidad,
    observacion,
    nombre,
    email,
    telefono,
    direccion
}) => {

    const codigo = generarNumeroOrden();

    return `
        <div class="col-12" id="${codigo}">
            <div class="card border mb-3 shadown-sm">
                <div class="card-header bg-dark text-white">
                    <b>Orden #${codigo}</b>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <b>Producto:</b> <span class="producto">${producto.nombre}</span>
                        </li>
                        <li class="list-group-item">
                            <b>Cantidad:</b> <span class="cantidad">${cantidad}</span>
                        </li>
                    </ul>
                    <p class="card-text observacion">
                        <b>Observación: </b> ${ ( !observacion ) ? 'Ninguna' : observacion }
                    </p>

                    <div class="d-inline-flex gap-1">
                        <a class="btn btn-secondary" data-bs-toggle="collapse" href="#orden${codigo}" role="button" aria-expanded="false" aria-controls="orden${codigo}">Usuario</a>
                    </div>
                    <div class="collapse mt-2" id="orden${codigo}">
                        <div class="card card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <b>Nombre:</b> <span class="nombre">${nombre}</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Email:</b> <span class="email">${email}</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Telefono:</b> <span class="telefono">${telefono}</span>
                                </li>
                                <li class="list-group-item">
                                    <b>Dirreción:</b> <span class="email">${direccion}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent">
                    <button class="btn btn-outline-danger" onclick="eliminarOrden('${codigo}')" >
                        <i class="fa-solid fa-trash-can"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
}

const eliminarOrden = ( codigo ) => {
    Swal.fire({
        title: `Estas seguro de eliminar la orden #${codigo}`,
        text: "La orden será eliminada para siempre!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById( codigo ).remove();
            Swal.fire({
                title: "Bien Hecho!",
                text: `Orden #${codigo} eliminada correctamente`,
                icon: "success"
            });
        }
    });
}
