var listaPalabras = ['ALURA', 'DOCUMENTO', 'RUTA','ORACLE', 'AGUA', 'FLOR','AZUL','PIZZA',
    'JUEGO', 'DESAFIO', 'TIERRA', 'CURSO', 'FUEGO', 'CIELO', 'RETO', 'COLOR', 'AMARILLO', 'FUTURO'];
var letrasIngresadas =[];
var palabraIngresada;
var paso = 0;
var inpPalabra = document.querySelector("#input-nueva-palabra");

var palabrAleatoria;

//FUNCION QUE CAPTURA LA PALABRA SECRETA
function escojerPalabra() {
    //Math.random devuelve un número aleatorio en el rango (0.0, 1.0) round redondea al entero mas cercano
    var I = Math.round(  Math.random() * listaPalabras.length);
    //resta 1 cuando a == listaPalabras.length que no existe
    I = listaPalabras.length == I ? (I - 1):I;
    palabrAleatoria = listaPalabras[I];
    console.log("Palabra aleatoria: "+palabrAleatoria);
    palabraIngresada = new Array(palabrAleatoria.length);
    //console.log("crea array vacio de la longitud de palabra aleatoria: "+palabraIngresada);
    return palabrAleatoria;
}


//FUNCION QUE VERIFICA O VALIDA SI LA TECLA PRESIONADA ES UNA LETRA
//valido que la letra esté en mayúsculas y no tenga acentos y Q no esté en la lista de letras erroneas ya ingresadas
function validarLetra(letraTipeada, codigo) {
    letraTipeada = letraTipeada.toUpperCase();
    //console.log('Letra: '+ letra + ' Codigo: '+codigo);
    var acentos = ['Á','É','Í','Ó','Ú']
    if (codigo > 64 && codigo < 91) {
        if (acentos.indexOf(letraTipeada) < 0 ) {
            if (letrasIngresadas.indexOf(letraTipeada) < 0) {
                return true;    
            }
            
        }
    }
    return false;
}

//Funcion Para saber si la letra ingresada coincide con alguna letra de la palabrAleatoria
function coincideLetra(letraTipeada) {
    var coincide = false

    //en la palabrasecreta busca en todas las posiciones mayores 
    //o iguales a cero busca la letra tipeada
    if (palabrAleatoria.indexOf(letraTipeada) >= 0) {
        coincide = true;
    }
    //ingresa al array todas las letras tipeadas
    letrasIngresadas.push(letraTipeada);
    console.log("el array letrasIngresadas tiene todas las letras tipeadas: ",letrasIngresadas);
    return coincide;
}



//funcion que verifica si una tecla fue presionada valida y llama a la funcion 
//coincideLetra si la letra esta dentro de la palabra secreta ingresa al array palabraIngresada
function capturaLetra(evento) {
    var letraTipeada = evento.key.toUpperCase();
    if (validarLetra(letraTipeada, evento.keyCode) && paso < 10) {
       //entra en el array palabraIngresada si coincide la letra tipeada 
       //con una letra de la palabra aleatoria);
        if(coincideLetra(letraTipeada)){ 
            //llama a la funcion letra correcta
            dLetrac(letraTipeada);
            //console.log(palabraIngresada.join(''));
            console.log("entra en el array palabraIngresada si coinciden: ",palabraIngresada); 
            //separador de cada uno de los elementos del arreglo 
            if (palabrAleatoria == palabraIngresada.join('')) {
                paso = 11;
                dAhorcado(paso);
            }
        }else{
            //llama a la funcion letra incorrecta
            dLetrai(letraTipeada);
            dAhorcado(++paso);
        }
    }
}



function iniciarJuego() {
     paso = 0;
     letrasIngresadas =[];
     palabrAleatoria = escojerPalabra();

     // aqui ingresa el texto teclando 
     window.addEventListener( "keydown", capturaLetra);
     dTablero(palabrAleatoria);
 
 }



//valido que la palabra ingresada  no tenga acentos
//y no esté en la lista de palabras ya ingresadas
function validarPalabra(palabra) {
    var exito  = true;
    //convierte el contenido en mayusculas
    var palabra = palabra.toUpperCase();
     //gira la cantidad de letras de la palabra length
    for (let i = 0; i < palabra.length; i++) {
        var codigo = palabra[i].charCodeAt(0);
      //  console.log("Codigo de cada letra de palabra ingresada: ", codigo);

        if( !(codigo > 64 && codigo < 91) || palabra.trim().length == 0) {
            //no entre aqui no sale el mensaje
            alert("Texto vacío o con caracteres no permitidos!!");
            exito = false;
            break;
        }

    }
    return exito;
}



function agregarPalabra() {
  
    var palabra = inpPalabra.value.toUpperCase().trim();
          if (palabra == '' || palabra == null) {
        alert('No ingreso texto')
    }
    
    //validar palabra
    if (listaPalabras.indexOf(palabra) >= 0 ) {
        alert("Palabra ya ingresada.");
        return;
    }
    if (validarPalabra(palabra)) {
        listaPalabras.push(palabra);
        console.log(listaPalabras);
    }
}


var btnIniciar = document.querySelector("#iniciar-juego");
btnIniciar.onclick = iniciarJuego;

var btnAgregar = document.querySelector("#nueva-palabra");
btnAgregar.onclick = agregarPalabra;


