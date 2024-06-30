//api

let url = 'https://api.yumserver.com/17028/generic/stoks';

window.addEventListener('load', mostrarAdministrador);

var ids =['mostrar-datos', 'Cargar-Nuevo', 'Modificar-Producto'];
function Mostrar(_div){
    for (let i = 0; i < ids.length; i++){
        document.getElementById(ids[i].setAttribute('style', 'display:none'))
    }
    document.getElementById(_div).removeAttribute('style')
    
}

//Mostrar datos
function mostrarAdministrador(){
    fetch(url)
    .then(response => response.json())
    .then(Mostrardatos)
    .catch(error => console.error('Error:', error));
}

function Mostrardatos(data){
    let html = ``;
        for (let i = 0; i < data.length; i++){
            html += `
            <tr>
                <td class="table-administrador"><b>${data[i].idcod}</b></td>
                <td class="table-administrador"><b>${data[i].param1}</b></td>
                <td class="table-administrador">${data[i].param2}</td>
                <td class="table-administrador">${data[i].param3}</td>
                <td class="table-administrador">${data[i].param4}</td>
                <td><Button onclick="Borrar('${data[i].idcod}')">Borrar</button></td>
            </tr>
            `;            
        }
        document.getElementById('resultados').innerHTML = html;
}


// Crear un nuevo producto

function GuardarProducto(){
    
    let nuevo = {
        param1: document.getElementById('Titulo').value.trim(),
        param2: document.getElementById('Precio').value.trim(),
        param3: document.getElementById('Stock').value.trim(),
        param4: document.getElementById('Fecha').value.replace(/-/g, '.')
    };

    fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
    alert('Guardado Correctament');
    location.reload();
}

//Borrar
function Borrar(obj) {
    var ok = confirm('desea eliminar el producto');
    if(ok){
        fetch("https://api.yumserver.com/17028/generic/stoks",{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({idcod: obj})
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
        alert('Eliminado correctamente');
    }else{
        alert('eliminacion cancelada');
    }
    location.reload();
    }


//Modificar
function Abrir_Modificar(){

}

    




    