const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//disable/enable button
function toggleButton() {
    button.disabled  = !button.disabled;
}

//passing joke to VoiceRSS API
function tellMe(joke) {VoiceRSS.speech({key: '3856fe40b0764e05a092c1c57361c3d8', src: joke, hl: 'en-us', v: 'Linda', r: 0, c: 'mp3', f: '44khz_16bit_stereo', ssml: false});
}

// Get Jokes from JokeAPI
async function getJokes() {
    let joke = '';
    // Joke API Url
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //text to speech function
        tellMe(joke);
        //disable button
        toggleButton();
    } catch (error) {
        console.log(error);
    }
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);