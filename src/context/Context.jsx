import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const initialState = {
	input: "",
	recentPrompt: "",
	prevPropmts: [],
	showResult: false,
	loading: false,
	resultData: "",
};

const ContextProvider = (props) => {
	const [stateObj, setStateObj] = useState(initialState);

	const contextValue = {
		stateObj,
		setStateObj,
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;
