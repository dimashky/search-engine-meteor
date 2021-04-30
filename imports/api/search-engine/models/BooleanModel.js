import DocumentsFetcher from "../DocumentsFetcher";
import math from "mathjs";

class BooleanModel {
    /**
     * Get document related to query
     *
     * @param {string[]} query
     * @return {string[]} Documents
     */
    static handle(query) {
        const relatedTerms = DocumentsFetcher.getTermsDocuments(query);
        const allDocuments = [...new Set(relatedTerms.reduce((prev, current) => prev.concat(current.documents), []))];
        const model = relatedTerms.map(term => {
            return allDocuments.map(document => term.documents.includes(document) ? 1 : 0);
        });
        const relatedDocuments = model.reduce((prev, current) => math.bitAnd(current, prev), new Array(allDocuments.length).fill(1));
        return relatedDocuments.map((isRelated, index) => isRelated ? allDocuments[index] : null).filter(document => document);
    }
}

export default BooleanModel;