import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "../../../../../lib/mongodb";
import { Bill } from "../../../../../models/bills";

export async function PUT(req: NextRequest, { params: { id }}) {
  try {
    await connectMongoDB();
    const doc = await Bill.findOne({ userId: id });

    if (!doc) {
      return NextResponse.error({
        status: 404,
        message: 'Bill not found.',
      });
    }

    const data = await req.json();
    console.log('data...',data);
    const { paymentOptions, financialDetails, expenseCategory } = data;

    // Update paymentOptions
    if (paymentOptions) {
      const { payStartDate,  payEndDate } = paymentOptions;
      doc.paymentOptions.payStartDate = new Date(payStartDate) || doc.paymentOptions.payStartDate;
      doc.paymentOptions.payEndDate = new Date(payEndDate) || doc.paymentOptions.payEndDate;
    }

    // Update financialDetails
    if (financialDetails) {
      doc.financialDetails.annualIncome = financialDetails.annualIncome || doc.financialDetails.annualIncome;
      doc.financialDetails.payDayAmount = financialDetails.payDayAmount || doc.financialDetails.payDayAmount;
      doc.financialDetails.paymentSchedule = financialDetails.paymentSchedule || doc.financialDetails.paymentSchedule;
    }

    // Update expenseCategories
    if (expenseCategory) {
      const existingExpense = await Bill.findOne(
          { userId: id, 'expenseCategories._id': expenseCategory._id },
          { 'expenseCategories.$': 1 }
      );
      if (!existingExpense) {
        doc.expenseCategories.push(expenseCategory);
      } else {
        await Bill.findOneAndUpdate(
            { userId: id, 'expenseCategories._id': expenseCategory._id },
            {
              $set: {
                'expenseCategories.$.name': expenseCategory.name || existingExpense.expenseCategories[0].name,
                'expenseCategories.$.amount': expenseCategory.amount || existingExpense.expenseCategories[0].amount
              }
            },
            { new: true }
        ).catch(e => console.log('Error updating expense item.', e.message));
      }
    }

    // Save the updated document
    const billDoc = await doc.save();

    return NextResponse.json({ billDoc }, { status: 200 });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
