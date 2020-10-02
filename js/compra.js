const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarComprabtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('oc_to');
cargar_evento();

function cargar_evento() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) })
    compra.calculartotal();
    procesarComprabtn.addEventListener('click', procesarCompra)
}
function procesarCompra(e) {
    e.preventDefault();

    if (compra.obtenerProductosLS().length === 0) {
        Swal.fire({
            type: 'error',
            text: 'No hay producto seleccionado!'
        }).then(function () {
            window.location.href = "index.html";
        })
    } else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            text: 'Ingresar los datos solicitados por favor',
            timer: 2000
        })
    } else {
        //uso de la libreria para enviar los correos con js//
        (function(){
            emailjs.init('user_lZNVm8uxztFDPS3H5VFHe')
        })();

        const btn = document.getElementById('procesar-compra');

        document.getElementById('procesar-pago')
            .addEventListener('submit', function (event) {
                event.preventDefault();

                btn.value = 'Sending...';

                const serviceID = 'default_service';
                const templateID = 'template_fg9q21a';

                const cargandoGif = document.querySelector('#cargando');
                cargandoGif.style.display = 'block';

                const enviado = document.createElement('img');
                enviado.src = "img/mail.gif";
                enviado.style.display = 'block';
                enviado.width = '150';

                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        //btn.value = 'Send Email';
                        //alert('Sent!');
                        cargandoGif.style.display = 'none';
                        document.querySelector('#loaders').appendChild(enviado);

                        setTimeout(() => {
                            enviado.remove();
                            compra.vaciarCarritoLS();
                            window.location.href = "index.html";
                        }, 3000)

                    }, (err) => {
                        btn.value = 'Send Email';
                        alert(JSON.stringify(err));
                    });
            });


    }
}