
/* SELECCIONAR TEXTO A ENCRIPTAR */

const texto = document.querySelector('#texto');

const btnEncriptar = document.querySelector('.boton-encriptar');
btnEncriptar.addEventListener('click', function(evento){

    evento.preventDefault();
    

    if (!(texto.value.trim().length === 0)) {

        mensajeEncriptado(encriptar(texto.value));
        ocultar();
        botonCopiar();
        document.querySelector('.encriptado__pantalla1--sin-imagen').classList.remove('encriptado__pantalla1');
        
    } else  {
        mostrarAlerta('Ingresa texto para encriptar o desencriptar');
    }
    
});

function ocultar(){
    let ocultarElementos = document.querySelectorAll('.pantalla-inicial');
    for (let index = 0; index < ocultarElementos.length; index++) {
        ocultarElementos[index].remove();        
    }    
}

function mostrarAlerta(mensaje) {
    const alerta = document.createElement('P')
    alerta.textContent = mensaje;
    
    alerta.classList.add('error');   

    document.querySelector('.encriptar-desencriptar').appendChild(alerta);

    // Desaparezca después de 5 segundos

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}


function mensajeEncriptado(mensaje) {
    const input = document.createElement('TEXTAREA');
    input.textContent = mensaje;
    input.classList.add('text-encriptado');
    input.setAttribute('id', 'encri');
    input.setAttribute('readonly', true);
    document.querySelector('.encriptado__pantalla1').appendChild(input);

}

function encriptar(texto) {

    let textoMinuscula = texto.toLowerCase();

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    let textoSinAcento = removeAccents(textoMinuscula);

    let textoEncriptado = '';

    const llaves = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    } 

    for (const char of textoSinAcento) {
        if (char in llaves) {            
            textoEncriptado += llaves[char];
               
        } else {
            textoEncriptado += char;
        }
    }

    return textoEncriptado;
    
}

function desencriptar(textEncriptado) {

    const llaves = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    }

    keysUsados =[];

   for (const key in llaves) {
        if (textEncriptado.includes(key)) {
            keysUsados.push(key);
        }    
   }

   let textoDesencriptado = textEncriptado;
   
   keysUsados.forEach(element => {
       textoDesencriptado = textoDesencriptado.replaceAll(element, llaves[element]);        
   });

   return textoDesencriptado;
      
}


const copiarContenido = async () => {
    let textoACopiar = document.getElementById("encri").value;
    try {
        await navigator.clipboard.writeText(textoACopiar);
        alert('Copiado.');
        window.location.reload();
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
}
    
function botonCopiar() {
    const btnCopiar = document.createElement('INPUT');
    btnCopiar.setAttribute('type', 'submit');
    btnCopiar.value = 'Copiar';
    btnCopiar.classList.add('boton-desencriptar', 'boton-copiar');
    document.querySelector('.encriptado__pantalla1').appendChild(btnCopiar);
    btnCopiar.onclick = copiarContenido;
}

const btnDesencriptar = document.querySelector('.boton-desencriptar');
btnDesencriptar.addEventListener('click', function(evento){

    evento.preventDefault();

    if (!(texto.value.trim().length === 0)) {
        
        
        mensajeEncriptado(desencriptar(texto.value));
        ocultar();
        botonCopiar();
        document.querySelector('.encriptado__pantalla1--sin-imagen').classList.remove('encriptado__pantalla1');
        
    } else  {
        mostrarAlerta('Ingresa texto para encriptar o desencriptar');
    }
    
});

const updateTexto = document.querySelector('#texto');

updateTexto.addEventListener('input', function(e){
    if (updateTexto.value == "" ) {
        window.location.reload();
    }

});