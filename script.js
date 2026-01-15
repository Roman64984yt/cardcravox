// --- НАСТРОЙКА ЗВУКА ---
const hoverAudio = document.getElementById('hoverSound');
const clickAudio = document.getElementById('clickSound');

// Громкость
hoverAudio.volume = 0.4;
clickAudio.volume = 0.6;

// Функция проигрывания
function playSound(audioElement) {
    audioElement.currentTime = 0;
    // Ловим ошибку, если юзер еще не взаимодействовал с сайтом
    audioElement.play().catch(e => console.log("Жду клика для активации звука"));
}

// Вешаем звуки на кнопки
document.querySelectorAll('.sound-trigger').forEach(btn => {
    btn.addEventListener('mouseenter', () => playSound(hoverAudio));
    btn.addEventListener('mousedown', () => playSound(clickAudio));
});

// --- ШЛЕЙФ ЗА КУРСОРОМ ---
const trailEmojis = ['✨', '⭐', '🌀', '👾', '⚡'];
let isDrawing = false;

document.addEventListener('mousemove', (e) => {
    if (isDrawing) return; 
    isDrawing = true;
    setTimeout(() => isDrawing = false, 40); 

    const trail = document.createElement('span');
    trail.classList.add('cursor-trail');
    trail.innerText = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
    document.body.appendChild(trail);

    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';

    setTimeout(() => trail.remove(), 800);
});

// --- ВЗРЫВ ПРИ КЛИКЕ ---
const explosionEmojis = ['💥', '💣', '🤯', '🧨', '💨', '🔥', '💯', '🤬'];

document.addEventListener('click', (e) => {
    playSound(clickAudio);

    document.body.classList.add('shake-screen');
    setTimeout(() => document.body.classList.remove('shake-screen'), 300);

    createExplosion(e.clientX, e.clientY);
});

function createExplosion(x, y) {
    const particleCount = 30; 
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.classList.add('explosion-particle');
        particle.innerText = explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)];
        document.body.appendChild(particle);

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const velocityX = (Math.random() - 0.5) * window.innerWidth * 0.8 + 'px';
        const velocityY = (Math.random() - 0.5) * window.innerHeight * 0.8 + 'px';
        const rotation = Math.random() * 720 + 'deg';

        particle.style.setProperty('--vx', velocityX);
        particle.style.setProperty('--vy', velocityY);
        particle.style.setProperty('--vr', rotation);

        setTimeout(() => particle.remove(), 800);
    }
}