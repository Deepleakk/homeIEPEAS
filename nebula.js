// nebula.js - Background nebula + bintang cepat (1-2.5) + matahari flash
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
        const starCount = Math.floor(width * height / 3000);
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2.5 + 0.5,
                alpha: Math.random() * 0.6 + 0.2,
                speedY: Math.random() * 1.5 + 1,    // 1 - 2.5 pixel per frame
                speedX: (Math.random() - 0.5) * 0.5,
                blink: Math.random() > 0.7,
                blinkSpeed: Math.random() * 0.03 + 0.01
            });
        }
    }

    function drawNebula() {
        const grad = ctx.createLinearGradient(
            width * (0.3 + Math.sin(time * 0.1) * 0.05),
            height * (0.2 + Math.cos(time * 0.07) * 0.05),
            width * (0.7 + Math.sin(time * 0.08) * 0.05),
            height * (0.8 + Math.cos(time * 0.06) * 0.05)
        );
        grad.addColorStop(0, '#020617');
        grad.addColorStop(0.3, '#0c1445');
        grad.addColorStop(0.6, '#1e1b4b');
        grad.addColorStop(1, '#020617');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        const grad2 = ctx.createRadialGradient(
            width * 0.5 + Math.sin(time * 0.05) * 50,
            height * 0.4 + Math.cos(time * 0.04) * 30,
            50,
            width * 0.5,
            height * 0.5,
            width * 0.6
        );
        grad2.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad2;
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

    function drawSunFlash() {
        const sunX = width - 80;
        const sunY = 80;
        const baseRadius = 35;
        
        const flashIntensity = (Math.sin(time * 3) + 1) / 2;
        const radius = baseRadius + flashIntensity * 8;
        const glowRadius = 60 + flashIntensity * 20;
        
        const glow = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, glowRadius);
        glow.addColorStop(0, `rgba(255, 200, 100, ${0.3 + flashIntensity * 0.3})`);
        glow.addColorStop(1, 'rgba(255, 100, 50, 0)');
        ctx.beginPath();
        ctx.arc(sunX, sunY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        
        const sunGrad = ctx.createRadialGradient(sunX - 5, sunY - 5, 5, sunX, sunY, radius);
        const intensity = 0.5 + flashIntensity * 0.5;
        sunGrad.addColorStop(0, `rgba(255, 220, 100, ${intensity})`);
        sunGrad.addColorStop(0.6, `rgba(255, 150, 50, ${intensity})`);
        sunGrad.addColorStop(1, `rgba(255, 80, 0, ${intensity})`);
        ctx.beginPath();
        ctx.arc(sunX, sunY, radius, 0, Math.PI * 2);
        ctx.fillStyle = sunGrad;
        ctx.fill();
        
        const rayCount = 12;
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2 + time * 0.5;
            const x1 = sunX + Math.cos(angle) * radius;
            const y1 = sunY + Math.sin(angle) * radius;
            const x2 = sunX + Math.cos(angle) * (radius + 18);
            const y2 = sunY + Math.sin(angle) * (radius + 18);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineWidth = 2 + flashIntensity * 2;
            ctx.strokeStyle = `rgba(255, 200, 100, ${0.4 + flashIntensity * 0.4})`;
            ctx.stroke();
        }
    }

    function animate() {
        if (!ctx) return;
        drawNebula();
        drawStars();
        drawSunFlash();
        time += 0.02;
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    resizeCanvas();
    animate();
})();
