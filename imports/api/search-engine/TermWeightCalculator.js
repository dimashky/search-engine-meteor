import DocumentsCollection from "../collections/Documents";
import SettingsCollection from "../collections/Settings";

class TermWeightCalculator {
    static TfIdf(term, documentId) {
        return TermWeightCalculator.tf(term, documentId) * TermWeightCalculator.idf(term);
    }

    static tf(term, documentId) {
        const documentRecord = DocumentsCollection.findOne({ document: documentId });
        if(!documentRecord) {
            throw new Error(`Couldn't find document ${documentId}`);
        }
        return documentRecord.terms.filter(t => t === term).length / documentRecord.terms.length;
    }

    static idf(term) {
        return Math.log(1 + DocumentsCollection.find().count() / DocumentsCollection.find({ terms: { $in: [term] } }).count());
    }

    static getWeight(term, documentId) {
        const record = SettingsCollection.findOne({ key: 'weighting-algorithm' });
        const algorithm = record ? record.value : 'tf-idf';
        switch (algorithm) {
            case "tf":
                return TermWeightCalculator.tf(term, documentId);
            case "idf":
                return TermWeightCalculator.idf(term);
            case "tf-idf":
            default:
                return TermWeightCalculator.TfIdf(term, documentId);
        }
    }
}

export default TermWeightCalculator;