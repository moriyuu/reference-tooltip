import { html, render } from "lit-html";
import data from "./reference.json";

const RIGHT = "RIGHT";
const LEFT = "LEFT";
const TOP = "TOP";
const BOTTOM = "BOTTOM";

const tooltipWidth = 300;
const tooltipDisappearDelayMs = 350;

class ReferencedWord extends HTMLElement {
  constructor() {
    super();

    this.arrowPosition = { x: LEFT, y: TOP };
    this.tooltipPositionX = 0;
    this.tooltipPositionY = 0;
    this.isTooltipPositionLocked = false;

    this.onMouseover = this.onMouseover.bind(this);
    this.onMouseout = this.onMouseout.bind(this);

    this.attachShadow({ mode: "open" });
    render(this.template, this.shadowRoot);
  }

  connectedCallback() {
    this.rwid = this.getAttribute("rwid");
    this.content =
      this.getAttribute("content") ||
      (data.find(d => d.id === this.rwid) || {}).content;
    render(this.template, this.shadowRoot);
  }

  onMouseover(e) {
    if (!this.isTooltipPositionLocked) {
      this.tooltipPositionX = e.clientX;

      const boundingClientRect = this.shadowRoot
        .querySelector(".wrapper")
        .getBoundingClientRect();

      if (e.clientX / window.innerWidth > 0.5) {
        this.arrowPosition.x = RIGHT;
      } else {
        this.arrowPosition.x = LEFT;
      }
      if (e.clientY / window.innerHeight > 0.5) {
        this.arrowPosition.y = BOTTOM;
        this.tooltipPositionY = boundingClientRect.top + window.pageYOffset;
      } else {
        this.arrowPosition.y = TOP;
        this.tooltipPositionY = boundingClientRect.bottom + window.pageYOffset;
      }
    }

    setTimeout(() => {
      this.isTooltipPositionLocked = true;
    }, tooltipDisappearDelayMs);

    render(this.template, this.shadowRoot);
  }

  onMouseout() {
    setTimeout(() => {
      this.isTooltipPositionLocked = false;
      render(this.template, this.shadowRoot);
    }, tooltipDisappearDelayMs);
  }

  get template() {
    return html`
      <span
        id="hoge"
        class="wrapper"
        @mouseover=${this.onMouseover}
        @mouseout=${this.onMouseout}
      >
        <slot></slot>
        <div
          class="tooltip"
          @mouseover=${e => e.stopPropagation()}
          @mouseout=${e => e.stopPropagation()}
        >
          ${this.content}
        </div>
      </span>

      <style>
        .wrapper {
          color: blue;
          cursor: pointer;
        }
        .wrapper:hover .tooltip {
          opacity: 1;
          visibility: visible;
          transition-delay: 500ms;
        }
        .tooltip {
          opacity: 0;
          visibility: hidden;
          position: absolute;
          left: ${
            this.arrowPosition.x === LEFT
              ? `${this.tooltipPositionX - 24}px`
              : "auto"
          };
          right: ${
            this.arrowPosition.x === RIGHT
              ? `${window.innerWidth - this.tooltipPositionX - 24}px`
              : "auto"
          };
          top: ${
            this.arrowPosition.y === TOP
              ? `${this.tooltipPositionY + 8}px`
              : "auto"
          };
          bottom: ${
            this.arrowPosition.y === BOTTOM
              ? `${window.innerHeight - this.tooltipPositionY + 8}px`
              : "auto"
          };
          background-color: #f5f5f5;
          color: #444;
          width: ${tooltipWidth}px;
          padding: 16px 24px;
          border-radius: 3px;
          cursor: default;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 6px rgba(0, 0, 0, 0.2);
          z-index: 10;
          transition: all 200ms ease-out ${tooltipDisappearDelayMs}ms;
          transition-property: opacity, visibility;
        }
        .tooltip::before {
          content: "";
          position: absolute;
          left: ${this.arrowPosition.x === LEFT ? "16px" : "auto"};
          right: ${this.arrowPosition.x === RIGHT ? "16px" : "auto"};
          top: ${this.arrowPosition.y === TOP ? "-8px" : "auto"};
          bottom: ${this.arrowPosition.y === BOTTOM ? "-8px" : "auto"};
          margin-left: -8px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: ${this.arrowPosition.y === BOTTOM ? "8px" : "0px"} solid
            #ccc;
          border-bottom: ${this.arrowPosition.y === TOP ? "8px" : "0px"} solid
            #ccc;
        }
        .tooltip::after {
          content: "";
          position: absolute;
          left: ${this.arrowPosition.x === LEFT ? "16px" : "auto"};
          right: ${this.arrowPosition.x === RIGHT ? "16px" : "auto"};
          top: ${this.arrowPosition.y === TOP ? "-7px" : "auto"};
          bottom: ${this.arrowPosition.y === BOTTOM ? "-7px" : "auto"};
          margin-left: -8px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: ${this.arrowPosition.y === BOTTOM ? "8px" : "0px"} solid
            #f5f5f5;
          border-bottom: ${this.arrowPosition.y === TOP ? "8px" : "0px"} solid
            #f5f5f5;
        }
      </style>
    `;
  }
}

window.customElements.define("referenced-word", ReferencedWord);
