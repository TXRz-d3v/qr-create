var download = document.getElementById('btn-download');
var inp = document.getElementById('qr-text');
var btn = document.getElementById('btn-generate');
var box = document.getElementById('qr-preview');
var darkColor = document.getElementById('qr-dark');
var lightColor = document.getElementById('qr-light');
var lastLight = "#F9F7F7";
var timer;

btn.onclick = function () {
    var txt = inp.value;

    if (txt.trim() == "") {
        alert("ใส่ลิงก์หรือข้อความที่ต้องการสร้าง QR Code");
        return;
    }

    var dark = darkColor.value;
    var light = lightColor.value;
    lastLight = light;

    download.disabled = true;
    box.innerHTML = '<div class="spinner"></div>';

    clearTimeout(timer);
    timer = setTimeout(function () {
        box.innerHTML = "";

        new QRCode(box, {
            text: txt,
            width: 240,
            height: 240,
            colorDark: dark,
            colorLight: light
        });

        download.disabled = false;
    }, 1000);
};

inp.onkeydown = function (e) {
    if (e.key == "Enter") {
        btn.onclick();
    }

}

download.onclick = function () {
    var canvas = box.querySelector('canvas');
    var img = box.querySelector('img');
    var source = canvas || img;

    if (!source) return;

    var pad = 20;
    var out = document.createElement('canvas');
    out.width = 240 + pad * 2;
    out.height = 240 + pad * 2;

    var ctx = out.getContext('2d');
    ctx.fillStyle = lastLight;
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(source, pad, pad, 240, 240);

    var link = document.createElement('a');
    link.href = out.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
};

var presets = document.querySelectorAll('.preset');

presets.forEach(function (p) {
    p.style.backgroundColor = p.getAttribute('data-dark');
    p.style.borderColor = p.getAttribute('data-light');

    p.onclick = function () {
        darkColor.value = p.getAttribute('data-dark');
        lightColor.value = p.getAttribute('data-light');

        if (inp.value.trim() != "") {
            btn.onclick();
        }
    };
});