export const ShowInputExtension = {
  name: "ShowInputContainer",
  type: "effect",
  match: ({ trace }) => trace.type === "ext_show_input" || trace.payload?.name === "ext_show_input",
  effect: ({ trace }) => {
    const chatDiv = document.getElementById("voiceflow-chat");
    if (chatDiv && chatDiv.shadowRoot) {
      const shadowRoot = chatDiv.shadowRoot;
      const inputContainer = shadowRoot.querySelector(".vfrc-input-container");
      if (inputContainer) inputContainer.style.display = "";
    }
  }
};
