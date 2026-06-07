document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector(".app");
  let products = [];
  let page = 1;
  const fetchProd = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        products = data.products;
        render();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const render = () => {
    const productContainer = document.createElement("div");
    const btnContainer = document.createElement("div");
    productContainer.classList.add("products");
    btnContainer.classList.add("btnContainer");
    if (products.length > 0) {
      products.slice(page * 10 - 10, page * 10).forEach((prod) => {
        const prodEle = document.createElement("div");
        prodEle.classList.add("product__single");
        const imgEle = document.createElement("img");
        imgEle.setAttribute("src", prod.thumbnail);
        const span = document.createElement("span");
        span.textContent = prod.title;
        prodEle.append(imgEle, span);
        productContainer.append(prodEle);
      });
      //Previous Btn
      if (page > 1) {
        const prevBtn = createPaginationBtn("⬅️", page - 1);
        btnContainer.append(prevBtn);
      }
      //Page Numbers
      for (let i = 0; i < products.length / 10; i++) {
        const btn = createPaginationBtn(`${i + 1}`, i + 1, page === i + 1);
        btnContainer.append(btn);
      }
      //Next Btn
      if (page < products.length / 10) {
        const nextBtn = createPaginationBtn("➡️", page + 1);
        btnContainer.append(nextBtn);
      }
    }
    app.innerHTML = "";
    app.append(productContainer, btnContainer);
  };

  app.addEventListener("click", (evt) => {
    const btnClicked = evt.target.dataset.pageNumber;
    if (!btnClicked) return;

    pageSelector(Number(btnClicked));
  });

  const createPaginationBtn = (btnIcon, pageNumber, isSelected = false) => {
    const btn = document.createElement("button");
    btn.textContent = btnIcon;
    btn.setAttribute("data-page-number", pageNumber);
    if (isSelected) btn.classList.add("pagination_selected");
    return btn;
  };
  const pageSelector = (pageNum) => {
    if (pageNum >= 1 && pageNum <= products.length / 10 && pageNum !== page) {
      page = pageNum;
      render();
    }
  };
  fetchProd();
});
