import { MongoClient } from "mongodb";

let cachedClient;

async function getClient(uri) {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  const { MONGODB_URI } = process.env;
  if (!MONGODB_URI) {
    res.status(500).json({ error: "MONGODB_URI not configured" });
    return;
  }

  const client = await getClient(MONGODB_URI);
  const db = client.db("password_manager");
  const collection = db.collection("passwords");

  if (req.method === "GET") {
    const findResult = await collection.find({}).toArray();
    res.status(200).json(findResult);
    return;
  }

  if (req.method === "POST") {
    const password = req.body;
    const result = await collection.insertOne(password);
    res.status(200).json({ success: true, result });
    return;
  }

  if (req.method === "DELETE") {
    const filter = req.body;
    const result = await collection.deleteOne(filter);
    res.status(200).json({ success: true, result });
    return;
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(405).end("Method Not Allowed");
}


