// import { getSession } from "@auth0/nextjs-auth0";

// export function withAuth(Component) {
//   return async function AuthenticatedComponent(props) {
//     const session = await getSession();
//     if (!session || !session.user) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false,
//         },
//       };
//     }

//     // Return the original component with all props
//     return <Component {...props} user={session.user} />;
//   };
// }
