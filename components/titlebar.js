/*

Webcomponent to display the current title page of the screen.
Uses a timer to slowly reveal the title before settling as it finishes.

parameters
- segment 1 (main section)
- section 2 (subection)

format
if section 2 DNE:
- section 1
else
- section 1 / section 

defaults at Home
// use setAttribute
*/

class Titlebar extends HTMLElement {
  constructor() {
    super();

    this.section1 = "Home";
    this.section2 = null;
    this._typingTimer = null; // Track timer to clear previous animations

    this.container = document.createElement("div");
    this.container.id = "titlebar";

    this.titleElement = document.createElement("p");
    this.titleElement.className = "titlebar-title";

    this.container.append(this.titleElement);
    this.append(this.container);
  }

  static get observedAttributes() {
    return ["section1", "section2"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.renderTitle();
    }
  }

  connectedCallback() {
    this.renderTitle();
  }

  /* Function to render title using a timer */
  renderTitle() {
    if (this._typingTimer) {
      clearInterval(this._typingTimer);
      this._typingTimer = null;
    }

    let targetText = this.section1;
    if (this.section2 !== null) {
      targetText = this.section1 + " / " + this.section2;
    }

    this.titleElement.textContent = "";
    let index = 0;
    const speed = 50;

    this._typingTimer = setInterval(() => {
      if (index < targetText.length) {
        this.titleElement.textContent += targetText.charAt(index);
        index++;
      } else {
        clearInterval(this._typingTimer);
        this._typingTimer = null;
      }
    }, speed);
  }
}

customElements.define("title-bar", Titlebar);
