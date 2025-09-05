// VF-EXTENSIONS-DEMO/DisableInputExtension.js

// ---- util: vind input elementen in de shadow DOM, ongeacht versie ----
function findInputParts(root) {
  const container =
    root.querySelector('.vfrc-input-container') ||
    root.querySelector('.vfrc-chat-input') ||
    root.querySelector('[class*="input"][class*="container"]');

  const textarea =
    root.querySelector('textarea[id^="vf-chat-input--"]') ||
    root.querySelector('textarea.vfrc-input') ||
    root.querySelector('textarea[aria-label="Message input"]') ||
    root.querySelector('textarea');

  const sendButton =
    root.querySelector('.vfrc-chat-input--button') ||
    root.querySelector('button[aria-label="Send"]') ||
    root.querySelector('button[type="submit"]');

  return { container, textarea, sendButton };
}

// ---- util: voer actie uit zodra input bestaat (met timeout) ----
function whenInputReady(fn, timeoutMs = 5000) {
  const chatDiv = document.getElementById('voiceflow-chat');
  if (!chatDiv) return;

  const tryOnce = () => {
    const sr = chatDiv.shadowRoot;
    if (!sr) return false;
    const parts = findInputParts(sr);
    if (parts.container || parts.textarea || parts.sendButton) {
      fn(sr, parts);
      return true;
    }
    return false;
  };

  if (tryOnce()) return;

  const start = Date.now();
  const observer = new MutationObserver(() => {
    if (tryOnce() || Date.now() - start > timeoutMs) observer.disconnect();
  });
  observer.observe(chatDiv, { subtree: true, childList: true });
}

// ---- Disable/Enable typing (zet disabled + pointer-events) ----
export const DisableInputExtension = {
  name: 'DisableInput',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_disableInput' ||
    trace.type === 'ext_disable_input' ||
    trace.payload?.name === 'ext_disableInput' ||
    trace.payload?.name === 'ext_disable_input',
  effect: ({ trace }) => {
    const isDisabled = Boolean(trace?.payload?.isDisabled);

    whenInputReady((sr, parts) => {
      const { container, textarea, sendButton } = parts;

      if (textarea) {
        textarea.disabled = isDisabled;
        // visuele hint + voorkom focus
        textarea.style.pointerEvents = isDisabled ? 'none' : '';
        textarea.style.opacity = isDisabled ? '0.6' : '';
        textarea.placeholder = isDisabled ? '' : (textarea.placeholder || 'Message...');
      }

      if (sendButton) {
        sendButton.disabled = isDisabled;
        sendButton.style.pointerEvents = isDisabled ? 'none' : '';
        sendButton.style.opacity = isDisabled ? '0.6' : '';
      }

      if (container) {
        container.style.pointerEvents = isDisabled ? 'none' : '';
      }

      console.debug('[DisableInputExtension]', { isDisabled, found: !!(container||textarea||sendButton) });
    });
  },
};

// ---- Hide input container volledig ----
export const HideInputExtension = {
  name: 'HideInputContainer',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_hide_input' || trace.payload?.name === 'ext_hide_input',
  effect: () => {
    whenInputReady((sr, { container }) => {
      if (container) container.style.display = 'none';
      console.debug('[HideInputExtension] applied');
    });
  },
};

// ---- Show input container ----
export const ShowInputExtension = {
  name: 'ShowInputContainer',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_show_input' || trace.payload?.name === 'ext_show_input',
  effect: () => {
    whenInputReady((sr, { container }) => {
      if (container) container.style.display = '';
      console.debug('[ShowInputExtension] applied');
    });
  },
};
