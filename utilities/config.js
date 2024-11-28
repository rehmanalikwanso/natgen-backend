const dotenv = require("dotenv");
const cfg = {};

dotenv.config({ path: ".env" });

// HTTP Port to run our web application
cfg.port = process.env.PORT || 4000;

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.twimlAppSid = process.env.TWILIO_TWIML_APP_SID;
cfg.callerId = process.env.TWILIO_CALLER_ID;

cfg.apiKey = process.env.TWILIO_API_KEY;
cfg.apiSecret = process.env.TWILIO_API_SECRET;

// Export configuration object
module.exports = cfg;
