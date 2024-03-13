function playFairAlgo() {
    // Edit inputs 
    let message = document.getElementById("messageBox").value;
    let key = document.getElementById("keyBox").value;
    let editedKey = key.toUpperCase().replaceAll(/[^A-Z]/g, "").replaceAll("J", "I");
    let editedmessage = message.toUpperCase().replaceAll(/[^A-Z]/g, "").replaceAll("J", "I");
    // Update sections
    updateSection();
    // Creates a grid for playfair Cipher
    let finalGrid = fillGrid(editedKey);
    // Generates cipher
    let cipher = generateCipher(finalGrid, editedmessage);
    // Printing result
    updateDom(finalGrid, message, cipher);
}

function updateSection() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("solution").style.display = "flex";
}

function fillGrid(key) {
    let character = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    let grid = [];
    for (let i = 0; i < key.length; i++) {
        if (!grid.includes(key[i])) {
            grid.push(key[i]);
        }
    }
    for (let i = 0; i < character.length; i++) {
        if (!grid.includes(character[i])) {
            grid.push(character[i]);
        }
    }
    return grid;
}

function generateCipher(finalGrid, editedmessage) {
    const dummyCharacter = 'X';
    let pointer = 0;
    let firstLetter = "";
    let secondLetter = "";
    let cipherText = "";
    while (pointer < editedmessage.length) {
        if ((pointer + 1) < editedmessage.length) {
            if (editedmessage[pointer] == editedmessage[pointer + 1]) {
                firstLetter = editedmessage[pointer];
                secondLetter = dummyCharacter;
                pointer += 1;
            }
            else {
                firstLetter = editedmessage[pointer]
                secondLetter = editedmessage[pointer + 1];
                pointer += 2;
            }
        }
        else {
            firstLetter = editedmessage[pointer];
            secondLetter = dummyCharacter;
            pointer += 1;
        }
        let cipher = findCipher(firstLetter, secondLetter, finalGrid);
        cipherText += cipher;
    }
    return cipherText;
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
    // three cases to find cipher
    if (row1 == row2) {
        if ((col1 + 1) < 5 && (col2 + 1) < 5) {
            cipher += finalGrid[row1 * 5 + col1 + 1];
            cipher += finalGrid[row2 * 5 + col2 + 1];
        }
        else if (col1 + 1 == 5) {
            cipher += finalGrid[row1 * 5];
            cipher += finalGrid[row2 * 5 + col2 + 1];
        }
        else {
            cipher += finalGrid[row1 * 5 + col1 + 1];
            cipher += finalGrid[row2 * 5];
        }
    }
    else if (col1 == col2) {
        if ((row1 + 1) < 5 && (row2 + 1) < 5) {
            cipher += finalGrid[(row1 + 1) * 5 + col1];
            cipher += finalGrid[(row2 + 1) * 5 + col2];
        }
        else if (row1 + 1 == 5) {
            cipher += finalGrid[col1];
            cipher += finalGrid[(row2 + 1) * 5 + col2];
        }
        else {
            cipher += finalGrid[(row1 + 1) * 5 + col1];
            cipher += finalGrid[col2];
        }
    }
    else {
        cipher += finalGrid[row1 * 5 + col2];
        cipher += finalGrid[row2 * 5 + col1];
    }
    return cipher;
}

function updateDom(finalGrid, message, cipher) {
    let container = document.querySelectorAll(".container");
    for (let i = 0; i < finalGrid.length; i++) {
        container[i].textContent = finalGrid[i];
    }
    document.getElementById("message").textContent = "Message: " + message;
    document.getElementById("cipher").textContent = "Cipher: " + cipher;
}