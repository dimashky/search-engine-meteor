import { Meteor } from 'meteor/meteor';
import BooleanModel from "../search-engine/models/BooleanModel";

const TextProcessor = require("../search-engine/TextProcessor");


Meteor.methods({
    async match(query, selectedModel = 'boolean') {
        const queryTokens = TextProcessor.processText(query);
        console.log(queryTokens);
        return BooleanModel.handle(queryTokens);
    },
});
