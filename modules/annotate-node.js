// ES6 Module: TextAnnotator.js

export const annotateNode = (node, lexicon) => {
  // Helper function to recursively find all text nodes under a specific node
  const findTextNodes = (node, textNodes = []) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        textNodes.push(child)
      } else {
        findTextNodes(child, textNodes)
      }
    })
    return textNodes
  }

  // Helper function to tokenize text content and wrap tokens in <span> tags
  const tokenizeAndWrap = (text) => {
    let tokens = text.split(/[\P{Letter}]+/gu)
    
    let html = tokens
    .map((token) => `<span class="word">
  <span class=form>${token}</span>
  <span class=definition></span>
</span>`)
    .join(" ")

    return html
  }

  // Main logic to annotate text nodes with definitions
  const textNodes = findTextNodes(node)
  textNodes.forEach((textNode) => {
    // Tokenize and wrap each word in a span
    const wrappedText = tokenizeAndWrap(textNode.textContent)

    // Create a temporary container to manipulate HTML
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = wrappedText

    // Process each .word span to append definitions, if found in lexicon
    tempDiv.querySelectorAll(".word").forEach((wordSpan) => {
      const word = wordSpan.textContent.trim()
      const lexiconEntry = lexicon.entries.find((entry) => entry.form === word)
      wordSpan.classList.add("unannotated")
      wordSpan.classList.remove("annotated")
      if (lexiconEntry) {
        wordSpan.classList.add("annotated")
        wordSpan.classList.remove("unannotated")
        // Append a .definition span after the .word span
        wordSpan.querySelector('.definition')
          .textContent = `${lexiconEntry.gloss || lexiconEntry.definition}`

      }
    })

    // Replace the original text node with the new annotated content
    const range = document.createRange()
    range.selectNodeContents(textNode)
    range.deleteContents()
    range.insertNode(tempDiv)
  })
}
