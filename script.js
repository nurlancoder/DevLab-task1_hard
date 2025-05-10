const bookingData = {
    staff: null,
    service: null,
    date: null,
    time: null,
    personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }
};

let currentStep = 1;

const steps = document.querySelectorAll('.step');
const sidebarItems = document.querySelectorAll('.step-item');
const staffCards = document.querySelectorAll('.staff-card');
const serviceCards = document.querySelectorAll('.service-card');
const timeSlots = document.querySelectorAll('.time-slot');

const staffNextBtn = document.getElementById('staff-next');
const serviceBackBtn = document.getElementById('service-back');
const serviceNextBtn = document.getElementById('service-next');
const dateBackBtn = document.getElementById('date-back');
const dateNextBtn = document.getElementById('date-next');
const confirmBackBtn = document.getElementById('confirm-back');
const confirmBookingBtn = document.getElementById('confirm-booking');

const summaryStaff = document.getElementById('summary-staff');
const summaryService = document.getElementById('summary-service');
const summaryDate = document.getElementById('summary-date');

const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

function initCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    function renderCalendar() {
        const dayHeaders = Array.from(calendarGrid.querySelectorAll('.calendar-day-header'));
        calendarGrid.innerHTML = '';
        dayHeaders.forEach(header => calendarGrid.appendChild(header));
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day');
            calendarGrid.appendChild(emptyDay);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = day;
            
            const date = new Date(currentYear, currentMonth, day);
            if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dayEl.classList.add('disabled');
            } else {
                dayEl.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
                    dayEl.classList.add('active');
                    bookingData.date = `${day}-${monthNames[currentMonth]}-${currentYear}`;
                    updateSummary();
                });
            }
            
            calendarGrid.appendChild(dayEl);
        }
    }
    
    renderCalendar();
    
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

function init() {
    initCalendar();
    
    staffCards.forEach(card => {
        card.addEventListener('click', () => {
            staffCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            bookingData.staff = {
                id: card.dataset.id,
                name: card.dataset.name,
                email: card.dataset.email
            };
            staffNextBtn.disabled = false;
            updateSummary();
        });
    });
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            serviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            bookingData.service = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: card.dataset.price
            };
            serviceNextBtn.disabled = false;
            updateSummary();
        });
    });
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            bookingData.time = slot.dataset.time;
            updateSummary();
        });
    });
    
    staffNextBtn.addEventListener('click', () => {
        if (bookingData.staff) {
            goToStep(2);
        } else {
            alert('Please select a staff member.');
        }
    });
    
    serviceBackBtn.addEventListener('click', () => {
        goToStep(1);
    });
    
    serviceNextBtn.addEventListener('click', () => {
        if (bookingData.service) {
            goToStep(3);
        } else {
            alert('Please select a service.');
        }
    });
    
    dateBackBtn.addEventListener('click', () => {
        goToStep(2);
    });
    
    dateNextBtn.addEventListener('click', () => {
        if (bookingData.date && bookingData.time) {
            goToStep(4);
        } else {
            alert('Please select both date and time.');
        }
    });
    
    confirmBackBtn.addEventListener('click', () => {
        goToStep(3);
    });
    
    confirmBookingBtn.addEventListener('click', () => {
        if (validateForm()) {
            bookingData.personalInfo = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value
            };
            
            console.log('Booking Confirmed:', bookingData);
            
            alert('Booking confirmed! Check the console for details.');
            resetForm();
        }
    });
}

function goToStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    
    sidebarItems.forEach(item => {
        const itemStep = parseInt(item.dataset.step);
        item.classList.remove('active', 'completed');
        
        if (itemStep === step) {
            item.classList.add('active');
        } else if (itemStep < step) {
            item.classList.add('completed');
        }
    });
    
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
    
    if (step === 4) {
        updateSummary();
    }
}

function updateSummary() {
    if (bookingData.staff) {
        summaryStaff.textContent = bookingData.staff.name;
    }
    
    if (bookingData.service) {
        summaryService.textContent = bookingData.service.name;
    }
    
    if (bookingData.date && bookingData.time) {
        summaryDate.textContent = `${bookingData.date} / ${bookingData.time}`;
    }
}

function validateForm() {
    if (!firstNameInput.value.trim()) {
        alert('Please enter your first name.');
        return false;
    }
    
    if (!lastNameInput.value.trim()) {
        alert('Please enter your last name.');
        return false;
    }
    
    if (!emailInput.value.trim()) {
        alert('Please enter your email.');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

function resetForm() {
    bookingData.staff = null;
    bookingData.service = null;
    bookingData.date = null;
    bookingData.time = null;
    bookingData.personalInfo = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };
    
    staffCards.forEach(c => c.classList.remove('selected'));
    serviceCards.forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
    timeSlots.forEach(s => s.classList.remove('active'));
    
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    
    summaryStaff.textContent = '-';
    summaryService.textContent = '-';
    summaryDate.textContent = '-';
    
    goToStep(1);
}

document.addEventListener('DOMContentLoaded', init);