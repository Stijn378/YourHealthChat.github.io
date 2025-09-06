export const HideInputExtension = {
  name: "HideInputContainer",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_hide_input" || trace.payload?.name === "ext_hide_input",
  effect: ({ trace }) => {
    console.log("🔹 HideInputExtension triggered", trace);

    const chatDiv = document.getElementById("voiceflow-chat");

    if (chatDiv && chatDiv.shadowRoot) {
      const shadowRoot = chatDiv.shadowRoot;

      // Probeer beide mogelijke input containers
      const inputContainer =
        shadowRoot.querySelector(".vfrc-input-container") ||
        shadowRoot.querySelector(".vfrc-chat-input");

      if (inputContainer) {
        inputContainer.style.display = "none";
        console.log("✅ Input field hidden");
      } else {
        console.warn("⚠️ Input container not found inside shadow root");
      }
    } else {
      console.warn("⚠️ voiceflow-chat or shadowRoot not found");
    }
  },
};
