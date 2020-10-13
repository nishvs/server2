import Conversation from '../models/conversation.js';
import Big from 'big.js';

exports.storeAndRespondReply = async (req, res) => {
    const { botId, message, conversationId, aiResponse } = req.body;
    const conversation = { botId, message, conversationId, aiResponse };
    prepareConversation(conversation);
    let isSaved = await saveConversation(conversation)
    const finalResponse = { botId, message, conversationId };
    if(isSaved){
        finalResponse.reply = conversation.reply
    }else{
        res.status = 500;
    }
    res.json(finalResponse)
};

exports.storeConversation = async (req, res) => {
    const { botId, message, conversationId, reply } = req.body;
    const conversation = { botId, message, conversationId, reply };
    let isSaved = await saveConversation(conversation);
    if(!isSaved){
        res.status = 500
    }
    res.json(conversation);
};

exports.removeConversation = async (req, res) => {
    const { conversationId } = req.body;
    let isRemoved = await removeConversation(conversationId);
    res.sendStatus(isRemoved?200:500);
};

const prepareConversation = (conversation)=> {    
    conversation.reply = conversation.aiResponse.intents[0].name;
    let maxConfidence = conversation.aiResponse.intents[0].confidence;
    conversation.aiResponse.intents.forEach((element) => {
        let currentConfidence = new Big(element.confidence);
        if(currentConfidence.cmp(maxConfidence) == 1 ){
            conversation.reply = element.name
        }
    });
}

const saveConversation = (conversation) => {
    let newConversation = new Conversation(conversation);
    return newConversation.save().then(()=>{
        return true;
    }).catch((error)=>{
        console.log("Error saving response",error)
        return false;
    })
}

const removeConversation = (conversationId) => {
    return Conversation.deleteOne({conversationId:conversationId}).then(()=>{
        return true;
    }).catch(error => {
        console.log("Error saving response",error)
        return false;
    })
}