import { html, render } from "lit-html";

const data = [
  {
    id: "los_angeles",
    annotation:
      'Los Angeles, officially the City of Los Angeles and known colloquially by its initials LA, is the most populous city in California and the second most populous city in the United States, after New York City. With an estimated population of four million, Los Angeles is the cultural, financial, and commercial center of Southern California. Nicknamed the "City of Angels" partly because of its name\'s Spanish meaning, Los Angeles is known for its Mediterranean climate, ethnic diversity, Hollywood and the entertainment industry, and sprawling metropolis.'
  },
  {
    id: "emma_stone",
    annotation:
      'Emily Jean "Emma" Stone is an American actress. The recipient of numerous accolades, including an Academy Award, a BAFTA Award, and a Golden Globe Award, she was the highest-paid actress in the world in 2017. Stone has appeared in Forbes Celebrity 100 in 2013 and 2017, and was featured by Time as one of the 100 most influential people in the world.'
  },
  {
    id: "ryan_gosling",
    annotation:
      "Ryan Thomas Gosling is a Canadian actor and musician. He began his career as a child star on the Disney Channel's The Mickey Mouse Club (1993–1995), and went on to appear in other family entertainment programs, including Are You Afraid of the Dark? (1995) and Goosebumps (1996). His first starring film role was as a Jewish neo-Nazi in The Believer (2001), and he went on to star in several independent films, including Murder by Numbers (2002), The Slaughter Rule (2002), and The United States of Leland (2003)."
  }
];

const RIGHT = "RIGHT";
const LEFT = "LEFT";
const TOP = "TOP";
const BOTTOM = "BOTTOM";

const tooltipWidth = 300;
const tooltipDisappearDelayMs = 350;

export default class ReferencedWord extends HTMLElement {
  constructor() {
    super();

    this.arrowPosition = { x: LEFT, y: TOP };
    this.tooltipPositionX = 0;
    this.tooltipPositionY = 0;

    this.attachShadow({ mode: "open" });
    render(this.template, this.shadowRoot);

    this.onMouseover = this.onMouseover.bind(this);
    this.onMouseout = this.onMouseout.bind(this);
  }

  connectedCallback() {
    this.rwid = this.getAttribute("rwid");
    this.annotation =
      this.getAttribute("annotation") ||
      (data.find(d => d.id === this.rwid) || {}).annotation;
    render(this.template, this.shadowRoot);
  }

  onMouseover(e) {
    if (!this.isTooltipPositionLocked) {
      this.tooltipPositionX = e.clientX;

      const cursorPositionRateX = e.clientX / window.innerWidth;
      const cursorPositionRateY = e.clientY / window.innerHeight;

      if (cursorPositionRateX > 0.5) {
        this.arrowPosition.x = RIGHT;
      } else {
        this.arrowPosition.x = LEFT;
      }
      if (cursorPositionRateY > 0.5) {
        this.arrowPosition.y = BOTTOM;
        this.tooltipPositionY = this.shadowRoot
          .querySelector(".wrapper")
          .getBoundingClientRect().top;
      } else {
        this.arrowPosition.y = TOP;
        this.tooltipPositionY = this.shadowRoot
          .querySelector(".wrapper")
          .getBoundingClientRect().bottom;
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
          ${this.annotation}
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
