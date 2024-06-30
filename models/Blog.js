import mongoose, { Schema } from "mongoose";
import connectDB from "@/lib/mongodb";


connectDB()

const BlogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

   status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },

   post:{
    type:String
   },

    repo: {
      type: String,
     
    },
    commit: {
      type: [String],

    },
    postType:{
      type:String
    }
 
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
