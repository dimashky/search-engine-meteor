require('../../lib/arabicString');
const stopWordHandler = require('stopword')
const natural = require('natural');
const tokenizer = require( 'wink-tokenizer')();
const snowballFactory = require("../../lib/arabic-stemmer-snowball");

const ArabicStemmer = snowballFactory.newStemmer("arabic");

class TextProcessor {
    static wordTagsList = ['alien', 'punctuation', 'word', 'symbol', 'url', 'number', 'emoticon', 'mention', 'email'];
    static filteredWordTagsList = ['punctuation', 'symbol', 'emoticon'];

    /**
     * Tokenize text and stemming the resulted tokens
     *
     * @param text
     * @returns {string[]}
     */
    static processText(text) {
        const tokens = TextProcessor.tokenizeText(text);
        const filteredTokens = TextProcessor.removeStopWords(tokens);
        return TextProcessor.stemText(filteredTokens);
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
     * @param {string[]} tokens The text that want to remove the stop words
     * @param {boolean} arabic
     * @returns Array<String> The result word tokens
     */
    static removeStopWords(tokens, arabic = false) {
        const locale = arabic ? stopWordHandler.ar : stopWordHandler.en;
        return stopWordHandler.removeStopwords(tokens, locale);
    }

    /**
     * Stemming text into array of stemmed tokens
     *
     * @param {string[]}tokens Word tokens
     * @returns {string[]}
     */
    static stemText(tokens) {
        return tokens.map(token => TextProcessor.stemWord(token));
    }

    /**
     * Stemming word
     *
     * @param {string} word The desired word
     * @returns {string}
     */
    static stemWord(word) {
        if(word.isArabic()) {
            return ArabicStemmer.stem(word);
        }
        return (natural.LancasterStemmer.stem(word));
    }
}

module.exports = TextProcessor;
