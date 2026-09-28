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

    const tabList = document.createElement("ul");
    tabList.id = "tabList";

    const tabsToDisplay = TABS.filter(
      (tab) => tab.section === "Home" || tab.section === section,
    );

    tabsToDisplay.forEach((tab) => {
      const tabItem = document.createElement("li");
      tabItem.className = "tabItem";
      const tabLink = document.createElement("a");

      tabLink.className = "tabLink";
      tabLink.textContent = tab.text;
      tabLink.href = tab.address;

      tabItem.append(tabLink);
      tabList.appendChild(tabItem);
    });

    tabBar.appendChild(tabList);

    this.appendChild(tabBar);
  }
}

customElements.define("tab-bar", TabBar);
