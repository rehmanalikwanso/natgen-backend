const VoiceResponse = require('twilio').twiml.VoiceResponse;
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const nameGenerator = require('../utilities/nameGenerator');
const config = require('../utilities/config');

var identity;

exports.tokenGenerator = function tokenGenerator() {
  try {
    identity = nameGenerator();

    const accessToken = new AccessToken(
      config.accountSid,
      config.apiKey,
      config.apiSecret,
      { identity }
    );

    console.log('ACCESS TOKEN >>>>> ', accessToken);
    // accessToken.identity = identity;
    const grant = new VoiceGrant({
      outgoingApplicationSid: config.twimlAppSid,
      incomingAllow: true,
    });
    accessToken.addGrant(grant);

    // Include identity and token in a JSON response
    return {
      identity: identity,
      token: accessToken.toJwt(),
    };
  } catch (error) {
    console.log('ERROR >>>>>>> ', error)
  }
};

exports.voiceResponse = function voiceResponse(requestBody) {
  const toNumberOrClientName = requestBody.To;
  const callerId = config.callerId;
  const twiml = new VoiceResponse();

  // If the request to the /voice endpoint is TO your Twilio Number,
  // then it is an incoming call towards your Twilio.Device.
  if (toNumberOrClientName == callerId) {
    const dial = twiml.dial();

    // This will connect the caller with your Twilio.Device/client
    dial.client(identity);

  } else if (requestBody.To) {
    // This is an outgoing call

    // set the callerId
    const dial = twiml.dial({ callerId });


    // Check if the 'To' parameter is a Phone Number or Client Name
    // in order to use the appropriate TwiML noun
    const attr = isAValidPhoneNumber(toNumberOrClientName) ?
      'number' :
      'client';
    dial[attr]({}, toNumberOrClientName);
  } else {
    twiml.say('Thanks for calling!');
  }

  return twiml.toString();
};



function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}