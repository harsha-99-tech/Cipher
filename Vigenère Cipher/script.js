// Function to generate the key in a cyclic manner until its length is equal to the length of the original text
function generateKey(str, key) {
    key = key.split("");
    if (str.length == key.length)
        return key.join("");
    else {
        let temp = key.length;
        for (let i = 0; i < (str.length - temp); i++) {
            key.push(key[i % key.length]);
        }
    }
    return key.join("");
}

// Function to return the encrypted text generated with the help of the key
function cipherText(str, key) {
    let cipher_text = "";

    for (let i = 0; i < str.length; i++) {
        let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) % 26;
        x += 'A'.charCodeAt(0);
        cipher_text += String.fromCharCode(x);
    }
    return cipher_text;
}

// Function to decrypt the encrypted text and return the original text
function originalText(cipher_text, key) {
    let orig_text = "";

    for (let i = 0; i < cipher_text.length; i++) {
        let x = (cipher_text[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) % 26;
        x += 'A'.charCodeAt(0);
        orig_text += String.fromCharCode(x);
    }
    return orig_text;
}

// Function to convert the lower case character to Upper case
function LowerToUpper(s) {
    let str = s.split("");
    for (let i = 0; i < s.length; i++) {
        if (s[i] == s[i].toLowerCase()) {
            str[i] = s[i].toUpperCase();
        }
    }
    s = str.toString();
    return s;
}

// Function to perform encryption
function encrypt() {
    let plainText = document.getElementById("plainText").value.toUpperCase();
    let key = document.getElementById("encryptionKey").value.toUpperCase();
    key = generateKey(plainText, key);
    let encryptedText = cipherText(plainText, key);
    document.getElementById("encryptedText").innerText = "Encrypted Text: " + encryptedText;
}

// Function to perform decryption
function decrypt() {
    let cipherText = document.getElementById("cipherText").value.toUpperCase();
    let key = document.getElementById("decryptionKey").value.toUpperCase();
    key = generateKey(cipherText, key);
    let decryptedText = originalText(cipherText, key);
    document.getElementById("decryptedText").innerText = "Decrypted Text: " + decryptedText;
}
