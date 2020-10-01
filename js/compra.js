const compra= new Carrito();
const listaCompra=document.querySelector('#lista-compra tbody');
const carrito=document.getElementById('carrito');
const procesarComprabtn=document.getElementById('procesar-compra');
const cliente=document.getElementById('cliente');
const correo=document.getElementById('correo');
cargar_evento();

function cargar_evento(){
    document.addEventListener('DOMContentLoaded',compra.leerLocalStorageCompra());
    carrito.addEventListener('click',(e)=>{compra.eliminarProducto(e)})
    compra.calculartotal();
    procesarComprabtn.addEventListener('click',procesarCompra)
}
function procesarCompra(e){
    e.preventDefault();

    if(compra.obtenerProductosLS().length === 0){
        Swal.fire({
            type: 'error',
            text: 'No hay producto seleccionado!'
        }).then(function(){
            window.location.href="index.html";
        })
    }else if(cliente.value==='' || correo.value===''){
        Swal.fire({
            type: 'error',
            text: 'Ingresar los datos solicitados por favor',
            timer:2000
        })
    }else{
        const cargandoGif=document.querySelector('#cargando');
        cargandoGif.style.display='block';

        const enviado=document.createElement('img');
        enviado.src="img/mail.gif";
        enviado.style.display='block';
        enviado.width='150';

        setTimeout(()=>{
            cargandoGif.style.display='none';
            document.querySelector('#loaders').appendChild(enviado);
            setTimeout(()=>{
                enviado.remove();
                compra.vaciarCarritoLS();
                window.location.href="index.html";
            },3000)
        },3000);
    }
}