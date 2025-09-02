export const PrivacyPolicyExtension = {
  name: 'PrivacyPolicy1',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_privacyPolicy' ||
    trace.payload?.name === 'ext_privacyPolicy',
  render: async ({ trace, element }) => {
    // Small delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 250));
    
    // Create main container
    const privacyContainer = document.createElement('div');
    
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .vfrc-message--extension-PrivacyPolicy {
        background-color: transparent !important;
        background: none !important;
      }
      
      .privacy-container {
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
      
      .policy-text {
        line-height: 1.5;
        margin-bottom: 16px;
      }
      
      .privacy-container.minimized {
        max-height: 40px;
        overflow: hidden;
        transition: max-height 0.5s ease-out;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .minimized-text {
        display: none;
        font-weight: 600;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      
      .minimized .minimized-text {
        display: flex;
      }
      
      /* Checkmark styles */
      .checkmark-container {
        display: inline-flex;
        margin-left: 8px;
        align-items: center;
        justify-content: center;
      }
      
      .checkmark {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: block;
        stroke-width: 2;
        stroke: #fff;
        stroke-miterlimit: 10;
        box-shadow: inset 0px 0px 0px #7ac142;
        animation: check-fill .4s ease-in-out .4s forwards, check-scale .3s ease-in-out .9s both;
        opacity: 0;
        transform: scale(0);
        position: relative;
        top: 4px; /* Adjust this value to move the checkmark up or down */
      }
      
      .minimized .checkmark {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.3s ease-in, transform 0.3s ease-in;
        transition-delay: 0.2s;
      }
      
      .checkmark-circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #7ac142;
        fill: none;
        animation: check-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
      }
      
      .checkmark-check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: check-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
      }
      
      @keyframes check-stroke {
        100% { stroke-dashoffset: 0; }
      }
      
      @keyframes check-scale {
        0%, 100% { transform: none; }
        50% { transform: scale3d(1.1, 1.1, 1); }
      }
      
      @keyframes check-fill {
        100% { box-shadow: inset 0px 0px 0px 30px #7ac142; }
      }
      
      .minimized .minimized-text {
        display: block;
      }
      
      .minimized .policy-text,
      .minimized .button-container {
        display: none;
      }
      
      .policy-text a {
        color: #0066cc;
        text-decoration: none;
      }
      
      .policy-text a:hover {
        text-decoration: underline;
      }
      
      .button-container {
        display: flex;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 20px;
      }
      
      .accept-button {
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
      
      .accept-button:hover {
        background-color: #333;
      }
      
      .accept-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    `;
    
    // Create container for privacy policy
    const container = document.createElement('div');
    container.className = 'privacy-container';
    
    // Create minimized text element (initially hidden)
    const minimizedText = document.createElement('div');
    minimizedText.className = 'minimized-text';
    minimizedText.textContent = 'Privacy Policy Accepted';
    
    // Create checkmark SVG element
    const checkmarkContainer = document.createElement('div');
    checkmarkContainer.className = 'checkmark-container';
    
    const checkmarkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkmarkSvg.setAttribute('class', 'checkmark');
    checkmarkSvg.setAttribute('viewBox', '0 0 52 52');
    
    const checkmarkCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    checkmarkCircle.setAttribute('class', 'checkmark-circle');
    checkmarkCircle.setAttribute('cx', '26');
    checkmarkCircle.setAttribute('cy', '26');
    checkmarkCircle.setAttribute('r', '25');
    checkmarkCircle.setAttribute('fill', 'none');
    
    const checkmarkCheck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    checkmarkCheck.setAttribute('class', 'checkmark-check');
    checkmarkCheck.setAttribute('fill', 'none');
    checkmarkCheck.setAttribute('d', 'M14 27 L 22 35 L 38 15');
    
    checkmarkSvg.appendChild(checkmarkCircle);
    checkmarkSvg.appendChild(checkmarkCheck);
    checkmarkContainer.appendChild(checkmarkSvg);
    minimizedText.appendChild(checkmarkContainer);
    
    // Create policy text
    const policyText = document.createElement('div');
    policyText.className = 'policy-text';
    policyText.innerHTML = `Olivia is an AI assistant created to help you navigate IndyVit’s products, supplements, and services. She can provide personalized suggestions — including recommendations informed by the information you choose to share, such as a health report — to make it easier for you to find products that best fit your needs and preferences.<br/><br/>While Olivia’s recommendations are designed to be helpful and based on available information, they are not guaranteed to be complete or perfectly accurate. They are intended to support your decision-making, not to replace the expertise of a qualified healthcare professional. For any personal health concerns, medical conditions, or treatment decisions, you should always consult with a licensed healthcare provider.<br/><br/>By clicking 'Accept', you acknowledge that Olivia is a digital assistant and that your use of this feature is subject to the <a href="https://indyvit.com/en/policies/privacy-policy" target="_blank">IndyVit Privacy Policy</a> and the <a href="https://yourhealthchat.com/privacy-policy/" target="_blank">YourHealthChat Privacy Policy</a>`;
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    

    
    // Create accept button
    const acceptButton = document.createElement('button');
    acceptButton.className = 'accept-button';
    acceptButton.textContent = 'Accept';
    acceptButton.addEventListener('click', () => {
      // Disable the button
      acceptButton.disabled = true;
      acceptButton.textContent = 'Accepted';
      
      // Minimize the container
      container.classList.add('minimized');
      
      // Trigger continue interaction
      window.voiceflow.chat.interact({
        type: 'continue',
      });
    });
    
    // Add button to button container
    buttonContainer.appendChild(acceptButton);
    
    // Assemble everything
    container.appendChild(policyText);
    container.appendChild(buttonContainer);
    container.appendChild(minimizedText);
    
    privacyContainer.appendChild(styleEl);
    privacyContainer.appendChild(container);
    
    element.appendChild(privacyContainer);
    
    // Keep the notification visible until user accepts
    window.vf_done = false;
  },
};
