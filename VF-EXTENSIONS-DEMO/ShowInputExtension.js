export const ShowInputExtension = {
  name: "ShowInputContainer",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_show_input" || trace.payload?.name === "ext_show_input",
  effect: ({ trace }) => {
    console.log("🔹 ShowInputExtension triggered", trace);

    const chatDiv = document.getElementById("voiceflow-chat");

    if (chatDiv && chatDiv.shadowRoot) {
      const shadowRoot = chatDiv.shadowRoot;

      const inputContainer =
        shadowRoot.querySelector(".vfrc-input-container") ||
        shadowRoot.querySelector(".vfrc-chat-input");

      if (inputContainer) {
        inputContainer.style.display = "";
        console.log("✅ Input field visible again");
      } else {
        console.warn("⚠️ Input container not found inside shadow root");
      }
    } else {
      console.warn("⚠️ voiceflow-chat or shadowRoot not found");
    }
  },
};
