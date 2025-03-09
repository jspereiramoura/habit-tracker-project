import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  selectedDate: string;
}

function getDateString(date: Date) {
  return date.toISOString();
}

const initialState: DashboardState = {
  selectedDate: getDateString(new Date()),
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = getDateString(action.payload);
    },
  },
});

export const { setDate } = dashboardSlice.actions;
export default dashboardSlice.reducer;
