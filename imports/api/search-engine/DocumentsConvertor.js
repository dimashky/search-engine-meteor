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
     * @param {string?[]} onlyFiles
     * @returns {Promise<{}[]>}
     */
    async covertAllDocuments(targetType = "html", writeConvertedFiles = false, onlyFiles = null) {
        const destinationExtension = targetType === "html" ? ".html" : ".txt"
        const filenames = fs.readdirSync(this.documentsPath).filter(filename => (!onlyFiles || onlyFiles.includes(filename)) && filename.match(new RegExp(`.*.${this.documentsExtension}`, "g")));

        const convertPromises = filenames.map(filename => {
            const targetPath = path.resolve(this.documentsPath, filename);
            return targetType === "html" ? mammoth.convert({ path: targetPath }) : mammoth.extractRawText({ path: targetPath });
        });

        const convertedFiles = await Promise.all(convertPromises);
        const response =  convertedFiles.map((file, idx) => ({ path: filenames[idx], text: file.value }));

        if(!writeConvertedFiles) {
            return response;
        }

        filenames.forEach((filename, idx) => {
            const txtPath = path.resolve(this.documentsPath, filename.replace(`.${this.documentsExtension}`, destinationExtension));
            fs.writeFileSync(txtPath, convertedFiles[idx].value);
        });
        return response;
    }

    /**
     * Convert docx to html
     *
     * @param {string} documentPath
     * @returns {Promise<string>} converted docx
     */
    static async convertDocument(documentPath) {
        return (await mammoth.convert({ path: documentPath })).value;
    }
}

module.exports = DocumentsConvertor;