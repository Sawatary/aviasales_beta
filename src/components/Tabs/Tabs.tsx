import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSort } from "../store/ticketsApi";
import styles from "./Tabs.module.scss";

type SortType = "cheapest" | "fastest" | "optimal";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  const tabs: { label: string; sortType: SortType }[] = [
    { label: "Самый дешевый", sortType: "cheapest" },
    { label: "Самый быстрый", sortType: "fastest" },
    { label: "Оптимальный", sortType: "optimal" },
  ];

  const handleTabClick = (index: number, sortType: SortType) => {
    setActiveTab(index);
    dispatch(setSort(sortType));
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${
            activeTab === index ? styles.active : ""
          }`}
          onClick={() => handleTabClick(index, tab.sortType)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
