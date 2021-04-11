const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require('cors')
require("dotenv").config() 

const app = express();
app.use(cors())
app.use(express.json())


const CLIENT_ID = `6762e6c12aec4a749727163e05bf4c6a`;
const REDIRECT_URI = `http://localhost:3000`;
const StateString = `LoremIpsum`;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const creds = {
  redirectUri: REDIRECT_URI,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post(`/login`, (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi(creds);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
        console.log(data)
      res.status(200).json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
        console.error(err)
      res.sendStatus(400).json(err);
    });
});

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken

    const spotifyApi = new SpotifyWebApi({...creds,refreshToken})

    spotifyApi
    .refreshAccessToken()
    .then(data => {
        console.log('refreshed the Token')
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

const PORT = process.env.PORT
app.listen(PORT,()=>console.log('Server Started running at Port '+PORT))