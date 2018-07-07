const dropZone = document.getElementById('dropZone');
const fileNameInput = document.getElementById('fileNameInput');
const pause = document.getElementById('pause');
const fileUploaded = document.getElementById('fileUploaded');
const downloadMe = document.getElementById('downloadMe');
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

    fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', { method: 'POST', body: files[0] })
      .then(response => response.json())
      .then((data) => {
        fileUploaded.innerHTML = ""
        fileUploaded.insertAdjacentHTML('beforeend', " - <strong>File created !</strong>")
         fetch(`http://hapi.fhir.org/baseDstu3/Binary`)
          .then(response => response.json())
          .then((data) => {
            downloadMe.innerHTML = ""
            downloadMe.insertAdjacentHTML('beforeend',
              `<form class="active" action="https://fhirtest.uhn.ca/baseDstu3/Binary/${data.entry[0].resource.id}/_history/1">
                <input type="submit" value="Download file" />
              </form>`)
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

          reader.readAsDataURL(file); // start reading the file data.
        }
    }

});

window.setInterval(function(){
  /// call your function here
  fetch(`http://hapi.fhir.org/baseDstu3/Binary`)
    .then(response => response.json())
    .then((data) => {
      findTotal.innerHTML = ""
      findTotal.insertAdjacentHTML('beforeend', `${data.total}`);
    });
}, 1000);
