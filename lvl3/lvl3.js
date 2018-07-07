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

    fileNameInput.insertAdjacentHTML('beforeend', `${fileName}`);

    fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', { method: 'POST', body: files[0] })
      .then(response => response.json())
      .then((data) => {
        fileUploaded.insertAdjacentHTML('beforeend', "- File created !")
         fetch(`http://hapi.fhir.org/baseDstu3/Binary`)
          .then(response => response.json())
          .then((data) => {
            downloadMe.insertAdjacentHTML('beforeend',
              `<form action="https://fhirtest.uhn.ca/baseDstu3/Binary/${data.entry[0].resource.id}/_history/1">
                <input type="submit" value="Download me !" />
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
                var img = document.createElement('img');
                img.src= e2.target.result;
                document.body.appendChild(img);
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
