const sections = [
  { title: "Section 1", content: "Content for Section 1" },
  { title: "Section 2", content: "Content for Section 2" },
  { title: "Section 3", content: "Content for Section 3" },
  { title: "Section 4", content: "Content for Section 4" },
  { title: "Section 5", content: "Content for Section 5" },
];
document.addEventListener("DOMContentLoaded", function () {
  const accordionContainer = document.querySelector(".accordion");
  sections.forEach((sec, idx) => {
    const sectionItem = document.createElement("div");
    sectionItem.classList.add("accordion-item");
    //Header
    const secHeader = document.createElement("div");
    secHeader.classList.add("accordion-header");
    secHeader.textContent = sec.title;
    //Content
    const secContent = document.createElement("div");
    secContent.classList.add("accordion-content");
    if (idx === 0) secContent.classList.add("active");
    secContent.textContent = sec.content;
    //append
    sectionItem.append(secHeader, secContent);
    accordionContainer.append(sectionItem);
  });
  accordionContainer.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion-header");
    if (!header) return;
    const sectionItem = header.parentElement;

    console.log(sectionItem);
    //content
    const content = sectionItem.querySelector(".accordion-content");
    const isActive = sectionItem.classList.contains("active");
    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".accordion-content").style.display = "none";
    });
    if (!isActive) {
      sectionItem.classList.add("active");
      sectionItem.querySelector(".accordion-content").style.display = "block  ";
    }
  });
});
