/*
 * Returns the result the Vigenère encryption on the given text with the given key.
 */
function encrypt(input, key) {
  let output = "";
  let j = 0;
  for (const ch of input) {
    const cc = ch.codePointAt(0);
    if (isUppercase(cc)) {
      output += String.fromCodePoint(
        ((cc - 65 + key[j % key.length]) % 26) + 65
      );
      j++;
    } else if (isLowercase(cc)) {
      output += String.fromCodePoint(
        ((cc - 97 + key[j % key.length]) % 26) + 97
      );
      j++;
    } else {
      output += ch;
    }
  }
  return output;
}

/*
 * Returns an array of numbers, each in the range [0, 26), representing the given key.
 * The key is case-insensitive, and non-letters are ignored.
 * Examples:
 * - filterKey("AAA") = [0, 0, 0].
 * - filterKey("abc") = [0, 1, 2].
 * - filterKey("the $123# EHT") = [19, 7, 4, 4, 7, 19].
 */
function filterKey(key) {
  let result = [];
  for (const ch of key) {
    const cc = ch.codePointAt(0);
    if (isLetter(cc)) result.push((cc - 65) % 32);
  }
  return result;
}

// Tests whether the given character code is a Latin letter.
function isLetter(c) {
  return isUppercase(c) || isLowercase(c);
}

// Tests whether the given character code is an Latin uppercase letter.
function isUppercase(c) {
  return 65 <= c && c <= 90; // 65 is character code for 'A'. 90 is 'Z'.
}

// Tests whether the given character code is a Latin lowercase letter.
function isLowercase(c) {
  return 97 <= c && c <= 122; // 97 is character code for 'a'. 122 is 'z'.
}

function cifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let clave = document.getElementById("clave").value;

  if (mensaje.length === 0) {
    return;
  }
  if (clave.length === 0) {
    return;
  }

  let keyArray = filterKey(clave);
  if (keyArray.length == 0) {
    alert("Key has no letters");
    return;
  }

  let resultado = encrypt(mensaje, keyArray);

  document.getElementById("resultado").innerText = resultado;
}

function descifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let clave = document.getElementById("clave").value;

  if (mensaje.length === 0) {
    return;
  }
  if (clave.length === 0) {
    return;
  }

  let keyArray = filterKey(clave);
  if (keyArray.length == 0) {
    alert("Key has no letters");
    return;
  }

  keyArray = keyArray.map((e) => (26 - e) % 26);

  let resultado = encrypt(mensaje, keyArray);

  document.getElementById("resultado").innerText = resultado;
}
