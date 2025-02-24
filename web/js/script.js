const data = {
    "Monday": {
        "lessons": [
            {"number": 1, "start_time": "08:00", "end_time": "08:40", "title": "Разговоры о важном", "replacement": false},
            {"number": 2, "start_time": "08:50", "end_time": "09:30", "title": "Алгебра", "replacement": false},
            {"number": 3, "start_time": "09:50", "end_time": "10:30", "title": "Русский язык", "replacement": false},
            {"number": 4, "start_time": "10:50", "end_time": "11:30", "title": "География", "replacement": false},
            {"number": 5, "start_time": "11:40", "end_time": "12:20", "title": "Геометрия", "replacement": false},
            {"number": 6, "start_time": "12:40", "end_time": "13:20", "title": "Физическая культура", "replacement": false},
            {"number": 7, "start_time": "13:30", "end_time": "14:10", "title": "Литература", "replacement": false}
        ]
    },
    "Tuesday": {
        "lessons": [
            {"number": 1, "start_time": "08:00", "end_time": "08:40", "title": "Алгебра", "replacement": false},
            {"number": 2, "start_time": "08:50", "end_time": "09:30", "title": "Английский язык", "replacement": false},
            {"number": 3, "start_time": "09:50", "end_time": "10:30", "title": "История", "replacement": false},
            {"number": 4, "start_time": "10:50", "end_time": "11:30", "title": "Химия", "replacement": false},
            {"number": 5, "start_time": "11:40", "end_time": "12:20", "title": "Биология", "replacement": false},
            {"number": 6, "start_time": "12:40", "end_time": "13:20", "title": "География", "replacement": false},
            {"number": 7, "start_time": "13:30", "end_time": "14:10", "title": "Вероятность и статистика", "replacement": false}
        ]
    },
    "Wednesday": {
        "lessons": [
            {"number": 1, "start_time": "08:00", "end_time": "08:40", "title": "Алгебра", "replacement": false},
            {"number": 2, "start_time": "08:50", "end_time": "09:30", "title": "Информатика", "replacement": false},
            {"number": 3, "start_time": "09:50", "end_time": "10:30", "title": "Химия", "replacement": false},
            {"number": 4, "start_time": "10:50", "end_time": "11:30", "title": "Английский язык", "replacement": false},
            {"number": 5, "start_time": "11:40", "end_time": "12:20", "title": "Музыка", "replacement": false},
            {"number": 6, "start_time": "12:40", "end_time": "13:20", "title": "Технология", "replacement": false},
            {"number": 7, "start_time": "13:30", "end_time": "14:10", "title": "Технология", "replacement": false}
        ]
    },
    "Thursday": {
        "lessons": [
            {"number": 1, "start_time": "08:00", "end_time": "08:40", "title": "Профессии", "replacement": false},
            {"number": 2, "start_time": "08:50", "end_time": "09:30", "title": "Обществознание", "replacement": false},
            {"number": 3, "start_time": "09:50", "end_time": "10:30", "title": "Английский язык", "replacement": false},
            {"number": 4, "start_time": "10:50", "end_time": "11:30", "title": "Русский язык", "replacement": false},
            {"number": 5, "start_time": "11:40", "end_time": "12:20", "title": "История", "replacement": false},
            {"number": 6, "start_time": "12:40", "end_time": "13:20", "title": "Русский язык", "replacement": false},
            {"number": 7, "start_time": "13:30", "end_time": "14:10", "title": "Геометрия", "replacement": false},
            {"number": 8, "start_time": "13:30", "end_time": "14:10", "title": "Физика", "replacement": false}
        ]
    },
    "Friday": {
        "lessons": [
            {"number": 1, "start_time": "08:00", "end_time": "08:40", "title": "Литература", "replacement": false},
            {"number": 2, "start_time": "08:50", "end_time": "09:30", "title": "ОБЖ", "replacement": false},
            {"number": 3, "start_time": "09:50", "end_time": "10:30", "title": "Биология", "replacement": false},
            {"number": 4, "start_time": "10:50", "end_time": "11:30", "title": "Физика", "replacement": false},
            {"number": 5, "start_time": "11:40", "end_time": "12:20", "title": "Физическая культура", "replacement": false},
            {"number": 6, "start_time": "12:40", "end_time": "13:20", "title": "Физическая культура", "replacement": false}
        ]
    },
    "Saturday": {
        "day_off": [
            {"title": "Выходной"}
        ]
    },
    "Sunday": {
        "day_off": [
            { "title": "Выходной"}
        ]
    }
};

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const daysOfWeekRu = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const monthsRu = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

