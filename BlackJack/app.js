let crupier = 0;
let jugador = 0;

let crupierAs = 0;
let jugadorAs = 0;

let cartaTapada = 0;
let baraja = 0;

let quieroUnaCarta = true;

window.onload = function (){
    crearBaraja();
    mezclar();
    empezarJuego();
}
    
function crearBaraja() {
    let valorCarta = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let tipoCarta = ['C', 'D', 'H', 'S'];
    baraja = []

    for(let i = 0; i < valorCarta.length; i++){
        for(let j = 0; j < tipoCarta.length; j++){
            baraja.push(valorCarta[i] + '-' + tipoCarta[j]);
        }
    }    
}
crearBaraja()

function mezclar(){
    for(let i = 0; i < baraja.length; i++){ //Baraja en orden
        let j = Math.floor(Math.random() * baraja.length); // Baraja en desorden
        let barajaTemp = baraja[i];
        baraja[i] = baraja[j];
        baraja[j] = barajaTemp;         
    }
    
}

function empezarJuego(){
    cartaTapada = baraja.pop();
    crupier += obtenerValor(cartaTapada);
    crupierAs += revisarAs(cartaTapada);
    //console.log(cartaTapada);
    //console.log(crupier);
    while(crupier < 17){
        let imgCarta = document.createElement('img')
        let carta = baraja.pop();
        imgCarta.src = "./Cards/" + carta + ".png";
        crupier += obtenerValor(carta);
        crupierAs += revisarAs(carta);
        document.getElementById("cartas-crupier").append(imgCarta);
    }
    //console.log(crupier);

    for(let i = 0; i < 2; i++){
        let imgCarta = document.createElement('img')
        let carta = baraja.pop();
        imgCarta.src = "./Cards/" + carta + ".png";
        jugador += obtenerValor(carta);
        jugadorAs += revisarAs(carta);
        document.getElementById("carta-jugador").append(imgCarta);
    }
    //console.log(jugador);
    document.getElementById("pedir").addEventListener("click", pedir);
    document.getElementById("quedarse").addEventListener("click", quedarse);

}

function pedir(){
    if(!quieroUnaCarta){
        return;
    }

    let imgCarta = document.createElement('img')
    let carta = baraja.pop();
    imgCarta.src = "./Cards/" + carta + ".png";
    jugador += obtenerValor(carta);
    jugadorAs += revisarAs(carta);
    document.getElementById("carta-jugador").append(imgCarta);

    if(reducirAs(jugador, crupier) > 21){
        quieroUnaCarta = false;
    }
}

function quedarse(){
    crupier = reducirAs(crupier, crupierAs);
    jugador = reducirAs(jugador, jugadorAs);

    quieroUnaCarta = false;
    document.getElementById("cartaTapada").src = "./Cards/" + cartaTapada + ".png";

    let mensaje = "";
        if(jugador > 21){
            mensaje = "Perdiste!";
        }
        else if (crupier > 21){
            mensaje = "Ganaste!"
        }
        else if (jugador == crupier){
            mensaje = "Empate!"
        }
        else if (jugador > crupier){
            mensaje = "Ganaste!";
        }
        else if (jugador < crupier){
            mensaje = "Pediste!"
        }

        document.getElementById("crupier").innerText = crupier;
        document.getElementById("jugador").innerText = jugador;
        document.getElementById("resultado").innerText = mensaje;

}

function obtenerValor(carta){
    let dato = carta.split('-');
    let valor = dato[0];

    if(isNaN(valor)){
        if(valor == 'A'){
            return 11; 
        }
        return 10;
    }
    return parseInt(valor);
}

function revisarAs(carta){
    if(carta[0] == 'A'){
        return 1;
    }
    return 0;
}

function reducirAs(sumaJugador, sumaCrupier){
    while(sumaJugador > 21 && sumaCrupier > 0){
        sumaJugador -= 10;
        sumaCrupier -= 1;
    }
    return sumaJugador;
}









