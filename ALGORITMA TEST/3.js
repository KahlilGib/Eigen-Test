function countWords(input, query) {
    const wordCounts = {};
  
    for (const word of input) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  
    const counts = [];
    for (const word of query) {
      counts.push(wordCounts[word] || 0);
    }
    return counts;
  }
  

  const input = ['xc', 'dz', 'bbb', 'dz'];
  const query = ['bbb', 'ac', 'dz'];
  const output = countWords(input, query);
  console.log(output);