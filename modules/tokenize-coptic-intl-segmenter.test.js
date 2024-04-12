import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { tokenizeCoptic } from "./tokenize-coptic-intl-segmenter.js";

Deno.test("tokenizeCoptic whitespace", () => {
  let text = " ";
  let expected = [
    {
      plaintext: " ",
      tokens: [
        { token: " ", type: "whitespace" },
      ],
    },
  ];
  assertEquals(tokenizeCoptic(text), expected);
});

Deno.test("tokenizeCoptic word whitespace word", () => {
  let text = "ⲛ̅ ⲁⲡⲁ";
  let expected = [
    {
      plaintext: "ⲛ̅ ⲁⲡⲁ",
      tokens: [
        { token: "ⲛ̅", type: "word" },
        { token: " ", type: "whitespace" },
        { token: "ⲁⲡⲁ", type: "word" },
      ],
    },
  ];
  assertEquals(tokenizeCoptic(text), expected);
});
