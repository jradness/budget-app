import { ManagementClient } from 'auth0';

const managementClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_MTM_CLIENT_ID!,
  clientSecret:  process.env.AUTH0_MTM_CLIENT_SECRET!,
});

export default managementClient;