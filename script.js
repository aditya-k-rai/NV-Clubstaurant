// Mobile Navigation
function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('overlay');
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

// Initialize all functionality when DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    // Close drawer when clicking a link
    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleDrawer();
        });
    });

    // WhatsApp button
    var btn = document.querySelector('.whatsapp-btn');
    if(btn) {
        btn.addEventListener('click', function() {
            window.open('https://wa.me/919999999999', '_blank'); // Replace with your WhatsApp number
        });
    }

    // NV logo animation
    var nvLogo = document.querySelector('.nv-logo');
    if(nvLogo) {
        nvLogo.classList.add('nv-logo-animate');
    }

    // Navbar mobile toggle
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if(navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
        // Close nav on link click (mobile)
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
            });
        });
    }

    // Slider functionality
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.slider-dot');
    var current = 0;
    var intervalId;

    function showSlide(idx) {
        // Remove prev class from all slides
        slides.forEach(slide => slide.classList.remove('prev'));
        
        // Add prev class to current slide
        slides[current].classList.add('prev');
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        
        current = idx;
        
        // Add active class to new current slide
        slides[current].classList.add('active');
        slides[current].classList.remove('prev');
        dots[current].classList.add('active');
    }

    function nextSlide() {
        var next = (current + 1) % slides.length;
        showSlide(next);
        intervalId = setTimeout(nextSlide, 5000);
    }

    if(slides.length > 0 && dots.length > 0) {
        // Add click handlers for dots
        dots.forEach(function(dot, i) {
            dot.addEventListener('click', function() {
                clearTimeout(intervalId);
                showSlide(i);
                intervalId = setTimeout(nextSlide, 5000);
            });
        });

        // Start automatic sliding
        intervalId = setTimeout(nextSlide, 5000);
    }

    // Form popup functionality
    function showBookingForm() {
        document.getElementById('popupForm').style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when form is open
    }

    function closeBookingForm() {
        document.getElementById('popupForm').style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click handlers to all booking buttons
    const bookButtons = document.querySelectorAll('.book-btn, .popup-book-btn, .slider-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showBookingForm();
        });
    });

    // Close form when clicking on close button or outside the form
    document.querySelector('.popup-close').addEventListener('click', closeBookingForm);
    document.querySelector('.popup-form-bg').addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-form-bg')) {
            closeBookingForm();
        }
    });

    // Handle form submission
    document.querySelector('.popup-book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Booking request submitted successfully!');
        closeBookingForm();
    });
});
//look at fixes in the Pen https://codepen.io/ghaste/pen/OJqLbvg
//for adding mouse trail to a page that scrolls beyond the viewport, as would be the case with most websites - lol
let fallDirection = 1;
document
  .querySelectorAll('input[name="trailside"]')
  .forEach(
  r => {
    r.addEventListener(
      'change',
      e => {
        fallDirection = parseInt(e.target.value);
        //console.log(fallDirection);
      }
    );
  }
);

let x1=0, y1=0;
window.client
const 
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  dist_to_draw = 50,
  delay = 1000,
  fsize = [
    '1.1rem', '1.4rem', '.8rem', '1.7rem'
  ],
  colors = [
  '#E23636',
  '#F9F3EE',
  '#E1F8DC',
  '#B8AFE6',
  '#AEE1CD',
  '#5EB0E5'
],
  rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min,
  selRand = (o) => o[rand(0, o.length -1)],
  distanceTo =  (x1, y1, x2, y2) => 
    Math.sqrt((Math.pow(x2-x1,2))+(Math.pow(y2-y1,2))),
  shouldDraw = (x, y) => 
    (distanceTo(x1, y1, x, y) >= dist_to_draw),
  addStr = (x, y) => {
    const str = document.createElement("div");
    str.innerHTML = '&#10022;';
    str.className = 'star';
    str.style.top = `${y + rand(-20,20)}px`;
    str.style.left = `${x}px`;
    str.style.color = selRand(colors);
    str.style.fontSize = selRand(fsize);
    document.body.appendChild(str);
    //console.log(rand(0, 3));
    const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);
    //console.log(vh, y, fs);
    //console.log((y+fs)>vh?vh-y:fs);
    str.animate(
      {
        translate: [
          `${rand(-5, 5)}px ${((y+fs)>vh?vh-y:fs) * fallDirection * .3}px`,
          `${rand(-20, 20)}px ${((y+fs)>vh?vh-y:fs) * fallDirection}px`],
        opacity: [1,0],
        transform: ['rotateX(0) rotateY(0)',`rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`]
      }, {
        duration: delay,
        fill: 'forwards',
        rangeStart: ["cover 0% ", "cover 40%"],
        rangeEnd: ["cover 40% ", "cover 100%"]
    });
    //could add a animation terminate listener, but why add the additional load
    setTimeout(() => {
        str.remove();
      }, delay);
  }

addEventListener("mousemove", (e) => {
  const {clientX, clientY} = e;
  if(shouldDraw(clientX, clientY)){
    addStr(clientX, clientY);
    x1 = clientX;
    y1 = clientY;
  }
});
