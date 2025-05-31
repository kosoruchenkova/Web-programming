const nutritionData = {
    1: { name: "Salmon Nigiri", weight: 50, calories: 120, protein: 8.2, fat: 4.5, carbohydrate: 12.3 },
    2: { name: "Tuna Nigiri", weight: 50, calories: 130, protein: 9.0, fat: 5.0, carbohydrate: 11.5 },
    3: { name: "Philadelphia Roll", weight: 230, calories: 145, protein: 6.0, fat: 5.2, carbohydrate: 21.0 },
    4: { name: "California Roll", weight: 220, calories: 140, protein: 5.5, fat: 4.8, carbohydrate: 22.5 },
    5: { name: "Sakura Roll", weight: 250, calories: 175, protein: 7.5, fat: 7.0, carbohydrate: 24.0 },
    6: { name: "Green Dragon Roll", weight: 260, calories: 180, protein: 8.0, fat: 7.5, carbohydrate: 25.5 },
    7: { name: "Salmon Onigiri", weight: 120, calories: 115, protein: 8.0, fat: 3.0, carbohydrate: 15.0 },
    8: { name: "Eel Onigiri", weight: 130, calories: 135, protein: 8.5, fat: 4.5, carbohydrate: 16.5 },
    9: { name: "Chicken Onigiri", weight: 120, calories: 125, protein: 7.5, fat: 3.5, carbohydrate: 17.0 },
    10: { name: "Salmon Sashimi", weight: 150, calories: 125, protein: 15.0, fat: 8.0, carbohydrate: 0.5 },
    11: { name: "Tuna Sashimi", weight: 150, calories: 130, protein: 16.0, fat: 8.5, carbohydrate: 0.5 },
    12: { name: "Berry Mojito", weight: 300, calories: 85, protein: 0.3, fat: 0.1, carbohydrate: 20.0 },
    13: { name: "Sakura Lemonade", weight: 300, calories: 75, protein: 0.1, fat: 0.0, carbohydrate: 18.5 },
    14: { name: "Green Tea", weight: 250, calories: 2, protein: 0.1, fat: 0.0, carbohydrate: 0.5 },
    15: { name: "Sakura Set", weight: 550, calories: 150, protein: 7.0, fat: 5.0, carbohydrate: 22.0 },
    16: { name: "Fujiyama Set", weight: 800, calories: 160, protein: 8.0, fat: 5.5, carbohydrate: 23.5 },
    17: { name: "Strawberry Mochi", weight: 100, calories: 210, protein: 3.0, fat: 5.5, carbohydrate: 38.0 },
    18: { name: "Matcha Cheesecake", weight: 120, calories: 250, protein: 4.0, fat: 15.0, carbohydrate: 25.0 },
    19: { name: "Sauce Set", weight: 100, calories: 120, protein: 2.5, fat: 8.0, carbohydrate: 12.0 },
    20: { name: "Ginger and Wasabi", weight: 50, calories: 20, protein: 0.5, fat: 0.1, carbohydrate: 4.5 },
};

let cart = [];
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartIcon = document.getElementById('cartIcon');
const closeCart = document.getElementById('closeCart');

cartIcon.addEventListener('click', () => {
    cartModal.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);
        
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }
        
        updateCart();
        cartModal.classList.add('open');
        
        e.target.textContent = 'Added';
        setTimeout(() => {
            e.target.textContent = 'Add to Cart';
        }, 2000);
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
       
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;
        
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} RUB × ${item.quantity} = ${itemTotal} RUB</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItemEl);
    });
    
    cartTotal.textContent = total + ' RUB';
    cartCount.textContent = count;
    
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const index = parseInt(btn.dataset.index);
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const index = parseInt(btn.dataset.index);
            cart[index].quantity++;
            updateCart();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const index = parseInt(btn.dataset.index);
            cart.splice(index, 1);
            updateCart();
        });
    });
}

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        button.classList.add('active');
        
        const category = button.dataset.category;
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('click', (e) => {
    if (!cartModal.contains(e.target) && !cartIcon.contains(e.target) && cartModal.classList.contains('open')) {
        cartModal.classList.remove('open');
    }
});

