const button = document.getElementById("btn");
const audioElement = document.getElementById("audio");

//NOTE - Disable/enable button
const toggleBtn = () => {
	// button.disabled = !button.disabled;
	button.toggleAttribute("disabled");
};

//NOTE - passing joke to VoiceRSS API
const tellMe = (joke) => {
	VoiceRSS.speech({
		//dont steal my key KKKKK
		key: "380dbd4b96c44decb915c1cbe5b1ed01",
		src: joke,
		hl: "en-us",
		v: "Linda",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
};

//NOTE - get jokes from api
const getJokes = async () => {
	let joke = "";
	const apiUrl =
		"https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,political,racist";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		data.setup
			? (joke = `${data.setup} ... ${data.delivery}`)
			: (joke = `${data.joke}`);
		tellMe(joke);
		toggleBtn();
	} catch (error) {}
};

//NOTE - Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleBtn);
