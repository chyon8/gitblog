import mongoose, { Schema } from "mongoose";
import connectDB from "@/lib/mongodb";

//mongoose.connect(process.env.MONGODB_URI);
//mongoose.Promise = global.Promise;

connectDB()

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    image:{
      type:String,
    },
    name: {
      type: String,
      required: true,
    },
    subscribed:{
      type:Boolean,
      default : false,
  
    },
    favorites: {
      type: Map,
      of: Boolean,
      default: {},
    },
    downloads: {
      type: Map,
      of: Boolean,
      default: {},
    },
  
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
