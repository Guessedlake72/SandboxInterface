axios.defaults.headers.common = {
"X-API-Key": "636af092e9a77f5984220834",  
};
  
  document.getElementById("input-file").addEventListener("change", (e) => {
    if (e.target.files.length) {
      document.getElementById("input-file-label").innerHTML = e.target.files[0].name;
    }
  });
  
  async function uploadFile() {
    let messageElement = document.getElementById("message");
    messageElement.innerHTML = "";
  
    const selectedFile = document.getElementById("input-file").files[0];
    let formData = new FormData();
  
    formData.append("file", selectedFile);
  
    document.getElementById("progress").style.display = "flex";
    let progressBarElement = document.getElementById("progress-bar");
    progressBarElement.innerHTML = "0%";
    progressBarElement.setAttribute("aria-valuenow", 0);
    progressBarElement.style.width = "0%";
  
    const onUploadProgress = (event) => {
      const percentage = Math.round((100 * event.loaded) / event.total);
      progressBarElement.innerHTML = percentage + "%";
      progressBarElement.setAttribute("aria-valuenow", percentage);
      progressBarElement.style.width = percentage + "%";
    };
  
    try {
      const res = await axios.post("https://vrsandbox-62fc.restdb.io/rest/models", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data
      };
  
      messageElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
      messageElement.innerHTML = htmlizeResponse(err);
    }
  }
  
  async function getFiles() {
    let messageElement = document.getElementById("message");
    messageElement.innerHTML = "";
  
    let filesElement = document.getElementById("list-files");
    filesElement.innerHTML = "";
    /*
    try {
      const res = await axios.get("https://vrsandbox-62fc.restdb.io/rest/models");
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
      };
  
      messageElement.innerHTML = htmlizeResponse(result);
      filesElement.innerHTML = getHTMLFiles(res.data);
      document.getElementById("list-files").style.display = "block";
    } catch (err) {
      messageElement.innerHTML = htmlizeResponse(err);
    }
    */
    const fs = require('fs');

    axios.get('https://vrsandbox-62fc.restdb.io/rest/models?q=%7B%22_id%22%3A%226473712e71c2646200072f5f%22%7D    ', {
        responseType: 'stream', // Set the response type to receive a stream
      })
        .then(response => {
          // Create a write stream to save the file
          const fileStream = fs.createWriteStream('path/to/save/file.txt');
      
          // Pipe the response stream to the file stream
          response.data.pipe(fileStream);
      
          // Listen for the 'finish' event to know when the file has finished downloading
          fileStream.on('finish', () => {
            console.log('File downloaded successfully');
          });
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
  }
  
  function htmlizeResponse(res) {
    return (
      `<div class="alert alert-secondary mt-2" role="alert"><pre>` +
      JSON.stringify(res, null, 2) +
      "</pre></div>"
    );
  }
  
  function getHTMLFiles(fileInfos) {
    if (fileInfos && fileInfos.length) {
      const files = fileInfos.map(
        (file, index) =>
          `<li class="list-group-item" key='` + index + `'>\
            <a href='` + file.url + `'>` + file.name + `</a>\
          </li>`
      );
  
      return (
        `<div class="card-header">List of Files</div>\
          <ul class="list-group list-group-flush">` +
        files.join("") +
        `</ul>`
      );
    }
  
    return `No file was found!`;
  }