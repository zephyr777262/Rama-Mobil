// Load cars from localStorage on page load
function loadAdminPage() {
    loadCarsFromStorage();
    displayCars();
}

// Load cars from localStorage
function loadCarsFromStorage() {
    const storedCars = localStorage.getItem('rentalCars');
    if (storedCars) {
        try {
            window.adminCars = JSON.parse(storedCars);
        } catch (e) {
            window.adminCars = [];
        }
    } else {
        window.adminCars = [];
    }
}

// Save cars to localStorage
function saveCarsToStorage() {
    localStorage.setItem('rentalCars', JSON.stringify(window.adminCars));
}

// Display cars in table
function displayCars() {
    const tableBody = document.getElementById('carsTableBody');
    
    if (window.adminCars.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No cars added yet.</td></tr>';
        return;
    }

    tableBody.innerHTML = window.adminCars.map((car, index) => `
        <tr>
            <td class="font-semibold" style="color: #021A54;">${car.name}</td>
            <td><span class="badge badge-lg" style="background-color: #021A54; color: white;">${car.type}</span></td>
            <td>${car.capacity} passengers</td>
            <td class="font-bold">Rp${car.price.toLocaleString('id-ID')}/day</td>
            <td class="text-sm">${car.features.join(', ')}</td>
            <td>
                <button onclick="deleteCar(${index})" class="btn btn-sm btn-error text-white">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Open Add Car Modal
function openAddCarModal() {
    const modal = document.getElementById('addCarModal');
    modal.showModal();
}

// Close Add Car Modal
function closeAddCarModal() {
    const modal = document.getElementById('addCarModal');
    modal.close();
}

// Add car form submission
document.addEventListener('DOMContentLoaded', function() {
    loadAdminPage();

    const form = document.getElementById('addCarForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const newCar = {
                id: Date.now(),
                name: document.getElementById('carName').value,
                type: document.getElementById('carType').value,
                capacity: parseInt(document.getElementById('carCapacity').value),
                price: parseFloat(document.getElementById('carPrice').value),
                image: document.getElementById('carImage').value,
                features: document.getElementById('carFeatures').value.split(',').map(f => f.trim())
            };

            window.adminCars.push(newCar);
            saveCarsToStorage();
            displayCars();

            // Reset form and close modal
            form.reset();
            closeAddCarModal();

            // Show success message
            alert('Car added successfully!');
        });
    }
});

// Delete car
function deleteCar(index) {
    if (confirm('Are you sure you want to delete this car?')) {
        window.adminCars.splice(index, 1);
        saveCarsToStorage();
        displayCars();
        alert('Car deleted successfully!');
    }
}
