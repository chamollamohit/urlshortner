// --- Get DOM Elements ---
const shortenForm = document.getElementById('shorten-form');
const longUrlInput = document.getElementById('long-url-input');
const submitButton = document.getElementById('submit-button');
const buttonText = document.querySelector('.button-text');
const spinner = document.querySelector('.spinner');
const resultContainer = document.getElementById('result-container');
const shortUrlLink = document.getElementById('short-url-link');
const copyButton = document.getElementById('copy-button');

// --- API Endpoint ---

const API_ENDPOINT = 'http://localhost:3000/api/v1/create';

// --- Event Listeners ---
shortenForm.addEventListener('submit', handleFormSubmit);
copyButton.addEventListener('click', copyToClipboard);

// --- Main Handler Function ---
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    
    const longUrl = longUrlInput.value.trim();
    if (!longUrl) {
        displayError("Please enter a URL.");
        return;
    }
    
    setLoadingState(true);

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: longUrl }),
        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.error || 'An unknown error occurred.');
        }
        

        displaySuccess(data.data.shortUrl);

    } catch (error) {
        displayError(error.message);
    } finally {
        setLoadingState(false);
    }
}

// --- UI Helper Functions ---
function setLoadingState(isLoading) {
    submitButton.disabled = isLoading;
    if (isLoading) {
        buttonText.style.display = 'none';
        spinner.style.display = 'block';
        resultContainer.style.display = 'none'; // Hide previous results
    } else {
        buttonText.style.display = 'block';
        spinner.style.display = 'none';
    }
}

function displaySuccess(shortUrl) {
    resultContainer.classList.remove('error');
    resultContainer.classList.add('success');
    
    shortUrlLink.href = shortUrl;
    shortUrlLink.textContent = shortUrl;
    copyButton.style.display = 'inline-block';

    resultContainer.style.display = 'flex';
}

function displayError(message) {
    resultContainer.classList.remove('success');
    resultContainer.classList.add('error');
    
    shortUrlLink.removeAttribute('href');
    shortUrlLink.textContent = message;
    copyButton.style.display = 'none';

    resultContainer.style.display = 'block';
}

function copyToClipboard() {
    const urlToCopy = shortUrlLink.href;
    navigator.clipboard.writeText(urlToCopy).then(() => {
        // Provide user feedback
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        displayError("Failed to copy URL.");
    });
}