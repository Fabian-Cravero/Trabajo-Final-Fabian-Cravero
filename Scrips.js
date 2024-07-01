function update(){
    location.reload();
    document.getElementById('mostrar-datos').style.display = 'block';
}

window.addEventListener('load', mostrarAdministrador);
document.getElementById('mostrar-datos').style.display = 'block';
//api

let url = 'https://api.yumserver.com/17028/generic/stoks';



//Mostrar datos
function abrir_cerrar_Datos(){
    const mostrar = document.getElementById('mostrar-datos');
    if (mostrar){
       if (mostrar.style.display == 'block')
       {
          mostrar.style.display = 'none';
       }
       else{
          mostrar.style.display = 'block';
          document.getElementById('Cargar-Nuevo').style.display = 'none';
          document.getElementById('Modificar-Producto').style.display = 'none';
       }
    }
    }

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
                <td><Button onclick="Abrir_Modificar('${data[i].idcod}')">Modificar</button></td>
            </tr>
            `;            
        }
        document.getElementById('resultados').innerHTML = html;
}


// Crear un nuevo producto
function abrir_cerrar_Nuevo(){
    const mostrar = document.getElementById('Cargar-Nuevo');
    if (mostrar){
       if (mostrar.style.display == 'block')
       {
          mostrar.style.display = 'none';
       }
       else{
          mostrar.style.display = 'block';
          document.getElementById('mostrar-datos').style.display = 'none';
          document.getElementById('Modificar-Producto').style.display = 'none';
       }
    }
    }
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
    update();
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
        update()
    }else{
        alert('eliminacion cancelada');
    }
    
    }


//Modificar
function Abrir_Modificar(obj){
    
    if (obj !== ""){
        fetch('https://api.yumserver.com/17028/generic/stoks')
        .then(response => response.json())
        .then(data => {
        for (let i = 0; i < data.length; i++){
            if(data[i].idcod === obj){
                document.getElementById("IdCod_Modificar").value = data[i].idcod;
                document.getElementById("Titulo_Modificar").value = data[i].param1;
                document.getElementById("Precio_Modificar").value = data[i].param2;
                document.getElementById("Stock_Modificar").value = data[i].param3;
                document.getElementById("Fecha_Modificar").value = data[i].param4;

                document.getElementById('Cargar-Nuevo').style.display = 'none';
                document.getElementById('mostrar-datos').style.display = 'none';
                document.getElementById('Modificar-Producto').style.display = 'block';
                return;
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("El Idcod no existe");
    });
    }else {alert("Ingrese un idcod");}
    
}

function Guardar_Modificacion(){
    var Modificar = {
        idcod: document.getElementById("IdCod_Modificar").value,
        param1: document.getElementById("Titulo_Modificar").value,
        param2: document.getElementById("Precio_Modificar").value,
        param3: document.getElementById("Stock_Modificar").value,
        param4: document.getElementById("Fecha_Modificar").value.replace(/-/g, '.')
    }
    fetch(url,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Modificar)
    })
    .then(response =>response.text())
    .then(data => {
        console.log(data);
        if(data === "OK"){
            alert('Se guardo Correctamente')
            update();
        }else{alert('No se guardo')}
    })
    .catch(error => console.error('error', error));
    document.getElementById("IdCod_Modificar").value = "";
}
    




    