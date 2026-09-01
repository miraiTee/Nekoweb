/*

Webcomponent to display the navigation bar of the screen.
Directs to the first section in each navigation.

Navigation bar.

Logo / webname (redirect to Home)

NavList 
nav-elements (inserted as text and link)

SiteList 
site-elements (inserted to slots w/ image and link)

<p> small pp for copyright section <p>

*/

const logo = {
  text: "@mirai10",
  href: "/index.html",
};

const navItems = [
  { text: "About", href: "/site/about/me.html" },
  //{ text: "Art", href: "/site/art.html" },
  { text: "Blog", href: "/site/blog.html" },
  { text: "Board", href: "/site/board.html" },
  { text: "Code", href: "/site/code/language.html" },
  { text: "Projects", href: "/site/projects.html" },
  { text: "Resources", href: "/site/resources.html" },
  { text: "Fluff", href: "/site/fluff.html" },
];

const siteItems = [
  /*
  {
    image: "/assets/images/icons/sitelinks/gmail.png",
    alt: "Gmail",
    href: "mailto:mirielletime@gmail.com",
  },
  {
    image: "/assets/images/icons/sitelinks/bsky.png",
    alt: "Bluesky",
    href: "https://bsky.app/",
  },
  {
    image: "/assets/images/icons/sitelinks/codeberg.png",
    alt: "Codeberg",
    href: "https://codeberg.org/",
  },
  */
];

const copyright = "© 2026 Mirai Tee";

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/styles/components/navbar.css";

    this.shadowRoot.append(stylesheet);
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector("nav")) {
      this.renderNavbar();
    }
  }

  renderNavbar() {
    const nav = document.createElement("nav");
    nav.id = "navbar";
    nav.className = "navbar";

    const webname = document.createElement("p");
    webname.id = "webname";

    const homelink = document.createElement("a");
    homelink.href = logo.href;
    homelink.textContent = logo.text;

    webname.append(homelink);

    const navList = document.createElement("ul");
    navList.id = "nav-list";
    navList.className = "nav-list";

    for (const item of navItems) {
      const listItem = document.createElement("li");
      listItem.className = "nav-item";

      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.text;
      link.className = "nav-link";

      listItem.append(link);
      navList.append(listItem);
    }

    const siteList = document.createElement("ul");
    siteList.id = "site-list";
    siteList.className = "site-list";

    for (const item of siteItems) {
      const listItem = document.createElement("li");
      listItem.className = "site-item";

      const link = document.createElement("a");
      link.href = item.href;
      link.className = "site-link";

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.alt;
      image.className = "site-icon";

      link.append(image);
      listItem.append(link);
      siteList.append(listItem);
    }

    const copyrightText = document.createElement("small");
    copyrightText.id = "copyright";
    copyrightText.className = "copyright";
    copyrightText.textContent = copyright;

    nav.append(webname, navList, siteList, copyrightText);
    this.shadowRoot.append(nav);
  }
}

customElements.define("nav-bar", Navbar);
