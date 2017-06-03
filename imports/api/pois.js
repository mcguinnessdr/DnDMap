import {Mongo} from 'meteor/mongo';
import {Meteor} from "meteor/meteor";
import {Maps} from "./maps.js";

export const PoIs = new Mongo.Collection("pois");

if(Meteor.isServer){
    Meteor.publish("pois", function poisPublication() { 
        return PoIs.find({
            mapId:{ $in: Maps.find({}).fetch().map((map) => {return map._id}) }}
        );
    });
}

Meteor.methods({
    "pois.insert"(posX, posY, mapId) {
        if(!Meteor.userId()){
            throw new Meteor.Error("not logged in");
        }
        PoIs.insert({
            owner: Meteor.userId(),
			username: Meteor.user().username,
            mapId: mapId,
			posX: posX,
			posY: posY,
			name: "new city",
			desc: "new description",
            privateDesc: []
        })
    },
    "pois.remove"(id) {
        if(this.userId !== PoIs.findOne(id).owner){
            return;
        }
        PoIs.remove(id);
    },
    "pois.updateName"(id, newName) {
        PoIs.update(id, {$set:{name: newName}});
    },
    "pois.updateDesc"(id, newDesc) {
        PoIs.update(id, {$set:{desc: newDesc}});
    },
    "pois.updatePrivateDesc"(id, newDesc) {
        if(PoIs.findOne({"_id": id, "privateDesc.id": this.userId})) {
            PoIs.update({"_id": id, "privateDesc.id": this.userId}, { $set: { "privateDesc.$.desc":  newDesc }});
        }else
        {
            PoIs.update(id, { $addToSet: { privateDesc: {id: this.userId, desc: newDesc} }});
        }
    }
});