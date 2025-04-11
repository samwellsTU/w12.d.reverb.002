// Create the AudioContext, which is the main Web Audio environment
const audioContext = new AudioContext();



// Create a GainNode to control the feedback amount
const feedback = audioContext.createGain();
feedback.gain.value = 0.4; // Set feedback level (40% of signal loops back)

// Create a GainNode to control the final output volume
const outputGain = audioContext.createGain();
outputGain.gain.value = 0.5; // Set output volume to 50% -6dBFS



// Connect the delayed signal to the output gain (and then to the speakers)

outputGain.connect(audioContext.destination);




// Variable to hold the microphone input node
let mic;
// Variable to hold the reverb node
let reverb;

//CREATE CONVOLVER NODE HERE!!!!!!!!!!!!!!!!!!!!


// Function to start the microphone and connect it to the delay line
const startMic = async function() {
    // Resume the AudioContext (required by most browsers on user interaction)
    await audioContext.resume();

    // Request access to the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create a MediaStreamAudioSourceNode from the microphone stream
    mic = audioContext.createMediaStreamSource(stream);

    // Connect the microphone to the delay line (which is already connected to output)
    mic.connect(reverb);

    console.log('Audio started');
};

// Function to stop the microphone processing
const stopMic = function() {
    // Disconnect the microphone input from the audio graph
    if (mic) mic.disconnect();
};








// Set up event listeners for the Start and Stop buttons
document.getElementById('start').addEventListener("click", startMic);
document.getElementById('stop').addEventListener("click", stopMic);
