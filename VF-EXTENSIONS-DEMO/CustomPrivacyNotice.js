export const CustomPrivacyNotice = {
  name: 'CustomPrivacy',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_customPrivacy' ||
    trace.payload?.name === 'ext_customPrivacy',
  render: async ({ trace, element }) => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const wrapper = document.createElement('div');

    const style = document.createElement('style');
    style.textContent = `
      .vfrc-message--extension-CustomPrivacy {
        background: none !important;
      }

      .privacy-box {
        font-family: Montserrat, sans-serif;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 600px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }

      .policy-body {
        line-height: 1.5;
        margin-bottom: 16px;
      }

      .privacy-box.shrunk {
        max-height: 40px;
        overflow: hidden;
        transition: max-height 0.5s ease-out;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .shrunk-text {
        display: none;
        font-weight: 600;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .shrunk .shrunk-text {
        display: flex;
      }

      .tick-container {
        display: inline-flex;
        margin-left: 8px;
        align-items: center;
        justify-content: center;
      }

      .tick-icon {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: block;
        stroke-width: 2;
        stroke: #fff;
        stroke-miterlimit: 10;
        box-shadow: inset 0px 0px 0px #7ac142;
        animation: fill-in .4s ease-in-out .4s forwards, scale-in .3s ease-in-out .9s both;
        opacity: 0;
        transform: scale(0);
        position: relative;
        top: 4px;
      }

      .shrunk .tick-icon {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.3s ease-in, transform 0.3s ease-in;
        transition-delay: 0.2s;
      }

      .tick-circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #7ac142;
        fill: none;
        animation: draw-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
      }

      .tick-check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: draw-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
      }

      @keyframes draw-stroke {
        100% { stroke-dashoffset: 0; }
      }

      @keyframes scale-in {
        0%, 100% { transform: none; }
        50% { transform: scale3d(1.1, 1.1, 1); }
      }

      @keyframes fill-in {
        100% { box-shadow: inset 0px 0px 0px 30px #7ac142; }
      }

      .shrunk .policy-body,
      .shrunk .action-holder {
        display: none;
      }

      .policy-body a {
        color: #0066cc;
        text-decoration: none;
      }

      .policy-body a:hover {
        text-decoration: underline;
      }

      .action-holder {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 20px;
      }

      .btn-confirm {
        font-family: Montserrat, sans-serif;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 24px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
        width: 100%;
        max-width: 300px;
      }

      .btn-confirm:hover {
        background-color: #333;
      }

      .btn-confirm:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    `;

    const notice = document.createElement('div');
    notice.className = 'privacy-box';

    const compactLabel = document.createElement('div');
    compactLabel.className = 'shrunk-text';
    compactLabel.textContent = 'Privacyvoorwaarden geaccepteerd';

    const svgContainer = document.createElement('div');
    svgContainer.className = 'tick-container';

    const tickSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tickSvg.setAttribute('class', 'tick-icon');
    tickSvg.setAttribute('viewBox', '0 0 52 52');

    const tickCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    tickCircle.setAttribute('class', 'tick-circle');
    tickCircle.setAttribute('cx', '26');
    tickCircle.setAttribute('cy', '26');
    tickCircle.setAttribute('r', '25');
    tickCircle.setAttribute('fill', 'none');

    const tickCheck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tickCheck.setAttribute('class', 'tick-check');
    tickCheck.setAttribute('fill', 'none');
    tickCheck.setAttribute('d', 'M14 27 L 22 35 L 38 15');

    tickSvg.appendChild(tickCircle);
    tickSvg.appendChild(tickCheck);
    svgContainer.appendChild(tickSvg);
    compactLabel.appendChild(svgContainer);

    const description = document.createElement('div');
    description.className = 'policy-body';
    description.innerHTML = `Olivia is an AI assistant created to help you navigate IndyVit’s products, supplements, and services. She can provide personalized suggestions — including recommendations based on the information you choose to share, such as a health report — to help you find products that best fit your needs and preferences. While Olivia’s recommendations are intended to be helpful, they are not guaranteed to be complete or perfectly accurate. They are meant to support your decision-making and do not replace the expertise of a qualified healthcare professional. For any personal health concerns, medical conditions, or treatment decisions, you should always consult with a licensed healthcare provider. By clicking ‘Accept’, you acknowledge that Olivia is a digital assistant and that your use of this feature is subject to the Privacy Policy of IndyVit and the Privacy Policy of YourHealthChat.`;

    const actionHolder = document.createElement('div');
    actionHolder.className = 'action-holder';

    const confirmButton = document.createElement('button');
    confirmButton.className = 'btn-confirm';
    confirmButton.textContent = 'Accepteren';

    confirmButton.addEventListener('click', () => {
      confirmButton.disabled = true;
      confirmButton.textContent = 'Geaccepteerd';
      notice.classList.add('shrunk');

      window.voiceflow.chat.interact({
        type: 'continue',
      });
    });

    actionHolder.appendChild(confirmButton);

    notice.appendChild(description);
    notice.appendChild(actionHolder);
    notice.appendChild(compactLabel);

    wrapper.appendChild(style);
    wrapper.appendChild(notice);

    element.appendChild(wrapper);

    window.vf_done = false;
  },
};
