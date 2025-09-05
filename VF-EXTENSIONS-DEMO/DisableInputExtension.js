export const DisableInputExtension = {
  name: 'DisableInput',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_disableInput' ||
    trace.payload?.name === 'ext_disableInput',
  effect: ({ trace }) => {
    const { isDisabled } = trace.payload;

    function disableInput() {
      const chatDiv = document.getElementById('voiceflow-chat');

      if (chatDiv) {
        const shadowRoot = chatDiv.shadowRoot;
        if (shadowRoot) {
          const chatInput = shadowRoot.querySelector('.vfrc-chat-input');
          const textarea = shadowRoot.querySelector(
            'textarea[id^="vf-chat-input--"]'
          );
          const button = shadowRoot.querySelector('.vfrc-chat-input--button');

          if (chatInput && textarea && button) {
            // Add a style tag if it doesn't exist
            let styleTag = shadowRoot.querySelector('#vf-disable-input-style');
            if (!styleTag) {
              styleTag = document.createElement('style');
              styleTag.id = 'vf-disable-input-style';
              styleTag.textContent = `
                .vf-no-border, .vf-no-border * {
                  border: none !important;
                }
              `;
              shadowRoot.appendChild(styleTag);
            }

            // Function to prevent typing
            function preventTyping(e) {
              e.preventDefault();
            }

            function updateInputState() {
              textarea.disabled = isDisabled;

              if (isDisabled) {
                textarea.placeholder = '';
                chatInput.classList.add('vf-no-border');

                // Button blijft zichtbaar zodat Privacy Policy klikbaar is
                // button.classList.add('vf-hide-button') <-- verwijderd

                // Blokkeer echt typen
                textarea.addEventListener('keydown', preventTyping, true);
                textarea.addEventListener('paste', preventTyping, true);
              } else {
                textarea.placeholder = 'Message...';
                chatInput.classList.remove('vf-no-border');

                // Verwijder event listeners zodat typen weer kan
                textarea.removeEventListener('keydown', preventTyping, true);
                textarea.removeEventListener('paste', preventTyping, true);
              }

              // Trigger events om component state te updaten
              textarea.dispatchEvent(
                new Event('input', { bubbles: true, cancelable: true })
              );
              textarea.dispatchEvent(
                new Event('change', { bubbles: true, cancelable: true })
              );
            }

            // Store original value descriptor (zoals in expert code)
            const originalValueDescriptor = Object.getOwnPropertyDescriptor(
              HTMLTextAreaElement.prototype,
              'value'
            );

            // Initial update
            updateInputState();
          } else {
            console.error('Chat input, textarea, or button not found');
          }
        } else {
          console.error('Shadow root not found');
        }
      } else {
        console.error('Chat div not found');
      }
    }

    disableInput();
  },
};
