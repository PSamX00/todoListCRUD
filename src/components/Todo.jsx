import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "../components/css/Todo.css";
import RemoveIcon from "@mui/icons-material/Remove";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import DoneIcon from "@mui/icons-material/Done";

import { TakingInput } from "./TakingInput";
import { Card } from "./Card";

export const Todo = () => {
	let current = new Date();
	const date = Date.now();
	// console.log(new Date(date));
	const month = current.toLocaleString("default", { month: "long" });
	const year = current.getFullYear();

	const [darkMode, setDarkMode] = useState(true);
	const [todo, setTodo] = useState({
		title: "",
		description: "",
		finishingDate: "",
		priority: "",
	});

	const [setCheck, isSetCheck] = useState(false);

	const [items, setItems] = useState([]);
	const [editIndex, setEditIndex] = useState(undefined);

	const dateCheck = (finishingDate) => {
		let dateArray = finishingDate.split("-");
		let current = new Date();
		let currentDate = current.getDate();
		let currentMonth = current.getMonth();
		console.log(currentMonth + 1, currentDate);

		let days = [
			31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 330, 365,
		];

		let todayDate = days[currentMonth] + currentDate;
		let expectedDate = days[dateArray[1] - 1] + parseInt(dateArray[2]);

		let dateDiff = expectedDate - todayDate;
		if (dateDiff < 0) {
			return true;
		} else {
			return false;
		}
	};

	const handleInput = (name, value) => {
		setTodo({
			...todo,
			[name]: value,
		});
	};
	const handleAdd = () => {
		if (editIndex >= 0) {
			setItems((prevItems) => {
				prevItems[editIndex] = todo;
				return prevItems;
			});

			setEditIndex();
		} else {
			if (
				dateCheck(todo.finishingDate) == false &&
				todo.title.trim().length
			) {
				setItems([...items, todo]);
			}
		}
		setTodo({
			title: "",
			description: "",
			finishingDate: "",
			priority: "default",
		});
	};

	const handleEdit = (id) => {
		if (editIndex >= 0) {
			console.log(editIndex);
		} else {
			setTodo({
				title: items[id].title,
				description: items[id].description,
				finishingDate: items[id].finishingDate,
				priority: items[id].priority,
			});
		}

		setEditIndex(id);
	};

	const handleDelete = (id) => {
		let removedItems = items.filter((_, index) => {
			return index !== id;
		});
		setItems(removedItems);
		setTodo({
			title: "",
			description: "",
			finishingDate: "",
			priority: "",
		});
		isSetCheck(false);
	};

	return (
		<div
			className={
				!darkMode
					? "componentContainer"
					: "componentContainerDark"
			}
		>
			{setCheck ? (
				<p
					className={
						!darkMode
							? "todoHeading"
							: "todoHeadingDark"
					}
				>
					Editing <b>TASK {editIndex}....</b>
				</p>
			) : (
				<p
					className={
						!darkMode
							? "todoHeading"
							: "todoHeadingDark"
					}
				>
					TASKIFY
				</p>
			)}
			<div className={!darkMode ? "addTodo" : "addTodoDark"}>
				<button
					className='darkMode'
					onClick={() => {
						setDarkMode(!darkMode);
					}}
				>
					{darkMode ? (
						<LightModeIcon />
					) : (
						<NightlightIcon />
					)}
				</button>
				<TakingInput
					type={"text"}
					value={todo.title}
					placeholder={"Enter Your TASK name here ...."}
					onChangeHandler={handleInput}
					name={"title"}
				/>
				<TakingInput
					type={"text"}
					value={todo.description}
					placeholder={"Enter TASK Description here ...."}
					onChangeHandler={handleInput}
					name={"description"}
				/>

				<span className='datePriroitySpan'>
					<TakingInput
						className='dateInput'
						type={"date"}
						placeholder={"Enter finishing Date ...."}
						onChangeHandler={handleInput}
						name={"finishingDate"}
						value={todo.finishingDate}
					/>

					<select
						value={todo.priority}
						className='selectPriority'
						onChange={(e) => {
							handleInput(
								"priority",
								e.target.value
							);
						}}
						name={"priority"}
					>
						<option selected value={"default"}>
							Select Priority
						</option>
						<option value={"High"}>High</option>
						<option value={"Medium"}>Medium</option>
						<option value={"Low"}>Low</option>
					</select>
				</span>
				<button className={!darkMode ? "addBtn" : "addBtnDark"}>
					{setCheck ? (
						<DoneIcon
							onClick={() => {
								handleAdd();

								isSetCheck(false);
							}}
						/>
					) : (
						<AddIcon onClick={handleAdd} />
					)}
				</button>
			</div>

			<div
				className={
					darkMode ? "todoBackgroundDark" : "todoBackground"
				}
			>
				{items.map((items, index) => {
					return (
						<Card
							title={items.title}
							description={items.description}
							finishingDate={items.finishingDate}
							statuss={items.statuss}
							priority={items.priority}
							id={index}
							onDeleteHandler={handleDelete}
							onEditHandler={handleEdit}
							editing={editIndex === index}
							setCheck={setCheck}
							isSetCheck={isSetCheck}
							dateCheck={dateCheck}
							darkMode={darkMode}
						/>
					);
				})}
			</div>
		</div>
	);
};
