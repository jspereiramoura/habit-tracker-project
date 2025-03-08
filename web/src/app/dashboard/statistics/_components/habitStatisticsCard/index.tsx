export default function HabitStatisticsCard({
  habit,
  statistics
}: {
  habit: Habit;
  statistics: HabitStatistics;
}) {
  const statisticsList = [
    {
      name: "Sequência Atual",
      value: statistics.streakCurrent
    },
    {
      name: "Sequência Máxima",
      value: statistics.streakLongest
    },
    {
      name: "Total de Conclusões",
      value: statistics.completedLogs
    },
    {
      name: "Taxa de Conclusão",
      value: `${statistics.completionRate.toFixed(2)}%`
    }
  ];

  return (
    <div
      className="flex flex-col gap-4 items-center justify-between w-full p-4 mb-4 rounded-lg bg-gray-50"
      key={habit.id}
    >
      <h2 className="font-bold text-xl mb-4 text-primary">{habit.name}</h2>
      <ul className="flex flex-grow w-full justify-center md:justify-between max-w-[700px] flex-wrap gap-4">
        {statisticsList.map(statistic => (
          <li key={statistic.name} className="flex flex-col items-center">
            <p className="text-lg font-bold text-primary">{statistic.value}</p>
            <h3 className="text-xs text-center font-medium text-gray-500 md:text-sm ">
              {statistic.name}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
