function playFairAlgo() {

    // Taking user inputs and editing for algorithm.
    let message = document.getElementById("messageBox").value;
    let key = document.getElementById("keyBox").value;
    let editedKey = key.toUpperCase().replaceAll(/[^A-Z]/g, "").replaceAll("J", "I");
    let editedMessage = message.toUpperCase().replaceAll(/[^A-Z]/g, "").replaceAll("J", "I");

    // Updating sections
    updateSection();

    // Creates a grid for playfair Cipher
    let finalGrid = fillGrid(editedKey);

    // Generates cipher
    generateCipher(finalGrid, editedMessage, message);

}

function updateSection() {

    // Closes home section and switches to solution section
    document.getElementById("landing").style.display = "none";
    document.getElementById("solution").style.display = "flex";

}

function fillGrid(key) {

    // Initializing a character array
    let character = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    // Initializing empty grid
    let grid = [];

    // Filling the grid first with the key provided by user
    for (let i = 0; i < key.length; i++) {
        if (!grid.includes(key[i])) {
            grid.push(key[i]);
        }
    }

    // Filling the grid with the unused alphabets
    for (let i = 0; i < character.length; i++) {
        if (!grid.includes(character[i])) {
            grid.push(character[i]);
        }
    }

    return grid;

}

function generateCipher(finalGrid, editedMessage, message) {

    // Initializing  dummy character used for same consecutive letter or for odd length message
    const dummyCharacter = 'X';

    // Pointer variable to keep track 
    let pointer = 0;

    // First and second letter which will be encrypted 
    // Playfair breaks the message in pair of two letter to encrypt them individually
    let firstLetter = "";
    let secondLetter = "";

    // Initializing variable for cipher generated
    let cipherText = "";

    // Initializing variable for the letters currently being encrypted
    let cipherMessage = "";

    // Initial updating dom to show up the grid
    initialDomUpdate(finalGrid, message);

    // SetInterval helps to animate the encryption process
    let intervalId = setInterval(() => {

        // Ending condition to exit setInterval loop
        if (pointer >= editedMessage.length) {
            clearInterval(intervalId);
            return;
        }

        // Getting the first and second letter
        if ((pointer + 1) < editedMessage.length) {
            if (editedMessage[pointer] == editedMessage[pointer + 1]) {
                firstLetter = editedMessage[pointer];
                secondLetter = dummyCharacter;
                pointer += 1;
            }
            else {
                firstLetter = editedMessage[pointer];
                secondLetter = editedMessage[pointer + 1];
                pointer += 2;
            }
        }
        else {
            firstLetter = editedMessage[pointer];
            secondLetter = dummyCharacter;
            pointer += 1;
        }

        // Tells currently which letters are being encrypted
        cipherMessage += (firstLetter + secondLetter + " ");

        // Finding corresponding cipher for the first and second letter and appending it to cipher variable
        let cipher = findCipher(firstLetter, secondLetter, finalGrid);
        cipherText += cipher + " ";

        // Updating dom as the cipher is generated
        updateDom(finalGrid, cipherMessage, message, cipherText);

    }, 1000);

}

function initialDomUpdate(finalGrid, message){

    // Printing the grid
    let container = document.querySelectorAll(".container");
    for (let i = 0; i < finalGrid.length; i++) {
        container[i].textContent = finalGrid[i];
    }

    // Printing the message and cipher div
    document.getElementById("message").textContent = "Message: " + message;

}

