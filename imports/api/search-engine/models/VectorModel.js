import DocumentsFetcher from "../DocumentsFetcher";
import TermWeightCalculator from "../TermWeightCalculator";
import math from "mathjs";

class VectorModel {
    /**
     * Get document related to query
     *
     * @param {string[]} query
     * @return {any[]} Documents
     */
    static handle(query) {
        const relatedTerms = DocumentsFetcher.getTermsDocuments(query);
        const allDocuments = [...new Set(relatedTerms.reduce((prev, current) => prev.concat(current.documents.map(d => d.doc)), []))];
        const model = allDocuments.map(document => {
            return relatedTerms.map(term => term.documents.find(d => d.doc === document) ? TermWeightCalculator.TfIdf(term.term, document) : 0);
        });
        const queryVector = new Array(relatedTerms.length).fill(1);
        return allDocuments
            .map((d, idx) => ({document: d, vector: model[idx], relevance: math.acos(math.dot(model[idx], queryVector))}))
            .sort((d1, d2) => math.compare(d1.relevance, d2.relevance));
    }
}

export default VectorModel;