const tabs = [
  { id: "tab1", title: "title 1", content: "this is content for tab 1" },
  { id: "tab2", title: "title 2", content: "this is content for tab 2" },
  { id: "tab3", title: "title 3", content: "this is content for tab 3" },
  { id: "tab4", title: "title 4", content: "this is content for tab 4" },
  { id: "tab5", title: "title 5", content: "this is content for tab 5" },
];
let normalisedData = {};
tabs.forEach((tab) => {
  normalisedData[tab.id] = tab;
});
console.log(normalisedData);

document.addEventListener("DOMContentLoaded", function () {
  const tabContainer = document.getElementById("tabContainer");
  const tabContentContainer = document.getElementById("tabContentContainer");
  let activeTabId = tabs[0].id;
  let activeIdx = 0;
  function renderTab() {
    tabs.forEach((tab) => {
      const tabBtn = document.createElement("button");
      tabBtn.textContent = tab.title;
      tabBtn.classList.add("tabLinks");
      tabBtn.setAttribute("data-tab", tab.id);
      tabContainer.append(tabBtn);
      const tabContent = document.createElement("div");
      tabContent.setAttribute("id", tab.id);
      tabContent.classList.add("tabContent");
      tabContent.innerHTML = `
      <h3>${tab.title}</h3>
      <p>${tab.content}</p>
      `;
      tabContentContainer.append(tabContent);
    });
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.classList.add("nextBtn");
    tabContainer.append(nextBtn);
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.classList.add("prevBtn");
    tabContainer.prepend(prevBtn);
  }
  renderTab();
  openTab(activeTabId);
  openTab(activeTabId);
  tabContainer.addEventListener("click", (e) => {
    console.log("event triggered", e.target);
    if (e.target.matches(".tabLinks")) {
      const tabId = e.target.dataset.tab;
      console.log("tabId", tabId);
      if (tabId !== activeTabId) {
        openTab(tabId);
        activeTabId = tabId;
        activeIdx = tabs.findIndex((tab) => tab.id === tabId);
      }
    }
    if (e.target.matches(".nextBtn")) {
      if (activeIdx < tabs.length - 1) {
        activeIdx++;
        activeTabId = tabs[activeIdx].id;
        openTab(activeTabId);
      }
    }

    if (e.target.matches(".prevBtn")) {
      if (activeIdx > 0) {
        activeIdx--;
        activeTabId = tabs[activeIdx].id;
        openTab(activeTabId);
      }
    }
  });
  function openTab(tabId) {
    console.log("tabId That was sent", tabId);
    const allTabs = document.querySelectorAll(".tabLinks");
    const allTabContents = document.querySelectorAll(".tabContent");
    allTabs.forEach((tab) =>
      tab.getAttribute("data-tab") !== tabId
        ? tab.classList.remove("active")
        : tab.classList.add("active"),
    );
    allTabContents.forEach((tab) =>
      tab.id !== tabId
        ? tab.classList.remove("active")
        : tab.classList.add("active"),
    );
  }
  function updateNavButtons() {
    document.querySelector(".prevBtn").disabled = activeIdx === 0;
    document.querySelector(".nextBtn").disabled = activeIdx === tabs.length - 1;
  }
});
