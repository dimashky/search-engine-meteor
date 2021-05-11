import { Meteor } from 'meteor/meteor';

import SettingsCollection from "../collections/Settings";

const weightingAlgorithmKey = 'weighting-algorithm';

Meteor.methods({
   getWeightingAlgorithm() {
       const record = SettingsCollection.findOne({ key: weightingAlgorithmKey });
       return  record ? record.value : 'tf-idf';
   },

    setWeightingAlgorithm(algorithm) {
        return SettingsCollection.upsert({ key: weightingAlgorithmKey }, { key: weightingAlgorithmKey, value: algorithm });
    }
});