const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
// Database Name
const dbName = 'mydatabase';

// Create a new MongoClient
const client = new MongoClient(uri);

// Create a new Express app
const app = express();
app.use(bodyParser.json());

// Define a new API endpoint
app.post('/my-endpoint', async (req, res) => {
  // Get the ID from the request body
  const { id } = req.body;
  console.log('HI1')

  // Connect to the MongoClient
  await client.connect();

  // Get the database object
  const db = client.db(dbName);

  // Create a new collection
  const collection = db.collection('mycollection');
  console.log('mongo')

  // Check if the ID is in the collection
  const doc = await collection.findOne({ id: id });
  console.log('check')

  // Send a success or error response
  if (doc) {
    res.send({ status: '2000', desc: 'success' });
  } else {
    res.status(400).send({ status: '4001', desc: 'error' });
  }

  // Close the MongoClient
  await client.close();
});

// Start the HTTP server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});