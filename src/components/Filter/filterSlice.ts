import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TransferType =
  | "all"
  | "noTransfers"
  | "oneTransfer"
  | "twoTransfers"
  | "threeTransfers";

type FilterState = {
  filters: {
    label: string;
    transferType: TransferType;
    checked: boolean;
  }[];
};

const initialState: FilterState = {
  filters: [
    { label: "Все", transferType: "all", checked: false },
    { label: "Без пересадок", transferType: "noTransfers", checked: false },
    { label: "1 пересадка", transferType: "oneTransfer", checked: false },
    { label: "2 пересадки", transferType: "twoTransfers", checked: false },
    { label: "3 пересадки", transferType: "threeTransfers", checked: false },
  ],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter: (
      state,
      action: PayloadAction<{ transferType: TransferType }>
    ) => {
      const { transferType } = action.payload;
      const filter = state.filters.find((f) => f.transferType === transferType);
      if (filter) {
        filter.checked = !filter.checked;

        if (transferType === "all") {
          state.filters.forEach((f) => (f.checked = filter.checked));
        } else {
          const allSelected = state.filters
            .filter((f) => f.transferType !== "all")
            .every((f) => f.checked);
          state.filters.find((f) => f.transferType === "all")!.checked =
            allSelected;
        }
      }
    },
  },
});

export const { toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
