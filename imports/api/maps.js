import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";

export const Maps = new Mongo.Collection("maps");

if(Meteor.isServer){
    Meteor.publish("maps", function mapsPublication() {
        return Maps.find({ $or:[
            { owner: this.userId },
            {shared: this.userId}
        ]});
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
            shared: "",
            name: name,
            url: url,
            desc: ""
        })
    },
    "maps.remove"(id) {
        Maps.remove(id);
    },
    "maps.updateName"(id, newName) {
        Maps.update(id, {$set:{name: newName}});
    },
    "maps.updateDesc"(id, newDesc) {
        Maps.update(id, {$set:{desc: newDesc}});
    },
    "maps.updateURL"(id, newURL) {
        Maps.update(id, {$set:{url: newURL}});
    }
});