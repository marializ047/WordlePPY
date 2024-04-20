let resultElement = document.querySelector(".result");
let mainContainer = document.querySelector(".main-container");
let rowId = 1;

let word = ["texto", "agudo", "campo", "denso", "redes", "rubio", "serio", "terco", "tonto", "vigas"];
let randomIndex = Math.floor(Math.random() * word.length); 
let selectedWord = word[randomIndex];  //Selecciona la palabra aleatoria del array
let wordArray = selectedWord.toUpperCase().split("");
console.log(wordArray);
var actualRow = document.querySelector(".row");

drawSquares(actualRow);
listenInput(actualRow);
addFocus(actualRow);

function listenInput(actualRow) {
    let squares = actualRow.querySelectorAll(".square");
    squares = [...squares];
    let userInput = [];

    squares.forEach(element => {
        element.addEventListener("input", event => {

            //Si no se borra
            if (event.inputType !== "deleteContentBackward") {

                //Recoger el ingreso del usuario
                userInput.push(event.target.value.toUpperCase());
                console.log(userInput.push(event.target.value.toUpperCase()));

                if (event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                } else {

                    //Arreglo con las letras
                    //Buscar contenido de la fila anterior
                    //Armar arreglo con el resultado antes de comparar
                    let squaresFilled = document.querySelectorAll(".square");
                    squaresFilled = [...squaresFilled];
                    let lastFiveSquaresFilled = squaresFilled.slice(-5);
                    let finalUserInput = [];
                    lastFiveSquaresFilled.forEach(element => {
                        finalUserInput.push(element.value.toUpperCase());
                    });

                    //Cambiar estilos si existe la letra pero no está en la posición correcta
                    let existIndexArray = existLetter(wordArray, finalUserInput);
                    console.log(existIndexArray);
                    existIndexArray.forEach(element => {
                        squares[element].classList.add("gold");
                    });

                    //Comparar arreglos para cambiar estilos
                    let rightIndex = compareArrays(wordArray, finalUserInput);
                    console.log(rightIndex);
                    rightIndex.forEach(element => {
                        squares[element].classList.add("green")
                        squares[element].classList.remove("gold");

                    });
                    //Si los arreglos son iguales 
                    if (rightIndex.length == wordArray.length) {
                        showResult("Ganaste!")
                        return;
                    }

                    //Crear una nueva fila
                    let actualRow = createRow()
                    if (!actualRow) {
                        return;
                    }

                    drawSquares(actualRow)
                    listenInput(actualRow)
                    addFocus(actualRow)

                    //Crear una nueva linea
                }
            } else {
                userInput.pop();
            }
            console.log(userInput)
        });
    })
}

//FUNCIONES

function compareArrays(array1, array2) {
    let iqualsIndex = []
    array1.forEach((element, index) => {
        if (element === array2[index]) {
            console.log(`En la posición ${index} si son iguales`);
            iqualsIndex.push(index)
        } else {
            console.log(`En la posición ${index} NO son iguales`);
        }
    });
    return iqualsIndex;
}

function existLetter(array1, array2) {
    let existIndexArray = [];
    array2.forEach((element, index) => {
        if (array1.includes(element)) {
            existIndexArray.push(index)
        }
    });
    return existIndexArray;
}

function createRow() {
    rowId++
    if (rowId <= 5) {
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.setAttribute("id", rowId)
        mainContainer.appendChild(newRow)
        return newRow;
    } else {
        showResult(`Perdiste! La respuesta correcta era "${selectedWord.toUpperCase()}"`)
    }
}

function drawSquares(actualRow) {
    wordArray.forEach((item, index) => {
        if (index === 0) {
            actualRow.innerHTML += `<input type="text" maxLength="1" class="square focus">`
        } else {
            actualRow.innerHTML += `<input type="text" maxLength="1" class="square">`
        }
    });
}

function addFocus(actualRow) {
    let focusElement = actualRow.querySelector(".focus")
    console.log(focusElement)
    focusElement.focus();
}

function showResult(textMsg) {
    resultElement.innerHTML = `
    <p>${textMsg}</p>
    <button class="button">Reiniciar</button>`

    let resetBtn = document.querySelector(".button")
    resetBtn.addEventListener("click", () => {
        location.reload();
    });
}
