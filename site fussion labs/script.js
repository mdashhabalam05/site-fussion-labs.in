// Admin Configuration
const ADMIN_PASSWORD = 'fussion2024'; // Change this password
let isAdminLoggedIn = false;

// Sample Data (stored in localStorage)
let portfolioData = JSON.parse(localStorage.getItem('portfolio')) || [
    {
        id: 1,
        title: 'E-Commerce AI Store',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
        description: 'Complete AI-powered e-commerce solution with WhatsApp ordering'
    },
    {
        id: 2,
        title: 'Restaurant Automation',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        description: 'WhatsApp ordering system with AI menu recommendations'
    }
];

let reviewsData = JSON.parse(localStorage.getItem('reviews')) || [
    {
        id: 1,
        name: 'Rahul Sharma',
        company: 'TechStart Solutions',
        review: 'Site Fussion Labs delivered our website in just 5 days! The WhatsApp integration is amazing - leads are coming in automatically!',
        rating: 5
    },
    {
        id: 2,
        name: 'Priya Patel',
        company: 'Foodie Palace',
        review: 'Best decision to choose them. Our restaurant orders increased by 300% with their AI WhatsApp system!',
        rating: 5
    },
    {
        id: 3,
        name: 'Amit Kumar',
        company: 'Digital Marketing Pro',
        review: 'Professional team, stunning designs, and incredible AI features. Highly recommended!',
        rating: 5
    }
];

let enquiriesData = JSON.parse(localStorage.getItem('enquiries')) || [];

// DOM Elements
const logoContainer = document.getElementById('logoContainer');
const adminLogin = document.getElementById('adminLogin');
const adminModal = document.getElementById('adminModal');
const adminDashboard = document.getElementById('adminDashboard');
const whatsappModal = document.getElementById('whatsappModal');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolio();
    loadReviews();
    loadEnquiries();
    
    // Logo click animation
    document.getElementById('logo').addEventListener('click', function() {
        this.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg) scale(1)';
        }, 500);
    });
});

// Admin Login
adminLogin.addEventListener('click', () => {
    adminModal.style.display = 'block';
});

document.getElementById('adminForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('adminPass').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        adminModal.style.display = 'none';
        adminDashboard.style.display = 'block';
        document.getElementById('logoContainer').innerHTML = `
            <div class="admin-active">
                <i class="fas fa-user-shield"></i> Admin Active
            </div>
        `;
    } else {
        alert('❌ Wrong Password!');
    }
});

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Portfolio Management
document.getElementById('portfolioForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('projectTitle').value;
    const image = document.getElementById('projectImage').value;
    const desc = document.getElementById('projectDesc').value;
    
    const newProject = {
        id: Date.now(),
        title,
        image,
        description: desc
    };
    
    portfolioData.unshift(newProject);
    localStorage.setItem('portfolio', JSON.stringify(portfolioData));
    loadPortfolio();
    
    // Reset form
    e.target.reset();
    alert('✅ Project added successfully!');
});

function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = portfolioData.map(project => `
        <div class="portfolio-item">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500'">
            <div class="portfolio-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button onclick="deletePortfolio(${project.id})" style="background:#ef4444;color:white;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;margin-top:10px;">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Reviews Management
document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('clientName').value;
    const company = document.getElementById('clientCompany').value;
    const review = document.getElementById('reviewText').value;
    
    const newReview = {
        id: Date.now(),
        name,
        company,
        review,
        rating: 5
    };
    
    reviewsData.unshift(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviewsData));
    loadReviews();
    
    e.target.reset();
    alert('✅ Review added successfully!');
});

function loadReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = reviewsData.map(review => `
        <div class="review-item">
            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            <p>"${review.review}"</p>
            <div class="review-client">
                <div class="client-avatar">${review.name.charAt(0)}</div>
                <div>
                    <strong>${review.name}</strong>
                    <p>${review.company}</p>
                </div>
            </div>
            <button onclick="deleteReview(${review.id})" style="position:absolute;top:15px;right:15px;background:#ef4444;color:white;border:none;padding:8px 12px;border-radius:50%;cursor:pointer;font-size:12px;">
                ×
            </button>
        </div>
    `).join('');
}

function loadEnquiries() {
    const enquiryList = document.getElementById('enquiryList');
    enquiryList.innerHTML = enquiriesData.length ? 
        enquiriesData.map(enquiry => `
            <div style="background:white;padding:20px;border-radius:10px;margin-bottom:15px;border-left:4px solid #10b981;">
                <strong>${enquiry.name}</strong> - ${enquiry.phone}<br>
                ${enquiry.message}<br>
                <small>${new Date(enquiry.timestamp).toLocaleString()}</small>
            </div>
        `).join('') : 
        '<p style="color:#64748b;text-align:center;padding:40px;">No enquiries yet. They will appear here automatically!</p>';
}

// Delete functions
function deletePortfolio(id) {
    if (confirm('Delete this project?')) {
        portfolioData = portfolioData.filter(p => p.id !== id);
        localStorage.setItem('portfolio', JSON.stringify(portfolioData));
        loadPortfolio();
    }
}

function deleteReview(id) {
    if (confirm('Delete this review?')) {
        reviewsData = reviewsData.filter(r => r.id !== id);
        localStorage.setItem('reviews', JSON.stringify(reviewsData));
        loadReviews();
    }
}

// Enquiry Form
document.getElementById('enquiryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Save enquiry
    const enquiry = { name, phone, email, message, timestamp: Date.now() };
    enquiriesData.unshift(enquiry);
    localStorage.setItem('enquiries', JSON.stringify(enquiriesData));
    
    // Show WhatsApp success modal
    whatsappModal.style.display = 'block';
    
    // Reset form
    e.target.reset();
    
    // WhatsApp API Call (Real implementation)
    sendWhatsAppMessage(phone, name);
});

function sendWhatsAppMessage(phone, name) {
    // Real WhatsApp Business API integration
    const message = `🚀 *New Enquiry from Site Fussion Labs Website!*

👤 *Name:* ${name}
📱 *Phone:* ${phone}

*AI Assistant:* Hello! Thanks for your interest in Site Fussion Labs! 

What specific service do you need?
1️⃣ Website Development
2️⃣ WhatsApp Automation  
3️⃣ AI Chatbot
4️⃣ E-commerce Store

Reply with your choice or describe your project! 

⚡ We'll respond within 60 seconds!`;

    // For demo - in production use WhatsApp Business API
    console.log('WhatsApp Message Sent:', message);
    
    // Real implementation example:
    // const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    // window.open(whatsappURL, '_blank');
}

function closeWhatsAppModal() {
    whatsappModal.style.display = 'none';
}

// Smooth scrolling
function scrollToEnquiry() {
    document.getElementById('enquirySection').scrollIntoView({ behavior: 'smooth' });
}

function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

// Close dashboard when clicking outside
document.getElementById('closeDashboard').addEventListener('click', () => {
    adminDashboard.style.display = 'none';
    location.reload(); // Reset admin state
});