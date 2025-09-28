const locations = {
  pompernikkel: {
    name: "Pompernikkel",
    url: "https://pompernikkel.nl/",
    maps: "https://www.google.com/maps/place/Pompernikkel/@52.0776368,4.2752531,17z/data=!3m1!4b1!4m6!3m5!1s0x47c5b1d3ab377b73:0x3a0ae481edb7f6fa!8m2!3d52.0776335!4d4.277828!16s%2Fg%2F11fr2t79n0?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D",
  },
};

class TreatCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["id", "treat-title", "location-id", "img-id", "price", "review"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  get treatId() {
    return this.getAttribute("id") || "";
  }

  get treatTitle() {
    return this.getAttribute("treat-title");
  }

  get locationId() {
    return this.getAttribute("location-id") || "";
  }

  get imgId() {
    return this.getAttribute("img-id") || "";
  }

  get price() {
    return this.getAttribute("price") || "??";
  }

  get review() {
    return this.getAttribute("review") || "";
  }

  render() {
    const glbPath = this.imgId ? `/assets/${this.imgId}.glb` : "";
    const posterPath = this.imgId ? `/assets/${this.imgId}.png` : "";
    const location = locations[this.locationId] ?? {};
    this.shadowRoot.innerHTML = `
      <style>
        .treat-content {
          outline: 1px solid black;
          outline-offset: -0.5px;
        }

        .inner {
          display: grid;
          grid-template-columns: 2fr 1fr;
          padding: 20px;
          max-width: 800px;
          justify-self: center;
        }
        
        h2 {
          color: #333;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-family: "Estonia", cursive;
          grid-column: 1/-1;
        }

        a {
            color: inherit;
        }

        .location {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        
        model-viewer {
          width: 300px;
          height: 300px;
          background-color: transparent;
        }
        
        .progress-bar {
          display: block;
          width: 33%;
          height: 10%;
          max-height: 2%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          border-radius: 25px;
          box-shadow: 0px 3px 10px 3px rgba(0, 0, 0, 0.5), 0px 0px 5px 1px rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(0, 0, 0, 0.1);
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .progress-bar.hide {
          visibility: hidden;
        }
        
        .update-bar {
          background-color: rgba(255, 255, 255, 0.9);
          width: 0%;
          height: 100%;
          border-radius: inherit;
          transition: width 0.3s;
        }

        p {
            text-wrap: pretty;
        }

        * {
        box-sizing: border-box;
        }

        .icon-button {
            position: relative;
        }

        .icon-button::before {
            position: absolute;
            content: "";
            width: 48px;
            height: 48px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        @media screen and (max-width: 600px) {
            .inner {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
      </style>
      
      <article class="treat-content">
        <div class="inner">
        <div>
        <h2>${this.treatTitle}</h2>
        <p class="location">
            <a href="${location.url}" target="_blank">${location.name}</a> 
            <a href=${location.maps} 
                class="icon-button"
                aria-label="${location.name} location" 
                title="${location.name} location">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-map"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" /><path d="M9 4v13" /><path d="M15 7v13" /></svg>
            </a>
        </p>
        <time datetime="2025-09-27">27 September 2025</time>
        ${this.review ? `<p class="review">Thoughts: ${this.review}</p>` : ""}
        </div>
          <model-viewer
            poster="${posterPath}"
            src="${glbPath}"
            camera-controls
            tone-mapping="neutral"
            shadow-intensity="0.5"
            touch-action="none"
            interpolation-decay="200"
            auto-rotate
            camera-target="-0.003m 0.0722m 0.0391m"
            camera-orbit="0deg 35deg 25m"
            min-camera-orbit="auto 25deg auto"
            max-camera-orbit="auto 75deg auto"
            min-field-of-view="45deg"
            max-field-of-view="50deg"
            enable-pan
            field-of-view="45deg"
            interaction-prompt="none"
          >
            <div class="progress-bar hide" slot="progress-bar">
              <div class="update-bar"></div>
            </div>
          </model-viewer>
        </div>
      </article>
    `;
  }
}

// Register the custom element
customElements.define("treat-card", TreatCard);
