import { User } from "../../../../models/user";
import { Bill } from "../../../../models/bills";
import connectMongoDB from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res) {
  try {
    await connectMongoDB();
    const data = await req.json();
    console.log('auth cb....', data);
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists'}, {status: 400});
    }

    const user = await User.create(data);
    await Bill.create({ userId: user._id });


    return NextResponse.json({ user, message: 'User successfully created!'}, {status: 201});
  } catch (error) {
    return NextResponse.json({ error: error.message}, { status: 500});
  }
}
