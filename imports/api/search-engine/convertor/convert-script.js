const DocumentsConvertor = require("./DocumentsConvertor");
const path = require("path");

const parser = new DocumentsConvertor(path.join("storage", "docs"));

parser.covertAllDocuments("html", true).then(() => console.log("All docs converted"));