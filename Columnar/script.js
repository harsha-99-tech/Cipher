function encrypt() {
    var plainText = document.getElementById('plainText').value.toUpperCase().replace(/\s/g, '');
    var key = document.getElementById('encryptionKey').value.toUpperCase();
    var encryptedText = encryptMessage(plainText, key);
    document.getElementById('encryptedText').textContent = 'Encrypted Text: ' + encryptedText;
  }
  
  function decrypt() {
    var cipherText = document.getElementById('cipherText').value.toUpperCase().replace(/\s/g, '');
    var key = document.getElementById('decryptionKey').value.toUpperCase();
    var decryptedText = decryptMessage(cipherText, key);
    document.getElementById('decryptedText').textContent = 'Decrypted Text: ' + decryptedText;
  }
  
  function encryptMessage(plainText, key) {
      let cipher = "";
      let k_indx = 0;
  
      const msg_len = plainText.length;
      const msg_lst = Array.from(plainText);
      const key_lst = Array.from(key).sort();
  
      const col = key.length;
      const row = Math.ceil(msg_len / col);
  
      const fill_null = (row * col) - msg_len;
      for (let i = 0; i < fill_null; i++) {
          msg_lst.push('_');
      }
  
      const matrix = [];
      for (let i = 0; i < msg_lst.length; i += col) {
          matrix.push(msg_lst.slice(i, i + col));
      }
  
      for (let _ = 0; _ < col; _++) {
          const curr_idx = key.indexOf(key_lst[k_indx]);
          for (const row of matrix) {
              cipher += row[curr_idx];
          }
          k_indx++;
      }
  
      return cipher;
  }
  
  function decryptMessage(cipher, key) {
      let plainText = "";
      let k_indx = 0;
      let msg_indx = 0;
      const msg_len = cipher.length;
      const msg_lst = Array.from(cipher);
  
      const col = key.length;
      const row = Math.ceil(msg_len / col);
  
      const key_lst = Array.from(key).sort();
  
      const dec_cipher = [];
      for (let i = 0; i < row; i++) {
          dec_cipher.push(Array(col).fill(null));
      }
  
      for (let _ = 0; _ < col; _++) {
          const curr_idx = key.indexOf(key_lst[k_indx]);
          for (let j = 0; j < row; j++) {
              dec_cipher[j][curr_idx] = msg_lst[msg_indx];
              msg_indx++;
          }
          k_indx++;
      }
  
      try {
          plainText = dec_cipher.flat().join('');
      } catch (err) {
          throw new Error("This program cannot handle repeating words.");
      }
  
      const null_count = (plainText.match(/_/g) || []).length;
  
      if (null_count > 0) {
          return plainText.slice(0, -null_count);
      }
  
      return plainText;
  }
  