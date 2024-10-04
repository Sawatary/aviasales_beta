import styles from "./Tickets.module.scss";
import HeaderTickets from "../../features/HeaderTickets/HeaderTickets";
import Description from "../../features/DescriptionTickets/Description";

const Tickets = () => {
  return (
    <div className={styles.tickets}>
      <HeaderTickets />
      <Description />
    </div>
  );
};

export default Tickets;
