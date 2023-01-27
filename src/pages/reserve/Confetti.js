import React, { useEffect, useRef } from "react";
import "./Confetti.css";

function Confetti({ fadeSpray }) {
  const container = useRef(null);

  useEffect(() => {
    class Confettiful {
      constructor(el) {
        this.el = el;
        this.containerEl = null;

        this.confettiFrequency = 3;
        this.confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
        this.confettiAnimations = ["slow", "medium", "fast"];

        this._setupElements();
        this._renderConfetti();
      }
      _setupElements() {
        const containerEl = document.createElement("div");
        const elPosition = this.el.style.position;

        if (elPosition !== "relative" || elPosition !== "absolute") {
          this.el.style.position = "absolute";
        }

        containerEl.classList.add("confetti-container");

        this.el.appendChild(containerEl);

        this.containerEl = containerEl;
      }
      _renderConfetti() {
        this.confettiInterval = setInterval(() => {
          const confettiEl = document.createElement("div");
          const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
          const confettiBackground =
            this.confettiColors[
              Math.floor(Math.random() * this.confettiColors.length)
            ];
          const confettiLeft =
            Math.floor(Math.random() * this.el.offsetWidth) + "px";
          const confettiAnimation =
            this.confettiAnimations[
              Math.floor(Math.random() * this.confettiAnimations.length)
            ];

          confettiEl.classList.add(
            "confetti",
            "confetti--animation-" + confettiAnimation
          );
          confettiEl.style.left = confettiLeft;
          confettiEl.style.width = confettiSize;
          confettiEl.style.height = confettiSize;
          confettiEl.style.backgroundColor = confettiBackground;

          confettiEl.removeTimeout = setTimeout(function () {
            confettiEl.parentNode.removeChild(confettiEl);
          }, 3000);

          this.containerEl.appendChild(confettiEl);
        }, 50);
      }
    }

    window.confettiful = new Confettiful(container.current);
  }, []);

  return (
    <div
      ref={container}
      className={`js-container container ${
        fadeSpray && "container-transparent"
      }`}
    ></div>
  );
}

export default Confetti;
