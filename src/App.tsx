import { Provider } from "react-redux";
import Logo from "../public/logo.svg";
import styles from "./App.module.scss";
import Filter from "./components/Filter/Filter";
import store from "./components/store/store";
import Tabs from "./components/Tabs/Tabs";
import Tickets from "./components/Tickets/Tickets";

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.header}>
        <img className={styles.headerLogo} src={Logo} alt="mainLogo" />
      </div>
      <div className={styles.main}>
        <Filter />
        <div className={styles.section}>
          <Tabs />
          <Tickets />
        </div>
      </div>
    </Provider>
  );
};

export default App;
