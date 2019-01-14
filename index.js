import { html, render } from "lit-html";

const data = [
  {
    id: "la",
    annotation:
      "Los Angeles, officially the City of Los Angeles and known colloquially by its initials LA, is the most populous city in California and the second most populous city in the United States, after New York City. With an estimated population of four million, Los Angeles is the cultural, financial, and commercial center of Southern California. Nicknamed the 'City of Angels' partly because of its name's Spanish meaning, Los Angeles is known for its Mediterranean climate, ethnic diversity, Hollywood and the entertainment industry, and sprawling metropolis."
  }
];

export default class ReferencedWord extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    render(this.template, this.shadowRoot);
  }

  get template() {
    const rwid = this.getAttribute("rwid");
    const annotation = data.find(d => d.id === rwid).annotation;

    return html`
      <span class="wrapper">
        <slot></slot>
        <div class="tooltip">${annotation}</div>
      </span>

      <style>
        .wrapper {
          position: relative;
          color: blue;
          cursor: pointer;
        }
        .wrapper:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transition-delay: 0.3s;
        }
        .tooltip {
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 24px;
          left: 0;
          background-color: #f5f5f5;
          color: #444;
          width: 300px;
          padding: 16px 24px;
          border-radius: 3px;
          font-size: 14px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 6px rgba(0, 0, 0, 0.2);
          z-index: 10;
          transition: all 0.2s ease-out 0.05s;
        }
        .tooltip::before {
          content: "";
          position: absolute;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          top: -8px;
          left: 16px;
          margin-left: -8px;
          border-bottom: 8px solid #ccc;
        }
        .tooltip::after {
          content: "";
          position: absolute;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          top: -7px;
          left: 16px;
          margin-left: -8px;
          border-bottom: 8px solid #f5f5f5;
        }
      </style>
    `;
  }
}

window.customElements.define("referenced-word", ReferencedWord);
