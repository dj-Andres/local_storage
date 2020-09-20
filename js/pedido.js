const carro=new Carrito();
const carrito=document.getElementById('carrito');
const productos=document.getElementById('lista-productos');
const listaProductos=document.querySelector('#lista-carrito tbody');
const vaciarCarrito=document.getElementById('vaciar-carrito');
const procesarPedidobtn=document.getElementById('procesar-pedido');
cargar_evento();

function cargar_evento(){
    productos.addEventListener('click',(e)=>{carro.compra_producto(e)});

    carrito.addEventListener('click',(e)=>{carro.eliminarProducto(e)});

    vaciarCarrito.addEventListener('click',(e)=>{carro.vaciarCarrito(e)});
    
    document.addEventListener('DOMContentLoaded',carro.leerLocalStorage());

    procesarPedidobtn.addEventListener('click',(e)=>{carro.procesarPedido(e)});
}