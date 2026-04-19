// nebula.js - Background nebula bergerak + bintang super cepat (tanpa matahari/black hole)
(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'nebulaCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    let stars = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
    }

    function initStars() {
        stars = [];
        const starCount = Math.floor(width * height / 2500);
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2.5 + 0.5,
                alpha: Math.random() * 0.6 + 0.2,
                speedY: Math.random() * 2.5 + 5,    // 5 - 7.5
                speedX: (Math.random() - 0.5) * 1.5,
                blink: Math.random() > 0.7,
                blinkSpeed: Math.random() * 0.03 + 0.01
            });
        }
    }

    function drawNebula() {
        // Background dasar gelap
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, width, height);

        // Nebula 1 (biru keunguan) bergerak
        const grad1 = ctx.createRadialGradient(
            width * (0.3 + Math.sin(time * 0.05) * 0.1),
            height * (0.2 + Math.cos(time * 0.04) * 0.1),
            50,
            width * 0.4,
            height * 0.3,
            width * 0.5
        );
        grad1.addColorStop(0, 'rgba(80, 60, 180, 0.2)');
        grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // Nebula 2 (merah keunguan) bergerak
        const grad2 = ctx.createRadialGradient(
            width * (0.7 + Math.cos(time * 0.03) * 0.1),
            height * (0.6 + Math.sin(time * 0.02) * 0.1),
            80,
            width * 0.7,
            height * 0.6,
            width * 0.6
        );
        grad2.addColorStop(0, 'rgba(180, 60, 100, 0.15)');
        grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);

        // Nebula 3 (biru muda) bergerak lambat
        const grad3 = ctx.createLinearGradient(
            width * (0.5 + Math.sin(time * 0.02) * 0.15),
            0,
            width * (0.5 + Math.cos(time * 0.01) * 0.15),
            height
        );
        grad3.addColorStop(0, 'rgba(30, 100, 200, 0.1)');
        grad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad3;
        ctx.fillRect(0, 0, width, height);
    }

    function drawStars() {
        for (let star of stars) {
            let alpha = star.alpha;
            if (star.blink) {
                alpha += Math.sin(time * star.blinkSpeed * 10) * 0.2;
                alpha = Math.min(0.9, Math.max(0.2, alpha));
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 240, 200, ${alpha})`;
            ctx.fill();
            
            star.x += star.speedX;
            star.y += star.speedY;
            if (star.x < -50) star.x = width + 50;
            if (star.x > width + 50) star.x = -50;
            if (star.y < -50) star.y = height + 50;
            if (star.y > height + 50) star.y = -50;
        }
    }

    function animate() {
        if (!ctx) return;
        drawNebula();
        drawStars();
        time += 0.02;
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    resizeCanvas();
    animate();
})();
