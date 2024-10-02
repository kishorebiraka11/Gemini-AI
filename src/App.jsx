import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import ContextProvider from "./context/Context";

const App = () => {
	return (
		<div className="app">
			<ContextProvider>
				<Sidebar />
				<Main />
			</ContextProvider>
		</div>
	);
};

export default App;
