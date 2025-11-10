require('dotenv').config();

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

console.log(accountSID, authToken);
console.log(process.env.TO_NUMBER, process.env.TWILIO_FROM_NUMBER)

const client = require('twilio')(accountSID, authToken);

const sendSMS = async (body) => {
    let msgOptions = {
        from : process.env.TWILIO_FROM_NUMBER,
        to : process.env.TO_NUMBER,
        body
    }
    try {
        const messages = await client.messages.create(msgOptions);
        console.log(messages);
    } catch (error) {
        console.log(error);
    }   
};

sendSMS('Hello from the NodeJS app', () => console.log('done'));
