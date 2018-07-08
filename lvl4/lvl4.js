const dropZone = document.getElementById('dropZone');
const fileNameInput = document.getElementById('fileNameInput');
const pause = document.getElementById('pause');
const fileUploaded = document.getElementById('fileUploaded');
const download = document.getElementById('download');
const fetched = document.getElementById('fetched');
const findTotal = document.getElementById('findTotal');
const btn = document.getElementById('btn');


fetch(`http://hapi.fhir.org/baseDstu3/Binary`)
  .then(response => response.json())
  .then((data) => {
    findTotal.insertAdjacentHTML('beforeend', `${data.total}`);
  });

dropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});

dropZone.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;

    const fileName = files[0].name;

    fileNameInput.innerHTML = ""
    fileNameInput.insertAdjacentHTML('beforeend', `${fileName}`);
    gif.insertAdjacentHTML(
      'beforeend',
      `<img src="../oneloop.gif">`)

    fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', { method: 'POST', body: files[0] })
      .then(response => response.json())
      .then((data) => {
        fileUploaded.innerHTML = ""
        fileUploaded.insertAdjacentHTML('beforeend', " - <strong>File uploaded !</strong>")
         fetch(`http://hapi.fhir.org/baseDstu3/Binary`)
          .then(response => response.json())
          .then((data) => {
            findTotal.innerHTML = ""
            findTotal.insertAdjacentHTML('beforeend', `${data.total}`);
          });
      });

      for (var i=0, file; file=files[i]; i++) {
        if (file.type.match(/image.*/)) {
          var reader = new FileReader();

          reader.onload = function(e2) {
            // finished reading file data.
            const img = document.createElement('img');
            const displayImg = document.getElementById('displayImg');
            img.src = e2.target.result;
            displayImg.innerHTML = ""
            displayImg.appendChild(img);
          }

          reader.readAsDataURL(file);
        }
    }

});

window.setInterval(function(){
  fetch(`http://hapi.fhir.org/baseDstu3/Binary`)
    .then(response => response.json())
    .then((data) => {
      findTotal.innerHTML = ""
      findTotal.insertAdjacentHTML('beforeend', `${data.total}`);
    });
}, 1000);


fetched.addEventListener('click', function(e) {
  fetch(`http://hapi.fhir.org/baseDstu3/Binary`)
    .then(response => response.json())
    .then((data) => {
      const files = data.entry
      download.innerHTML = ""
      start = 0
      files.forEach(function(i) {
        // console.log(i)
        start ++
        download.insertAdjacentHTML(
          'beforeend',
          `<div class="${i.resource.id}">
            <a href="${i.fullUrl}">${start} - Download</a>
          </div>`)
        console.log(i.fullUrl)
        console.log(i)
      })
      });
});
