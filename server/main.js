import { Meteor } from 'meteor/meteor';
import {PoIs} from "../imports/api/pois.js";


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  clearPoIs: function() {
    PoIs.remove({});
  }
})
