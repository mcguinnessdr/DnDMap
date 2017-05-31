import { Meteor } from 'meteor/meteor';
import {PoIs} from "../imports/api/pois.js";
import {Maps} from "../imports/api/maps.js";


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  clearPoIs: function() {
    PoIs.remove({});
  }
})
