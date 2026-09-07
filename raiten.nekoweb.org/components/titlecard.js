/*
    Displays the currect section of the page.
*/
class TitleCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.buildTitle();
  }
  
  buildTitle() {
    const div = document.createElement("div");
    div.id = "titleCard";

    const p = document.createElement("p");
    p.id = "title";
    p.textContent = this.getAttribute("title") || "";

    div.appendChild(p);
    this.appendChild(div);
  }
}

customElements.define("title-card", TitleCard);
