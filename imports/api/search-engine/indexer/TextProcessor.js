require('../../../lib/arabicString/arabicString');
const arabicStemmer = require('../../../lib/jsastem/jsastem');
const XRegExp = require("xregexp");
const stopWordHandler = require('stopword')
const natural = require('natural');
const tokenizer = require( 'wink-tokenizer')();

class TextProcessor {
    static wordTagsList = ['alien', 'punctuation', 'word', 'symbol', 'url', 'number', 'emoticon', 'mention', 'email'];
    static filteredWordTagsList = ['punctuation', 'symbol', 'emoticon'];

    /**
     * Tokenize text and stemming the resulted tokens
     *
     * @param text
     * @returns {Promise<string[]>}
     */
    static async processText(text) {
        const tokens = TextProcessor.tokenizeText(text);
        return await TextProcessor.stemText(tokens);
    }

    /**
     * Tokenize text into array
     *
     * @param {string} text
     * @returns {string[]}
     */
    static tokenizeText(text) {
        const trimmedText = text.replace(/\n/g, ' ').replace(/\s\s+/g, ' ');
        return tokenizer.tokenize(trimmedText)
            .filter(token => !TextProcessor.filteredWordTagsList.includes(token.tag))
            .map(token => token.value);
    }

    /**
     * Remove the stop words for a text
     *
     * @param {string} text The text that want to remove the stop words
     * @returns Array<String> The result word tokens
     */
    static removeStopWords(text) {
        const locale = text.isArabic(0.6) ? stopWordHandler.ar : stopWordHandler.en;
        return stopWordHandler.removeStopwords(text.split(' '), locale);
    }

    /**
     * Stemming text into array of stemmed tokens
     *
     * @param {string[]}tokens Word tokens
     * @returns {Promise<string[]>}
     */
    static async stemText(tokens) {
        const promises = tokens.map(token => TextProcessor.stemWord(token));
        return Promise.all(promises);
    }

    /**
     * Stemming word
     *
     * @param {string} word The desired word
     * @returns {Promise<String>}
     */
    static stemWord(word) {
        return new Promise(resolve => {
            if(word.isArabic()) {
                return XRegExp.forEach( word, XRegExp('[\\p{Arabic}\\p{M}]+'), (match) => resolve(arabicStemmer(match[0])));
            }
            resolve (natural.LancasterStemmer.stem(word));
        });
    }
}

module.exports = TextProcessor;
