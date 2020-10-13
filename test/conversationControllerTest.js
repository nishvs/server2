process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Conversation = require('../src/models/conversation');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
const { expect } = require("chai");
let should = chai.should();


chai.use(chaiHttp);

describe('Intent', () => {
  beforeEach((done) => { //Before each test we empty the database
    Conversation.remove({}, (err) => {
      done();
    });
  });
  /*
  * Test the /POST intent
  */
  describe('/POST intent', () => {
    it('it should save a conversation and send a reply', (done) => {
      let aiResponse = {
        "botId": "5f74865056d7bb000fcd39ff",
        "message": "qweasd",
        "conversationId": "1234567890",
        "aiResponse": {
          "intents": [
            {
              "confidence": 1.9644204485302907e-8,
              "name": "Greeting"
            },
            {
              "confidence": 1.602860066896028e-7,
              "name": "Means or need to contact "
            },
            {
              "confidence": 0.9999998807907104,
              "name": "Goodbye"
            },
            {
              "confidence": 5.234354061300905e-10,
              "name": "Affirmative"
            },
            {
              "confidence": 5.442978359693207e-11,
              "name": "What can I ask you?"
            }
          ],
          "entities": []
        }
      }
      chai.request(server)
        .post('/intent')
        .send(aiResponse)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.body.reply).to.be.equal("Goodbye");
          done();
        });
    });

    it('it should send message for missing parameters', (done) => {
      let aiResponse = {
        "botId": "5f74865056d7bb000fcd39ff",
        "conversationId": "1234567890",
        "aiResponse": {
          "intents": [
            {
              "confidence": 1.9644204485302907e-8,
              "name": "Greeting"
            },
            {
              "confidence": 1.602860066896028e-7,
              "name": "Means or need to contact "
            },
            {
              "confidence": 0.9999998807907104,
              "name": "Goodbye"
            },
            {
              "confidence": 5.234354061300905e-10,
              "name": "Affirmative"
            },
            {
              "confidence": 5.442978359693207e-11,
              "name": "What can I ask you?"
            }
          ],
          "entities": []
        }
      }
      chai.request(server)
        .post('/intent')
        .send(aiResponse)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

});

describe('Conversation', () => {
  beforeEach((done) => { //Before each test we empty the database
    Conversation.remove({}, (err) => {
      done();
    });
  });
  /*
  * Test the /POST conversation
  */
  describe('/POST conversation', () => {
    it('it should save a conversation', (done) => {
      let conversation = {
        "botId": "5f74865056d7bb000fcd39ff",
        "message": "qweasd",
        "conversationId": "1234567890",
        "reply": "hello"
      }
      chai.request(server)
        .post('/conversation')
        .send(conversation)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should not save a conversation for missing parameters', (done) => {
      let conversation = {
        "botId": "5f74865056d7bb000fcd39ff",
        "message": "qweasd",
        "conversationId": "1234567890",
      }
      chai.request(server)
        .post('/conversation')
        .send(conversation)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*
  * Test the /DELETE conversation
  */
  describe('/DELETE conversation', () => {
    it('it should delete a conversation', (done) => {
      let converationId = { "conversationId": "1234567890" }
      chai.request(server)
        .delete('/conversation')
        .send(converationId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

});