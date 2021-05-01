import DocumentsCollection from "../collections/Documents";

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
        return Math.log(DocumentsCollection.find().count() / DocumentsCollection.find({ terms: { $in: [term] } }).count());
    }
}

export default TermWeightCalculator;