updateCart();

const nutritionModal = document.getElementById('nutritionModal');
const nutritionImage = document.getElementById('nutritionImage');
const nutritionTitle = document.getElementById('nutritionTitle');
const totalWeight = document.getElementById('totalWeight');
const calories100 = document.getElementById('calories100');
const caloriesTotal = document.getElementById('caloriesTotal');
const protein100 = document.getElementById('protein100');
const proteinTotal = document.getElementById('proteinTotal');
const fat100 = document.getElementById('fat100');
const fatTotal = document.getElementById('fatTotal');
const carbohydrate100 = document.getElementById('carbohydrate100');
const carbohydrateTotal = document.getElementById('carbohydrateTotal');
const closeNutrition = document.querySelector('.close-nutrition');

document.querySelectorAll('.nutrition-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const id = icon.dataset.id;
        const data = nutritionData[id];
        
        if (data) {
            nutritionTitle.textContent = data.name;
            totalWeight.textContent = data.weight;
            
            calories100.textContent = `${data.calories} kcal`;
            protein100.textContent = `${data.protein} g`;
            fat100.textContent = `${data.fat} g`;
            carbohydrate100.textContent = `${data.carbohydrate} g`;
            
            const caloriesTotalValue = Math.round((data.calories * data.weight) / 100);
            const proteinTotalValue = Math.round((data.protein * data.weight) / 100 * 10) / 10;
            const fatTotalValue = Math.round((data.fat * data.weight) / 100 * 10) / 10;
            const carbohydrateTotalValue = Math.round((data.carbohydrate * data.weight) / 100 * 10) / 10;
            
            caloriesTotal.textContent = `${caloriesTotalValue} kcal`;
            proteinTotal.textContent = `${proteinTotalValue} g`;
            fatTotal.textContent = `${fatTotalValue} g`;
            carbohydrateTotal.textContent = `${carbohydrateTotalValue} g`;
            
            nutritionModal.classList.add('open');
        }
    });
});

closeNutrition.addEventListener('click', () => {
    nutritionModal.classList.remove('open');
});

window.addEventListener('click', (e) => {
    if (e.target === nutritionModal) {
        nutritionModal.classList.remove('open');
    }
});

document.querySelectorAll('.table-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.table-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        option.classList.add('active');
        
        document.getElementById('tableType').value = option.dataset.type;
    });
});

const today = new Date().toISOString().split('T')[0];
document.getElementById('date').min = today;

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
document.getElementById('date').max = maxDate.toISOString().split('T')[0];

const reservationForm = document.getElementById('reservationForm');
const bookingModal = document.getElementById('bookingModal');
const confirmationText = document.getElementById('confirmationText');
const closeBooking = document.getElementById('closeBooking');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tableType = document.getElementById('tableType').value;
    const comments = document.getElementById('comments').value;
    
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    
    const tableTypes = {
        'standard': 'Standard',
        'window': 'Window View',
        'vip': 'VIP',
        'private': 'Private Room'
    };
    
    confirmationText.innerHTML = `
        <strong>${name}</strong>, thank you for your reservation!<br><br>
        We are expecting you on <strong>${formattedDate}</strong> at <strong>${time}</strong>.<br>
        Your table: <strong>${tableTypes[tableType]}</strong> for <strong>${guests} ${guests == 1 ? 'person' : 'people'}</strong>.<br><br>
        Reservation number: <strong>#${Math.floor(1000 + Math.random() * 9000)}</strong><br>
        Phone: <strong>${phone}</strong>
    `;
    
    bookingModal.classList.add('open');
    
    reservationForm.reset();
    document.getElementById('tableType').value = 'standard';
    document.querySelectorAll('.table-option').forEach(opt => {
        opt.classList.remove('active');
    });
    document.querySelector('.table-option[data-type="standard"]').classList.add('active');
});

closeBooking.addEventListener('click', () => {
    bookingModal.classList.remove('open');
});

window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.classList.remove('open');
    }
});