import connectMongoDB from "../../../../lib/mongodb";
import { User } from "../../../../models/user";
import { Bill } from "../../../../models/bills";
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises'
import path from 'path';

export async function POST(req: NextRequest, res) {
  try {
    // Read JSON
    const userData = await readFile(path.resolve('_data', 'users.json'), 'utf-8');
    const billData = await readFile(path.resolve('_data', 'bills.json'), 'utf-8');
    // Parse data
    const user = JSON.parse(userData);
    const monthlyBills = JSON.parse(billData);

    await connectMongoDB();
    const newUser = await User.create(user);
   
    await Bill.create({ userId: newUser._id, monthlyBills });

    return NextResponse.json({ newUser, message: 'User successfully created!' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message });
  }
}
