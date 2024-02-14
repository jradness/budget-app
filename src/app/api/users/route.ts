import connectMongoDB from "../../../lib/mongodb";
import { User } from "../../../models/user";
import { Bill } from "../../../models/bills";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.create(data);
    await Bill.create({ userId: user._id });
    return NextResponse.json({ user, message: 'User successfully created!'}, {status: 201});
  } catch (e) {
    return NextResponse.json({ message: e.message});
  }
}

