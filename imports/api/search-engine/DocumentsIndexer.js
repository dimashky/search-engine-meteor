import TermsCollection from "../collections/Terms";
import DocumentsCollection from "../collections/Documents";

const TextProcessor = require('./TextProcessor');
const DocumentsConvertor = require('./DocumentsConvertor');

class DocumentsIndexer {

    /**
     * @type {string}
     */
    documentsPath = "";

    /**
     * @type {string[]}
     */
    onlyDocuments = null;

    /**
     * type {DocumentsConvertor}
     */
    parser;

    /**
     * Class constructor
     * @param {string} documentsPath
     * @param {string[]} onlyDocuments
     */
    constructor(documentsPath, onlyDocuments = null) {
        this.documentsPath = documentsPath;
        this.onlyDocuments = onlyDocuments;
        this.parser = new DocumentsConvertor(documentsPath);
    }

    /**
     * Index documents
     *
     * @returns {Promise<boolean>}
     */
    async indexDocuments() {
        const documents = await this.parser.covertAllDocuments("text", false, this.onlyDocuments);
        for (let idx = 0; idx < documents.length; ++idx) {
            const document = documents[idx];
            console.log(`Indexing document ${document.path} ....`);
            await this.indexDocument(document.text, document.path);
        }
        return true;
    }

    /**
     * Index single document
     *
     * @param {string} documentContent
     * @param {string} documentPath
     * @returns {Promise<void>}
     */
    async indexDocument(documentContent, documentPath) {
        const terms = TextProcessor.processText(documentContent);

        DocumentsCollection.upsert({ document: documentPath }, { document: documentPath, terms });

        terms.forEach(term => {
            const record = TermsCollection.findOne({ term });
            if(!record) {
                return TermsCollection.insert({
                    term,
                    documents: [{ doc: documentPath, count: 1 }]
                })
            }
            const documentIndex = record.documents.findIndex(d => d.doc === documentPath)
            if(documentIndex < 0) {
                record.documents.push({ doc: documentPath, count: 1 });
            }
            else {
                record.documents[documentIndex].count++;
            }
            TermsCollection.update({ term }, { term, documents: record.documents });
        })
    }
}

module.exports = DocumentsIndexer;