function findCipher(firstLetter, secondLetter, finalGrid) {

    // Finding position of letters in grid
    let pos1 = finalGrid.indexOf(firstLetter);
    let pos2 = finalGrid.indexOf(secondLetter);

    // Finding column and rows of the letter
    let row1 = Math.floor(pos1 / 5);
    let col1 = Math.floor(pos1 % 5);
    let row2 = Math.floor(pos2 / 5);
    let col2 = Math.floor(pos2 % 5);

    // Intializing cipher variable
    let cipher = "";

    // Initializing variable to find position of cipher
    let cipher1Pos, cipher2Pos;

    // If both variables are on same row
    if (row1 == row2) {
        if ((col1 + 1) < 5 && (col2 + 1) < 5) {
            cipher += finalGrid[row1 * 5 + col1 + 1];
            cipher += finalGrid[row2 * 5 + col2 + 1];
            cipher1Pos = row1 * 5 + col1 + 1;
            cipher2Pos = row2 * 5 + col2 + 1
            showLetter(pos1, pos2, cipher1Pos, cipher2Pos);
        }
        else if (col1 + 1 == 5) {
            cipher += finalGrid[row1 * 5];
            cipher += finalGrid[row2 * 5 + col2 + 1];
            cipher1Pos = row1 * 5;
            cipher2Pos = row2 * 5 + col2 + 1
            showLetter(pos1, pos2, cipher1Pos, cipher2Pos);
        }
        else {
            cipher += finalGrid[row1 * 5 + col1 + 1];
            cipher += finalGrid[row2 * 5];
            cipher1Pos = row1 * 5 + col1 + 1;
            cipher2Pos = row2 * 5;
            showLetter(pos1, pos2, cipher1Pos, cipher2Pos);
        }
    }

    // If both variables are on same column
    else if (col1 == col2) {
        if ((row1 + 1) < 5 && (row2 + 1) < 5) {
            cipher += finalGrid[(row1 + 1) * 5 + col1];
            cipher += finalGrid[(row2 + 1) * 5 + col2];
            cipher1Pos = (row1 + 1) * 5 + col1;
            cipher2Pos = (row2 + 1) * 5 + col2;
            showLetter(pos1, pos2, cipher1Pos, cipher2Pos);
        }
        else if (row1 + 1 == 5) {
            cipher += finalGrid[col1];
            cipher += finalGrid[(row2 + 1) * 5 + col2];
            cipher1Pos = col1;
            cipher2Pos = (row2 + 1) * 5 + col2;
            showLetter(pos1, pos2, cipher1Pos, cipher2Pos);
        }
        else {
            cipher += finalGrid[(row1 + 1) * 5 + col1];
            cipher += finalGrid[col2];
            cipher1Pos = (row1 + 1) * 5 + col1;
            cipher2Pos = col2;
            showLetter(pos1, pos2, cipher1Pos, cipher2Pos);
        }
    }

    // If variables are not in same row or column
    else {
        cipher += finalGrid[row1 * 5 + col2];
        cipher += finalGrid[row2 * 5 + col1];
        cipher1Pos = row1 * 5 + col2;
        cipher2Pos = row2 * 5 + col1;
        showLetter(pos1, pos2, cipher1Pos, cipher2Pos);
    }

    return cipher;

}


function showLetter(message1, message2, cipher1, cipher2) {

    // Adding color to cipher and message letters
    document.querySelectorAll(".container")[message1].style.backgroundColor = "red";
    document.querySelectorAll(".container")[message2].style.backgroundColor = "red";
    document.querySelectorAll(".container")[cipher1].style.backgroundColor = "green";
    document.querySelectorAll(".container")[cipher2].style.backgroundColor = "green";

    // Removing color from cipher and message letter
    setTimeout(() => {
        document.querySelectorAll(".container")[message1].style.backgroundColor = "white";
        document.querySelectorAll(".container")[message2].style.backgroundColor = "white";
        document.querySelectorAll(".container")[cipher1].style.backgroundColor = "white";
        document.querySelectorAll(".container")[cipher2].style.backgroundColor = "white";
    }, 700)

}

function updateDom(finalGrid, cipherMessage, message, cipher) {

    // Printing the grid
    let container = document.querySelectorAll(".container");
    for (let i = 0; i < finalGrid.length; i++) {
        container[i].textContent = finalGrid[i];
    }

    // Printing message, edited message and cipher
    document.getElementById("message").textContent = "Message: " + message;
    document.getElementById("editedmessage").textContent = "Edited Message: " + cipherMessage;
    document.getElementById("cipher").textContent = "Cipher: " + cipher;

    // Styling edited message and cipher
    document.getElementById("editedmessage").style.color = "red";
    document.getElementById("cipher").style.color = "green";

}