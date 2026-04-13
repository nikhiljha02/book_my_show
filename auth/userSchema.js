import bcrypt from "bcryptjs";
import mongoose from "mongoose";
//mongodb+srv://<db_username>:<db_password>@cluster0.gddq4ho.mongodb.net/?appName=Cluster0
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 4,
      maxLength: 50,
      required: [true, "Name is requires"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is requires"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, " password is required"],
      minLength: 8,
      select: false,
      maxLength: 12,
    },
    iseVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model("chaiUser", userSchema);
