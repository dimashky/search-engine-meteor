import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import DocumentsFetcher from "./DocumentsFetcher";

if (Meteor.isServer) {
    describe('Test document fetcher', function () {
        it('fetch correctly', function () {
            const documents = DocumentsFetcher.getTermsDocuments(['project']);
            console.log(documents);

            assert.equal(documents.length, 1);
        });
    });
}
