import TermsCollection from "../collections/Terms";
import DocumentsCollection from "../collections/Documents";

class DocumentsFetcher {
    /**
     * Get terms documents for set of terms
     *
     * @param {string[]} terms
     */
    static getTermsDocuments(terms) {
        return TermsCollection.find({ term: { $in: terms } }).fetch();
    }
}

export default DocumentsFetcher;