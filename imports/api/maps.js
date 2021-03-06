import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {PoIs} from "./pois.js";

export const Maps = new Mongo.Collection("maps");

if(Meteor.isServer){
    Meteor.publish("maps", function mapsPublication() {
        if(!this.userId){
            return;
        }
        return Maps.find({ $or:[
            { owner: this.userId },
            { shared: Meteor.users.findOne(this.userId).emails[0].address }
        ]});
    });
}

Meteor.methods({
    "maps.insert"(name, url) {
        if(!Meteor.userId()){
            throw new Meteor.Error("not logged in");
        }
        var objectToInsert = {
            owner: Meteor.userId(),
			username: Meteor.user().username,
            shared: [],
            name: name,
            url: url,
            desc: "",
            scale: 1,
            units: ""
        };
        return Maps.insert(objectToInsert);
    },
    "maps.remove"(id) {
        if(this.userId !== Maps.findOne(id).owner){
            return false;
        }
        PoIs.remove({mapId: id});
        return Maps.remove(id);
    },
    "maps.updateName"(id, newName) {
        Maps.update(id, {$set:{name: newName}});
    },
    "maps.updateDesc"(id, newDesc) {
        Maps.update(id, {$set:{desc: newDesc}});
    },
    "maps.updateURL"(id, newURL) {
        Maps.update(id, {$set:{url: newURL}});
    },
    "maps.updateScale"(id, newScale) {
        Maps.update(id, {$set:{scale: newScale}});
    },
    "maps.updateUnits"(id, newUnits) {
        Maps.update(id, {$set:{units: newUnits}});
    },
    "maps.addShared"(id, newShared) {
        if (this.userId !== Maps.findOne(id).owner) {
            return;
        }
        Maps.update(id, {$addToSet:{shared: newShared}});
    },
    "maps.removeShared"(id, newShared) {
        if (this.userId !== Maps.findOne(id).owner) {
            return;
        }
        Maps.update(id, {$pull:{shared: newShared}});
    }
});