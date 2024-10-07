import styles from "./Description.module.scss";

interface Segment {
  origin: string;
  destination: string;
  date: string; // Начало рейса
  duration: number; // Время в пути в минутах
  stops: string[];
}

const Description = ({ segments }: { segments: Segment[] }) => {
  return (
    <div className={styles.descriptionContainer}>
      {segments.map((segment, index) => {
        const departureTime = new Date(segment.date);
        const arrivalTime = new Date(
          departureTime.getTime() + segment.duration * 60000
        ); // Добавляем время в пути

        // Форматируем время в формате hh:mm
        const formattedDeparture = departureTime.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        // Форматируем время в пути
        const hours = Math.floor(segment.duration / 60);
        const minutes = segment.duration % 60;
        const formattedDuration = `${hours}ч ${minutes}м`;

        return (
          <div key={index} className={styles.description}>
            <div className={styles.description_tab}>
              <span
                className={styles.descriptionTitle}
              >{`${segment.origin} – ${segment.destination}`}</span>
              <span
                className={styles.descriptionInfo}
              >{`${formattedDeparture} - ${arrivalTime.toLocaleTimeString(
                "ru-RU",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}`}</span>{" "}
              {/* Время вылета и прибытия */}
            </div>
            <div className={styles.description_tab}>
              <span className={styles.descriptionTitle}>В пути</span>
              <span className={styles.descriptionInfo}>
                {formattedDuration}
              </span>{" "}
              {/* Время в пути */}
            </div>
            <div className={styles.description_tab}>
              <span className={styles.descriptionTitle}>
                {`${segment.stops.length} пересадки`}
              </span>
              <span className={styles.descriptionInfo}>
                {segment.stops.join(", ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Description;
