//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors"

// const Pusher = require("pusher");
//app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1245411",
  key: "0f7956dbf309fcd6674d",
  secret: "2fbd54848adaca5c5622",
  cluster: "eu",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//DBconfig
const connectionURL =
  "mongodb+srv://admin:7YvVxaMwsVU8AJ2j@cluster0.o4t0i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//??
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp:messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//listener

app.listen(port, () => console.log(`Listening on localhost:${port}`));
