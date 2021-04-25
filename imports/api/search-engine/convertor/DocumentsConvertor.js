const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

class DocumentsConvertor {
    documentsPath = "";

    constructor(documentsPath, documentsExtension = "docx") {
        this.documentsPath = documentsPath;
        this.documentsExtension = documentsExtension;
    }

    /**
     * Convert all documents from extension to extension
     *
     * @param {string} targetType
     * @param {boolean} writeConvertedFiles
     * @returns {Promise<string[]>}
     */
    async covertAllDocuments(targetType = "html", writeConvertedFiles = false) {
        const destinationExtension = targetType === "html" ? ".html" : ".txt"
        const filenames = fs.readdirSync(this.documentsPath).filter(filename => filename.match(new RegExp(`.*.${this.documentsExtension}`, "g")));

        const convertPromises = filenames.map(filename => {
            const targetPath = path.resolve(this.documentsPath, filename);
            return targetType === "html" ? mammoth.convert({ path: targetPath }) : mammoth.extractRawText({ path: targetPath });
        });

        const convertedFiles = await Promise.all(convertPromises);

        if(!writeConvertedFiles) {
            return convertedFiles.map(file => file.value);
        }

        filenames.forEach((filename, idx) => {
            const txtPath = path.resolve(this.documentsPath, filename.replace(`.${this.documentsExtension}`, destinationExtension));
            fs.writeFileSync(txtPath, convertedFiles[idx].value);
        })
        return convertedFiles.map(file => file.value);
    }

    /**
     * Convert docx to html
     *
     * @param {string} documentPath
     * @returns {Promise<string>} converted docx
     */
    async static convertDocument(documentPath) {
        return (await mammoth.convert({ path: documentPath })).value;
    }
}

module.exports = DocumentsConvertor;