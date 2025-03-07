"use client";

import { useState } from "react";
import { useGetHabitLogsQuery } from "../../../redux/services/habits";
import { openModal } from "../../../redux/slices/modalSlice";
import parseDate from "../../../utils/parseDate";
import Section from "../../_components/section";
import ChangeDateControls from "./_components/changeDateControls";
import HabitLogList from "./_components/habtiList";
import { useAppDispatch } from "../../../redux/storeHooks";
import { ModalBodyTypes } from "../../_components/modal/enum";

export default function HabitPage() {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState(new Date());
  const parsedDate = parseDate(date);
  const { data: habitLogs } = useGetHabitLogsQuery(
    `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );

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
          currentDate={date}
          className="absolute right-4 top-4"
          addNewHabit={openAddHabitModal}
          onChangeDate={newDate => setDate(newDate)}
        />
        <HabitLogList
          logs={habitLogs?.uncompleted ?? []}
          ariaLabel="Lista de hábitos Incompletos"
        />
      </Section>
      {habitLogs?.completed?.length ? (
        <Section title="Hábitos Concluídos">
          <HabitLogList
            logs={habitLogs?.completed ?? []}
            ariaLabel="Lista de hábitos completos"
          />
        </Section>
      ) : null}
    </>
  );
}
