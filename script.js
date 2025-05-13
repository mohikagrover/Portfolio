// Mobile Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Scroll Animation
const scrollAnimation = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });
    
    const hiddenElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .achievement-item');
    hiddenElements.forEach(el => observer.observe(el));
}

// Form Submission
const contactForm = () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const subject = form.querySelectorAll('input[type="text"]')[1].value;
            const message = form.querySelector('textarea').value;
            
            // You can add your form submission logic here
            // For demonstration, we'll just log the values
            console.log({name, email, subject, message});
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

// Smooth Scrolling for Navigation
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('nav a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Add offset for fixed header
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const nav = document.querySelector('.nav-links');
                    const burger = document.querySelector('.burger');
                    if (nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                    }
                }
            }
        });
    });
}

// AI Assistant Chatbot
const chatWidget = () => {
    const chatWidget = document.getElementById('chat-widget');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle chat widget
    chatToggleBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
    });

    // Chat header click to toggle
    document.querySelector('.chat-header').addEventListener('click', (e) => {
        if (e.target !== chatToggleBtn && e.target !== chatToggleBtn.querySelector('i')) {
            chatWidget.classList.toggle('open');
        }
    });

    // Send message
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        // Generate bot response after a short delay
        setTimeout(() => {
            const botResponse = generateResponse(message);
            addMessage(botResponse, 'bot');
        }, 600);
    };

    // Add message to chat
    const addMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Basic response generation - can be expanded
    const generateResponse = (message) => {
        message = message.toLowerCase();
        
        // Basic responses based on keywords
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I help you today?";
        } else if (message.includes('who are you') || message.includes('what are you')) {
            return "I'm Mohika's AI assistant. I can help you learn about her skills, projects, and experience!";
        } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
            return "You can contact Mohika at mohikagrover2018@gmail.com or +91 9717808832";
        } else if (message.includes('skills') || message.includes('abilities')) {
            return "Mohika has strong skills in Java, Python, MySQL, React.js, JavaScript, HTML, CSS, and OOP concepts.";
        } else if (message.includes('projects')) {
            return "Mohika has worked on projects like Talent-Hire (AI-based event management app) and an AI-powered career matchmaking platform.";
        } else if (message.includes('education') || message.includes('study') || message.includes('degree')) {
            return "Mohika is pursuing B.Tech in CSE (AI & ML) from Galgotias University, Greater Noida (2022-2026).";
        } else if (message.includes('experience') || message.includes('work')) {
            return "Mohika has experience in backend development, participating in hackathons, and volunteering as a tutor for AI and computer science.";
        } else if (message.includes('github') || message.includes('code')) {
            return "You can check out Mohika's coding projects on GitHub: https://github.com/mohikagrover";
        } else if (message.includes('linkedin')) {
            return "Connect with Mohika on LinkedIn: https://www.linkedin.com/in/mohika-grover/";
        } else if (message.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (message.includes('bye') || message.includes('goodbye')) {
            return "Goodbye! Have a great day!";
        } else {
            return "I'm sorry, I don't have specific information about that. Would you like to know about Mohika's skills, projects, education, or contact information?";
        }
    };

    // Event listeners
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Open chat after a few seconds
    setTimeout(() => {
        if (!chatWidget.classList.contains('open')) {
            chatWidget.classList.add('open');
            
            // Auto close after 5 seconds if no interaction
            setTimeout(() => {
                if (!chatInput.value.trim()) {
                    chatWidget.classList.remove('open');
                }
            }, 5000);
        }
    }, 3000);
}

// Initialize
const app = () => {
    navSlide();
    scrollAnimation();
    contactForm();
    smoothScroll();
    chatWidget();
}

// Run when DOM content is loaded
document.addEventListener('DOMContentLoaded', app); 