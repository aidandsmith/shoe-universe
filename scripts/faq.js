const headers = document.querySelectorAll(".accordion-header");
headers.forEach((header) => {
  header.addEventListener("click", () => {
    // Close all other accordion items
    headers.forEach((item) => {
      if (item !== header) {
        item.classList.remove("active");
        item.nextElementSibling.style.display = "none";
        const icon = item.querySelector(".accordionIcon");
        if (icon) {
          icon.textContent = "﹀"; // Change the icon to ︾
        }
      }
    });

    // Toggle the clicked accordion item
    header.classList.toggle("active");
    const content = header.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";

    // Toggle the icon text
    const icon = header.querySelector(".accordionIcon");
    if (icon) {
      icon.textContent = content.style.display === "block" ? "︽" : "﹀";
    }
  });
});
