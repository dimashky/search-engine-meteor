import DocumentsFetcher from "../DocumentsFetcher";
import TermWeightCalculator from "../TermWeightCalculator";
import math from "mathjs";

class ExtendedBooleanModel {
    /**
     * Get document related to query
     *
     * @param {string[]} query
     * @param {boolean} orOperator
     * @return {any[]} Documents
     */
    static handle(query, orOperator = false) {
        const relatedTerms = DocumentsFetcher.getTermsDocuments(query);
        const allDocuments = [...new Set(relatedTerms.reduce((prev, current) => prev.concat(current.documents.map(d => d.doc)), []))];
        const model = allDocuments.map(document => {
            return relatedTerms.map(term => term.documents.find(d => d.doc === document) ? TermWeightCalculator.getWeight(term.term, document) : 0);
        });
        return allDocuments
            .map((d, idx) => {
                let relevance = orOperator
                    ? math.pow(math.sum(model[idx].map(weight => math.pow(weight, 2))) / model[idx].length, 0.5)
                    : 1 - math.pow(math.sum(model[idx].map(weight => math.pow(1 - weight, 2))) / model[idx].length, 0.5);
                return {document: d, vector: model[idx], relevance }
            })
            .sort((d1, d2) => math.compare(d1.relevance, d2.relevance))
            .reverse();
    }
}

export default ExtendedBooleanModel;