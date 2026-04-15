import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
      trim: true,
    },
    isbooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Seat", seatSchema);
