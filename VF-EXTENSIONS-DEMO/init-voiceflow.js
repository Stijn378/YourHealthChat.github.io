import { KBUploadExtension } from 'https://cdn.jsdelivr.net/gh/Stijn378/VF-EXTENSIONS-DEMO/extensions.js';

(function (d, t) {
  const v = d.createElement(t),
        s = d.getElementsByTagName(t)[0];

  v.onload = function () {
    window.voiceflow.chat.load({
      verify: { projectID: '68761d18db709943185d26c9' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production',
      autostart: true,
      render: { mode: 'overlay' },
      assistant: {
        persistence: 'memory',
        extensions: [KBUploadExtension],
      }
    });
  };

  v.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
  v.type = 'text/javascript';
  s.parentNode.insertBefore(v, s);
})(document, 'script');
