import React, { useEffect, useState } from "react";
import axios from "axios";
import { TodoType } from "../../types";
import TodoForm from "../todoForm/TodoForm";
import TodoItem from "../todoItem/TodoItem";
import scss from "./TodoList.module.scss";
const url =
	"https://api.elchocrud.pro/api/v1/2109de2a5e5dfc95669505052fcc842f/mytodolist";

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);

	const getTodos = async () => {
		try {
			const response = await axios.get(url);
			setTodos(response.data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------------------

	const addTodo = async (text: string) => {
		try {
			const newTodoItem: TodoType = {
				text,
				completed: false,
				_id: Math.random() + 1,
			};
			const response = await axios.post<TodoType>(url, newTodoItem);
			setTodos([...todos, response.data]);

			getTodos();
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------------------

	const toggleTodo = async (id: number) => {
		const updatedTodos = todos.map((todo) =>
			todo._id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
		console.log(updatedTodos);

		try {
			await axios.patch(`${url}/${id}`, {
				completed: updatedTodos.find((todo) => todo._id === id)?.completed,
			});
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------------------

	const deleteTodo = async (id: number) => {
		try {
			await axios.delete<TodoType>(`${url}/${id}`);
			setTodos(todos.filter((todo) => todo._id !== id));
			getTodos();
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------------------

	const toggleAll = async () => {
		const allCompleted = todos.every((item) => item.completed);
		const updateTodos = todos.map((todo) => ({
			...todo,
			completed: !allCompleted,
		}));

		setTodos(updateTodos);
		try {
			await axios.patch(`${url}`, {
				completed: !allCompleted,
			});
			console.log(updateTodos);
			console.log(allCompleted);
		} catch (error) {
			console.error(error);
		}
	};

	// ----------------------------------------------------------------

	const deleteAllTodos = async () => {
		try {
			await axios.delete(url);
			setTodos([]);
		} catch (error) {
			console.error(error);
		}
	};
	// ----------------------------------------------------------------

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className={scss.todoContainer}>
			<div className={scss.formbox}>
				<div>
					<TodoForm addTodo={addTodo} />
				</div>

				<div className={scss.buttons}>
					<button onClick={toggleAll}>toggleAll</button>
					<button onClick={deleteAllTodos}>Delete All Todos</button>
				</div>
			</div>


			<ul className={scss.todoList}>
				{todos.map((todo) => (
					<TodoItem
						key={todo._id}
						todo={todo}
						toggleTodo={toggleTodo}
						deleteTodo={deleteTodo}
					/>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
