/***
 * 2C = two of clubs
 * 2D = two of diamonds
 * 2H = two of hearts
 * 2S = two of spades
 */

let deck = [];
let tipos = ['C','D', 'H', 'S'];
let especiales = ['A','J', 'Q', 'K'];

//referencias del HTML
const  btnNuevoJuego = document.querySelector('#btnNuevoJuego');
const  btnPedirCarta = document.querySelector('#btnPedirCarta');
const  btnDetener = document.querySelector('#btnDetener');

const puntosHTML = document.querySelectorAll('small')

const divCartasJugador= document.querySelector('#jugador-cartas')
const divCartasComputadora= document.querySelector('#computadora-cartas')

let puntosJugador= 0,
    puntosComputadora=0;




//crea la baraja
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
        deck.push( i + tipo);

        }
    }
   // console.log(deck)

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push( esp + tipo);
            
        }
        
    }
    //console.log(deck)
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}


crearDeck();



//esta funcion permite tomar una carta
const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck'
    }
    let carta = deck.shift ();
   // deck = deck.pull(deck.length-1);
    return carta;

}
//cartas computadora

const turnoComputadora= (puntosMinimos) => {
do {
    const carta= pedirCarta();
    puntosComputadora+= valorCarta(carta);
    // muestra los puntos en el html
    puntosHTML[1].innerText= puntosComputadora;

   // crear y mostrar la imagen
    const imgCarta =document.createElement('img');
    imgCarta.src = `/02-BlackJack/assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);
    if(puntosMinimos>21){
        break;
    }
    
 } while ((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));

}



// pedirCarta();
const valorCarta  = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor)) ?
            (valor === 'A')? 11 : 10
        : valor *1;

    // let puntos = 0 ; 
    //console.log({valor});
    // if(isNaN(valor)){
    //     console.log('No es un número');

    //     puntos = (valor === 'A') ? 11 : 10;

    // }else{
    //     console.log('Es un número');
    //     puntos = valor *1; 

    // }
}

//eventos

btnPedirCarta.addEventListener('click', () => {
    const carta= pedirCarta();
    puntosJugador+= valorCarta(carta);
     //muestra los puntos en el html
    puntosHTML[0].innerText= puntosJugador;

    //crear y mostrar la imagen
    const imgCarta =document.createElement('img');
    imgCarta.src = `/02-BlackJack/assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    //controlar puntos obtenidos
    if (puntosJugador>21) {
        console.warn('Lo siento, ha perdido');
        btnPedirCarta.disabled= true;
        btnDetener.disabled= true;

        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21){
        console.warn('21, genial!');
        btnPedirCarta.disabled= true;
        btnDetener.disabled= true;

        turnoComputadora(puntosJugador);

    } 
     
}); 

btnDetener.addEventListener('click', ()=>{
    btnPedirCarta.disabled= true;
    btnDetener.disabled= true;
    turnoComputadora(puntosJugador);



})