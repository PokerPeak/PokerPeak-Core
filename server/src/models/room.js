import mongoose from "mongoose";
import crypto from "crypto";
import User from "./user.js";
import { getARandomDeck, decryptWithPrivateKey, encryptWithPublicKey, GenrateSopnecerWallet } from "../utils/cardDeck.js";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const roomSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ['resting','firstloop','secondloop','thirdloop','ended'],
            default: 'resting'      
        },
        users: [
            {
                id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                isFolded: {
                    type: Boolean,
                    default: false,
                }
            }
        ],
        pooledAmount: {
            type: Number,
            default: 0,
        },
        publicKey: {
            type: String,
        },
        privateKey: {
            type: String,
        },
        encryptedGameDeck: {
            type: [String],
        },
        encryptedDeck: {
            type: [String],
        },
        randomNumberGenerated: {
            type: Boolean,
        },
        memberCount: {
            type: Number,
            default: 0,
        },
        contrctAddress: {
            type: String,
            unique: true,
            required: [true, 'must have a contract Address'],
        },
        sponcerAddress: {
            type: String,
            unique: true,
        }
    },
    {
        timestamps: true
    }
);

// instance method to encode the cards with the public key
roomSchema.methods.getFirst3Cards = function() {
    if(this.status == 'firstloop' || this.status == 'secondloop' || this.stauts == 'thirdloop'){
        return this.encryptedGameDeck.map((item) => decryptWithPrivateKey( item, this.privateKey)).slice(-5).slice(0,3);
    }
};

roomSchema.statics.findByAddressValue = async (contrctAddress) => {
    const room = await Room.findOne({ contrctAddress });
    if (!room) {
        return undefined;
    }
    return room;
};

roomSchema.statics.getAllRooms = async function() {
    const rooms = await this.find();
    const sanitizedRooms = rooms.map(room => room.getSanitizedRoomInfo());
    return sanitizedRooms;
};

roomSchema.methods.getSanitizedRoomInfo = function() {
    const sanitizedRoom = {
        _id: this._id,
        status: this.status,
        users: this.users.map(user => ({ id: user.id, isFolded: user.isFolded })),
        pooledAmount: this.pooledAmount,
        encryptedGameDeck: this.encryptedGameDeck,
        memberCount: this.memberCount,
        contrctAddress: this.contrctAddress,
        sponcerAddress: this.sponcerAddress,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };

    return sanitizedRoom;
};

roomSchema.methods.allUsers = async function(){
    const room = this;
    const users = room.users;
    let userData = [];
    //get name address avatar
    for(const i in users){
        const val = await User.findOne(users[i].id);
        console.log("val: ",val);
        userData.push({address: val.address,name: val.name, avatar: val.avatar, isFolded: users[i].isFolded});
    }
    return userData;
}

roomSchema.methods.foldUserByAddress = async function(foldAddress){
    // changing the status of the user to fold for specific user../
    const room = this;
    console.log("room:",room);
    const users = room.users;
    const updatedUsers = users.map((item)=>{
        const oneUser = User.findById(item.id);
        if(oneUser.address == foldAddress){
            return {...item ,isFolded: true}
        }
        return item;
    });
    room.users = updatedUsers;
    await room.save({validateBeforeSave:false});
}

roomSchema.methods.getFirst4Cards = function() {
    if( this.status == 'secondloop' || this.stauts == 'thirdloop'){
        return this.encryptedGameDeck.map((item) => decryptWithPrivateKey( item, this.privateKey)).slice(-5).slice(0,4);
        // return decryptWithPrivateKey( this.encryptedGameDeck, this.privateKey).slice(-5).slice(0,4);
    }
};

roomSchema.methods.getFirst5Cards = function() {
    if( this.stauts == 'thirdloop' || this.status == 'ended' ){
        return this.encryptedGameDeck.map((item) => decryptWithPrivateKey( item, this.privateKey)).slice(-5);
        // return decryptWithPrivateKey( this.encryptedGameDeck, this.privateKey).slice(-5);
    }
};

roomSchema.methods.getUserCardsVisId = function(userId) {
    const room = Room.findById(_id);
    const users = room.users;

//yet to be done...
    
}

roomSchema.methods.decodeCards = function() {
    // your decoding logic here
};

roomSchema.methods.updatePooledAmounnt = async function(pooledAmount) {
    const room = this;
    room.pooledAmount = pooledAmount;
    await room.save({validateBeforeSave:false});
};


// instance method to add a user to the room
roomSchema.methods.addUser = async function(userId) {
    const room = this;
    if(room.users.length >= 6){return "full";}
    const users = this.users;
    console.log(userId, userId.toString());
    console.log(room.users[0]);
    for(var el in users){
        // console.log("state:",users[el].id.toString() ===  userId.toString());
        if(users[el].id.toString() === userId.toString()){
            console.log("userAllreadyexist::");
            return "isin";
        }
    }
    // for(var el in users){
    //     if(el?.id == userId){
    //         return false;
    //     }
    // }
    //else the user is not present..
    users.push({id:userId,isFolded:false});
    await room.save({validateBeforeSave:false});
    return users;
};
// instance method to remove a user from the room
roomSchema.methods.removeUser = async function(userId) {
    const room = this;
    const afterUsers = this.users.filter((item)=>item.id.toString() !== userId.toString());
    this.users = afterUsers;
    await room.save({validateBeforeSave:false});
    return this.users;
    //this is cpoied from the above function so if this contains error check above one too.
};

roomSchema.methods.initGame = function() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });
    
    this.publicKey = privateKey;
    this.privateKey = publicKey;
    //fetching a deck
    const randomDeck = getARandomDeck();
    
    this.encryptedDeck = randomDeck.map((element,index) => encryptWithPublicKey(element, this.publicKey));
}

roomSchema.pre('validate', function(next) {
    if (!this.isNew) {
        return next();
    }
    // const _sponcerAddress = GenrateSopnecerWallet(this.contrctAddress);
    // this.sponcerAddress = _sponcerAddress;
    // //creating command to fetch the sponcer wallet....
    // console.log("in the per fxn.");
    //allready sending the sponcer wallet together....
    
    next();
});

roomSchema.pre('save', async function (next) {
    next();
});


const Room = mongoose.model('Room', roomSchema);

export default Room;