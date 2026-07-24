import assert from "assert";

function stripLinksForX(caption) {
  return caption
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/www\.\S+/gi, "")
    .replace(/\b[a-z0-9-]+\.(com|io|co|net|org|ai|dev|app)(\/\S*)?/gi, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

assert.equal(
  stripLinksForX("Launch live at https://example.com/now and www.test.io today"),
  "Launch live at and today"
);
assert.equal(stripLinksForX("No links here"), "No links here");
assert.ok(!stripLinksForX("Visit foo.com/path please").includes("foo.com"));
console.log("ok: stripLinksForX");
