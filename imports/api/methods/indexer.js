import { Meteor } from 'meteor/meteor';

const path = require("path");
const DocumentsIndexer = require("../search-engine/DocumentsIndexer");

Meteor.methods({
    async createIndices() {
        const documentsPath = path.join(Meteor.absolutePath, "storage", "docs");
        const indexer = new DocumentsIndexer(documentsPath);
        return indexer.indexDocuments();
    },
});
