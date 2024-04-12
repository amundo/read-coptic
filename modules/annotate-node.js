// Helper function to recursively find all text nodes under a specific node
const findTextNodes = (node) => {
  return Array.from(node.childNodes).reduce((textNodes, child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      textNodes.push(child);
    } else {
      textNodes = textNodes.concat(findTextNodes(child));
    }
    return textNodes;
  }, []);
};

const classifyToken = (token) => {
  if (token.match(/\p{Diacritic}+/gu)) {
    return "diacritic";
  }

  if (token.match(/\p{Punctuation}+/gu)) {
    return "punctuation";
  }

  if (token.match(/\p{White_Space}+/gu)) {
    return "whitespace";
  }

  return "word";
};

// Helper function to tokenize text content and wrap tokens in <span> tags
const tokenizeAndWrap = (plaintext) => {
  let tokens = plaintext.split(/([\P{Letter}]+)/gu)
    .filter((token) => token.length > 0);

  let words = tokens.map((token) => ({ token, type: classifyToken(token) }));

  let html = words.reduce((html, { token, type }) => {
    let span = document.createElement("span");
    span.textContent = token;
    span.classList.add(type);
    html += span.outerHTML;
    return html;
  }, "");

  return html;
};

export const annotateNode = (node, lexicon) => {
  const textNodes = findTextNodes(node);
  textNodes.forEach((textNode) => {
    // Tokenize and wrap each word in a span
    const wrappedText = tokenizeAndWrap(textNode.textContent);

    // Create a temporary container to manipulate HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = wrappedText;

    // Process each .word span to append definitions, if found in lexicon
    tempDiv.querySelectorAll(".word").forEach((wordSpan) => {
      if (!wordSpan.querySelector(".word")) return;

      const word = wordSpan.textContent.trim();

      const lexiconEntry = lexicon.entries.find((entry) => entry.form === word);
      wordSpan.classList.add("unannotated");
      wordSpan.classList.remove("annotated");
      if (lexiconEntry) {
        wordSpan.classList.add("annotated");
        wordSpan.classList.remove("unannotated");
        // Append a .definition span after the .word span
        wordSpan.querySelector(".definition")
          .textContent = `${lexiconEntry.gloss || lexiconEntry.definition}`;
      }
    });

    // Replace the original text node with the new annotated content
    const range = document.createRange();
    range.selectNodeContents(textNode);
    range.deleteContents();
    range.insertNode(tempDiv);
  });
};
