// function toggleServices() {
//     const hiddenServices = document.querySelectorAll('.service-box.hidden');
//     const button = document.querySelector('.view-all-btn');
  
//     hiddenServices.forEach((service) => {
//       service.style.display = service.style.display === 'block' ? 'none' : 'block';
//     });
  
//     if (button.textContent === 'View All') {
//       button.textContent = 'View Less';
//     } else {
//       button.textContent = 'View All';
//     }
//   }


  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menuContainer = document.querySelector('.menu-container');
    const menuLinks = document.querySelectorAll('.menu a');
    const body = document.body;
  
    // Clone contact button and add to mobile menu
    const contactBtn = document.querySelector('.cnt-btn-container .contact-btn');
    if (contactBtn) {
      const mobileContactDiv = document.createElement('div');
      mobileContactDiv.className = 'mobile-contact-btn';
      const mobileContactBtn = contactBtn.cloneNode(true);
      mobileContactDiv.appendChild(mobileContactBtn);
      menuContainer.appendChild(mobileContactDiv);
    }
  
    hamburger.addEventListener('click', () => {
      menuContainer.classList.toggle('active');
      body.classList.toggle('menu-open');
      
      // Animate hamburger to X

      const lines = hamburger.querySelectorAll('.hamburger-line');
      lines[0].style.transform = menuContainer.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
      lines[1].style.opacity = menuContainer.classList.contains('active') 
        ? '0' 
        : '1';
      lines[2].style.transform = menuContainer.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
    });
  
    // Close menu when clicking a link
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuContainer.classList.remove('active');
        body.classList.remove('menu-open');
        resetHamburger();
      });
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuContainer.contains(e.target) && !hamburger.contains(e.target)) {
        menuContainer.classList.remove('active');
        body.classList.remove('menu-open');
        resetHamburger();
      }
    });
  
    function resetHamburger() {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      lines[0].style.transform = 'none';
      lines[1].style.opacity = '1';
      lines[2].style.transform = 'none';
    }
  });








  //newsletter form submission

document.getElementById("formnewsletter").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = document.querySelector(".nlbtn");

    // Change button text to "Submitting..."
    submitButton.innerHTML = "Subscribing...";
    submitButton.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            submitButton.innerHTML = "✔"; // Change button to tick icon
            submitButton.style.backgroundColor = "#00bcd4"; // Optional: Change button color to green
            form.reset(); // Clear form fields after submission

            // Revert button text after 2 seconds
            setTimeout(() => {
                submitButton.innerHTML = "SUBSCRIBE";
                submitButton.style.backgroundColor = ""; // Reset button color
                submitButton.disabled = false;
            }, 2000);
        } else {
            submitButton.innerHTML = "❌"; // Change button to error icon
            submitButton.style.backgroundColor = "red"; // Optional: Change button color to red

            setTimeout(() => {
                submitButton.innerHTML = "Send Message";
                submitButton.style.backgroundColor = "";
                submitButton.disabled = false;
            }, 2000);
        }
    } catch (error) {
        submitButton.innerHTML = "❌";
        submitButton.style.backgroundColor = "red";

        setTimeout(() => {
            submitButton.innerHTML = "Send Message";
            submitButton.style.backgroundColor = "";
            submitButton.disabled = false;
        }, 2000);

        console.error(error);
    }
});
