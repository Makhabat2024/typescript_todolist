import React from "react";

import scss from "./TodoItem.module.scss";
import { TodoType } from "../../types";
interface TodoItemProps {
	todo: TodoType;
	toggleTodo: (id: number) => void;
	deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	todo,
	toggleTodo,
	deleteTodo,
}) => {
	return (
		<li className={scss.todoItem} key={todo._id}>
			<span
				style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
				{todo.text}
			</span>
      
			<div>
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={() => toggleTodo(todo._id)}
				/>
				<button onClick={() => deleteTodo(todo._id)}>delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
