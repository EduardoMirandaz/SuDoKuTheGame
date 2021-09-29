//Load bords from file or manually
var selectedPairOfKey
const easy = {
    0:
    [
        "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------", //easy [0][0]
        "685329174971485326234761859362574981549618732718293465823946517197852643456137298"  //easy [0][1]
    ],
    1:
    [
        "facil 2 embaralhado",
        "chave facil 2"
    ],
    2:
    [
        "facil 3 embaralhado",
        "chave facil 3"
    ]
    
}

const medium = {
    0: 
    [
        "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
        "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
    ],
    1:
    [
        "medio 1 embaralhado",
        "medio 1 chave"
    ],
    2:
    [
        "medio 2 embaralhado",
        "medio 2 chave"
    ]
}

const hard = {
    0: 
    [
        "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
        "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
    ],
    1:
    [
        "hard 1 embaralhado",
        "hard 1 chave"
    ],
    2:
    [
        "hard 2 embaralhado",
        "hard 2 chave"
    ]
}

// Create variables 
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function(){
    //run start game function when button is clicked =)
    id("restartButton").addEventListener("click", startGame) //event.Listener fica esperando algo acontecer
    // mandando o id do meu botao de restart --- 'vamos chamar a função startGame quando houver um click'

    //add event listener to each number in the container(os que poderão ser selecionados)
    id("numberContainer").addEventListener("click", addWayToSelectTiles);    

}
function addWayToSelectTiles(){
    for(let i = 0; i < id("numberContainer").children.length; i++){
        id("numberContainer").children[i].addEventListener("click", 
        function(){//adicionando um event listener para cada
            //                                                                                  filho do id "numberContainer"
            // if selecting is not disable
            if(!disableSelect){
            //if number is already selected
                if(this.classList.contains("selected")){ // "this" funciona aqui pq estamos dentro de um eventListener, ou seja,
                    //                                         ele já vai reconhecer o próprio children do numberContainer
                    //                                         this é o numero do id clicado
                
                    /**Then, remove this selection*/
                    this.classList.remove("selected")
                    selectedNum = null
                }
                else{
                    // first, deselect all numbers:
                    for(let i = 0; i < id("numberContainer").children.length; i++){
                        //getElementByID . filhos do ID [na posiçao i] . olhar todas as classes . retirar da ("selected")
                        id("numberContainer").children[i].classList.remove("selected") // vai deselecionar todos os numeros que estao selecionados
                    }
                    //aqui, seleciona o clicado
                    this.classList.add("selected")
                    selectedNum = this
                    updateMove()
                }
            }
        }) // end of the function
    }
}

function selectNumOnContainer(){
}

function getRandom(){
    do{
        var a = Math.floor(Math.random() * 10)
    }
    while( a > 0)
    return a
}

function startGame(){
    //choose game difficulty
    let board //só dentro dessa função
    id("lives").classList.remove("incorrect")
    if( id("diff_1").checked){ // se a dificuldade 1 foi escolhida, the game must be easy xP
        selectedPairOfKey = getRandom()
        board = easy[selectedPairOfKey][0] // no meu vetor de matrizes com os jogos, pega aleatoriamente os embaralhados
    }
    else if( id("diff_2").checked){
        selectedPairOfKey = getRandom()
        board = medium[selectedPairOfKey][0]
    }
    else if( id("diff_3").checked){
        selectedPairOfKey = getRandom()
        board = hard[selectedPairOfKey][0]
    }
    // set lives to 3 and enable selecting numbers and tiles
    lives = 3
    disableSelect = false
    id("lives").textContent = "You have " + lives + " lives, good luck!"
    //creates board based on difficulty
    generateBoard(board)
    // //startTimer()
    // startTimer()    
    //set theme based on input
    if(id("themeNight").checked){
        qs("body").classList.remove("dayTheme")
        qs("body").classList.add("nightTheme")
    }
    if(id("themeDay").checked){
        qs("body").classList.remove("nightTheme")
        qs("body").classList.add("dayTheme")
    }
    //show number conteiner;
    id("numberContainer").classList.remove("hidden") //tava na classe hidden, se eu tiro, ele aparece '-

}

// function startTimer(){
//     //sets time remaining based on input
//     if(id("time_3").checked){
//         timeRemaining = 720
//     }
//     else if(id("time_2").checked){
//         timeRemaining = 420
//     }
//     else{
//         timeRemaining = 180
//     }

//     //sets timer for first second
//     id("timer").textContent = timeConversion(timeRemaining)
//     //sets timer to update every second 
//     timer = setInterval(function(){
//         timeRemaining = timeRemaining-1
//         if(!timeRemaining) endGame() // se o tempo acabou, termina o jogo   
//         id("timer").textContent = timeConversion(timeRemaining) //converte para minuto
//     }, 1000) //executa a função a cada 1000 milisegundos :0
// }

// //convert sec in string of mm:ss format
// function timeConversion(time){
//     let minutes = Math.floor(time / 60)
//     if(minutes < 10){
//         minutes = "0" + minutes
//     }
//     let seconds = time%60
//     if(seconds < 10){
//         seconds = "0" + seconds
//     }
//     return minutes + ":" + seconds  
// }


