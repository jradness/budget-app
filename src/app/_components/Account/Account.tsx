'use client'
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserService } from '../../_services/useUserService';
import { useBillService } from "../../_services/useBillService";
import { Container, Navbar } from 'react-bootstrap';

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
  return (
    <>
     <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: '10px'}}>
      <Container>
        <Navbar.Brand href="#home"><h2>Budget Radness 💰</h2></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <b>{currentUser?.username}</b>{' > '}<a href="/api/auth/logout">[ Logout ]</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      {children}
    </Container>  
    </>
  );
}

export default Account;