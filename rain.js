(function() {
    const CONFIG = {
        rainCount: 150,          // Tetap 150 sesuai request
        minHeight: 15,
        maxHeight: 50,
        minDuration: 0.8,
        maxDuration: 1.5,
        color: 'rgba(180, 220, 255, 0.4)',
        zIndex: 0
    };

    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: ${CONFIG.zIndex}; overflow: hidden;
    `;
    document.body.appendChild(container);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainFall {
            0% { transform: translateY(-100px); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.4; }
            100% { transform: translateY(110vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    for (let i = 0; i < CONFIG.rainCount; i++) {
        const rain = document.createElement('div');
        const duration = CONFIG.minDuration + Math.random() * (CONFIG.maxDuration - CONFIG.minDuration);
        
        // KUNCI BIAR GAK LANGSUNG "DYAR":
        // Pake delay positif (0 sampai 3 detik) biar munculnya gantian
        const delay = Math.random() * 3; 

        rain.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -60px; /* Mulai dari atas layar biar gak kelihatan pas spawn */
            width: ${1 + Math.random() * 2}px;
            height: ${CONFIG.minHeight + Math.random() * (CONFIG.maxHeight - CONFIG.minHeight)}px;
            background: ${CONFIG.color};
            border-radius: 2px;
            opacity: 0; /* Mulai dari transparan */
            animation: rainFall ${duration}s linear infinite;
            animation-delay: ${delay}s; 
        `;
        container.appendChild(rain);
    }
})();
