const DocumentsParser = require("./DocumentsParser");
const path = require("path");

const parser = new DocumentsParser(path.join("storage", "docs"));

async function init() {
    await parser.covert();
    await parser.covert(true);
}

init();