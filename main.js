_386 = { onePass: true, speedFactor: 1.25 };

var originalAnswer = ''

function getUserLang() {
    var userLang = localStorage.getItem('userLang')
    var path = window.location.pathname
    if(path === '/pt-BR/' || path === '/pt-BR') { localStorage.setItem('userLang', 'pt-BR') }
    if((path === '/' || path === '') && userLang) { localStorage.setItem('userLang', 'en-US') }
    if(userLang) { return userLang } 
    var userBrowserLang = navigator.language || navigator.userLanguage || 'en-US';
    localStorage.setItem('userLang', userBrowserLang)
    return userLang
}

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
    var answers = []
    answers['pt-BR'] = [
        'Tire suas mãos sujas deste teclado!',
        'Saia daqui e deixe as perguntas para quem serve a mim!',
        'Você não tem capacidade de fazer uma pergunta direito!',
        'Sai deste teclado otário!'
    ]
    answers['en-US'] = [
        'Get out of my keyboard piece of shit!',
        'Get out and leave the questions for a servant to me!',
        "You can't do a question right!",
        'Get out of this keyboard asshole'
    ]

    var item = answers[getUserLang()][Math.floor(Math.random()*answers[getUserLang()].length)];

    $('.answer-line').empty();
    $('<div class="answer-line" />').html(originalAnswer.length ? originalAnswer : item).appendTo('.answer-box');

}

function startMask(e) {
    maskOn();
    e.preventDefault();
}

function maskOn() {
    var questions = []
    questions['pt-BR'] = [
        'Querido computador, razão da minha vida, venho por meio deste lhe perguntar sobre questões deste universo que sei que na sua magnitude você terá a resposta'
    ];
    questions['en-US'] = [
        'Dear computer, reason of my life, I want to gentle ask you about some questions surrounding the universe and I know of the power of your wise answers'
    ];
    var item = questions[getUserLang()][Math.floor(Math.random()*questions[getUserLang()].length)];

    $('#inputQuestion').on('keydown.mask',function(event) {
        if(event.keyCode === 13) {
            $('#inputQuestion').off('keydown.mask');   
            return false;
        } else {
            if((event.keyCode === 32) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
                originalAnswer += String.fromCharCode(event.keyCode)
                var value = $('#inputQuestion').val();
                $('#inputQuestion').val(value + item.charAt(value.length))
                event.preventDefault();
            }
        }
    });
}

$(function() {
    getUserLang()
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

    $('.language-bar li[lang="' + getUserLang() + '"]').addClass('active')

});