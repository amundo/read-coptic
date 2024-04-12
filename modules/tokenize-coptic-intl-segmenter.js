const segmenterSentence = new Intl.Segmenter("en", { granularity: "sentence" });
const segmenterWord = new Intl.Segmenter("en", { granularity: "word" });
const segmenterGrapheme = new Intl.Segmenter("en", { granularity: "grapheme" });

let isWhitespace = (string) => new RegExp(/^\p{White_Space}+$/gu).test(string);
let isPunctuation = (string) => new RegExp(/^\p{Punctuation}+$/gu).test(string);
let isWord = (string) => new RegExp(/^\p{Letter}+$/gu).test(string);

let tokenizeCoptic = (plaintext) => {
  const sentences = [];

  // First, segment the text into sentences
  for (const segment of segmenterSentence.segment(plaintext)) {
    let sentenceText = segment.segment;
    const tokens = [];
    let lastIndex = 0;
    // Then, for each sentence, segment into words and identify punctuation and whitespace
    for (
      const { segment, index, isWordLike } of segmenterWord.segment(
        sentenceText,
      )
    ) {
      if (isWhitespace(segment)) {
        // Capture whitespace between tokens
        tokens.push({ token: segment, type: "whitespace" });
      }
      let graphemes = Array.from(
        segmenterGrapheme.segment(segment),
        ({ segment }) => segment,
      );
      tokens.push({
        token: segment,
        type: isWordLike ? "word" : "punctuation",
        graphemes,
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

export { tokenizeCoptic };
// Example usage
// text = `ⲡⲉϫⲉ-ⲡϩⲗ̅ⲗⲟ ⲛⲁϥ ϫⲉ, "ⲧⲱⲟⲩⲛⲅ̅ ⲛ̅ⲅⲡⲱⲧ ⲛ̅ⲅⲧⲁϩⲟϥ."`
// let text = "ⲛ̅ ⲁⲡⲁ"
// text = ` ⲛ̅ⲧⲟϥ ⲇⲉ ⲡⲉϫⲁϥ ϫⲉ, "ⲡⲁⲉⲓⲱⲧ ⲡⲉ. ⲁϥⲛ̅ⲧ, ⲁϥⲛⲟϫⲧ̅ ⲉⲃⲟⲗ, ⲁϥⲃⲱⲕ."`
let text = `ϩⲙ̅ ⲡϯⲙⲉ. ⲁⲩⲗⲟ ⲉⲃⲟⲗ.`;
// let text = "Hello, world! How are you today? This is an example.";

console.log(tokenizeCoptic(text));
