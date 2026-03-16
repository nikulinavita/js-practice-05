// Задание 1: Секундомер

const swDisplay = document.getElementById('stopwatch-display');
const swStartBtn = document.getElementById('sw-start');
const swStopBtn = document.getElementById('sw-stop');
const swResetBtn = document.getElementById('sw-reset');

let seconds = 0; 
let intervalId = null; 

function updateDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    
    swDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startStopwatch() {
    if (intervalId !== null) return;
    
    // Использую setInterval, потому что мне нужно бесконечно повторять код каждую секунду, пока пользователь не нажмет "Стоп".
    intervalId = setInterval(() => {
        seconds++; 
        updateDisplay();
    }, 1000);
}

function stopStopwatch() {
    // Использую clearInterval, потому что мне нужно остановить таймер и прекратить отсчет времени.
    clearInterval(intervalId);
    intervalId = null;
}

function resetStopwatch() {
    // Использую clearInterval, потому что перед полным сбросом нужно убедиться, что таймер остановлен, иначе он продолжит тикать с нуля.
    clearInterval(intervalId);
    intervalId = null;
    seconds = 0;
    updateDisplay();
}

swStartBtn.addEventListener('click', startStopwatch);
swStopBtn.addEventListener('click', stopStopwatch);
swResetBtn.addEventListener('click', resetStopwatch);

// Задание 2: Обратный отсчёт
const cdInput = document.getElementById('countdown-seconds');
const cdStartBtn = document.getElementById('cd-start');
const cdStopBtn = document.getElementById('cd-stop');
const cdResetBtn = document.getElementById('cd-reset');
const cdDisplay = document.getElementById('countdown-display');

let timeLeft = 0;
let countdownId = null;

cdStartBtn.addEventListener("click", () => {
    const inputValue = parseInt(cdInput.value, 10);
    
    // Валидация
    if (isNaN(inputValue) || inputValue <= 0 || inputValue > 3600) {
        cdDisplay.textContent = "Введите корректное число секунд!";
        return;
    }

    if (countdownId !== null) {
        //Использую clearInterval, потому что мне нужно остановить предыдущий таймер, если пользователь ввел новое значение и запустил новый отсчет, чтобы избежать конфликтов между несколькими таймерами.
        clearInterval(countdownId);
    }
    
   timeLeft = inputValue;
// Использую setInterval, потому что мне нужно повторять код каждую секунду, уменьшая время, пока оно не достигнет нуля.
   countdownId = setInterval(() => {
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;
cdDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

timeLeft--;

if (timeLeft < 0) {
    // Использую clearInterval, потому что мне нужно остановить таймер, когда время истекло, чтобы предотвратить дальнейшее выполнение кода и обновление дисплея после достижения нуля.
clearInterval(countdownId);
countdownId = null;
cdDisplay.textContent = "Время вышло!";
}
}, 1000);
});

cdStopBtn.addEventListener("click", () => {
    if (countdownId !== null) {
    // Использую clearInterval, потому что мне нужно остановить таймер, если пользователь решил прекратить обратный отсчет до его завершения.
        clearInterval(countdownId);
        countdownId = null;
    }
});

cdResetBtn.addEventListener("click", () => {
    if (countdownId !== null) {
        // Использую clearInterval, потому что перед полным сбросом нужно остановить работающий таймер.
        clearInterval(countdownId);
        countdownId = null;
    }
    cdDisplay.textContent = "—";
    cdInput.value = "10";
});

// Задание 3: Уведомления
const showBtn = document.getElementById("notification-show");
const notification = document.getElementById("notification");
const closeBtn = document.getElementById("notification-close");

let showTimerId = null; 
let hideTimerId = null;

showBtn.addEventListener("click", () => {
    if (showTimerId !== null) {
        //Использую clearTimeout, потому что мне нужно отменить запланированное показ уведомления, если пользователь нажимает кнопку несколько раз подряд, чтобы избежать конфликтов между несколькими таймерами.
        clearTimeout(showTimerId);
    }
   //Использую setTimeout, потому что мне нужно отложить показ уведомления на 3 секунды после нажатия кнопки.
    showTimerId = setTimeout(() => {
        notification.style.display = "block";
        showTimerId = null;
        //Использую setTimeout, потому что мне нужно автоматически скрыть уведомление через 5 секунд после его появления, чтобы обеспечить удобство для пользователя и не перегружать интерфейс.
        hideTimerId = setTimeout(() => {
            notification.style.display = "none";
        }, 5000); 
    }, 3000); 
});
closeBtn.addEventListener("click", () => {
    //Использую clearTimeout, потому что мне нужно отменить запланированное скрытие уведомления, если пользователь решил закрыть его вручную.
    if (hideTimerId !== null) {
        clearTimeout(hideTimerId);
        hideTimerId = null;
    }
    notification.style.display = "none";
});

//Задание 4: Информация о браузере (BOM)

const infoBtn = document.getElementById("browser-info-btn");
const infoBlock = document.getElementById("browser-info");

function displayBrowserInfo() {
    // Использую BOM (объекты navigator, location, screen, window), потому что мне нужно получить информацию о браузере, устройстве и текущем URL, а эти данные доступны именно через эти объекты. 
    // Они предоставляют доступ к данным о пользователе, его устройстве и текущем состоянии сети, что позволяет собрать полную картину о том, как пользователь взаимодействует с сайтом.

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const deviceType = isMobile ? "📱 Мобильное устройство" : "💻 Десктоп";
    const onlineStatus = navigator.onLine ? "🟢 Онлайн" : "🔴 Офлайн";

    const info = `
        <ul>
            <li><strong>URL:</strong> ${location.href}</li>
            <li><strong>Протокол:</strong> ${location.protocol}</li>
            <li><strong>Домен:</strong> ${location.hostname}</li>
            <li><strong>Путь:</strong> ${location.pathname}</li>
            <li><strong>Язык:</strong> ${navigator.language}</li>
            <li><strong>User Agent:</strong> ${navigator.userAgent.substring(0, 100)}...</li>
            <li><strong>Статус:</strong> ${onlineStatus}</li>
            <li><strong>Разрешение экрана:</strong> ${screen.width} x ${screen.height}</li>
            <li><strong>Размер окна:</strong> ${window.innerWidth} x ${window.innerHeight}</li>
            <li><strong>Устройство:</strong> ${deviceType}</li>
        </ul>
    `;

    infoBlock.innerHTML = info;
}

infoBtn.addEventListener("click", displayBrowserInfo);

window.addEventListener("resize", () => {

    if (infoBlock.innerHTML !== "—") {
        displayBrowserInfo();
    }
});

//Задание 5: Диалоговые окна

const dialogResult = document.getElementById('dialog-result');

document.getElementById('btn-alert').addEventListener('click', () => {
    alert('Это окно alert(). Оно просто выводит сообщение.');
    dialogResult.textContent = 'Результат: Пользователь закрыл alert';
});

document.getElementById('btn-confirm').addEventListener('click', () => {
    const userAgreed = confirm('Вы согласны, что JavaScript - это интересно?');
    dialogResult.textContent = `Результат: ${userAgreed ? 'Пользователь согласился (ОК)' : 'Пользователь отказался (Отмена)'}`;
});


document.getElementById('btn-prompt').addEventListener('click', () => {
    const userName = prompt('Как тебя зовут?', 'Студент');
    if (userName !== null && userName.trim() !== "") {
        dialogResult.textContent = `Результат: Привет, ${userName}!`;
    } else {
        dialogResult.textContent = 'Результат: Пользователь не ввел имя или нажал Отмена';
    }
});
