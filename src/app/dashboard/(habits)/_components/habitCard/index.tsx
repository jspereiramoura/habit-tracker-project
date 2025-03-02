import { memo, useCallback, useRef, useState } from "react";
import {
  useDeleteHabitMutation,
  useUpdateHabitLogMutation
} from "../../../../../redux/services/habits";
import Checkbox from "../../../../_components/checkbox";
import TrashIcon from "../../../../_components/icons/TrashIcon";

type HabitCardProps = {
  id: string;
  name: string;
  tags: string[];
  habitId: string;
  completed: boolean;
  className?: string;
};

const HabitCard = ({
  id,
  name,
  tags,
  habitId,
  completed = false,
  className
}: HabitCardProps) => {
  const [deleteMutation] = useDeleteHabitMutation();
  const [updateMutation] = useUpdateHabitLogMutation();

  const [currentTags] = useState(tags);
  const isCompletedRef = useRef(completed);

  const handleDelete = () => {
    deleteMutation(habitId);
  };

  const handleChangeStatus = useCallback(
    (status: boolean) => {
      isCompletedRef.current = status;
      updateMutation({
        id,
        status: isCompletedRef.current ? "completed" : "missed"
      });
    },
    [id, updateMutation]
  );

  return (
    <label
      htmlFor={id}
      className={`
        ${className ?? ""}
        flex items-center gap-8 p-4 mb-4 rounded-lg bg-gray-50
        cursor-pointer hover:shadow-md select-none focus:outline-primary
     `}
      tabIndex={0}
      aria-checked={isCompletedRef.current}
      onKeyDown={({ key, currentTarget }) => {
        if (key === "Enter" && document.activeElement === currentTarget)
          handleChangeStatus(!isCompletedRef.current);
      }}
    >
      <Checkbox
        id={id}
        tabIndex={-1}
        checked={isCompletedRef.current}
        aria-labelledby={`${name}-label`}
        onChange={({ target }) => handleChangeStatus(target.checked)}
      />
      <div className="flex flex-col gap-1">
        <h2 id={`${name}-label`}>{name}</h2>
        <ul aria-live="polite" className="flex space-x-2">
          {currentTags?.map(tag => (
            <li
              key={`habit__${name}__${tag}`}
              aria-label={`Tag: ${tag}`}
              className="text-xs p-1 rounded-sm bg-red-100 text-primary font-mono"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <section aria-label={`Ações do Hábito ${name}`} className="ml-auto">
        <button
          onClick={handleDelete}
          className="cursor-pointer group"
          aria-label={`Deletar Hábito ${name}`}
        >
          <TrashIcon
            aria-hidden
            className="text-primary size-6 hover:text-primary--hovered hover:stroke-2"
          />
        </button>
      </section>
    </label>
  );
};

export default memo(HabitCard);
