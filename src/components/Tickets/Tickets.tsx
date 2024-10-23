/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchId, fetchTickets } from "../store/ticketsApi";
import Description from "../../features/DescriptionTickets/Description";
import HeaderTickets from "../../features/HeaderTickets/HeaderTickets";
import styles from "./Tickets.module.scss";
import Loading from "../Loading/Loading";

const Tickets = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredTickets, loading, error } = useSelector(
    (state: RootState) => state.tickets
  );
  const filters = useSelector((state: RootState) => state.filters.filters);

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const searchId = await fetchSearchId();
        dispatch(fetchTickets(searchId));
      } catch (error) {
        console.error("Ошибка загрузки билетов:", error);
      }
    };

    loadTickets();
  }, [dispatch]);

  // Применение фильтров
  const applyFilters = (tickets: any[]) => {
    return tickets.filter((ticket) => {
      // Проверяем, выбраны ли фильтры
      const activeFilters = filters.filter((filter) => filter.checked);
      // Если фильтры не выбраны, возвращаем все билеты
      if (activeFilters.length === 0) return true;
      return activeFilters.some((filter) => {
        // Проверяем количество пересадок
        const stopsCount = ticket.segments.reduce(
          (acc: any, segment: { stops: string | any[] }) =>
            acc + segment.stops.length,
          0
        );
        switch (filter.transferType) {
          case "all":
            return true;
          case "noTransfers":
            return stopsCount === 0;
          case "oneTransfer":
            return stopsCount === 1;
          case "twoTransfers":
            return stopsCount === 2;
          case "threeTransfers":
            return stopsCount === 3;
          default:
            return false;
        }
      });
    });
  };

  const filteredTicketsByStops = applyFilters(filteredTickets);

  const showMoreTickets = () => setVisibleCount((prevCount) => prevCount + 5);

  if (loading)
    return (
      <div className={styles.infoError}>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className={styles.infoError}>
        Ошибка при получении данных: {error}
      </div>
    );

  return (
    <>
      {filteredTicketsByStops.length === 0 ? (
        <div className={styles.infoError}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      ) : (
        filteredTicketsByStops.slice(0, visibleCount).map((ticket, index) => (
          <div key={`${ticket.carrier}-${index}`} className={styles.ticketCard}>
            <HeaderTickets price={ticket.price} carrier={ticket.carrier} />
            <Description segments={ticket.segments} />
          </div>
        ))
      )}

      {visibleCount < filteredTicketsByStops.length && (
        <button className={styles.buttonMore} onClick={showMoreTickets}>
          Показать еще 5 билетов
        </button>
      )}
    </>
  );
};

export default Tickets;
