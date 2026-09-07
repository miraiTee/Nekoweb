/*
  Displays the navlist for the website.
  Rendered at all times unless otherwise stated.
*/

const HEADER = {
  name: "mirai10",
  address: "/index.html",
};

const NAVLINKS = [
  { item: "About", address: "/about/me.html" },
  { item: "Blog", address: "/blog.html" },
  { item: "Code", address: "/code/language.html" },
  { item: "Projects", address: "/projects.html" },
  { item: "Resources", address: "/resources.html" },
  { item: "Fluff", address: "/fluff.html" },
];

const SITELINKS = [
  {
    name: "Altersprings",
    src: "/assets/images/icons/sitelinks/altersprings.png",
    address: "https://alterspring.org/@miraiTee",
  },
  {
    name: "Bsky",
    src: "/assets/images/icons/sitelinks/bsky.png",
    address: "https://bsky.app/profile/bitmae.bsky.social",
  },
  {
    name: "Codeberg",
    src: "/assets/images/icons/sitelinks/codeberg.png",
    address: "https://codeberg.org/user/settings/actions/runners",
  },
  {
    name: "Github",
    src: "/assets/images/icons/sitelinks/github.png",
    address: "https://github.com/miraiTee",
  },
  {
    name: "Gmail",
    src: "/assets/images/icons/sitelinks/gmail.png",
    address: "mailto:mirielletime@gmail.com",
  },
];

class Navbar extends HTMLElement {
  constructor() {
    super();
    //const shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const navbar = this.renderNavbar();
    this.appendChild(navbar);
  }

  renderNavbar() {
    const nav = document.createElement("aside");
    nav.id = "navbar";
    const header = this.buildHeader();
    const navList = this.buildNavlinks();
    const siteList = this.buildSitelinks();

    nav.append(header, navList, siteList);

    return nav;
  }

  buildHeader() {
    const header = document.createElement("h1");
    header.id = "header";

    const title = document.createElement("a");
    title.textContent = HEADER.name;
    title.href = HEADER.address;

    header.appendChild(title);

    return header;
  }

  buildNavlinks() {
    const navList = document.createElement("ul");
    navList.id = "navList";

    NAVLINKS.forEach((navLink) => {
      const listItem = document.createElement("li");
      listItem.className = "navitem";

      const link = document.createElement("a");
      link.textContent = navLink.item;
      link.href = navLink.address;

      listItem.appendChild(link);
      navList.appendChild(listItem);
    });

    return navList;
  }

  buildSitelinks() {
    const siteList = document.createElement("ul");
    siteList.id = "siteList";

    SITELINKS.forEach((siteLink) => {
      const siteItem = document.createElement("li");
      siteItem.className = "siteItem";

      const link = document.createElement("a");
      link.href = siteLink.address;
      link.setAttribute("aria-label", siteLink.name);

      const icon = document.createElement("img");
      icon.className = "siteIcon";
      icon.src = siteLink.src;
      icon.alt = `${siteLink.name} icon`;

      link.appendChild(icon);
      siteItem.appendChild(link);
      siteList.appendChild(siteItem);
    });

    return siteList;
  }
}

customElements.define("nav-bar", Navbar);
