import React, { useEffect, useState } from "react";

const TypingEffect = ({ responseText }) => {
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		const fullText = responseText; // Convert markdown to HTML
		let index = 0;

		const typingEffect = () => {
			if (index < fullText.length) {
				setDisplayedText((prev) => prev + fullText.charAt(index));
				index++;
				setTimeout(typingEffect, 50); // Adjust typing speed here
			}
		};

		typingEffect(); // Start the typing effect

		// Clean up function to reset on component unmount
		return () => {
			setDisplayedText(""); // Reset text when component unmounts
		};
	}, [responseText]);

	return <div dangerouslySetInnerHTML={{ __html: displayedText }} />;
};

export default TypingEffect;
