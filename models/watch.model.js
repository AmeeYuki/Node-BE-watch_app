const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchSchema = new Schema(
  {
    watchName: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    automatic: { type: Boolean, default: false },
    watchDescription: { type: String, required: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Use the exact name of the model
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);

const Watch = mongoose.model("Watch", watchSchema);

module.exports = Watch;
