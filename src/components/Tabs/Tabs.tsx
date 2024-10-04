import { useState } from "react";
import styles from "./Tabs.module.scss";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Самый дешевый", "Самый быстрый", "Оптимальный"];
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${
            activeTab === index ? styles.active : ""
          }`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
