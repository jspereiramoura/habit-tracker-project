import HabitCard from "../habitCard";

const HabitLogList = ({
  logs,
  ariaLabel
}: {
  logs: HabitLog[];
  ariaLabel: string;
}) => (
  <ul className="flex flex-col" aria-label={ariaLabel}>
    {logs?.map(log => (
      <li key={log.id}>
        <HabitCard
          {...log.habit}
          id={log.id}
          habitId={log.habit.id}
          completed={log.status === "completed"}
        />
      </li>
    ))}
  </ul>
);

export default HabitLogList;
