## Play Fair Algorithm

This repository contains a JavaScript implementation of the Playfair encryption algorithm. Playfair is a symmetric encryption technique that encrypts pairs of letters in a plaintext to produce ciphertext. It involves the following steps:

1. **Key Preparation:** Generate a key matrix from a keyword by filling it with unique letters of the keyword and then adding the remaining letters of the alphabet (excluding 'J') in order.

2. **Text Preparation:** Prepare the plaintext by converting it to uppercase and grouping letters into pairs. Add an 'X' between repeated letters and append an 'X' if the total number of letters is odd.

3. **Encryption:** For each pair of letters, if they are in the same row, replace them with the letters to their immediate right (wrapping around if necessary). If they are in the same column, replace them with the letters immediately below (wrapping around if necessary). If they form a rectangle, replace them with the letters on the same row but at the opposite corners of the rectangle. If they are different and not on the same row or column, replace them with the letters on the same row but at the other corners of the rectangle.



