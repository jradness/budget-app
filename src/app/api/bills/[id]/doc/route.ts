import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "../../../../../lib/mongodb";
import { Bill } from "../../../../../models/bills";

export async function PUT(req: NextRequest, { params: { id }}) {
  try {
    await connectMongoDB();
    const doc = await Bill.findOne({ userId: id });

    if (!doc) {
      return NextResponse.json({ message: 'User not found'}, {status: 404});
    }

    const data = await req.json();
    const { paymentOptions, financialDetails, expenseItem } = data;

    // Update paymentOptions
    if (paymentOptions) {
      const { payStartDate,  payEndDate } = paymentOptions;
      doc.paymentOptions.payStartDate = new Date (payStartDate) || doc.paymentOptions.payStartDate;
      doc.paymentOptions.payEndDate = new Date(payEndDate) || doc.paymentOptions.payEndDate;
    }

    // Update financialDetails
    if (financialDetails) {
      doc.financialDetails.annualIncome = financialDetails.annualIncome || doc.financialDetails.annualIncome;
      doc.financialDetails.payDayAmount = financialDetails.payDayAmount || doc.financialDetails.payDayAmount;
      doc.financialDetails.paymentSchedule = financialDetails.paymentSchedule || doc.financialDetails.paymentSchedule;
    }

    // Update expenseCategories
    if (expenseItem) {
      const existingExpense = await Bill.findOne(
          { userId: id, 'expenseCategories._id': expenseItem._id },
          { 'expenseCategories.$': 1 }
      );
      if (!existingExpense) {
        doc.expenseCategories.push(expenseItem);
      } else {
        const expenseIndex = doc.expenseCategories.findIndex(expense => expense._id.equals(expenseItem._id));
        if (expenseIndex !== -1) {
          doc.expenseCategories[expenseIndex] = { ...doc.expenseCategories[expenseIndex], ...expenseItem };
        }
      }
    }

    const billDoc = await doc.save();
    return NextResponse.json({ billDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params: { id }}) {
  try {
    await connectMongoDB();
    const data = await req.json();

    const doc = await Bill.findOne({ userId: id });
    doc.expenseCategories.pull({_id: data._id});
    const billDoc = await doc.save();

    return NextResponse.json({ billDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
