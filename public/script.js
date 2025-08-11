document.addEventListener('DOMContentLoaded', () => {
    // Get all elements you need from dashboard.ejs
    const urlForm = document.getElementById('url-form');
    const urlInput = document.getElementById('url-input');
    const shortenBtn = document.getElementById('shorten-btn');
    const urlDiv = document.getElementById('url-div');
    const logoutBtn = document.getElementById('logout-btn');
    const user = document.getElementById('user');


    urlForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const fullUrl = event.target.urlinput.value.trim()
        const response = await fetch('/api/url', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ fullUrl })
        })
        urlForm.reset()
        fetchUrls()
    })

    logoutBtn.addEventListener("click", async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST'
            })
            if (response.ok) {
                window.location.href = '/login';
            } else {
                alert('Logout failed. Please try again.');
            }
        }
        catch (error) {
            console.error('Error during logout:', error);
            alert('An error occurred during logout.');
        }
    })

    urlDiv.addEventListener("click", async (event) => {
        const button = event.target.closest("button")
        if (button) {
            event.preventDefault();
            const id = button.getAttribute("data-id");
            try {
                const response = await fetch(`/api/url/${id}`, {
                    method: "DELETE"
                })
                fetchUrls()
            } catch (error) {
                console.error('Error deleting URL:', error);

            }
        }
    })

    async function fetchUrls() {
        try {
            const response = await fetch('/api/url')
            if (!response.ok) {
                throw new Error('Failed to fetch URLs')
            }
            const urls = await response.json()
            urlDiv.innerHTML = ''; // Clear existing URLs
            const allUrls = Array.from(urls.data)
            if (allUrls.length === 0) {
                urlDiv.innerHTML = '<p class="text-gray-500">No URLs found. Please create one.</p>';
                return;
            }
            allUrls.forEach(url => {
                const div = document.createElement('div')

                div.innerHTML = `<div
                        class="bg-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div class="flex-grow overflow-hidden">
                            <p class="text-sm text-gray-500 truncate">
                                ${url.fullUrl}
                            </p>
                            <a href="${url.shortUrl}" class="text-lg font-bold text-indigo-600 hover:underline">
                                ${url.shortUrl}
                            </a>
                        </div>

                        <div class="flex items-center gap-2 text-gray-600 font-medium sm:mx-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                            <span class="text-lg font-bold text-gray-800">${url.click}</span>
                            <span class="text-sm">Clicks</span>
                        </div>

                        <button
                        data-id="${url._id}"   
                        class="bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out self-end sm:self-center flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            Delete
                        </button>
                    </div>`
                urlDiv.appendChild(div)
            })
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }

    }
    fetchUrls();
})