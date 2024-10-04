import Logo from "../public/logo.svg";
import Tabs from "./components/Tabs/Tabs";
import Filter from "./components/Filter/Filter";
import Tickets from "./components/Tickets/Tickets";
import styles from "./App.module.scss";

const App = () => {
  return (
    <>
      <div className={styles.header}>
        <img className={styles.headerLogo} src={Logo} alt="mainLogo" />
      </div>
      <div className={styles.main}>
        <Filter />
        <div className={styles.section}>
          <Tabs />
          {[...Array(5)].map((__, idx) => (
            <Tickets key={idx} />
          ))}
          <button className={styles.buttonMore}>Показать еще 5 билетов!</button>
        </div>
      </div>
    </>
  );
};

export default App;
