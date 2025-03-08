"use client";

import { useGetHabitsQuery } from "../../../redux/services/habits";
import { useGetStatisticsQuery } from "../../../redux/services/statistics";
import Section from "../../_components/section";
import HabitStatisticsCard from "./_components/habitStatisticsCard";

export default function DashboardStatistics() {
  const { data: habits } = useGetHabitsQuery();
  const { data: statistics } = useGetStatisticsQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  return (
    <Section
      title="Estatísticas"
      subtitle="Veja como você está indo"
      className="h-full overflow-y-auto"
    >
      {statistics?.habitStatistics?.map(statistic => {
        const habit = habits?.find(habit => habit.id === statistic.habitId);
        
        return habit ? (
          <HabitStatisticsCard
            key={statistic.id}
            habit={habit}
            statistics={statistic}
          />
        ) : null;
      })}
    </Section>
  );
}
