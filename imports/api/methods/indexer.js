import { Meteor } from 'meteor/meteor';
import DocumentsUploader from "../search-engine/DocumentsUploader";

const path = require("path");
const DocumentsIndexer = require("../search-engine/DocumentsIndexer");
const DocumentsConvertor = require("../search-engine/DocumentsConvertor");
require('../../lib/arabicString');

Meteor.methods({
    async createIndices() {
        const documentsPath = path.join(Meteor.absolutePath, "storage", "docs");
        const indexer = new DocumentsIndexer(documentsPath);
        return indexer.indexDocuments();
    },
    async getDocumentContent(documentId) {
        const document = await DocumentsConvertor.convertDocument(path.resolve(Meteor.absolutePath, "storage", "docs", documentId));
        return { document, isArabic: document.isArabic(0.2) }
    },
    async indexFiles(files, locale) {
        const filesNames = DocumentsUploader.saveDocuments(files);
        const documentsPath = path.join(Meteor.absolutePath, "storage", "docs");
        const indexer = new DocumentsIndexer(documentsPath, filesNames);
        return indexer.indexDocuments();
    }
});
