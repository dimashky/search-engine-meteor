import { Meteor } from 'meteor/meteor';
import BooleanModel from "../search-engine/models/BooleanModel";
import VectorModel from "../search-engine/models/VectorModel";

const TextProcessor = require("../search-engine/TextProcessor");


Meteor.methods({
    async match(query, selectedModel = 'boolean') {
        const queryTokens = TextProcessor.processText(query);
        switch (selectedModel) {
            case "vector":
                return VectorModel.handle(queryTokens);
            case "boolean":
            default:
                return BooleanModel.handle(queryTokens);
        }
    },
});
