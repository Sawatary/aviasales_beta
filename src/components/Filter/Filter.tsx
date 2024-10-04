import { useState } from "react";
import styles from "./Filter.module.scss";

type FilterOption = {
  label: string;
  checked: boolean;
};

const Filter = () => {
  const [filters, setFilters] = useState<FilterOption[]>([
    { label: "Все", checked: false },
    { label: "Без пересадок", checked: false },
    { label: "1 пересадка", checked: false },
    { label: "2 пересадки", checked: false },
    { label: "3 пересадки", checked: false },
  ]);

  const handleFilterChange = (index: number) => {
    const updatedFilters = filters.map((filter, i) =>
      i === index ? { ...filter, checked: !filter.checked } : filter
    );
    setFilters(updatedFilters);
  };

  return (
    <div className={styles.filter}>
      <p className={styles.filterText}>Количество пересадок</p>
      {filters.map((filter, index) => (
        <label key={index} className={styles.checkbox}>
          <input
            type="checkbox"
            checked={filter.checked}
            onClick={() => handleFilterChange(index)}
          />
          <span className={styles.customCheckbox}></span>
          {filter.label}
        </label>
      ))}
    </div>
  );
};

export default Filter;
