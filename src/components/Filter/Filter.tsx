import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from "./Filter.module.scss";
import { toggleFilter } from "./filterSlice";

const Filter = () => {
  const filters = useSelector((state: RootState) => state.filters.filters);
  const dispatch = useDispatch();

  return (
    <div className={styles.filter}>
      <p className={styles.filterText}>Количество пересадок</p>
      {filters.map((filter, index) => (
        <label key={index} className={styles.checkbox}>
          <input
            type="checkbox"
            checked={filter.checked}
            onChange={() =>
              dispatch(toggleFilter({ transferType: filter.transferType }))
            }
          />
          <span className={styles.customCheckbox}></span>
          {filter.label}
        </label>
      ))}
    </div>
  );
};

export default Filter;
