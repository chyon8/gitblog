import mongoose, { Schema } from "mongoose";
import connectDB from "@/lib/mongodb";

connectDB();

const AnalyticsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

const Analytics = mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema);

export default Analytics;
