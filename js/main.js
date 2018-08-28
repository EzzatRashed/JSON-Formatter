var Orientation = "horizontal";

function changeOrientation(){
    document.querySelector('#input').removeAttribute("style");
    
    if(container.className == 'horizontal'){
        container.className = 'vertical';
        Orientation = 'vertical';
    } else {
        container.className = 'horizontal';
        Orientation = 'horizontal';
    }
}

function openStylesMenu(){
    document.querySelector('#styles_menu').classList.toggle('visible');
}

function changeStyle(e){
    document.querySelector('#table').className = e.dataset.class;
}

function convertJSON(){
    var inputValue = document.querySelector('#input').value;

    if(inputValue == ''){
        document.querySelector('#table').innerHTML = '<h2 style="color:red; text-align:center;">Please insert some JSON!</h2>';
        return;
    }

    try {
        var json = JSON.parse(inputValue);
    } catch (e) {
        document.querySelector('#table').innerHTML = '<h1 style="color:red; text-align:center;">' + e + '</h1>';
        return;
    }

    console.log(json);
}

document.addEventListener("DOMContentLoaded", function(event) {
    var handler = document.querySelector('#handler');
    var container = handler.closest('#container');
    var input = container.querySelector('#input');
    var output = container.querySelector('#output');
    var stylesMenu = document.querySelector('#styles_menu');
    var isHandlerDragging = false;

    document.addEventListener('mousedown', function(e) {
        if (e.target === handler) {
            isHandlerDragging = true;
            output.classList.add("noselect");
        }
    });


    document.addEventListener('mousemove', function(e) {
        if (!isHandlerDragging) {
            return false;
        }     

        if (Orientation == "vertical"){
            var containerOffsetLeft = container.offsetLeft;
            var pointerRelativeXpos = e.clientX - containerOffsetLeft;

            input.style.width = (pointerRelativeXpos - 18) + 'px';
            input.style.flexGrow = 0;
        } else {
            var containerOffsetTop = container.offsetTop;
            var pointerRelativeYpos = e.clientY - containerOffsetTop;
            
            input.style.height = (pointerRelativeYpos - 24) + 'px';
            input.style.flexGrow = 0;
        }
    });

    document.addEventListener('mouseup', function() {
        isHandlerDragging = false;
        output.classList.remove("noselect");
    });

    document.addEventListener('click', function(e){
        if (e.target.id !== 'styles_button'){
            stylesMenu.classList.remove('visible');
        }
    });
});