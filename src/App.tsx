import AppRouter from "./router";
import { useSamlAuth } from "./components/hooks/useSamlauth";
import { UserContext } from "./components/context/UserContext";
import LoginPage from "./pages/auth/LoginPage";
import Spinner from "./components/Spinner";

const App = () => {
  const { user, loading } = useSamlAuth();

  if (loading) {
    return <Spinner />;
  }
  // console.log("user in app", user);
  if (!user) {
    return <LoginPage />;
  }
  // Wrap AppRouter in UserContext.Provider
  return (
    <UserContext.Provider value={user}>
      <AppRouter user={user} />
    </UserContext.Provider>
  );
};

export default App;
