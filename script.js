/**
 * ==========================================================================
 * KI & KO'S BRIDAL STUDIO - CUSTOM CORE JAVASCRIPT
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. STICKY HEADER SCROLL EFFECT
  const header = document.getElementById('main-header');
  const scrollThreshold = 50;

  const handleHeaderScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Trigger initially on page load


  // 2. MOBILE NAVIGATION DRAWER TOGGLE
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  const toggleMobileMenu = () => {
    const isExpanded = mobileMenu.classList.contains('hidden');
    if (isExpanded) {
      mobileMenu.classList.remove('hidden');
      // Slide down effect
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
      setTimeout(() => {
        mobileMenu.style.maxHeight = '500px';
        mobileMenu.style.opacity = '1';
      }, 10);
      // Change hamburger icon to close (X)
      hamburgerIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />`;
    } else {
      // Slide up effect
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      // Reset hamburger icon
      hamburgerIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16m-7 6h7" />`;
    }
  };

  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking any mobile nav link
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      hamburgerIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16m-7 6h7" />`;
    });
  });


  // 3. SCROLL REVEAL (FADE-IN TRANSITIONS)
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Unobserve once animated
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }


  // 4. ACTIVE NAVIGATION LINK HIGHLIGHTING
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightActiveNavLink = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-accentRose', 'active');
      link.classList.add('text-textMuted');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-accentRose', 'active');
        link.classList.remove('text-textMuted');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNavLink);
  highlightActiveNavLink();


  // 5. BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('hidden');
      backToTopBtn.classList.add('flex');
    } else {
      backToTopBtn.classList.add('hidden');
      backToTopBtn.classList.remove('flex');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  // 6. FORM RESERVATION TO WHATSAPP DISPATCHER
  const contactForm = document.getElementById('bridal-contact-form');
  const formAlert = document.getElementById('form-alert');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Gather Form Inputs
    const nameVal = document.getElementById('form-name').value.trim();
    const phoneVal = document.getElementById('form-phone').value.trim();
    const dateVal = document.getElementById('form-date').value;
    const serviceSelect = document.getElementById('form-service');
    const serviceVal = serviceSelect.options[serviceSelect.selectedIndex].text;
    const messageVal = document.getElementById('form-message').value.trim();

    // 2. Client Side Validations
    if (!nameVal || !phoneVal) {
      showAlert('Please fill in all required fields marked with an asterisk (*).', 'error');
      return;
    }

    // Show beautiful positive feedback
    showAlert('✨ Preparing your reservation... Connecting you to Ki & Ko\'s Booking Manager on WhatsApp!', 'success');

    // 3. Compile Elegant WhatsApp Text
    const waBaseUrl = 'https://wa.me/923020000312';
    const formattedDate = dateVal ? dateVal : 'To Be Decided';
    const cleanMessage = messageVal ? messageVal : 'No custom requests provided.';

    const messageText = `Hello Ki & Ko's Bridal Studio,

I would like to book a luxury bridal consultation with you. Here are my booking details:

💍 RESERVATION REQUEST DETAILS:
• Client Name: ${nameVal}
• Contact Phone: ${phoneVal}
• Requested Date: ${formattedDate}
• Service Selection: ${serviceVal}
• Special Requests: ${cleanMessage}

Looking forward to your reply. Thank you!`;

    // Encode special characters for URI
    const encodedMessage = encodeURIComponent(messageText);
    const redirectUrl = `${waBaseUrl}?text=${encodedMessage}`;

    // 4. Delay redirect slightly to show success feedback animation
    setTimeout(() => {
      window.open(redirectUrl, '_blank');
      contactForm.reset();
    }, 1500);
  });

  // Display alert inside the form container gracefully
  const showAlert = (message, type) => {
    formAlert.textContent = message;
    formAlert.classList.remove('hidden', 'bg-red-50', 'text-red-800', 'border', 'border-red-200', 'bg-green-50', 'text-green-800', 'border-green-200');
    
    if (type === 'success') {
      formAlert.classList.add('bg-green-50', 'text-green-800', 'border', 'border-green-200');
    } else {
      formAlert.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-200');
    }
    
    formAlert.classList.remove('hidden');
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

});
