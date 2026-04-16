// rain.js - Efek hujan universal untuk IEPEAS
(function() {
    // Konfigurasi
    const CONFIG = {
        rainCount: 150,          // jumlah butiran
        minHeight: 15,           // px (panjang tetesan)
        maxHeight: 50,
        minWidth: 1,             // px (ketebalan)
        maxWidth: 3,
        minDuration: 0.2,        // detik untuk jatuh dari atas ke bawah
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

    // Fungsi membuat satu butir hujan
    function createRainDrop() {
        const rain = document.createElement('div');
        const height = CONFIG.minHeight + Math.random() * (CONFIG.maxHeight - CONFIG.minHeight);
        const width = CONFIG.minWidth + Math.random() * (CONFIG.maxWidth - CONFIG.minWidth);
        const duration = CONFIG.minDuration + Math.random() * (CONFIG.maxDuration - CONFIG.minDuration);
        // Posisi horizontal acak 0-100%
        const leftPos = Math.random() * 100;
        // Delay acak 0-5 detik agar tidak semua jatuh bersamaan di awal
        const delay = Math.random() * 5;
        
        rain.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${leftPos}%;
            width: ${width}px;
            height: ${height}px;
            background: ${CONFIG.color};
            border-radius: 2px;
            animation: rainFallUniversal ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;
        return rain;
    }

    // Tambahkan style keyframes jika belum ada
    if (!document.querySelector('#rain-keyframes-style')) {
        const style = document.createElement('style');
        style.id = 'rain-keyframes-style';
        style.textContent = `
            @keyframes rainFallUniversal {
                0% {
                    transform: translateY(-30px);
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

    // Buat semua butiran sekaligus (langsung muncul semua, tapi dengan delay acak)
    for (let i = 0; i < CONFIG.rainCount; i++) {
        const rainDrop = createRainDrop();
        container.appendChild(rainDrop);
    }
})();
