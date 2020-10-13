import express from 'express';
var router = express.Router();
import { storeAndRespondReply,storeConversation,removeConversation } from '../controllers/conversationController';
const { intentValidationRules,createValidationRules,deleteValidationRules, validate } = require('../validation')


router.post('/intent',intentValidationRules(), validate, storeAndRespondReply);

router.post('/conversation',createValidationRules(), validate, storeConversation)
      .delete('/conversation',deleteValidationRules(), validate,removeConversation)

module.exports = router;