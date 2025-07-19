// kb-upload-extension.js

export const KBUploadExtension = {
  name: 'ext_KBUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_KBUpload' ||
    (trace.payload && trace.payload.name === 'ext_KBUpload'),

  render: ({ trace, element }) => {
    const userID = trace.payload?.userID;
    if (!userID) {
      element.innerHTML = '<span style="color:red;">❌ userID missing, cannot proceed</span>';
      return;
    }

    const apiKey = trace.payload?.apiKey;
    if (!apiKey) {
      element.innerHTML = '<span style="color:red;">❌ API key missing, upload not possible</span>';
      return;
    }

    element.innerHTML = `
      <div style="border: 2px dashed #ccc; padding: 30px; text-align: center; border-radius: 10px;">
        <p>Select a PDF file to upload</p>
        <input type="file" accept=".pdf" style="margin: 10px 0;">
        <div class="upload-status" style="margin-top: 15px;"></div>
      </div>
    `;

    const fileInput = element.querySelector('input[type="file"]');
    const statusArea = element.querySelector('.upload-status');

    fileInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file || !file.name.endsWith('.pdf')) {
        statusArea.innerHTML = '<span style="color:red;">❌ Only PDF files are allowed</span>';
        return;
      }

      statusArea.innerHTML = '⏳ Uploading to Voiceflow...';

      try {
        const formData = new FormData();
        const timestamp = Date.now();
        const uniqueFileName = `${timestamp}_${file.name}`;
        const renamedFile = new File([file], uniqueFileName, { type: file.type });

        formData.append('file', renamedFile);

        const metadata = {
            userID: userID,
            fileName: uniqueFileName,
            uploadedAt: new Date().toISOString(),
            tags: ['upload']
        };

        formData.append('metadata', JSON.stringify(metadata));

        const response = await fetch('https://api.voiceflow.com/v1/knowledge-base/docs/upload?overwrite=true', {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'User-Agent': 'insomnia/8.0.0'
          },
          body: formData
        });

        if (!response.ok) {
          const errorText = await response.text();
          statusArea.innerHTML = `<span style="color:red;">❌ Upload failed:<br>${errorText}</span>`;
          return;
        }

        const result = await response.json();

        await window.voiceflow.chat.interact({
          type: 'complete',
          payload: {
            id: result.data?.documentID || 0,
            userID: userID
          }
        });

        statusArea.innerHTML = '<span style="color:green;">✅ Upload successful!</span>';
      } catch (err) {
        statusArea.innerHTML = `<span style="color:red;">❌ Upload failed: ${err.message}</span>`;
      }
    });
  }
};
