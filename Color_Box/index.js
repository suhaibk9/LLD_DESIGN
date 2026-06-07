let boxConfig = [
  { color: "red", width: "33.33%" },
  { color: "green", width: "33.3%" },
  { color: "blue", width: "33.33%" },
  { color: "yellow", width: "50%" },
  { color: "purple", width: "50%" },
  { color: "orange", width: "70%" },
  { color: "pink", width: "30%" },
];

const widthRegex = /^(100|[1-9]?\d)(\.\d+)?$/;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  const form = document.createElement("form");
  container.classList.add("container");

  const render = () => {
    container.innerHTML = "";
    boxConfig.forEach((boxData) => {
      const box = document.createElement("div");
      box.style.backgroundColor = boxData.color;
      box.style.width = boxData.width;
      box.setAttribute("data-color", boxData.color);
      container.append(box);
    });
  };
  render();
  container.addEventListener("click", (e) => {
    const targetColor = e.target;
    alert(targetColor.dataset.color);
  });
  const colorInput = document.createElement("input");
  const widthInput = document.createElement("input");
  const goBtn = document.createElement("button");
  goBtn.textContent = "Go";
  goBtn.setAttribute("type", "submit");
  form.append(colorInput, widthInput, goBtn);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const color = colorInput.value;
    const width = widthInput.value;
    if (color.trim().length > 0 && widthRegex.test(width.trim())) {
      boxConfig.push({
        color: color.trim(),
        width: `${width.trim()}%`,
      });
      render();
    }
  });
  document.body.append(container, form);
});
