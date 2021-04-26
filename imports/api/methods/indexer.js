import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Terms from '../collections/Terms.js';

const path = require("path");
const DocumentsConvertor = require("../search-engine/DocumentsConvertor");
const TextProcessor = require("../search-engine/TextProcessor");

const parser = new DocumentsConvertor(path.join(Meteor.absolutePath, "storage", "docs"));

Meteor.methods({
    async createIndices() {
        const documents = await parser.covertAllDocuments("text", false);
        const terms = await TextProcessor.processText(documents[0].text);
        terms.forEach(term => {
            const record = Terms.findOne({ term });
            if(record) {
                const oldDocuments = record.documents;
                if(!oldDocuments.includes(documents[0].path)) {
                    oldDocuments.push(documents[0].path);
                    Terms.update({ term }, { term, documents: oldDocuments });
                }
            }
            else {
                Terms.insert({
                    term,
                    documents: [documents[0].path]
                })
            }
        })
    },
});
