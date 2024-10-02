import React, { useState } from "react";
import "../Sidebar/Sidebar.css";
import { assets } from "./../../assets/assets";

const settingsList = [
	{
		id: 1,
		img: assets?.question_icon,
		text: "Help",
	},

	{
		id: 2,
		img: assets?.history_icon,
		text: "Activity",
	},

	{
		id: 3,
		img: assets?.setting_icon,
		text: "Settings",
	},
];

const Sidebar = () => {
	const [openSideBar, setOpenSideBar] = useState(false);

	const handleSideBar = () => {
		setOpenSideBar((prevState) => !prevState);
	};

	return (
		<div  className={`sidebar ${openSideBar ? 'open' : 'close'}`}>
			<div className="top">
				<img
					className="menu"
					src={assets?.menu_icon}
					alt="menu-icon"
					onClick={handleSideBar}
				/>
				<div className="new-chat">
					<img src={assets?.plus_icon} alt="new-chat" />
					{openSideBar ? <p style={{ marginTop: "2.3px",  }}>New Chat</p> : null}
				</div>
				{openSideBar ? (
					<div className="recent">
						<p className="recent-title">Recent</p>
						<div className="recent-entry">
							<img src={assets?.message_icon} alt={"message-icon"} />
							<p>What is react....</p>
						</div>
					</div>
				) : null}
			</div>
			<div className="bottom">
				{settingsList?.map((each, index) => (
					<div
						key={`sidebar-bottom-list-${index}+${index + 1}`}
						className="bottom-item recent-entry"
					>
						<img src={each?.img} alt={each?.text} />
						{openSideBar ? <p>{each?.text}</p> : null}
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
