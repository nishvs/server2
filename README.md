Clone the repo.

Perform npm install. Dependancy for running the app is MongoDB. Please update the dev.env with the local mongo hostname.

npm start

Config file(dev.env) added in the app.

Curl reqeusts

/intent

POST
curl --location --request POST 'http://localhost:3500/intent' \
--header 'Authorization: 825765d4-7f8d-4d83-bb03-9d45ac9c27c0' \
--header 'Content-Type: application/json' \
--data-raw '{
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
}'



/conversation

POST
curl --location --request POST 'http://localhost:3500/conversation' \
--header 'Content-Type: application/json' \
--data-raw '{
  "botId": "5f74865056d7bb000fcd39ff",
  "message": "qweasd",
  "conversationId": "1234567890",
  "reply": "hello"
}'

DELETE
curl --location --request DELETE 'http://localhost:3500/conversation' \
--header 'Content-Type: application/json' \
--data-raw '{
	"conversationId":"1234567890"
}'

For testing for the API the following script:

Config for test is "test.env"

npm test





