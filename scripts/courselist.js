// ---- Data source ----
// Edit this array to add, remove, or update courses — the page re-renders
// from this data alone, so nothing else needs to change.
const courses = [
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
    { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false }
];

const courseList = document.getElementById('course-list');
const totalCreditsEl = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.course-buttons button');

// Build the DOM for a given set of courses
function renderCourses(courseArray) {
    courseList.innerHTML = '';

    courseArray.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card', course.completed ? 'completed' : 'not-completed');

        const title = document.createElement('span');
        title.classList.add('course-title');
        title.textContent = `${course.subject} ${course.number}: ${course.title}`;

        const credits = document.createElement('span');
        credits.classList.add('course-credits');
        credits.textContent = `${course.credits} cr`;

        const status = document.createElement('span');
        status.classList.add('course-status');
        status.textContent = course.completed ? '✓ Completed' : 'In Progress';

        card.append(title, credits, status);
        courseList.appendChild(card);
    });

    updateTotalCredits();
}

// Total credits always reflects completed courses across the FULL course
// list, regardless of which filter is currently shown — this is a running
// certificate total, not a count of what's on screen.
function updateTotalCredits() {
    const total = courses
        .filter(course => course.completed)
        .reduce((sum, course) => sum + course.credits, 0);

    totalCreditsEl.textContent = total;
}

// Highlight whichever filter button is active
function setActiveButton(clickedBtn) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
}

// ---- Filter buttons (array filter method) ----
document.getElementById('all-btn').addEventListener('click', (e) => {
    renderCourses(courses);
    setActiveButton(e.target);
});

document.getElementById('wdd-btn').addEventListener('click', (e) => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
    setActiveButton(e.target);
});

document.getElementById('cse-btn').addEventListener('click', (e) => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
    setActiveButton(e.target);
});

// Initial render on page load
renderCourses(courses);
