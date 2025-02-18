const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const copyBtn = document.getElementById('copy-btn');
const textOutput = document.getElementById('text-output');

let recognition;
let isRecognizing = false;

// Initialize Speech Recognition
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Speech Recognition API is not supported in this browser.');
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isRecognizing = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    recognition.onend = () => {
        isRecognizing = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        textOutput.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecognition();
    };
}

// Start speech recognition
function startRecognition() {
    if (!isRecognizing) {
        recognition.start();
    }
}

// Stop speech recognition
function stopRecognition() {
    if (isRecognizing) {
        recognition.stop();
    }
}

// Reset the text output
function resetText() {
    textOutput.value = '';
}

// Copy text to clipboard
function copyText() {
    textOutput.select();
    document.execCommand('copy');
}

// Event listeners
startBtn.addEventListener('click', startRecognition);
stopBtn.addEventListener('click', stopRecognition);
resetBtn.addEventListener('click', resetText);
copyBtn.addEventListener('click', copyText);

// Initialize the app
initSpeechRecognition();
