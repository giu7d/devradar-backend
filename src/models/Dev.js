import { Schema, model } from "mongoose";
import { PointSchema } from "../utils";

const DevSchema = new Schema({
  name: String,
  bio: String,
  avatar_url: String,
  github_username: { type: String, unique: true },
  techs: [String],
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});

export default model("Dev", DevSchema);
