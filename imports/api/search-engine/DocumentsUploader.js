import {Meteor} from "meteor/meteor";
import {random} from "mathjs";

const fs = require('fs');
const path = require('path');

class DocumentsUploader {
    static saveDocument(blob, fileName) {
        let filePath = path.resolve(Meteor.absolutePath, "storage", "docs", fileName);
        if(fs.existsSync(filePath)) {
            filePath = path.resolve(Meteor.absolutePath, "storage", "docs", `${random(1, 120)}-${fileName}`);
        }
        fs.writeFileSync(filePath, blob, 'binary');
        return fileName;
    }

    static saveDocuments(files) {
        return files.map(file => DocumentsUploader.saveDocument(file.blob, file.name));
    }
}

export default DocumentsUploader;