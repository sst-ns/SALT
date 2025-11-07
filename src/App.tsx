import AppRouter from "./router";
import { useSamlAuth } from "./components/hooks/useSamlauth";
import Spinner from "./components/Spinner";
import {UserContext} from "./components/context/UserContext";

const App = () => {
  const user = useSamlAuth();

  if (!user) {
    return <Spinner />;
  }
  // Wrap AppRouter in UserContext.Provider
  return (
    <UserContext.Provider value={user}>
      <AppRouter user={user} />
    </UserContext.Provider>
  );
};

export default App;
