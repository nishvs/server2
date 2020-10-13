import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let conversation = new Schema({
  botID: mongoose.ObjectId,
  conversationId: {
    type: String,
    index: true
  },
  message: String,
  aiResponse: Schema.Types.Mixed,
  reply: String
});

const Conversation = mongoose.model("conversations", conversation);

module.exports = Conversation;