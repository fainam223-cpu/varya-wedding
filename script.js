let currentScreen = 1;
const totalScreens = 5;
let isMusicPlaying = false; // Флаг состояния музыки

// Получаем элементы
const audioElement = document.getElementById('bg-music');
const soundBtn = document.getElementById('soundBtn');
const iconOn = document.querySelector('.icon-sound-on');
const iconOff = document.querySelector('.icon-sound-off');

// Лёгкое мерцание рамки при переходе
function animateTransition() {
    const corners = document.querySelectorAll('.frame-corner');
    corners.forEach(corner => {
        corner.style.transition = 'opacity 0.5s ease';
        corner.style.opacity = '1';
    });
    setTimeout(() => {
        corners.forEach(corner => {
            corner.style.opacity = '0.85';
        });
    }, 600);
}

// Переход на следующий экран
function nextScreen() {
    if (currentScreen < totalScreens) {
        document.getElementById(`screen${currentScreen}`).classList.remove('active');
        currentScreen++;
        document.getElementById(`screen${currentScreen}`).classList.add('active');
        animateTransition();

        setTimeout(() => {
            const fadeElements = document.querySelectorAll(`#screen${currentScreen} .fade-in`);
            fadeElements.forEach((el, index) => {
                setTimeout(() => el.classList.add('visible'), index * 250);
            });
        }, 200);
    }
}

// Функция возврата в начало
function scrollToTop() {
    for (let i = 1; i <= totalScreens; i++) {
        document.getElementById(`screen${i}`).classList.remove('active');
    }

    currentScreen = 1;
    document.getElementById('screen1').classList.add('active');

    setTimeout(() => {
        const fadeElements = document.querySelectorAll('#screen1 .fade-in');
        fadeElements.forEach((el, index) => {
            setTimeout(() => el.classList.add('visible'), index * 300 + 400);
        });
    }, 200);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Функция переключения звука
function toggleSound() {
    if (!isMusicPlaying) {
        // Если музыка остановлена - включаем
        audioElement.play().then(() => {
            isMusicPlaying = true;
            updateSoundIcon(true);
        }).catch(error => {
            console.log("Ошибка воспроизведения:", error);
            alert("Браузер заблокировал автозапуск. Нажмите кнопку еще раз.");
        });
    } else {
        // Если музыка играет - останавливаем
        audioElement.pause();
        isMusicPlaying = false;
        updateSoundIcon(false);
    }
}

// Обновление иконки (перечеркнутый динамик / обычный)
function updateSoundIcon(isPlaying) {
    if (isPlaying) {
        iconOn.classList.remove('hidden');
        iconOff.classList.add('hidden');
    } else {
        iconOn.classList.add('hidden');
        iconOff.classList.remove('hidden');
    }
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
    // Показываем первый слайд
    const fadeElements = document.querySelectorAll('#screen1 .fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => el.classList.add('visible'), index * 300 + 400);
    });

    // Важно: Большинство современных браузеров блокируют автоматический запуск звука
    // без взаимодействия пользователя. Поэтому музыка НЕ начнется сама собой при открытии страницы.
    // Пользователь должен нажать либо на стрелку "Вниз", либо на кнопку звука, чтобы начать слушать.

    // Опционально: Можно попробовать запустить звук тихо при первой попытке клика по любой области,
    // но надежнее всего оставить управление пользователю через кнопку 🔊.
});