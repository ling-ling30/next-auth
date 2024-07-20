import { useSession } from "next-auth/react";

type Props = {};

function UseCurrentUser() {
  const session = useSession();
  return session.data?.user;
}

export default UseCurrentUser;
