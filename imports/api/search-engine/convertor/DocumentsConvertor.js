const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

class DocumentsConvertor {
    documentsPath = "";

    constructor(documentsPath, documentsExtension = "docx") {
        this.documentsPath = documentsPath;
        this.documentsExtension = documentsExtension;
    }

    async covert(text = false) {
        const destinationExtension = text ? ".txt" : ".html"
        const filenames = fs.readdirSync(this.documentsPath).filter(filename => filename.match(new RegExp(`.*.${this.documentsExtension}`, "g")));

        const convertPromises = filenames.map(filename => {
            const targetPath = path.resolve(this.documentsPath, filename);
            return text ? mammoth.extractRawText({ path: targetPath }) : mammoth.convert({ path: targetPath });
        });

        const convertedFiles = await Promise.all(convertPromises);

        filenames.forEach((filename, idx) => {
            const txtPath = path.resolve(this.documentsPath, filename.replace(`.${this.documentsExtension}`, destinationExtension));
            fs.writeFileSync(txtPath, convertedFiles[idx].value);
        })
    }
}

module.exports = DocumentsConvertor;