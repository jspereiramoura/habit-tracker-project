"use client";

import { useMemo } from "react";
import { useGetHabitLogsQuery } from "../../../redux/services/habits";
import { setDate } from "../../../redux/slices/dashboardSlice";
import { openModal } from "../../../redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/storeHooks";
import parseDate from "../../../utils/parseDate";
import { ModalBodyTypes } from "../../_components/modal/enum";
import Section from "../../_components/section";
import ChangeDateControls from "./_components/changeDateControls";
import HabitLogList from "./_components/habtiList";

export default function HabitPage() {
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector(state => state.dashboard);
  
  const unparsedDate = new Date(selectedDate);
  const parsedDate = parseDate(unparsedDate);

  const { data: habitLogs } = useGetHabitLogsQuery(selectedDate);
  
  const parsedHabits = useMemo(() => {
    return {
      completed: habitLogs?.filter(
        (habit: HabitLog) => habit.status === "completed"
      ),
      uncompleted: habitLogs?.filter(
        (habit: HabitLog) => habit.status === "missed"
      )
    }
  }, [habitLogs]);

  const openAddHabitModal = () => {
    dispatch(
      openModal({
        title: "Adicionar novo hábito",
        modalType: ModalBodyTypes.ADD_HABIT
      })
    );
  };

  return (
    <>
      <Section title="Olá, " subtitle="bem-vindo de volta!"></Section>
      <Section
        title={parsedDate.dayOfWeek}
        subtitle={parsedDate.toString()}
        className="flex-grow relative"
      >
        <ChangeDateControls
          currentDate={unparsedDate}
          className="absolute right-4 top-4"
          addNewHabit={openAddHabitModal}
          onChangeDate={newDate => dispatch(setDate(newDate))}
        />
        <HabitLogList
          logs={parsedHabits?.uncompleted ?? []}
          ariaLabel="Lista de hábitos Incompletos"
        />
      </Section>
      {parsedHabits?.completed?.length ? (
        <Section title="Hábitos Concluídos">
          <HabitLogList
            logs={parsedHabits?.completed ?? []}
            ariaLabel="Lista de hábitos completos"
          />
        </Section>
      ) : null}
    </>
  );
}
