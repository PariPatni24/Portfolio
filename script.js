// Profile Image Upload
      const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const profileImage = document.getElementById('profileImage');
const placeholder = document.getElementById('placeholder');

if (uploadArea && imageInput) {

        uploadArea.addEventListener('click', () => imageInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'transparent';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'transparent';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleProfileImage(file);
            }
        });

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleProfileImage(file);
            }
        });

        function handleProfileImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
                profileImage.style.display = 'block';
                placeholder.style.display = 'none';
                localStorage.setItem('profileImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
}

        // Project Image Handler
        function handleProjectImage(input, imgId, overlayId) {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.getElementById(imgId);
                    const overlay = document.getElementById(overlayId);
                    img.src = e.target.result;
                    img.style.display = 'block';
                    overlay.style.display = 'none';
                    localStorage.setItem(imgId, e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }

        // Load all saved images on page load
        window.addEventListener('load', () => {
            // Profile image
            const savedProfile = localStorage.getItem('profileImage');
            if (savedProfile) {
                profileImage.src = savedProfile;
                profileImage.style.display = 'block';
                placeholder.style.display = 'none';
            }

            // Project images
            ['project1Img', 'project2Img', 'project3Img'].forEach((id, index) => {
                const saved = localStorage.getItem(id);
                if (saved) {
                    const img = document.getElementById(id);
                    const overlay = document.getElementById('project' + (index + 1) + 'Overlay');
                    img.src = saved;
                    img.style.display = 'block';
                    if (overlay) overlay.style.display = 'none';
                }
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking a link
                    const hamburger = document.getElementById('hamburger');
                    const navLinks = document.querySelector('.nav-links');
                    if (hamburger && navLinks) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                }
            });
        });

        // Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking on a nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                const formMessage = document.getElementById('formMessage');

                // Simple validation
                if (!name || !email || !subject || !message) {
                    formMessage.textContent = 'Please fill in all fields.';
                    formMessage.classList.add('error');
                    formMessage.classList.remove('success');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    formMessage.textContent = 'Please enter a valid email address.';
                    formMessage.classList.add('error');
                    formMessage.classList.remove('success');
                    return;
                }

                try {
                    // Using EmailJS or Formspree for email submission
                    // Option 1: Formspree (recommended - no setup needed)
                    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        })
                    });

                    if (response.ok) {
                        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                        formMessage.classList.add('success');
                        formMessage.classList.remove('error');
                        contactForm.reset();
                        
                        // Clear message after 5 seconds
                        setTimeout(() => {
                            formMessage.textContent = '';
                            formMessage.classList.remove('success');
                        }, 5000);
                    } else {
                        formMessage.textContent = 'Error sending message. Please try again.';
                        formMessage.classList.add('error');
                        formMessage.classList.remove('success');
                    }
                } catch (error) {
                    // Fallback: Show success locally if API fails
                    console.log('Form data:', { name, email, subject, message });
                    formMessage.textContent = 'Message submitted! (Offline mode - please share your email separately)';
                    formMessage.classList.add('success');
                    formMessage.classList.remove('error');
                    setTimeout(() => {
                        formMessage.textContent = '';
                        formMessage.classList.remove('success');
                    }, 5000);
                }
            });
        }

        // Navbar background on scroll
       window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');

    if (window.scrollY > 100) {
        nav.style.background = "var(--dark)";
    } else {
        nav.style.background = "var(--dark)";
    }
});

        // THEME TOGGLE
document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-mode");

            const icon = themeToggle.querySelector("i");

            if (document.body.classList.contains("light-mode")) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            } else {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }

        });

    }

});