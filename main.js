_386 = { onePass: true, speedFactor: 1.25 };

var originalAnswer = ''

function createContainer(extra) {
    $('.answer-box').empty();
    for( var i = 0; i < 17; i++) {
        setTimeout(function() { 
            $('<div class="block ' + extra + '" />').appendTo('.answer-box');
        }, 100*i)  
    }
    removeContainer(extra);
    setTimeout(printAnswer, 1700);
}

function removeContainer(extra) {
    $('.answer-box').empty();
    for( var i = 17; i > 0; i--) {
        setTimeout(function() { $('.block.' + extra).eq(i).remove()}, 100*(17 + i))  
    }
}

function getAnswer() {
    createContainer('block-left');
    createContainer('block-right');
}

function printAnswer() {
    var answers = [
        'Tire suas mãos sujas deste teclado!',
        'Saia daqui e deixe as perguntas para quem serve a mim!',
        'Você não tem capacidade de fazer uma pergunta direito!',
        'Sai deste teclado otário!'
    ]

    var item = answers[Math.floor(Math.random()*answers.length)];

    $('.answer-line').empty();
    $('<div class="answer-line" />').html(originalAnswer.length ? originalAnswer.substring(1) : item).appendTo('.answer-box');

}

function startMask(e) {
    maskOn();
    e.preventDefault();
}

function maskOn() {
    var questions = [
        'Querido computador, razão da minha vida, venho por meio deste lhe perguntar sobre questões deste universo que sei que na sua magnitude você terá a resposta'
    ];
    var item = questions[Math.floor(Math.random()*questions.length)];

    $('#inputQuestion').on('keydown',function(event) {
        originalAnswer += String.fromCharCode(event.keyCode)
        if(event.keyCode === 13) {
            $('#inputQuestion').off('keydown');   
            return false;
        } else {
            if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
                var value = $('#inputQuestion').val();
                $('#inputQuestion').val(value.substring(-1) + item.charAt(value.length))
                event.preventDefault();
            }
        }
    });
}

$(function() {
    $('#inputQuestion').on('keydown',function(e) {
        if(e.keyCode === 186) {
            startMask(e);
        }
    });

    $('#question-form').on('submit', function(e) {
        getAnswer();
        //var audio = new Audio('audio_file.mp3');
        //audio.play()
        return false;
    });

});