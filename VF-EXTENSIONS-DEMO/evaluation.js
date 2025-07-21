const SVG_Thumb = `<svg width="20" height="20" viewBox="0 0 24 24" fill="gray"><path d="M2 21h4V9H2v12zM22 9c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.99-1.11L13 1l-5 5.12V17h9a2 2 0 0 0 2-2l-.01-6z"/></svg>`;

export const FeedbackExtension = {
  name: "Feedback",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_feedback" || trace.payload.name === "ext_feedback",
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement("div");

    feedbackContainer.innerHTML = `
          <style>
            .vfrc-message--extension-Feedback {
                background: none;
            }

            .vfrc-feedback {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #FFFFFF;
            }

            .vfrc-feedback--description {
                font-size: 0.8em;
                color: grey;
                pointer-events: none;
            }

            .vfrc-feedback--buttons {
                display: flex;
            }

            .vfrc-feedback--button {
                margin: 0;
                padding: 0;
                margin-left: 0px;
                border: none;
                background: none;
                opacity: 0.2;
            }

            .vfrc-feedback--button:hover {
              opacity: 0.5; /* opacity on hover */
            }

            .vfrc-feedback--button.selected {
              opacity: 0.6;
            }

            .vfrc-feedback--button.disabled {
                pointer-events: none;
            }

            .vfrc-feedback--button:first-child svg {
                fill: gray; /* color for thumb up */
                stroke: none;
                border: none;
                margin-left: 6px;
            }

            .vfrc-feedback--button:last-child svg {
                margin-left: 4px;
                fill: gray; /* color for thumb down */
                stroke: none;
                border: none;
                transform: rotate(180deg);
            }
          </style>
          <div class="vfrc-feedback">
            <div class="vfrc-feedback--description">Was this helpful?</div>
            <div class="vfrc-feedback--buttons">
              <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
              <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            </div>
          </div>
        `;

    feedbackContainer
      .querySelectorAll(".vfrc-feedback--button")
      .forEach((button) => {
        button.addEventListener("click", function (event) {
          const feedback = this.getAttribute("data-feedback");
          window.voiceflow.chat.interact({
            type: "complete",
            payload: { feedback: feedback },
          });

          feedbackContainer
            .querySelectorAll(".vfrc-feedback--button")
            .forEach((btn) => {
              btn.classList.add("disabled");
              if (btn === this) {
                btn.classList.add("selected");
              }
            });
        });
      });

    element.appendChild(feedbackContainer);
  },
};
