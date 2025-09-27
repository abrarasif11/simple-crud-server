const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 6969;

// Middlewares
app.use(cors());
app.use(express.json());

// Mongo URI
const uri = "mongodb+srv://fahimabrarasif_db_user:0Ch6orabUUVH3WMy@cluster0.ngmrg4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mongo client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Connected");

    const database = client.db("userDB");
    const userCollection = database.collection("user");


    app.get('/user', async(req, res) => {
        const cursor = userCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    })

    // define routes **inside run()** so userCollection is ready
    app.get('/', (req, res) => {
      res.send("Simple CRUD is Running");
    });

    app.post('/user', async (req, res) => {
      try {
        const user = req.body;
        console.log("📥 New User:", user);
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.error("❌ Insert Error:", error);
        res.status(500).send({ error: "Failed to insert user" });
      }
    });

// delete operation // 
app.delete('/user/:id', async (req, res) => {
    const id = req.params.id;
    console.log("Please Delete this user", id)
    const query = { _id: new ObjectId(id)}
    const result = await userCollection.deleteOne(query)
    res.send(result)
})



    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
}

run().catch(console.dir);
