

//api

var url = "https://api.yumserver.com/17028/generic/stoks"

fetch// Obtener todos los productos
fetch(url)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Crear un nuevo producto
fetch(url , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        param1: 'CSS/image/AppleiPhone14ProMax.webp',
        param2: 'Apple iPhone 14 Pro Max (256 GB) - Morado oscuro',
        param3: 2299990,
        param4: 54,
    })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
