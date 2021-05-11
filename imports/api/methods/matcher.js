import { Meteor } from 'meteor/meteor';
import BooleanModel from "../search-engine/models/BooleanModel";
import VectorModel from "../search-engine/models/VectorModel";
import ExtendedBooleanModel from "../search-engine/models/ExtendedBooleanModel";

const TextProcessor = require("../search-engine/TextProcessor");


Meteor.methods({
    async match(query, selectedModel = 'boolean') {
        const queryTokens = TextProcessor.processText(query);
        let results = [];
        switch (selectedModel) {
            case "vector":
                results = VectorModel.handle(queryTokens);
                break;
            case "ext-boolean":
                results = ExtendedBooleanModel.handle(queryTokens);
                break;
            case "ext-or-boolean":
                results = ExtendedBooleanModel.handle(queryTokens, true);
                break;
            case "boolean":
            default:
                results = BooleanModel.handle(queryTokens);
                break;
        }
        return {
            results,
            queryTokens
        }
    },
});
