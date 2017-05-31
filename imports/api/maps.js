import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export const Maps = new Mongo.Collection("maps");

if(Meteor.isServer){
    Meteor.publish("maps", function mapsPublication() {
        return Maps.find({
            owner: this.userId
        });
    });
}

Meteor.methods({
    "maps.insert"(name, url) {
        if(!Meteor.userId()){
            throw new Meteor.Error("not logged in");
        }
        Maps.insert({
            owner: Meteor.userId(),
			username: Meteor.user().username,
            name: name,
            url: url
        })
    },
    "maps.remove"(id) {
        Maps.remove(id);
    }
});