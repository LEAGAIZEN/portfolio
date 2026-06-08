// updates made

/* ── Particle canvas ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], mouse = {x: -999, y: -999};

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function randBetween(a, b) { return a + Math.random() * (b - a); }

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = randBetween(0, W);
    this.y = init ? randBetween(0, H) : H + 10;
    this.size = randBetween(0.8, 2.2);
    this.speedY = randBetween(0.15, 0.5);
    this.speedX = randBetween(-0.15, 0.15);
    this.opacity = randBetween(0.2, 0.7);
    this.color = Math.random() > 0.5 ? '124,109,250' : '78,204,163';
    this.pulse = randBetween(0, Math.PI * 2);
    this.pulseSpeed = randBetween(0.01, 0.03);
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.pulse += this.pulseSpeed;
    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 120) {
      this.x += dx / dist * 0.8;
      this.y += dy / dist * 0.8;
    }
    if (this.y < -10) this.reset(false);
  }
  draw() {
    const o = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${o})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

/* Connection lines between nearby particles */
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,109,250,${0.08 * (1 - dist/90)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ── Floating code snippets ── */
const codeLines = [
  'const emotion = detect(face);',
  'if (tremor > threshold) suppress();',
  'docker build -t app .',
  'terraform apply --auto-approve',
  'model.fit(X_train, y_train)',
  'git push origin main',
  'accuracy = 0.85',
  'SELECT * FROM users;',
  'npm run dev',
  'kubectl get pods',
  'import tensorflow as tf',
  'const [state, setState] = useState()',
];

codeLines.forEach((line, i) => {
  const el = document.createElement('div');
  el.className = 'bg-code';
  el.textContent = line;
  el.style.cssText = `
    top: ${10 + (i * 8.5) % 90}%;
    left: ${(i % 2 === 0) ? '-5%' : '55%'};
    animation: floatCode${i % 3} ${18 + i * 2}s linear infinite;
    animation-delay: -${i * 3}s;
  `;
  document.body.appendChild(el);
});

/* Code float keyframes injected dynamically */
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes floatCode0 { from { transform: translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { transform: translateX(110vw); opacity: 0; } }
  @keyframes floatCode1 { from { transform: translateX(110vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { transform: translateX(0); opacity: 0; } }
  @keyframes floatCode2 { from { transform: translateX(0) translateY(0); opacity: 0; } 10% { opacity: 1; } 50% { transform: translateX(40px) translateY(-20px); } 90% { opacity: 1; } to { transform: translateX(80px) translateY(-40px); opacity: 0; } }
`;
document.head.appendChild(styleEl);

/* ── Cursor ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  mouse.x = mx; mouse.y = my;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-pill, .proj-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = '#4ecca3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.background = '#7c6dfa';
  });
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Section titles reveal ── */
document.querySelectorAll('.section-title').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  const o2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateX(0)';
      }
    });
  }, { threshold: 0.3 });
  o2.observe(el);
});

/* ── Fullscreen ── */
function openFullscreen() {
  const frame = document.getElementById('resume-frame');
  if (frame.requestFullscreen) frame.requestFullscreen();
  else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
}