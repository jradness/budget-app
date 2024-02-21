'use client';

import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserService } from '../../_services/useUserService';
import { useBillService } from "../../_services/useBillService";


const Account = ({ children }) => {
  const { user, error, isLoading } = useUser();
  const { currentUser, getAuthUser } = useUserService()
  const billService = useBillService()


  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      try {
        await getAuthUser(user.email);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchUserBills = async () => {
      try {
        await billService.getUserBillData();
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchUserBills();
  }, [currentUser]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return children;
}

export default Account;