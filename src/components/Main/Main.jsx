import { Fragment, useContext, useEffect, useRef, useState } from "react";
import "./main.css";
import { assets } from "./../../assets/assets";
import { Context } from "../../context/Context";
import runChat from "../../config/gemini";

const cardsList = [
	{
		id: 1,
		text: "Suggest beautiful places to see on an upcoming road trip",
		imgSrc: assets?.compass_icon,
		altText: "beautiful-places",
	},

	{
		id: 2,
		text: "Briefly summarize this concept: urban planning",
		imgSrc: assets?.bulb_icon,
		altText: "urban-planning",
	},

	{
		id: 3,
		text: "Brainstorm team bonding activities for our work retreat",
		imgSrc: assets?.message_icon,
		altText: "bonding-activites",
	},

	{
		id: 4,
		text: "Improve the readability of the following code",
		imgSrc: assets?.code_icon,
		altText: "code-image",
	},
];

const defaultRows = 1;

const Main = () => {
	const { stateObj, setStateObj } = useContext(Context);

	const [rows, setRows] = useState(defaultRows);

	const mainContentRef = useRef(null);

	const handleChange = (event) => {
		setStateObj((prevState) => ({
			...prevState,
			input: event.target.value,
		}));
	};

	const handleInput = (event) => {
		console.log(event.target.value.split("\n"), "nvkbxfb");

		const lines = event.target.value.split("\n");
		let newRows = Math.max(defaultRows, lines.length); // Ensure at least 2 rows
		// Check if the text area is empty
		if (lines?.[0]?.length === 0 && event.shiftKey) {
			console.log("if enabled");
			setRows(defaultRows); // Set to minimum rows when empty
		} else if (newRows <= 8) {
			console.log(lines.length, lines, "ifelse enabled");

			setRows(newRows);
		}
	};

	const onSent = async (prompt) => {
		const response = await runChat(prompt);
		return response;
	};

	const delayPara = (index, nextWord) => {
		setTimeout(() => {
			setStateObj((prevState) => ({
				...prevState,
				resultData: prevState?.resultData + nextWord,
			}));
		}, 75 * index);
	};

	console.log(rows, "rowwwwwwwwsssssssssss");

	const handleQuery = async () => {
		const searchedQuery = stateObj?.input;

		setStateObj((prevState) => ({
			...prevState,
			recentPrompt: prevState?.input,
			resultData: "",
			loading: true,
			showResult: true,
			prevPropmts: [
				...prevState.prevPropmts,
				{
					question: prevState?.input,
				},
			],
		}));

		const response = await onSent(searchedQuery);

		console.log(response, "responseee");

		setStateObj((prevState) => ({
			...prevState,
			resultData: response,
			prevPropmts: [
				...prevState.prevPropmts,

				{
					answer: response,
				},
			],
			input: "",
			loading: false,
		}));
	};

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	handleQuery();
	// };

	const handleKeyDown = (event) => {
		// 	console.log(event.key, event, "evenyt");

		if (event.keyCode === 13 && !event.shiftKey) {
			handleQuery();

			setStateObj((prevState) => ({
				...prevState,
				input: "",
			}));

			setRows(defaultRows);
		}
	};

	console.log(stateObj, "helllllll");


	useEffect(() => {

		// const timeoutId = setTimeout(() => {


			if (mainContentRef.current && stateObj?.prevPropmts) {
				mainContentRef.current.scrollIntoView({ behavior: "smooth", block:'end' });
			}
		// }, 100); // Adjust the delay as needed
	
		// return () => clearTimeout(timeoutId); // Cleanup




	}, [stateObj, mainContentRef])

	return (
		<div className="main-container">
			<div className="nav-container">
				<p>Gemini</p>
				<img src={assets?.user_icon} alt="user-icon" />
			</div>

			<div className="content-container">
				<div className="main-content" >
					{!stateObj?.showResult ? (
						<>
							<div className="user-container">
								<p>
									<span>Hello, Kishore</span>
								</p>
								<p>How can I help you today?</p>
							</div>

							<div className="cards-container">
								{cardsList?.map((each, index) => (
									<div
										className="card"
										key={`container-cards-${index}-${index + 1}`}
									>
										<p>{each?.text}</p>

										<div className="card-icon-container">
											<img src={each?.imgSrc} alt={each?.altText} />
										</div>
									</div>
								))}
							</div>
						</>
					) : (
						<>
							{stateObj?.prevPropmts?.length
								? stateObj?.prevPropmts?.map((each, index) => (
										<>
											<Fragment key={`question-with-answer-container-${index+3}`}  >
											{each?.question ? (
												<div className="result-title" >
													<img src={assets?.user_icon} alt={"user-image"} />
													<p>{each?.question}</p>
												</div>
											) : null}

										

											</Fragment>


											{stateObj?.loading &&
											index === stateObj?.prevPropmts?.length - 1 ? (
												<div className="result-data">
													<img src={assets?.gemini_icon} alt="gemini-image" />
													<div className="loader">
														<hr />
														<hr />
														<hr />
													</div>
												</div>
											) : 

											each?.answer ? (
												<div className="result-data" ref={mainContentRef}>
													<img src={assets?.gemini_icon} alt="gemini-image" />

													<p
														dangerouslySetInnerHTML={{ __html: each?.answer }}
													></p>
												</div>
											) : null
											
											
											}
										</>
								  ))
								: null}

							
						</>
					)}
				</div>

				<div className="searchbar-total-container">
					<div className="search-bar-container">
						<div
							// onSubmit={handleSubmit}
							className="search-bar-content-container"
						>
							<textarea
								className="searchbar"
								value={stateObj?.input}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								onInput={handleInput}
								// cols="20"
								rows={rows}
								placeholder="Enter a Prompt here"
							></textarea>
							<img src={assets?.gallery_icon} alt="gallery-icon" />
							<img src={assets?.mic_icon} alt="speaker-icon" />
							{stateObj?.input?.trim()?.length ? (
								<img
									src={assets?.send_icon}
									alt="sent-msg-icon"
									// onClick={handleSubmit}
									type="submit"
								/>
							) : null}
						</div>

						<p>
							Gemini may display inaccurate info, including about people, so
							double-check its responses. Your privacy and Gemini Apps
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
