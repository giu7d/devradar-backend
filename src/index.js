import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const PORT = 4000 || process.env.PORT;
const MONGODB_URL = "mongodb://localhost:27017" || process.env.MONGODB_URL;

const app = express();
const db = mongoose.connection;

// DB
mongoose.connect(MONGODB_URL, {
  dbName: "devradar_db",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

db.on("error", err => console.warn(`MONGODB: Error -> ${err}`));
db.on("open", () => console.log(`MONGODB: Connected succefully`));

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}`);
});
