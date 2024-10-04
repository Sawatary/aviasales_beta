import styles from "./Description.module.scss";

const Description = () => {
  const tabData = [
    { title: "MOW – HKT", info: "10:45 – 08:00" },
    { title: "В пути", info: "21ч 15м" },
    { title: "2 пересадки", info: "HKG, JNB" },
  ];

  return (
    <div className={styles.descriptionContainer}>
      {[...Array(2)].map((_, index) => (
        <div key={index} className={styles.description}>
          {tabData.map((tab, idx) => (
            <div key={idx} className={styles.description_tab}>
              <span className={styles.descriptionTitle}>{tab.title}</span>
              <span className={styles.descriptionInfo}>{tab.info}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Description;
