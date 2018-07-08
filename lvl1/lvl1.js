const dropZone = document.getElementById('dropZone');
const fileNameInput = document.getElementById('fileNameInput');
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
    gif.insertAdjacentHTML(
      'beforeend',
      `<img src="../oneloop.gif">`)
});
