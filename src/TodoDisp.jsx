import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
export const TodoDisp = (props) => {
	return (
		<>
			<div>
				<p>
					<span className='todoDisp'>
						<DeleteIcon className='delete' />
						{props.text}
					</span>
				</p>
			</div>
		</>
	);
};
