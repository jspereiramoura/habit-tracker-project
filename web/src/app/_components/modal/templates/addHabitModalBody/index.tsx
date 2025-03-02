"use client";

import { useState } from "react";
import { useAddHabitMutation } from "../../../../../redux/services/habits";
import { closeModal } from "../../../../../redux/slices/modalSlice";
import { useAppDispatch } from "../../../../../redux/storeHooks";
import Button from "../../../button";
import Input from "../../../input";
import Tooltip from "../../../tooltip";

const AddHabitModalBody = () => {
  const dispatch = useAppDispatch();
  const [addHabitMutation] = useAddHabitMutation();

  const [tagInput, setTagInput] = useState("");
  const [habitName, setHabitName] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput !== "") {
      setTagInput("");
      setTags(prevTags => [...new Set([...prevTags, tagInput])]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(prevTags => prevTags.filter(t => t !== tag));
  };

  const handlerAddNewHabit = () => {
    dispatch(closeModal());
    addHabitMutation({ name: habitName, tags: tags });
  };

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <Input
        value={habitName}
        placeholder="Nome do hábito"
        onChange={e => setHabitName(e.target.value)}
      />
      <Input
        placeholder="Tags"
        value={tagInput}
        onKeyDown={handleKeyDown}
        onChange={e => setTagInput(e.target.value)}
      />
      <textarea
        className="border rounded-lg p-2 resize-none"
        rows={2}
        placeholder="Descreva o hábito (opcional)"
      ></textarea>
      {tags.length ? (
        <div className="flex gap-1 flex-wrap">
          {tags.map(tag => (
            <button
              key={tag}
              className="bg-gray-100 rounded-md px-2 select-none cursor-pointer hover:bg-gray-300"
              onClick={() => removeTag(tag)}
            >
              <Tooltip text="Remover tag">{tag}</Tooltip>
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex gap-2">
        <Button
          as="button"
          onClick={() => dispatch(closeModal())}
          buttonType="SECONDARY"
        >
          Cancelar
        </Button>
        <Button as="button" onClick={handlerAddNewHabit}>
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default AddHabitModalBody;
