import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import "../components/css/Card.css";

import { TakingInput } from "./TakingInput";
import Edit from "@mui/icons-material/Edit";
import { dark } from "@mui/material/styles/createPalette";
export const Card = ({
	title,
	description,
	onEditHandler,
	onDeleteHandler,
	id,
	darkMode,
	priority,
	finishingDate,

	isSetCheck,
}) => {
	console.log(darkMode);
	const [days, setDays] = useState("");

	const handleDays = (finishingDate) => {
		let dateArray = finishingDate.split("-");
		let current = new Date();
		let currentDate = current.getDate();
		let currentMonth = current.getMonth();

		let days = [
			31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 330, 365,
		];

		let todayDate = days[currentMonth] + currentDate;
		let expectedDate = days[dateArray[1] - 1] + parseInt(dateArray[2]);

		let dateDiff = expectedDate - todayDate;

		setDays(dateDiff);
	};

	useEffect(() => {
		handleDays(finishingDate);
	}, [finishingDate]);

	return (
		<div className={!darkMode ? "cardContainer" : "cardContainerDark"}>
			<div className='taskNumber'>
				TASK - {id}
				<div className={priority}>{priority}</div>
			</div>
			<div className='titleContainer'>{title}</div>

			<div className='descriptionContainer'>{description}</div>

			<div className='editingOptions'>
				<span>
					<p className='lastDateCont'>{finishingDate}</p>
				</span>
				<p className='daysRemaining'>{days} days Remaining</p>
				<div className='deleteEdit'>
					<span>
						<DeleteIcon
							className='deleteIcon'
							onClick={() => {
								onDeleteHandler(id);
							}}
						/>{" "}
						<EditIcon
							className='editIcon'
							onClick={() => {
								onEditHandler(id);
								isSetCheck(true);
							}}
						/>
					</span>
				</div>
			</div>
		</div>
	);
};
