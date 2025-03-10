"use client";

import { useEffect, useState } from "react";
import { useAddHabitMutation } from "../../../../../redux/services/habits";
import { closeModal } from "../../../../../redux/slices/modalSlice";
import { useAppDispatch } from "../../../../../redux/storeHooks";
import Button from "../../../button";
import Input from "../../../input";
import Tooltip from "../../../tooltip";

const AddHabitModalBody = () => {
  const dispatch = useAppDispatch();
  const [addHabitMutation, result] = useAddHabitMutation();

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
    if (!habitName) return;
    addHabitMutation({ name: habitName, tags: tags });
  };

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(closeModal());
    }
  });

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <Input
        value={habitName}
        placeholder="Nome do hábito"
        disabled={result.isLoading}
        onChange={e => setHabitName(e.target.value)}
      />
      <Input
        placeholder="Tags"
        value={tagInput}
        onKeyDown={handleKeyDown}
        disabled={result.isLoading}
        onChange={e => setTagInput(e.target.value)}
      />
      <textarea
        rows={2}
        disabled={result.isLoading}
        placeholder="Descreva o hábito (opcional)"
        className="border rounded-lg p-2 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
      ></textarea>
      {tags.length ? (
        <div className="flex gap-1 flex-wrap">
          {tags.map(tag => (
            <button
              key={tag}
              disabled={result.isLoading}
              onClick={() => removeTag(tag)}
              className="bg-gray-100 rounded-md px-2 select-none cursor-pointer hover:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Tooltip text="Remover tag">{tag}</Tooltip>
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex gap-2">
        <Button
          as="button"
          buttonType="SECONDARY"
          disabled={result.isLoading}
          className="disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-500"
          onClick={() => dispatch(closeModal())}
        >
          Cancelar
        </Button>
        <Button
          as="button"
          className="relative w-full min-w-[118px] disabled:bg-primary--hovered"
          disabled={result.isLoading}
          onClick={handlerAddNewHabit}
        >
          {result.isLoading ? <span className="loader" /> : "Adicionar"}
        </Button>
      </div>
    </div>
  );
};

export default AddHabitModalBody;
