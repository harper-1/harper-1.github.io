/**
 * Number of photos
 **/
var numberPhotos = 36;

function setImageProperties(img, imgPath) {
    var landscape = this.width > this.height;
    img.style.width = landscape ? '100%' : 'auto';
    img.style.height = !landscape ? '100%' : 'auto';
    img.setAttribute('src', imgPath);
    img.setAttribute('alt', imgPath.replace('images/', ''));
}

function addFullScreen(img) {
    img.onclick = function () {
        var imgPath = this.getAttribute('src');
        var wrapper = document.createElement('div');
        var div = document.createElement('div');
        var img = document.createElement('img');
        var overlay = document.createElement('div');

        wrapper.className = `full-screen`;
        overlay.className = 'overlay';

        setImageProperties.call(this, img, imgPath);
        div.appendChild(img);
        wrapper.appendChild(div);
        wrapper.appendChild(overlay);
        document.body.appendChild(wrapper);

        $('header').addClass('black');
        div.onclick = overlay.onclick = function (e) {
            if (e.target.tagName !== "IMG") {
                wrapper.remove();
                $('header').removeClass('black');
            }
        };
    }
}

function findNumberOfColumns() {
    var width = document.body.clientWidth;
    return width > 800 ? 3 : width > 550 ? 2 : 1;
}

$(document).ready(function() {
    var container = $('.images-list')[0];
    var nColumns = findNumberOfColumns();
    var columns = [];

    for (let i = 0; i < nColumns; i++) {
        var div = document.createElement('div');
        div.className = `images-column images-column-${i + 1}`;
        columns.push(div);
        container.appendChild(div)
    }

    for (let i = 1; i <= numberPhotos; i++) {
        var div = document.createElement('div');
        var img = document.createElement('img');

        div.className = 'image-item';
        img.setAttribute('src', `images/${i}.jpg`);
        img.setAttribute('alt', `${i}.jpg`);

        addFullScreen(img);

        div.appendChild(img);

        switch (i % nColumns) {
            case 0:
                columns[nColumns - 1].appendChild(div);
                break;
            case 2:
                columns[nColumns - 2].appendChild(div);
                break;
            default:
                columns[0].appendChild(div);
                break;
        }
    }
});