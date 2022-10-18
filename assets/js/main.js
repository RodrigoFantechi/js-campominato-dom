/* Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione:
**nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; */



const button = document.querySelector('button');
const container = document.querySelector('.grid');
const result = document.querySelector('.result');


button.addEventListener('click', function () {
    container.innerHTML = '';
    result.innerHTML = '';
    const gridcells = document.querySelector('.form-select').value;
    const bombs = generaBombe(gridcells);
    
    generaGriglia(container, gridcells, bombs, result);
    
});

function generaGriglia(whereGemerateGrid, howManycells, bombs, whereGenerateResult) {
   
    // genera la griglia
    for (let i = 1; i <= howManycells; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        const cellePerRiga = Math.sqrt(howManycells);
        square.style.width = `calc(100% / ${cellePerRiga})`;
        square.innerText = i;
        whereGemerateGrid.insertAdjacentElement('beforeend', square);
        
        
        // check bombs
        square.addEventListener('click', function () {
            // console.log(bombs);
            // console.log(square.innerHTML);
            if(bombs.includes(Number(square.innerHTML))){
                for (let i = 0; i < bombs.length; i++) {
                    const bomb = bombs[i];
                    // console.log(bomb);
                    const allSquare = document.querySelectorAll('.square');
                    for (let j = 0; j < allSquare.length; j++) {
                        const singleSquare = allSquare[j];
                        singleSquare.style.pointerEvents = 'none';
                        // console.log(singleSquare.innerHTML);
                        if(singleSquare.innerHTML == bomb){
                            singleSquare.classList.add('bombs');
                            const allSquareWithClassAcqua = document.querySelectorAll('.acqua');
                            whereGenerateResult.innerText = `Mi dispiace hai perso. Il tuo punteggio è di ${allSquareWithClassAcqua.length}`; 
                        }
                    }  
                }

            } else{
                square.classList.add('acqua');
                const allSquareWithClassAcqua = document.querySelectorAll('.acqua');
                if (allSquareWithClassAcqua.length == (howManycells-bombs.length)){
                    whereGenerateResult.innerText = `Hai Vinto! Il tuo punteggio è di ${allSquareWithClassAcqua.length}`;
                    const allSquare = document.querySelectorAll('.square');
                    for (let j = 0; j < allSquare.length; j++) {
                        const singleSquare = allSquare[j];
                        singleSquare.style.pointerEvents = 'none';
                    }
                }
            }
                  
        });
    }
}




function generaBombe(max){
    const bombs = [];
    while (bombs.length !== 16){
        const bomb = Math.floor(Math.random() * (max - 1)+1) + 1;
        if (!bombs.includes(bomb)){
            bombs.push(bomb);
        }
    }
    return bombs
}
