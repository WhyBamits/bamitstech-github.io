
        let currentLine = 0;
        const codeEditor = document.getElementById('codeEditor');

        function typeCodeLine() {
            if (currentLine < codeLines.length) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'code-line';
                lineDiv.innerHTML = codeLines[currentLine];
                lineDiv.style.animationDelay = '0s';
                codeEditor.appendChild(lineDiv);
                
                currentLine++;
                setTimeout(typeCodeLine, 800);
            } else {
                // Add cursor at the end
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                codeEditor.appendChild(cursor);
                
                // Restart animation after a pause
                setTimeout(() => {
                    codeEditor.innerHTML = '';
                    currentLine = 0;
                    typeCodeLine();
                }, 3000);
            }
        }

        // Start the typing animation after loading
        setTimeout(() => {
            typeCodeLine();
        }, 4000);

        // Contact Form Handler
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create email body
            const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0AService: ${service}%0D%0AMessage: ${message}`;
            const subject = `Portfolio Contact: ${service || 'General Inquiry'}`;
            
            // Use the provided email
            const mailtoLink = `mailto:bamitstech.infosys@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Email client opened! Please send the email to complete your message.');
            
            // Reset form
            this.reset();
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to navbar
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });

        // Animate service cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe service cards and testimonials
        setTimeout(() => {
            document.querySelectorAll('.service-card, .testimonial-card, .work-item').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }, 4000);

        // Add click effect to contact items
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('click', function() {
                const text = this.querySelector('p').textContent;
                if (text.includes('@')) {
                    // Email
                    window.location.href = `mailto:${text}`;
                } else if (text.match(/\d/)) {
                    // Phone
                    window.location.href = `tel:${text}`;
                }
            });
        });
   