import { NextRequest, NextResponse } from 'next/server';
import { User } from "@models/user";
import { Bill } from "@models/bills";
import connectMongoDB from "@lib/mongodb";
import managementClient from "@lib/authMtmClient";


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
    const deletedBill  = await Bill.deleteOne({userId: id});

    if (!deletedUser || !deletedBill) {
      return NextResponse.json({ message: 'User or Bills not found'}, {status: 404});
    }
    
    const authId = req.nextUrl.searchParams.get('auth_id') as string;
    await managementClient.users.delete({ id: authId });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
