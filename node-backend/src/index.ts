import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());

// define a route handler for the default home page
app.post('/airdrop/precommit', (req, res) => {
  // render the index template
  res.send(req.body);
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
