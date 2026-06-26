// отображение данных пользователей
function refreshCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return null;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        return users[userIndex];
    }
    return null;
}

const currentUser = refreshCurrentUser() || JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = 'login.html';
}

function updatePoints(points, totalSpent) {
    const countEl = document.getElementById('points-count');
    const amountEl = document.getElementById('points-amount');

    if (countEl) countEl.textContent = points || 0;
    
    if (amountEl) {
        const formatted = new Intl.NumberFormat('ru-RU').format(totalSpent || 0);
        amountEl.textContent = formatted;
    }
    
}

function updateCardsDisplay(cards) {
    const list = document.getElementById('cards-list');
    const empty = document.getElementById('cards-empty');
    
    if (!list || !empty) return;

    if (cards && cards.length > 0) {
        empty.classList.add('hidden');
        list.innerHTML = cards.map((card, index) => `
            <div class="card-item">
                <p style="margin: 2px 0; font-size: 0.95rem;">
                    ${card.number} ${card.isMain ? '⭐' : ''}
                    ${index > 0 ? '<span style="color:#999;font-size:0.8rem;"> (доп.)</span>' : ''}
                </p>
            </div>
        `).join('');
    } else {
        empty.classList.remove('hidden');
        list.innerHTML = '';
    }
}

function renderBookings(bookings) {
    const list = document.getElementById('bookings-list');
    const empty = document.getElementById('bookings-empty');
    
    if (!list || !empty) return;

    if (bookings && bookings.length > 0) {
        empty.classList.add('hidden');
        list.innerHTML = bookings.map(booking => `
            <div class="booking-item">
                <p><strong>${booking.carMark || '?'} ${booking.carModel || '?'}</strong> | ${booking.number || '—'}</p>
                <p style="font-size:0.85rem;color:#ffbf9d;">
                    ${booking.startDate || '—'} → ${booking.endDate || '—'}
                </p>
                <p style="font-size:0.85rem;font-weight:600;">
                    ${booking.price || 0} руб
                </p>
            </div>
        `).join('');
    } else {
        empty.classList.remove('hidden');
        list.innerHTML = '';
    }
}

function renderHistory(history) {
    const list = document.getElementById('history-list');
    const empty = document.getElementById('history-empty');
    
    if (!list || !empty) return;

    if (history && history.length > 0) {
        empty.classList.add('hidden');
        list.innerHTML = history.map(item => `
            <div class="history-item">
                <p><strong>${item.carMark || '?'} ${item.carModel || '?'}</strong> | ${item.number || '—'}</p>
                <p style="font-size:0.85rem;color:#666;">
                    ${item.startDate || '—'} → ${item.endDate || '—'}
                </p>
                <p style="font-size:0.85rem;font-weight:600;">
                    ${item.price || 0} руб
                </p>
            </div>
        `).join('');
    } else {
        empty.classList.remove('hidden');
        list.innerHTML = '';
    }
}

function updateBookingStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) return;

    const user = users[userIndex];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let hasChanges = false;

    if (user.bookings) {
        user.bookings = user.bookings.filter(booking => {
            const endDate = new Date(booking.endDate);
            endDate.setHours(0, 0, 0, 0);
            
            if (endDate < today) {
                if (!user.history) user.history = [];
                user.history.push({
                    ...booking,
                    status: 'completed',
                    completedAt: new Date().toISOString()
                });
                hasChanges = true;
                return false;
            }
            return true;
        });
    }

    if (hasChanges) {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    }
}

function initAccountPage() {
    const user = refreshCurrentUser() || JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('name').textContent = user.name || 'Не указано';
    document.getElementById('phone').textContent = user.phone || 'Не указан';
    document.getElementById('bd').textContent = user.birthDate || 'Не указана';

    updateBookingStatus();

    const updatedUser = refreshCurrentUser() || JSON.parse(localStorage.getItem('currentUser'));

    const totalSpent = [...(updatedUser.bookings || []), ...(updatedUser.history || [])]
    .reduce((sum, b) => {
        const price = typeof b.price === 'string' ? parseInt(b.price) : b.price;
        return sum + (price || 0);
    }, 0);
    
    updatePoints(updatedUser.points || 0, totalSpent);
    updateCardsDisplay(updatedUser.cards || []);
    renderBookings(updatedUser.bookings || []);
    renderHistory(updatedUser.history || []);
}

document.querySelector('.logout')?.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initAccountPage();

    const modal = document.getElementById('cardModal');
    const attachBtn = document.getElementById('attach-card-btn') || document.querySelector('.account-data-card .stroke');
    const cancelBtn = document.getElementById('cancelCard');
    const saveBtn = document.getElementById('saveCard');

    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'flex';
        });
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const expiry = document.getElementById('card-expiry').value;
            const cvv = document.getElementById('card-cvv').value;

            if (!/^\d{3}$/.test(cvv)) {
                alert('CVV должен содержать ровно 3 цифры');
                document.getElementById('card-cvv').focus();
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                alert('Введите срок действия в формате MM/YY');
                document.getElementById('card-expiry').focus();
                return;
            }

            const [month, year] = expiry.split('/').map(Number);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;

            if (month < 1 || month > 12) {
                alert('Введите корректный месяц (01-12)');
                document.getElementById('card-expiry').focus();
                return;
            }

            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                alert('Срок действия карты истек');
                document.getElementById('card-expiry').focus();
                return;
            }

            const cleanCardNumber = cardNumber.replace(/\D/g, '');
            if (cleanCardNumber.length !== 16) {
                alert('Введите корректный номер карты (16 цифр)');
                document.getElementById('card-number').focus();
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                if (!users[userIndex].cards) users[userIndex].cards = [];
                
                const masked = `**** **** **** ${cleanCardNumber.slice(-4)}`;
                users[userIndex].cards.push({
                    number: masked,
                    expiry: expiry,
                    isMain: users[userIndex].cards.length === 0
                });
                
                localStorage.setItem('users', JSON.stringify(users));
                
                const updatedUser = users[userIndex];
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                
                alert('Карта успешно привязана!');
                if (modal) modal.style.display = 'none';
                
                document.getElementById('card-number').value = '';
                document.getElementById('card-expiry').value = '';
                document.getElementById('card-cvv').value = '';
                
                updateCardsDisplay(updatedUser.cards);
            }
        });
    }
});