// let currentDayIndex = 0;

const navItems = document.querySelectorAll('.nav-item');
const underline = document.querySelector('.underline');
const dayContent = document.querySelector('.day-content');
const weekContent = document.querySelector('.week-content');
const selectedDay = document.getElementById('selected-day');
const selectedDate = document.getElementById('selected-date');
const scheduleTable = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
const prevDayButton = document.getElementById('prev-day');
const nextDayButton = document.getElementById('next-day');

function updateUnderlinePosition() {
    const activeNavItem = document.querySelector('.nav-item.active');
    underline.style.width = `${activeNavItem.offsetWidth}px`;
    underline.style.left = `${activeNavItem.offsetLeft}px`;
}


function updateSchedule() {
    const dayData = data[selectedDay.className];
    scheduleTable.innerHTML = '';

    if (dayData.day_off) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.setAttribute('colspan', '4');
        cell.textContent = dayData.day_off[0].title;
        row.appendChild(cell);
        scheduleTable.appendChild(row);
    } else {
        dayData.lessons.forEach(lesson => {
            const row = document.createElement('tr');
            const replacement = lesson.replacement ? "Да" : "Нет"; // Проверка на замену

            row.innerHTML = `
                <td><span>${lesson.number}</span></td>
                <td>${lesson.start_time} - ${lesson.end_time}</td>
                <td>${lesson.title}</td>
                <td>${replacement}</td>
            `;
            scheduleTable.appendChild(row);
        });
    }
}


function updateDate(index) {
    if (index === 0) {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, "0");
        const month = monthsRu[date.getMonth()];
        const year = date.getFullYear();
        selectedDay.classList.add(daysOfWeek[date.getDay()]);
        selectedDay.textContent = daysOfWeekRu[date.getDay()];
        selectedDate.classList.add(date.getTime());
        selectedDate.textContent = `${day} ${month}, ${year}`;

    } else if (index === 1) {
        const milliseconds = selectedDate.className;
        const date = new Date(+milliseconds);
        const nextDay = new Date(date.setDate(date.getDate() + 1));
        selectedDate.classList.add(nextDay.getTime());

        const day = nextDay.getDate().toString().padStart(2, "0");
        const month = monthsRu[nextDay.getMonth()];
        const year = nextDay.getFullYear();
        selectedDay.className = "";
        selectedDay.classList.add(daysOfWeek[nextDay.getDay()]);
        selectedDay.textContent = daysOfWeekRu[nextDay.getDay()];
        selectedDate.className = "";
        selectedDate.classList.add(nextDay.getTime());
        selectedDate.textContent = `${day} ${month}, ${year}`;

    } else if (index === -1) {
        const milliseconds = selectedDate.className;
        const date = new Date(+milliseconds);
        const nextDay = new Date(date.setDate(date.getDate() - 1));
        selectedDate.classList.add(nextDay.getTime());

        const day = nextDay.getDate().toString().padStart(2, "0");
        const month = monthsRu[nextDay.getMonth()];
        const year = nextDay.getFullYear();
        selectedDay.className = "";
        selectedDay.classList.add(daysOfWeek[nextDay.getDay()]);
        selectedDay.textContent = daysOfWeekRu[nextDay.getDay()];
        selectedDate.className = "";
        selectedDate.classList.add(nextDay.getTime());
        selectedDate.textContent = `${day} ${month}, ${year}`;
    }
    
}


navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
        updateUnderlinePosition();

        if (item.dataset.tab === 'day') {
            dayContent.style.display = 'block';
            weekContent.style.display = 'none';
        } else {
            dayContent.style.display = 'none';
            weekContent.style.display = 'block';
        }
    });
});

prevDayButton.addEventListener('click', () => {
    
    updateDate(-1);
    updateSchedule();
});

nextDayButton.addEventListener('click', () => {
    
    updateDate(1);
    updateSchedule();
});

// Инициализация
navItems[0].classList.add('active');
updateUnderlinePosition();
updateDate(0);
updateSchedule();