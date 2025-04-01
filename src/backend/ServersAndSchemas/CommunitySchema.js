const mongoose = require('mongoose');
const { Schema } = mongoose;

const communitySchema = new Schema({
    name: {type: String, required: true},
    cid: {type: String, required: true},
    description: {type: String, required: false},
    isPrivate: {type: Boolean, default: false},
    moderators: [{
          id: {type: String, required: true},
          name: {type: String, required: true}
    }],
    mainImage: { type: Array, required: false },
    bannerImage: { type: Array, required: false }, 
    members: {type: Number, default: 1}

}, { 
    collection: 'communities' // Specify the collection name explicitly
  })

const Community = mongoose.model('Community', communitySchema);
console.log("database:communities_db, collection:communities")
module.exports = Community;
