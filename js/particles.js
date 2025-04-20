document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("particles-bg");
    if (!canvas) {
      console.error("No se encontró el elemento canvas con ID 'particles-bg'");
      return;
    }
  
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null };
    const particleCount = 180; // Aumentado un 50% (de 120 a 180)
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    function createParticle() {
      const size = Math.random() * 4 + 3; // Tamaño más grande para plumas
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height, // Iniciar arriba, fuera del canvas
        size,
        speedY: Math.random() * 1.5 + 0.5, // Caída más lenta
        sway: Math.random() * 0.15 + 0.1, // Amplitud de oscilación lateral
        phase: Math.random() * Math.PI * 2, // Fase inicial para oscilación
        angle: Math.random() * Math.PI * 2, // Ángulo de rotación para forma de pluma
        color: `rgba(229, 192, 123, ${Math.random() * 0.4 + 0.5})` // Dorado más notorio
      };
    }
  
    function initParticles(count) {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }
  
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach(p => {
        p.y += p.speedY; // Caída vertical
        p.phase += 0.08; // Avanzar fase para oscilación más suave
        p.x += Math.sin(p.phase) * p.sway; // Movimiento lateral oscilante
        p.angle += 0.02; // Rotación lenta para efecto de pluma
  
        if (p.y > canvas.height) {
          p.y = -p.size; // Reiniciar arriba
          p.x = Math.random() * canvas.width; // Nueva posición X
          p.phase = Math.random() * Math.PI * 2; // Nueva fase
          p.angle = Math.random() * Math.PI * 2; // Nueva rotación
        }
  
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const force = (100 - distance) / 100;
            p.x += dx * force * 0.1;
            p.y += dy * force * 0.1;
          }
        }
  
        // Dibujar partícula como óvalo rotado (pluma)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size / 2, p.size, 0, 0, Math.PI * 2); // Óvalo alargado
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      });
  
      requestAnimationFrame(animateParticles);
    }
  
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });
  
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
  
    initParticles(particleCount);
    animateParticles();
  });
  
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }