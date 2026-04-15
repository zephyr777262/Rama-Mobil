// Load comments from localStorage on page load
function loadCommentsPage() {
    loadCommentsFromStorage();
    displayComments();
}

// Load comments from localStorage
function loadCommentsFromStorage() {
    const storedComments = localStorage.getItem('rentalComments');
    if (storedComments) {
        try {
            window.allComments = JSON.parse(storedComments);
        } catch (e) {
            window.allComments = [];
        }
    } else {
        window.allComments = [];
    }
}

// Save comments to localStorage
function saveCommentsToStorage() {
    localStorage.setItem('rentalComments', JSON.stringify(window.allComments));
}

// Display comments
function displayComments() {
    const commentsList = document.getElementById('commentsList');
    
    if (window.allComments.length === 0) {
        commentsList.innerHTML = '<p class="text-gray-500 text-center py-8">No reviews yet. Be the first to share your experience!</p>';
        return;
    }

    commentsList.innerHTML = window.allComments.map((comment, index) => `
        <div class="card bg-white shadow-lg card-modern p-6 border border-gray-200">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="font-bold text-lg" style="color: #021A54;">${comment.name}</h4>
                    <p class="text-sm text-gray-500">${comment.email}</p>
                    <p class="text-sm text-gray-500">${new Date(comment.date).toLocaleDateString()}</p>
                </div>
                <div class="text-yellow-400 text-lg">${'⭐'.repeat(comment.rating)}</div>
            </div>
            <p class="text-gray-700 mb-4">"${comment.text}"</p>
            <button onclick="deleteComment(${index})" class="btn btn-sm btn-ghost text-error">Delete</button>
        </div>
    `).join('');
}

// Add comment form submission
document.addEventListener('DOMContentLoaded', function() {
    loadCommentsPage();

    const form = document.getElementById('addCommentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const newComment = {
                id: Date.now(),
                name: document.getElementById('commentName').value,
                email: document.getElementById('commentEmail').value,
                rating: parseInt(document.querySelector('input[name="rating"]:checked').value),
                text: document.getElementById('commentText').value,
                date: new Date().toISOString()
            };

            window.allComments.unshift(newComment);
            saveCommentsToStorage();
            displayComments();

            // Reset form
            form.reset();

            // Show success message
            alert('Thank you for your review!');
        });
    }
});

// Delete comment
function deleteComment(index) {
    if (confirm('Are you sure you want to delete this review?')) {
        window.allComments.splice(index, 1);
        saveCommentsToStorage();
        displayComments();
    }
}
