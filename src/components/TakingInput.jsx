import React from "react";
import "../components/css/Input.css";
export const TakingInput = (props) => {
	const takeInputValues = (e) => {
		let itemName = e.target.name;
		let itemValue = e.target.value;
		props.onChangeHandler(itemName, itemValue);
	};

	return (
		<>
			<input
				className={
					props.darkMode
						? "InputTextAreaDark"
						: "InputTextArea"
				}
				type={props.type}
				placeholder={props.placeholder}
				onChange={takeInputValues}
				value={props.value}
				{...props}
			/>
		</>
	);
};
