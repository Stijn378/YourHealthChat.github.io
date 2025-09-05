// 🔒 Disable/Enable input (blokkeert typing maar laat container zien)
export const DisableInputExtension = {
  name: 'DisableInput',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_disableInput' ||
    trace.payload?.name === 'ext_disableInput',
  effect: ({ trace }) => {
    const { isDisabled } = trace.payload;

    function toggleInput() {
      const chatDiv = document.getElementById('voiceflow-chat');
      if (chatDiv && chatDiv.shadowRoot) {
        const shadowRoot = chatDiv.shadowRoot;
        const chatInput = shadowRoot.querySelector('.vfrc-chat-input');
        const textarea = shadowRoot.querySelector('textarea[id^="vf-chat-input--"]');
        const button = shadowRoot.querySelector('.vfrc-chat-input--button');

        if (chatInput && textarea && button) {
          textarea.disabled = isDisabled;
          if (isDisabled) {
            textarea.placeholder = '';
            chatInput.classList.add('vf-no-border');
            button.classList.add('vf-hide-button');
          } else {
            textarea.placeholder = 'Message...';
            chatInput.classList.remove('vf-no-border');
            button.classList.remove('vf-hide-button');
          }
        }
      }
    }

    toggleInput();
  },
};

// 🙈 Hide input container (volledig verbergen)
export const HideInputExtension = {
  name: "HideInputContainer",
  type: "effect",
  match: ({ trace }) => trace.type === "ext_hide_input" || trace.payload?.name === "ext_hide_input",
  effect: () => {
    const chatDiv = document.getElementById("voiceflow-chat");
    if (chatDiv && chatDiv.shadowRoot) {
      const shadowRoot = chatDiv.shadowRoot;
      const inputContainer = shadowRoot.querySelector(".vfrc-input-container");
      if (inputContainer) inputContainer.style.display = "none";
    }
  }
};

// 👀 Show input container (weer zichtbaar maken)
export const ShowInputExtension = {
  name: "ShowInputContainer",
  type: "effect",
  match: ({ trace }) => trace.type === "ext_show_input" || trace.payload?.name === "ext_show_input",
  effect: () => {
    const chatDiv = document.getElementById("voiceflow-chat");
    if (chatDiv && chatDiv.shadowRoot) {
      const shadowRoot = chatDiv.shadowRoot;
      const inputContainer = shadowRoot.querySelector(".vfrc-input-container");
      if (inputContainer) inputContainer.style.display = "";
    }
  }
};
