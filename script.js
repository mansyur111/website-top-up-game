
        // Data dummy untuk game dan harga
        const gameData = {
            'mobile-legends': {
                title: 'Mobile Legends',
                prices: [
                    { amount: '32 Diamonds', price: 'Rp 10.000' },
                    { amount: '58 Diamonds', price: 'Rp 15.000' },
                    { amount: '122 Diamonds', price: 'Rp 30.000' },
                    { amount: '248 Diamonds', price: 'Rp 60.000' },
                    { amount: '408 Diamonds', price: 'Rp 100.000' },
                    { amount: '1700 Diamonds', price: 'Rp 400.000' }
                ]
            },
            'free-fire': {
                title: 'Free Fire',
                prices: [
                    { amount: '100 Diamonds', price: 'Rp 15.000' },
                    { amount: '210 Diamonds', price: 'Rp 30.000' },
                    { amount: '355 Diamonds', price: 'Rp 50.000' },
                    { amount: '720 Diamonds', price: 'Rp 100.000' },
                    { amount: '1450 Diamonds', price: 'Rp 200.000' },
                ]
            },
            'pubg': {
                title: 'PUBG Mobile',
                prices: [
                    { amount: '60 UC', price: 'Rp 12.000' },
                    { amount: '120 UC', price: 'Rp 25.000' },
                    { amount: '300 UC', price: 'Rp 60.000' },
                    { amount: '600 UC', price: 'Rp 120.000' },
                    { amount: '1500 UC', price: 'Rp 300.000' },
                ]
            },
            'roblox': {
                title: 'Roblox',
                prices: [
                    { amount: '80 Robux', price: 'Rp 20.000' },
                    { amount: '400 Robux', price: 'Rp 80.000' },
                    { amount: '800 Robux', price: 'Rp 160.000' },
                    { amount: '1700 Robux', price: 'Rp 320.000' },
                ]
            },
            'garena': {
                title: 'Garena',
                prices: [
                    { amount: '100 Shells', price: 'Rp 10.000' },
                    { amount: '500 Shells', price: 'Rp 50.000' },
                    { amount: '1000 Shells', price: 'Rp 100.000' },
                    { amount: '2000 Shells', price: 'Rp 200.000' },
                ]
            }
        };

        const paymentMethods = [
            { name: 'Gopay', icon: 'download.png' },
            { name: 'OVO', icon: 'download (1).jfif' },
            { name: 'DANA', icon: 'download.jfif' },
        ];

        // Elemen DOM
        const gameCards = document.querySelectorAll('.game-card');
        const gameContentSection = document.getElementById('game-content');
        const gameTitle = document.getElementById('game-title');
        const priceListContainer = document.getElementById('price-list');
        const paymentMethodsContainer = document.getElementById('payment-methods');
        const buyButton = document.getElementById('buy-button');
        const userIdInput = document.getElementById('user-id');
        const modal = document.getElementById('my-modal');
        const modalText = document.getElementById('modal-text');
        const modalCloseBtn = document.getElementById('modal-close');

        let selectedGame = null;
        let selectedPrice = null;
        let selectedPayment = null;

        // Fungsi untuk menampilkan harga
        function displayPrices(prices) {
            priceListContainer.innerHTML = ''; // Kosongkan daftar harga
            prices.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = `price-card p-4 rounded-xl border-2 border-gray-600 bg-gray-700 cursor-pointer transition-all duration-300 hover:border-teal-400`;
                card.innerHTML = `
                    <p class="font-bold text-lg text-white">${item.amount}</p>
                    <p class="text-sm text-gray-300">${item.price}</p>
                `;
                card.addEventListener('click', () => {
                    // Hapus kelas 'selected' dari semua kartu harga
                    document.querySelectorAll('.price-card').forEach(c => c.classList.remove('border-teal-400'));
                    // Tambahkan kelas 'selected' ke kartu yang diklik
                    card.classList.add('border-teal-400');
                    selectedPrice = item;
                });
                priceListContainer.appendChild(card);
            });
        }

        // Fungsi untuk menampilkan metode pembayaran
        function displayPaymentMethods() {
            paymentMethodsContainer.innerHTML = '';
            paymentMethods.forEach((method, index) => {
                const card = document.createElement('div');
                card.className = `payment-card p-4 rounded-xl border-2 border-gray-600 bg-gray-700 cursor-pointer text-center transition-all duration-300 hover:border-teal-400`;
                card.innerHTML = `
                    <img src="${method.icon}" alt="${method.name}" class="w-12 h-12 mx-auto mb-2 rounded-full">
                    <p class="font-semibold text-white">${method.name}</p>
                `;
                card.addEventListener('click', () => {
                    document.querySelectorAll('.payment-card').forEach(c => c.classList.remove('border-teal-400'));
                    card.classList.add('border-teal-400');
                    selectedPayment = method;
                });
                paymentMethodsContainer.appendChild(card);
            });
        }

        // Event listener untuk setiap game card
        gameCards.forEach(card => {
            card.addEventListener('click', () => {
                // Sembunyikan semua kartu game
                gameCards.forEach(c => c.classList.remove('border-teal-400'));
                // Tandai kartu game yang dipilih
                card.classList.add('border-teal-400');
                
                selectedGame = card.dataset.game;
                
                // Tampilkan konten game yang sesuai
                const gameInfo = gameData[selectedGame];
                if (gameInfo) {
                    gameTitle.textContent = gameInfo.title;
                    displayPrices(gameInfo.prices);
                    displayPaymentMethods();
                    gameContentSection.classList.remove('hidden');
                }
            });
        });

        // Event listener untuk tombol "Beli Sekarang"
        buyButton.addEventListener('click', () => {
            const userId = userIdInput.value.trim();

            if (!selectedGame || !selectedPrice || !selectedPayment || userId === '') {
                modalText.textContent = 'Harap lengkapi semua data: Pilih game, jumlah, metode pembayaran, dan masukkan User ID Anda.';
                modal.style.display = 'block';
                return;
            }

            // Tampilkan konfirmasi transaksi
            modalText.innerHTML = `
                <p><strong>Game:</strong> ${gameData[selectedGame].title}</p>
                <p><strong>Jumlah:</strong> ${selectedPrice.amount}</p>
                <p><strong>Harga:</strong> ${selectedPrice.price}</p>
                <p><strong>User ID:</strong> ${userId}</p>
                <p><strong>Metode Pembayaran:</strong> ${selectedPayment.name}</p>
                <br>
                <p>Terima kasih! Pesanan Anda akan segera diproses.</p>
            `;
            modal.style.display = 'block';
        });

        // Event listener untuk menutup modal
        modalCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Tutup modal ketika klik di luar area modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    