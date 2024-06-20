import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const session = await getServerSession();
    const userEmail = session.user.email
    const user = await User.findOne({ email: userEmail });
    const userId=(user._id.toString())
    const limit = 10;


    const query = {};

    if (userId) {
      query.user = userId;
    }

    const totalCount = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const post = await Blog.find(query)
      .sort({ createdAt: 'desc' })
      .populate('user')
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        post,
        page,
        totalPages,
        totalCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
