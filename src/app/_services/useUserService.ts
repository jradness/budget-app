import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetch } from '../_helpers/client/useFetch';
import { config } from '../../constants';

// interfaces
interface IUser {
  id?: string,
  username: string,
  email: string,
}

interface IBill {
  userId: string,
  name: string,
  dueDayOfMonth: number,
  billAmount: number,
}

interface IUserStore {
  user?: IUser,
  currentUser?: IUser,
  bills?: IBill
}

interface IUserService extends IUserStore {
  // login: (username: string, password: string) => Promise<void>,
  // logout: () => Promise<void>,
  register: (user: Object) => Promise<void>,
  // getAll: () => Promise<void>,
  // getById: (id: string) => Promise<void>,
  getCurrent: (id: string) => Promise<void>,
}

// users state store
const initialState = {
  currentUser: undefined,
};

const userStore = create<IUserStore>(() => initialState);

function useUserService(): IUserService {
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = userStore();

  return {
    currentUser,
    getCurrent: async (id) => {
      if (!currentUser) {
        const { user } = await fetch.get(`${config.baseUrl}/api/users/${id}`);
        userStore.setState({ currentUser: user });
      }
    },
    register: async (userData) => {
      console.log(userData);
      const { user } = await fetch.post(`${config.baseUrl}/api/auth/register`, userData);
      userStore.setState({ currentUser: user });
    }
  }
}

export { useUserService };
