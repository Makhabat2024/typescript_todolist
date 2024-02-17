import React, { useState } from "react";
import scss from "./TodoForm.module.scss"
interface TodoInputProps {
	addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoInputProps> = ({ addTodo }) => {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleAddTodo = () => {
		if (inputValue.trim() !== "") {
			addTodo(inputValue);
			setInputValue("");
		} else {
			alert("Please enter task todos");
		}
	};

	return (
		<div className={scss.todoForm}>
			<input type="text" value={inputValue} onChange={handleInputChange} />
			<button onClick={handleAddTodo}>add</button>
		</div>
	);
};

export default TodoForm;
