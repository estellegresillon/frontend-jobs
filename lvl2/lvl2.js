const dropZone = document.getElementById('dropZone');
const fileNameInput = document.getElementById('fileNameInput');
const fileUploaded = document.getElementById('fileUploaded');
const downloadMe = document.getElementById('downloadMe');
const gif = document.getElementById('gif');


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
    gif.innerHTML = ""
    gif.insertAdjacentHTML(
      'beforeend',
      `<img class="gifImg" src="../oneloop.gif">`)
    const gifImg = document.querySelector('.gifImg')
    gifImg.src = gifImg.src.replace(/\?.*$/,"")+"?x="+Math.random();

    fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', { method: 'POST', body: files[0] })
      .then(response => response.json())
      .then((data) => {
        fileUploaded.innerHTML = ""
        fileUploaded.insertAdjacentHTML('beforeend', " - <strong>File created !</strong>")
      });
});
