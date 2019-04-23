var loadingState = false;

function newchance() {
    if (!this.loadingState) {
        loading();
        invisible();
        $.ajax({
            type: 'GET',
            url: '/chance/newtry'
        }).done(function (response) {
            if (response) {
                revealResult();
            }
        });
        loading();
    } else {
        return false;
    }
}

function revealResult() {
    $.ajax({
        type: 'GET',
        url: '/chance/getdaysum'
    }).done(function (response) {
        var r = response["0"]["daysum"];
        console.log(r)
        if (r % 7 == 0) {
            console.log('You got a beer');
            modalShow('Herzlich Glückwunsch ! Du hast ein Beer gewonnen.');
            visible();
            animate();
        } else {
            modalShow('Leider dieses Mal du hast nix gewonnen.');
        }
    });
}

function invisible() {
    $('#canvas').hide();
}

function visible() {
    sound();
    $('#canvas').show();
}

function sound() {
    var audio = new Audio('./static/sounds/firework.wav');
    audio.play();
}
async function loading() {
    if (this.loadingState == false) {
        this.loadingState = true;
        el = document.createElement('i');
        el.className = 'fa fa-spinner fa-spin';
        document.getElementById("mychance").appendChild(el);
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve($(".fa").remove(), this.loadingState = false), 1000);
        });
        let res = await promise;
        return res;
    }
}

// When the user clicks the button, open the modal 
function modalShow(m) {
    $('#myModal').css('display', 'block');
    $('#modalMsg').html(m);
}
// When the user clicks on <span> (x), close the modal
function hide() {
    $('#myModal').css('display', 'none');
}
window.onclick = function (event) {
    if (event.target == document.getElementById('myModal')) {
        $('#myModal').css('display', 'none');
    }
}