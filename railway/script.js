// Get the form and issues container elements
const form = document.getElementById('repoForm');
const repoInput = document.getElementById('repoInput');
const issuesContainer = document.getElementById('issuesContainer');

// Function to fetch and render issues
function getIssues(repoUrl) {
    // Extract the repository owner and name from the URL
    const urlParts = repoUrl.split('/');
    const owner = urlParts[3];
    const repo = urlParts[4];

    // Fetch the list of issues from the GitHub API
    fetch(`https://api.github.com/repos/${owner}/${repo}/issues`)
        .then(response => response.json())
        .then(issues => {
            // Clear previous issues
            issuesContainer.innerHTML = '';

            // Render the list of issues
            issues.forEach(issue => {
                const issueElement = document.createElement('div');
                issueElement.innerHTML = `
                    <h2>${issue.title}</h2>
                    <p>${issue.body}</p>
                `;
                issuesContainer.appendChild(issueElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Handle form submission
form.addEventListener('submit', event => {
    event.preventDefault();
    const repoUrl = repoInput.value.trim();
    getIssues(repoUrl);
});
