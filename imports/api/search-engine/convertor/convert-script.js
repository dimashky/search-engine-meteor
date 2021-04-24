const DocumentsConvertor = require("./DocumentsConvertor");
const path = require("path");

const parser = new DocumentsConvertor(path.join("storage", "docs"));

async function init() {
    await parser.covert();
    await parser.covert(true);
}

init();