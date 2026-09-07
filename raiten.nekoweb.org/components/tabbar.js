/*
  Component to easily print out the tab buttons.
*/

const TABS = [
  // Home
  {
    section: "Home",
    name: "Home",
    text: "⌂",
    address: "/index.html",
  },

  // About
  {
    section: "About",
    name: "Me",
    text: "Me",
    address: "/about/me.html",
  },
  {
    section: "About",
    name: "Website",
    text: "Website",
    address: "/about/website.html",
  },
  {
    section: "About",
    name: "FAQ",
    text: "FAQs",
    address: "/about/faq.html",
  },

  // Code
  {
    section: "Code",
    name: "Language",
    text: "Langs",
    address: "/code/language.html",
  },
  {
    section: "Code",
    name: "Snippets",
    text: "Snippets",
    address: "/code/snippets.html",
  },
  {
    section: "Code",
    name: "Tools",
    text: "Tools",
    address: "/code/tools.html",
  },

  // Blogs

  // Projects

  // Resources

  // Fluff
];

class TabBar extends HTMLElement {
  connectedCallback() {
    this.buildTabs();
  }

  buildTabs() {
    const section = this.getAttribute("section");
    const tabBar = document.createElement("div");

    tabBar.id = "tabBar";

    const tabsToDisplay = TABS.filter(
      (tab) => tab.section === "Home" || tab.section === section,
    );

    tabsToDisplay.forEach((tab) => {
      const tabItem = document.createElement("a");

      tabItem.className = "tab";
      tabItem.textContent = tab.text;
      tabItem.href = tab.address;

      tabBar.appendChild(tabItem);
    });

    this.appendChild(tabBar);
  }
}

customElements.define("tab-bar", TabBar);
