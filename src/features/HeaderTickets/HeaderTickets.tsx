import { Ticket } from "../../components/store/ticketsApi";
import styles from "./HeaderTickets.module.scss";

export type TypeExport = {
  price: Ticket["price"];
  carrier: Ticket["carrier"];
};

const getAirlineLogoUrl = (carrier: string) =>
  `https://pics.avs.io/99/36/.png/${carrier}.png`;

const HeaderTickets = ({ price, carrier }: TypeExport) => {
  const IPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

  const logoUrl = getAirlineLogoUrl(carrier);

  return (
    <div className={styles.headerTic}>
      <div className={styles.price}>
        <h2>{IPrice}</h2>
      </div>
      <div className={styles.posterImg}>
        <img className={styles.image} src={logoUrl} alt="companyLogo" />{" "}
        {/* Используем URL логотипа */}
      </div>
    </div>
  );
};

export default HeaderTickets;
