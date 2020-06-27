const axios = require('axios');

exports.oauthToken = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    try {
      await axios.post('https://github.com/login/oauth/access_token', {
        redirect_uri: req.body.redirect_uri,
        client_id: req.body.client_id,
        client_secret: req.body.client_secret,
        code: req.body.code,
        state: req.body.state
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          res.status(200).send(response.data);
        });
    } catch (error) {
      console.log(error.toString());
      return res.status(500).send('error');
    }
  }
};
