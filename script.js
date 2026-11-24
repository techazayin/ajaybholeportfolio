const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


const currentPage = document.body.dataset.page;
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.dataset.page === currentPage) link.classList.add("active");
});


const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const formStatus = document.getElementById("form-status");
  const submitButton = contactForm.querySelector("button[type='submit']");
  const WEB3FORMS_ACCESS_KEY = "63181e01-bbb7-4a09-a3d9-54542e9e2910";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "Sending your message...";
    formStatus.style.color = "#555555";

    const formData = new FormData(contactForm);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New portfolio message from AJAY's website");
    formData.append("from_name", "AJAY Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
        formStatus.style.color = "#477a19";
        contactForm.reset();
      } else {
        throw new Error(result.message || "Your message could not be sent.");
      }
    } catch (error) {
      formStatus.textContent = error.message || "Something went wrong. Please try again.";
      formStatus.style.color = "#b42318";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
