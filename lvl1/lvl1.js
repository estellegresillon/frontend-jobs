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

    displayImg.innerHTML = ""
    fileNameInput.innerHTML = ""
    fileNameInput.insertAdjacentHTML('beforeend', `${fileName}`);
    gif.innerHTML = ""
    gif.insertAdjacentHTML(
      'beforeend',
      `<img class="gifImg" src="../oneloop.gif">`)
    const gifImg = document.querySelector('.gifImg')
    gifImg.src = gifImg.src.replace(/\?.*$/,"")+"?x="+Math.random();
});
