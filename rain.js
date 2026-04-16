// rain.js - Efek hujan universal, tanpa delay, posisi awal acak
(function() {
    const CONFIG = {
        rainCount: 150,          // jumlah butiran
        minHeight: 15,           // panjang tetesan (px)
        maxHeight: 50,
        minWidth: 1,             // ketebalan
        maxWidth: 3,
        minDuration: 0.6,        // waktu jatuh dari atas ke bawah (detik)
        maxDuration: 1.8,
        color: 'rgba(180, 220, 255, 0.45)',
        zIndex: 0
    };

    // Buat container
    const container = document.createElement('div');
    container.className = 'rain-container-universal';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: ${CONFIG.zIndex};
        overflow: hidden;
    `;
    document.body.appendChild(container);

    // Tambahkan keyframes jika belum ada
    if (!document.querySelector('#rain-keyframes-style')) {
        const style = document.createElement('style');
        style.id = 'rain-keyframes-style';
        style.textContent = `
            @keyframes rainFallUniversal {
                0% {
                    transform: translateY(0);
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(100vh);
                    opacity: 0.2;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Buat semua butiran sekaligus
    for (let i = 0; i < CONFIG.rainCount; i++) {
        const rain = document.createElement('div');
        // Ukuran acak
        const height = CONFIG.minHeight + Math.random() * (CONFIG.maxHeight - CONFIG.minHeight);
        const width = CONFIG.minWidth + Math.random() * (CONFIG.maxWidth - CONFIG.minWidth);
        // Durasi jatuh acak
        const duration = CONFIG.minDuration + Math.random() * (CONFIG.maxDuration - CONFIG.minDuration);
        // Posisi horizontal acak (0-100%)
        const leftPos = Math.random() * 100;
        // Posisi vertikal awal acak (0% sampai 100% tinggi layar)
        const startTop = Math.random() * 100; // dalam persen
        // Animasi tanpa delay, langsung berjalan
        rain.style.cssText = `
            position: absolute;
            top: ${startTop}%;
            left: ${leftPos}%;
            width: ${width}px;
            height: ${height}px;
            background: ${CONFIG.color};
            border-radius: 2px;
            animation: rainFallUniversal ${duration}s linear infinite;
        `;
        container.appendChild(rain);
    }
})();
