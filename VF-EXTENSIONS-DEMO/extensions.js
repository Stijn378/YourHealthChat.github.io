// KBUploadExtension en andere extensies
export const KBUploadExtension = {
  name: 'ext_KBUpload',
  init: function ({ trace, variables }) {
    const container = document.createElement('div');
    container.id = 'kbfile-upload-container';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.style.display = 'block';

    const kbfileUploadContainer = document.createElement('div');
    kbfileUploadContainer.appendChild(fileInput);
    container.appendChild(kbfileUploadContainer);

    const apiKey = trace.payload?.apiKey;
    const userID = trace.payload?.userID || 'onbekend';

    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      const fileName = file.name;
      const uploadTime = new Date().toISOString();

      kbfileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`;

      const tempData = new FormData();
      tempData.append('file', file);

      // Stap 1: Upload naar tmpfiles.org
      fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: tempData,
      })
        .then((response) => response.json())
        .then((result) => {
          const fileUrl = result.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');

          // Stap 2: Upload naar Voiceflow KB met metadata
          const vfBody = {
            data: {
              type: 'url',
              url: fileUrl,
              metadata: {
                userID: userID,
                fileName: fileName,
                uploadedAt: uploadTime
              }
            }
          };

          return fetch('https://api.voiceflow.com/v1/knowledge-base/docs/upload?maxChunkSize=1000', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json; charset=utf-8',
              Authorization: apiKey
            },
            body: JSON.stringify(vfBody)
          });
        })
        .then((response) => response.json())
        .then((result) => {
          kbfileUploadContainer.innerHTML = '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">';
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: {
              id: result.data?.documentID || 0,
            }
          });
        })
        .catch((error) => {
          console.error(error);
          kbfileUploadContainer.innerHTML = '<div>Fout tijdens upload</div>';
        });
    });

    return { element: container };
  }
};

// Dummy extensies (allemaal lege voorbeeldextensies die nodig zijn voor de lijst)
export const DisableInputExtension = { name: 'DisableInputExtension', init: () => {} };
export const VideoExtension = { name: 'VideoExtension', init: () => {} };
export const TimerExtension = { name: 'TimerExtension', init: () => {} };
export const FormExtension = { name: 'FormExtension', init: () => {} };
export const MapExtension = { name: 'MapExtension', init: () => {} };
export const FileUploadExtension = { name: 'FileUploadExtension', init: () => {} };
export const DateExtension = { name: 'DateExtension', init: () => {} };
export const ConfettiExtension = { name: 'ConfettiExtension', init: () => {} };
export const FeedbackExtension = { name: 'FeedbackExtension', init: () => {} };

// ⬇️ DEZE REGEL IS HET BELANGRIJKSTE VOOR JE LIVE WEBSITE
window.Extensions = [
  DisableInputExtension,
  VideoExtension,
  TimerExtension,
  FormExtension,
  MapExtension,
  FileUploadExtension,
  KBUploadExtension,
  DateExtension,
  ConfettiExtension,
  FeedbackExtension
];
