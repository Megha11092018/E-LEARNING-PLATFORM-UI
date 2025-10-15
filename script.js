// Sample course data
const courses = {
    1: {
        title: "Introduction to Web Development",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
        lessons: ["HTML Basics", "CSS Styling", "JavaScript Fundamentals"]
    },
    2: {
        title: "Advanced JavaScript",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lessons: ["Closures", "Promises", "Async/Await"]
    },
    3: {
        title: "Data Structures and Algorithms",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        lessons: ["Arrays", "Linked Lists", "Sorting Algorithms"]
    }
};

// Load progress from localStorage
function loadProgress() {
    const progress = localStorage.getItem('courseProgress');
    return progress ? JSON.parse(progress) : {};
}

// Save progress to localStorage
function saveProgress(progress) {
    localStorage.setItem('courseProgress', JSON.stringify(progress));
}

// Handle enroll button clicks
document.addEventListener('DOMContentLoaded', function() {
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.parentElement.dataset.courseId;
            window.location.href = `course.html?course=${courseId}`;
        });
    });

    // If on course page
    if (window.location.pathname.includes('course.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('course');
        if (courseId && courses[courseId]) {
            const course = courses[courseId];
            document.getElementById('course-title').textContent = course.title;
            document.getElementById('video-iframe').src = course.videoUrl;

            // Populate lessons
            const lessonList = document.getElementById('lesson-list');
            course.lessons.forEach(lesson => {
                const li = document.createElement('li');
                li.textContent = lesson;
                lessonList.appendChild(li);
            });

            // Load progress
            const progress = loadProgress();
            const courseProgress = progress[courseId] || 0;
            updateProgress(courseProgress);

            // Mark as complete
            document.getElementById('mark-complete').addEventListener('click', function() {
                const newProgress = Math.min(courseProgress + 33, 100); // Simulate progress increase
                progress[courseId] = newProgress;
                saveProgress(progress);
                updateProgress(newProgress);
            });
        }
    }

    // If on progress page
    if (window.location.pathname.includes('progress.html')) {
        const progress = loadProgress();
        const progressList = document.getElementById('progress-list');
        Object.keys(courses).forEach(courseId => {
            const course = courses[courseId];
            const courseProgress = progress[courseId] || 0;
            const div = document.createElement('div');
            div.className = 'progress-item';
            div.innerHTML = `
                <h3>${course.title}</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${courseProgress}%"></div>
                </div>
                <p>${courseProgress}% Complete</p>
            `;
            progressList.appendChild(div);
        });
    }
});

function updateProgress(percentage) {
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = `${percentage}% Complete`;
}
