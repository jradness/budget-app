import { create } from 'zustand';
import { useUserService } from "./useUserService";
import { useFetch } from '../_helpers/client/useFetch';

// interfaces
interface IUser {
  id: string,
}

interface IBill {
  userId: string,
  name: string,
  dueDayOfMonth: number,
  billAmount: number,
}

interface IBillStore {
  currentUser?: useUserService,
  monthlyBills?: IBill[],
  paymentOptions?: Object,
  financialDetails: Object,
  expenseCategories: Object,
}

interface IBillsService extends IBillStore {
  getUserBillData: () => Promise<void>,
  handleBill: (userId: object) => Promise<void>,
  deleteBill: (userId: string) => Promise<void>,
  setState: (key, value) => void
}

// bill state store
const initialState = {
  currentUser: undefined,
  monthlyBills: [],
  paymentOptions: {},
  financialDetails: {},
  expenseCategories: {},
};

const billsStore = create<IBillStore>(() => initialState);

function useBillService(): IBillsService {
  const fetch = useFetch();
  const {
    monthlyBills,
    paymentOptions,
    financialDetails,
    expenseCategories
  } = billsStore();

  const { currentUser } = useUserService();

  const fetchBillDetails = async (userId: string) => {
    try {
      const { billDoc: {
          monthlyBills,
          paymentOptions,
          financialDetails,
          expenseCategories
        }
      } = await fetch.get(`http://localhost:3000/api/bills/${userId}`);

      billsStore.setState({
        monthlyBills,
        paymentOptions,
        financialDetails,
        expenseCategories,
      });
    } catch (error) {
      console.error('Error fetching bill doc:', error);
    }
  };


  return {
    currentUser,
    monthlyBills,
    paymentOptions,
    financialDetails,
    expenseCategories,
    getUserBillData: async () => await fetchBillDetails(currentUser._id),
    handleBill: async (bill) => {
      const { billDoc } = await fetch.put(`http://localhost:3000/api/bills/${currentUser._id}/monthly`, bill);
      billsStore.setState({ monthlyBills: billDoc.monthlyBills});
    },
    deleteBill: async (bill) => {
      const { billDoc } = await fetch.delete(`http://localhost:3000/api/bills/${currentUser._id}/monthly`, bill);
      billsStore.setState({ monthlyBills: billDoc.monthlyBills});
    },
    setState: async (key, value) => {

      await fetch.put(`http://localhost:3000/api/bills/${currentUser._id}/doc`, value);
    }
  }
}

export { useBillService }
