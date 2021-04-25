const path = require("path");
const DocumentsConvertor = require("../convertor/DocumentsConvertor");
const TextProcessor = require("./TextProcessor");

const parser = new DocumentsConvertor(path.join("storage", "docs"));

async function handle() {
    const documents = await parser.covertAllDocuments("text", false);
    TextProcessor.processText(documents[0]).then(e => console.log(e));
}

handle().then(() => console.log("Indexing finished ..."));