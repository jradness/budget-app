import connectMongoDB from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';
import { User } from "../../../../models/user";

export async function GET(req: NextRequest, { params: { id } }: any) {
  try {
    await connectMongoDB();
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params: { id } }: any) {
  try {
    await connectMongoDB();
    const data = await req.json();
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: any) {
  try {
    await connectMongoDB();
    const deletedUser  = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found'}, {status: 404});
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

