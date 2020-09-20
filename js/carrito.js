class Carrito {
    compra_producto(e) {
        e.preventDefault();

        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
            //console.log(producto);
        }
    }

    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS=this.obtenerProductosLS();
        //validar que se guarde un mismo producto//
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS=productoLS.id;
            }
        });
        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                text: 'El producto ya a sido añadadido anteriormente!',
                timer:1500
              })
        }else{
            this.insertarCarrito(infoProducto);
        }
    }
    insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;

        listaProductos.appendChild(row);

        this.guardarProductoLs(producto);
    }
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;

        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }

        this.eliminarProductoLS(productoID);

    }
    vaciarCarrito(e) {
        e.preventDefault();

        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarCarritoLS();
        return false;
    }
    guardarProductoLs(producto) {
        let productos;
        productos = this.obtenerProductosLS();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    obtenerProductosLS() {
        let productoLS;

        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }

        return productoLS;
    }
    eliminarProductoLS(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS, indice) {
            if (productoLS.id === productoID) {
                productosLS.splice(indice, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;

            listaProductos.appendChild(row);
        })
    }
    vaciarCarritoLS(){
        localStorage.clear();
    }
    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLS().length === 0){
            Swal.fire({
                type: 'info',
                text: 'El carrito está vacio!'
              })
        }else{
            location.href='compra.html';
        }
        
    }
}