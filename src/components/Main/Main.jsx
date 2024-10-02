import React, { useContext } from "react";
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

const Main = () => {
	const { stateObj, setStateObj } = useContext(Context);

	const handleChange = (event) => {
		setStateObj((prevState) => ({
			...prevState,
			input: event.target.value,
		}));
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
      }))


    }, 75*index)
  }

	const handleQuery = async () => {
		setStateObj((prevState) => ({
			...prevState,
			recentPrompt: prevState?.input,
			resultData: "",
			loading: true,
			showResult: true,
		}));

		const response = await onSent(stateObj?.input);

    let responseArray = response.split("**")

    let newResponse;

    for(let i=0; i < responseArray?.length; i++){

      if(i === 0 || i%2 !== 1){
        newResponse += responseArray[i]
        console.log(newResponse, i%2, "kishore")
      }

      else{

        newResponse += "<b>"+responseArray[i]+"</b>"

      }
    }


    let newResponse2 = newResponse.split("*").join("</br>")

    let finalResponseArray = newResponse2.split(" ")

    for(let i=0; i < finalResponseArray?.length; i++){
      const nextWord = finalResponseArray[i]
      delayPara(i, nextWord)
    }



		console.log(response, "responseee");

		setStateObj((prevState) => ({
			...prevState,
			input: "",
			loading: false,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleQuery();
	};

	console.log(stateObj, "helllllll");

	return (
		<div className="main-container">
			<div className="nav-container">
				<p>Gemini</p>
				<img src={assets?.user_icon} alt="user-icon" />
			</div>

			<div className="content-container">
				<div className="main-content">
					<div className="content">
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
							<div className="result">
								<div className="result-title">
									<img src={assets?.user_icon} alt={"user-image"} />
									<p>{stateObj?.recentPrompt}</p>
								</div>

								<div className="result-data">
									<img src={assets?.gemini_icon} alt="gemini-image" />
									{stateObj?.loading ? (
										<div className="loader">
											<hr />
											<hr />
											<hr />
										</div>
									) : (
										<p
											dangerouslySetInnerHTML={{ __html: stateObj?.resultData }}
										></p>
									)}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="searchbar-total-container">
					<div className="search-bar-container">
						<form
							onSubmit={handleSubmit}
							className="search-bar-content-container"
						>
							<input
								className="searchbar"
								type="text"
								value={stateObj?.input}
								onChange={handleChange}
								placeholder="Enter a Prompt here"
							/>
							<img src={assets?.gallery_icon} alt="gallery-icon" />
							<img src={assets?.mic_icon} alt="speaker-icon" />
							{stateObj?.input?.trim()?.length ? (
								<img
									type="submit"
									src={assets?.send_icon}
									alt="sent-msg-icon"
									onClick={handleSubmit}
								/>
							) : null}
						</form>

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
