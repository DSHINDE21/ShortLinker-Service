import mongoose from "mongoose";

// A schema is a blueprint for the structure of the documents within a collection.
const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// A model is a compiled version of the schema and provides an interface to interact with the corresponding MongoDB collection (in this case, the urls collection).
const url = mongoose.model("Url", urlSchema);

export default url;
