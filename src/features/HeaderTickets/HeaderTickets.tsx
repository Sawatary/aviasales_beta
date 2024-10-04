import styles from "./HeaderTickets.module.scss";
import img from "../../../public/S7.svg";

const HeaderTickets = () => {
  return (
    <div className={styles.headerTic}>
      <div className={styles.price}>
        <h2>13 400 $</h2>
      </div>
      <div className={styles.posterImg}>
        <img src={img} alt="poster" />
      </div>
    </div>
  );
};

export default HeaderTickets;
