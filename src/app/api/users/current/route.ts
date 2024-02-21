import connectMongoDB from "../../../../lib/mongodb";
import {User} from "../../../../models/user";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email') as string;
    await connectMongoDB();
    const user = await User.findOne({ email });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    // Handle any errors and return an appropriate response
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

