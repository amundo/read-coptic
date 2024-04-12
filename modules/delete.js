let tokenize = (plaintext) => {
  const sentences = [];
  const segmenterSentence = new Intl.Segmenter("en", {
    granularity: "sentence",
  });
  const segmenterWord = new Intl.Segmenter("en", { granularity: "word" });

  // First, segment the text into sentences
  for (
    const { segment: sentenceText } of segmenterSentence.segment(plaintext)
  ) {
    const tokens = [];
    let lastIndex = 0;

    // Then, for each sentence, segment into words and identify punctuation and whitespace
    for (
      const { segment, index, isWordLike } of segmenterWord.segment(
        sentenceText,
      )
    ) {
      if (index > lastIndex) {
        // Capture whitespace between tokens
        tokens.push({
          token: sentenceText.slice(lastIndex, index),
          type: "whitespace",
        });
      }
      tokens.push({
        token: segment,
        type: isWordLike ? "word" : "punctuation",
      });
      lastIndex = index + segment.length;
    }

    // Check for trailing whitespace
    if (lastIndex < sentenceText.length) {
      tokens.push({ token: sentenceText.slice(lastIndex), type: "whitespace" });
    }

    // Add the sentence object to the array
    sentences.push({
      plaintext: sentenceText,
      tokens: tokens,
    });
  }

  return sentences;
};

// Example usage
let text = "Hello, world! How are you today? This is an example.";
text = `ⲡⲉϫⲉ-ⲡϩⲗ̅ⲗⲟ ⲛⲁϥ ϫⲉ, "ⲧⲱⲟⲩⲛⲅ̅ ⲛ̅ⲅⲡⲱⲧ ⲛ̅ⲅⲧⲁϩⲟϥ."`;

console.log(tokenize(text));
