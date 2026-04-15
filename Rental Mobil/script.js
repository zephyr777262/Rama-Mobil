// Sample car data
const defaultCars = [
    {
        id: 1,
        name: 'Toyota Corolla',
        type: 'economy',
        capacity: 5,
        price: 200000,
        image: './Toyota Corolla.jpg',
        features: ['Air Conditioning', 'Automatic Transmission', 'Power Steering']
    },
    {
        id: 2,
        name: 'Honda Civic',
        type: 'compact',
        capacity: 5,
        price: 200000,
        image: './Toyoya Civic.jpg',
        features: ['Air Conditioning', 'Cruise Control', 'Bluetooth']
    },
    {
        id: 3,
        name: 'Toyota Kijang Innova',
        type: 'mpv',
        capacity: 8,
        price: 200000,
        image: './Kijang Innova.jpg',
        features: ['7-Seater Configuration', 'Spacious Cargo Area', 'Power Windows', 'Climate Control']
    },
    {
        id: 4,
        name: 'Daihatsu Ayla',
        type: 'hatchback',
        capacity: 5,
        price: 200000,
        image: './Daihatsu Ayla.jpg',
        features: ['Fuel Efficient', 'Easy Parking', 'Air Conditioning', 'Power Steering']
    },
    {
        id: 5,
        name: 'Toyota Fortuner',
        type: 'suv',
        capacity: 7,
        price: 200000,
        image: './Toyota Fortuner.jpg',
        features: ['4WD Option', 'Third Row Seating', 'Leather Seats', 'Navigation System']
    },
    {
        id: 6,
        name: 'Toyota Yaris',
        type: 'hatchback',
        capacity: 5,
        price: 200000,
        image: './Toyota Yaris.jpg',
        features: ['Compact Design', 'Fuel Efficient', 'Automatic Transmission', 'Air Conditioning']
    }
];

// Load cars from localStorage or use default
let cars = [];
function loadCarsData() {
    const stored = localStorage.getItem('rentalCars');
    cars = stored ? JSON.parse(stored) : defaultCars;
}


// Load reviews from localStorage or use default
let reviews = [];
function loadReviewsData() {
    const stored = localStorage.getItem('rentalComments');
    if (stored) {
        const comments = JSON.parse(stored);
        reviews = comments.map(c => ({
            author: c.name,
            rating: c.rating,
            text: c.text
        }));
    } else {
        reviews = defaultReviews;
    }
}

// Initialize page
function initializePage() {
    loadCarsData();
    loadReviewsData();
    renderCars();
    renderReviews();
}

// Render cars
function renderCars() {
    const carsGrid = document.getElementById('cars-grid');
    carsGrid.innerHTML = cars.map(car => `
        <div class="card bg-white shadow-lg hover:shadow-2xl transition-shadow card-modern">
            <img src="${car.image}" alt="${car.name}" class="w-full h-64 object-cover">
            <div class="card-body">
                <h2 class="card-title text-2xl" style="color: #021A54;">${car.name}</h2>
                <div class="space-y-2 text-sm">
                    <p><span class="font-semibold">💺 Capacity:</span> ${car.capacity} passengers</p>
                    <p><span class="font-semibold">Type:</span> ${car.type}</p>
                    <p><span class="font-semibold">🔧 Features:</span></p>
                    <ul class="ml-4 list-disc">
                        ${car.features.map(f => `<li class="text-sm">${f}</li>`).join('')}
                    </ul>
                </div>
                <div class="card-actions flex flex-col">
                    <div class="text-3xl font-bold" style="color: #021A54;">Rp${car.price.toLocaleString('id-ID')}/day</div>
                    <a href="https://wa.me/6281234567890?text=Saya%20ingin%20memesan%20${encodeURIComponent(car.name)}%20dengan%20harga%20Rp${car.price.toLocaleString('id-ID')}/hari." target="_blank" class="btn text-white font-bold w-full transition hover:shadow-lg" style="background-color: #021A54;">Book Now</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Render reviews
function renderReviews() {
    const reviewsGrid = document.getElementById('reviews-grid');
    reviewsGrid.innerHTML = reviews.map(review => `
        <div class="card bg-white shadow-lg hover:shadow-xl transition card-modern">
            <div class="card-body">
                <div class="text-yellow-400 text-lg mb-3">${'⭐'.repeat(review.rating)}</div>
                <p class="italic text-gray-700 mb-4">"${review.text}"</p>
                <p class="font-bold" style="color: #021A54;">— ${review.author}</p>
            </div>
        </div>
    `).join('');
}

// Scroll to cars section
function scrollToCars() {
    document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', initializePage);
