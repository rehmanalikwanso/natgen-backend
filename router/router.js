const Router = require("express").Router;
const { tokenGenerator, voiceResponse } = require("../controller/voiceController");

const router = new Router();

router.get("/token", async (req, res) => {
  try {
    res.set("Content-Type", "application/json");
    const response = tokenGenerator();
    console.log('RESPONSE >>>>> ', response);
    res.status(200).json(response);
  } catch (error) {
    console.log('ERROR IN TOKEN ROUTE >>>>>>>> ', error);
    res.send(error);
  }
});

router.post("/voice", (req, res) => {
  try {
    res.set("Content-Type", "text/xml");
    const response = voiceResponse(req.body);
    console.log('RESPONSE >>>>>>>>>>>>>>>>> ', response);
    res.send(response);
  } catch (error) {
    console.log('ERROR IN VOICE ROUTE >>>>>> ', error);
    res.send(error);
  }
});

module.exports = router;
