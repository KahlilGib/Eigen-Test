function longest(sentence) {
    const words = sentence.split(' ');
    let maxLength = 0;
    let longestWord = '';
  
  
    for (const word of words) {
      if (word.length > maxLength) {
        maxLength = word.length;
        longestWord = word;
      }
    }
  
    
    return { length: maxLength, word: longestWord };
  }
  
  const sentence = "Saya sangat senang mengerjakan soal algoritma";
  const result = longest(sentence);
  console.log(`${result.word}: ${result.length} character`); 
  