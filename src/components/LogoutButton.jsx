import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: "https://task-transit.vercel.app/login" } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;