/*!
* Damap website (https://damap.org)
* Copyright 2022 TU Wien
* Licensed under MIT (https://github.com/tuwien-csd/damap-website/blob/master/LICENSE)
*/
/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // form submission with AJAX
    var form = document.getElementById("contactForm");

    async function handleSubmit(event) {
        event.preventDefault();
        var statusWrapper = document.getElementById("submitMessageWrapper");
        var status = document.getElementById("submitMessage");
        var data = new FormData(event.target);
        
        // check reCaptcha response first
        var captchaResponse = document.getElementById('g-recaptcha-response').value;
        if (captchaResponse.length == 0 ) {
            statusWrapper.classList.add("text-danger");
            status.innerHTML = "Please verify that you are not a robot.";
        }
        else {
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    statusWrapper.classList.add("text-white");
                    status.innerHTML = "Your message was successfully sent!";
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            statusWrapper.classList.add("text-danger");
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            statusWrapper.classList.add("text-danger");
                            status.innerHTML = "Oops! There was a problem sending your message.";
                        }
                    })
                }
            }).catch(error => {
                statusWrapper.classList.add("text-danger");
                status.innerHTML = "Oops! There was a problem sending your message.";
            });
            // reset the reCaptcha
            grecaptcha.reset();
        }
        
        // reset form fields and button on success or error to discourage manual spam
        form.reset();
        document.getElementById('submitButton').disabled = true;
    }
    form.addEventListener("submit", handleSubmit);
});

// enable form submit button when all elements are not empty
function enableSubmit() {
    var inputs = document.getElementsByClassName('form-control');
    var btn = document.getElementById('submitButton');
    var isValid = true;

    for (var i = 0; i < inputs.length; i++) {
        var changedInput = inputs[i];
        if (changedInput.value.trim() === "" || changedInput.value === null) {
            isValid = false;
            break;
        }
    }
    btn.disabled = !isValid;
}
