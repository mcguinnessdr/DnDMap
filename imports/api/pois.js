import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";

export const PoIs = new Mongo.Collection("pois");

Meteor.methods({
    "pois.insert"(posX, posY) {
        if(!Meteor.userId()){
            throw new Meteor.Error("not logged in");
        }
        PoIs.insert({
            owner: Meteor.userId(),
			username: Meteor.user().username,
			posX: posX,
			posY: posY,
			name: "new city",
			desc: "new description"
        })
    },
    "pois.remove"(id) {
        PoIs.remove(id);
    },
    "pois.updateName"(id, newName) {
        PoIs.update(id, {$set:{name: newName}});
    },
    "pois.updateDesc"(id, newDesc) {
        PoIs.update(id, {$set:{desc: newDesc}});
    }
});