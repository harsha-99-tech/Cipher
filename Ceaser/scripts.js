function process() {
    var inputText = document.getElementById('input').value;
    var key = parseInt(document.getElementById('key').value);
    var action = document.getElementById('action').value;
    var outputText = '';

    if (action === 'encrypt') {
        outputText = encrypt(inputText, key);
    } else if (action === 'decrypt') {
        outputText = decrypt(inputText, key);
    }

    document.getElementById('output').value = outputText;
}

function encrypt(text, key) {
    var result = '';
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode((charCode - 65 + key) % 26 + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode((charCode - 97 + key) % 26 + 97);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function decrypt(text, key) {
    return encrypt(text, 26 - key);
}
