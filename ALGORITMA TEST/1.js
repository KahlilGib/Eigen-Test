function reverseAlphabeticalPart(str) {
    let reversedAlphaPart = '';
    let numPart = '';
  
    
    for (let i = str.length - 1; i >= 0; i--) {
      const char = str[i];
  
      
      if (/[a-zA-Z]/.test(char)) {
        reversedAlphaPart += char;
      }
      
      else if (/[0-9]/.test(char)) {
        numPart = char + numPart;
      }
      
      else {
        break;
      }
    }
  
    
    return reversedAlphaPart + numPart;
  }
  
  
  const input = "NEGIE1";
  const output = reverseAlphabeticalPart(input);
  console.log(output); 