function generateBoard(board){
    clearPreviousBoard()
    //let used to increment tile ids(para que eu possa ter controle sobre as inserções na criação do tabuleiro)
    let idCount = 0
    //create 81 tiles
    for(let i = 0; i < 81; i++){
        //create a new paragraph element
        let tile = document.createElement("p")
        // if the tile is not supposed to be blank 
        if(board.charAt(i) != "-"){
            tile.textContent = board.charAt(i) // nao precisa de um envent.Listener, pq a tecla já tá certa
        } else{ // add click event listener to tile!
            tile.addEventListener("click",
            function(){
                //if selecting is not disable
                if(!disableSelect){
                    //if the tile is selected
                    if(tile.classList.contains("selected")){
                        tile.classList.remove("selected")
                        selectedTile = null
                    }
                    else{
                        //first diselect all other tiles
                        for(let i = 0; i < 81; i++){
                            qsa(".tile")[i].classList.remove("selected") // acessando todas as teclas e deselecionando
                        }
                        //add selection and update variable
                        if(tile.classList.contains("nightTheme")){
                            tile.classList.remove("selected")
                            tile.classList.add("darkSelected")                            
                        }
                        else{
                            tile.classList.add("selected")
                        }
                        selectedTile = tile
                        updateMove()
                    }
                }
            }) 
        }
        tile.id = idCount // itero a casa que estou preenchendo para criar o tabuleiro inicial
        idCount++;
        //add tile class to all tiles
        tile.classList.add("tile")
        if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)){
            tile.classList.add("bottomBorder") // adiciono determinadas teclas a classe "bottomBorder"
//                                            // por conta da estética do tabuleiro 4px de borda
        }
        //fazendo as right borders inside the board. só pegar os divisíveis por 9 dando 3 ou 6
        if( (tile.id+1)%9 == 3 || (tile.id+1)%9 == 6){
            tile.classList.add("rightBorder") // de mesmo modo, sempre que quero adicionar um elemento a
//                                               uma classe, faço o .classList.add("nomeDaClasse")
        }
        //adicionar as teclas no tabuleiro
        id("board").appendChild(tile)
    }
}

function updateMove(){
    // if a tile and a number is selected
    if((selectedTile) && (selectedNum)){
        // Set the tile to the correct number
        selectedTile.textContent = selectedNum.textContent
        // if the number mathches the corresponding number in the solution key :
        if(checkCorrect(selectedTile)){
            //first, diselect ALL tiles! (from board)
            selectedTile.classList.remove("selected")
            selectedNum.classList.remove("selected")
            //clear the variables too
            selectedTile = null
            selectedNum = null
        }
        //if the number isn't right
        else{
            //disable selected number for 1 sec
            disableSelect = true // while disable select is true, nothing can be done
            selectedTile.classList.add("incorrect") //make the tile turn red
            
            setTimeout(dealingWithError, 1000) // mil mili sec
            
        }
    }
}

function dealingWithError(){
    //subtract the lives by 1
    lives--

    if(!lives){ //se não há mais vida 
        id("lives").classList.add("incorrect")
        endGame()
    }
    else{
        id("lives").textContent = ("Uops, you missed it, try again, you now have " + lives + " lives!")
        disableSelect = false
    }

    //restore colors and remove selection
    selectedTile.classList.remove("incorrect")
    selectedTile.classList.remove("selected")
    selectedNum.classList.remove("selected")
  
    //clear the tiles texts:
    selectedTile.textContent = ""
    selectedTile = null
    selectedNum = null

}
function endGame(){
    //disable moves
    disableSelect = true
    if(lives === 0){
        id("lives").textContent = ("You lost =[")
    }
    else{
        id("lives").textContent = ("You won!! =]")

    }
}

function checkCorrect(tile){
    // set solution based on difficulty selection
    let solution
    if( id("diff_1").checked){
        solution = easy[selectedPairOfKey][1]
    }
    else if( id("diff_2").checked){
        solution = medium[selectedPairOfKey][1]
    }
    else if( id("diff_3").checked){
        solution = hard[selectedPairOfKey][1]
    }

    // if tile's number is equal to the solution number, return true :)
    if(solution.charAt(tile.id) === tile.textContent) return true
    else return false
}

function clearPreviousBoard(){
    //access all tiles
    let tiles = qsa(".tile") // tudo que é da classe ".tile" vem pra esse array 'tiles'

    //remove each tile
    for(let i = 0; i < 81; i++){
        if(tiles[i] != undefined) tiles[i].remove()
    }    
        
    //clear timer!
    //if(timer) clearTimeout(timer)
    //deselect any numbers
    for(let i = 0; i < id("numberContainer").children.length; i++){    // percorre o array com os filhos do id
        id("numberContainer").children[i].classList.remove("selected") //'numberContainer'
    }
    //clear selected variables
    selectedTile = null
    selectedNum = null
}

/**********************************************
----------------"aux functions"----------------
**********************************************/

function id(id){                        // recebo como parâmetro o ID
    return document.getElementById(id) // retorna o elemento que deve ser processado
//                                    // acessando dentro do HTML
}
// " querySelector "
function qs(selector){
    return document.querySelector(selector)
}
// " querySelectorAll"
//retorna um array com todos os itens que foram pegos pelo selector

//quando utilizamos qsa(".tile"), por exemplo, pegamos TODOS os elementos que tem a classe TILE!
function qsa(selector){
    return document.querySelectorAll(selector)
}

