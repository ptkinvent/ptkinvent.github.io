/**
 * @date 12/11/20
 * @copyright Prateek Sahay
 */

function createCloseAlertButton(alert) {
    var closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('class', 'close');
    closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
    closeButton.addEventListener('click', function() {
        // Hides answer
        alert.setAttribute('style', 'display: none');
    });
    alert.appendChild(closeButton);
}

class ExplanationQuestion {
    constructor(questionText) {
        this.questionText = questionText;
    }

    render(wrapper) {
        // Question text
        let question = document.createElement('h5');
        question.setAttribute('class', 'mt-4');
        question.innerHTML = this.questionText;
        wrapper.appendChild(question);
    }
}

class TextQuestion {
    constructor(questionText, answerText) {
        this.questionText = questionText;
        this.answerText = answerText;
    }

    render(wrapper) {
        let questionText = this.questionText;
        let answerText = this.answerText;

        // Question text
        let question = document.createElement('h5');
        question.setAttribute('class', 'mt-4');
        question.innerHTML = questionText;
        wrapper.appendChild(question);

        // Text input
        var textInput = document.createElement('textarea');
        textInput.setAttribute('class', 'form-control mb-3')
        textInput.setAttribute('rows', '5')
        wrapper.appendChild(textInput);

        // Answer blurb
        var answerAlert = document.createElement('div');
        answerAlert.setAttribute('class', 'alert alert-primary');
        answerAlert.innerHTML = answerText;
        answerAlert.setAttribute('style', 'display: none');
        createCloseAlertButton(answerAlert);
        wrapper.appendChild(answerAlert);

        // Show answer button
        var showAnswer = document.createElement('button');
        showAnswer.setAttribute('class', 'btn btn-outline-primary');
        showAnswer.innerHTML = 'Show Answer';
        showAnswer.addEventListener('click', function() {
            // Shows answer
            answerAlert.setAttribute('style', 'display: block');
        });
        wrapper.appendChild(showAnswer);
    }
}

class NumericalQuestion {
    constructor(questionText, answer, answerIsDollars, answerText) {
        this.questionText = questionText;
        this.answer = answer;
        this.answerIsDollars = answerIsDollars;
        this.answerText = answerText;
    };

    render(wrapper) {
        let questionId = this.questionText;
        let answer = this.answer;

        let question = document.createElement('h5');
        question.setAttribute('class', 'mt-4');
        question.innerHTML = this.questionText;
        wrapper.appendChild(question);

        // Form container
        var formContainer = document.createElement('div');
        formContainer.setAttribute('class', 'input-group mb-3');
        wrapper.appendChild(formContainer);

        // Input group prepend
        if (this.answerIsDollars) {
            var inputPrepend = document.createElement('div');
            inputPrepend.setAttribute('class', 'input-group-prepend');
            inputPrepend.innerHTML = '<span class="input-group-text">$</span>';
            formContainer.appendChild(inputPrepend);
        }

        // Text input
        var textInput = document.createElement('input');
        textInput.setAttribute('type', 'number');
        textInput.setAttribute('step', '0.01');
        textInput.setAttribute('class', 'form-control');
        textInput.setAttribute('name', questionId);
        textInput.setAttribute('id', questionId);
        textInput.setAttribute('value', 0);
        formContainer.appendChild(textInput);

        // Input group append
        var inputAppend = document.createElement('div');
        inputAppend.setAttribute('class', 'input-group-append');
        formContainer.appendChild(inputAppend);

        // Correct answer blurb
        var correctAlert = document.createElement('div');
        correctAlert.setAttribute('class', 'alert alert-success');
        correctAlert.innerHTML = 'Correct! ' + this.answerText;
        correctAlert.setAttribute('style', 'display: none');
        createCloseAlertButton(correctAlert);
        wrapper.appendChild(correctAlert);

        // Incorrect answer blurb
        var incorrectAlert = document.createElement('div');
        incorrectAlert.setAttribute('class', 'alert alert-warning');
        incorrectAlert.innerHTML = 'Sorry, didn\'t catch that!';
        incorrectAlert.setAttribute('style', 'display: none');
        createCloseAlertButton(incorrectAlert);
        wrapper.appendChild(incorrectAlert);

        // Answer blurb
        var answerAlert = document.createElement('div');
        answerAlert.setAttribute('class', 'alert alert-primary');
        answerAlert.innerHTML = this.answerText;
        answerAlert.setAttribute('style', 'display: none');
        createCloseAlertButton(answerAlert);
        wrapper.appendChild(answerAlert);

        // Check answer button
        var checkAnswer = document.createElement('button');
        checkAnswer.setAttribute('class', 'btn btn-outline-secondary');
        checkAnswer.setAttribute('type', 'submit');
        checkAnswer.innerHTML = 'Check Answer';
        checkAnswer.addEventListener('click', function() {
            // Hides answer
            if (textInput.value == answer) {
                correctAlert.setAttribute('style', 'display: block');
                incorrectAlert.setAttribute('style', 'display: none');
                answerAlert.setAttribute('style', 'display: none');
            }
            else {
                correctAlert.setAttribute('style', 'display: none');
                incorrectAlert.setAttribute('style', 'display: block');
                answerAlert.setAttribute('style', 'display: none');
            }
        });
        inputAppend.appendChild(checkAnswer);

        // Show answer button
        var showAnswer = document.createElement('button');
        showAnswer.setAttribute('class', 'btn btn-outline-primary');
        showAnswer.innerHTML = 'Show Answer';
        showAnswer.addEventListener('click', function() {
            // Shows answer
            correctAlert.setAttribute('style', 'display: none');
            incorrectAlert.setAttribute('style', 'display: none');
            answerAlert.setAttribute('style', 'display: block');
        });
        inputAppend.appendChild(showAnswer);
    }
}

class MultipleChoiceQuestion {
    constructor(questionText, answers, answerText) {
        this.questionText = questionText;
        this.answers = answers;
        this.answerText = answerText;
    }

    render(wrapper) {
        let questionText = this.questionText;

        var question = document.createElement('h5');
        question.setAttribute('class', 'mt-4');
        question.innerHTML = questionText;
        wrapper.appendChild(question);

        for (const [answerText, isAnswerCorrect] of Object.entries(this.answers))
        {
            let questionId = questionText;
            let answerId = questionText + '_' + answerText;

            // Form container
            var formContainer = document.createElement('div');
            formContainer.setAttribute('class', 'form-check');
            wrapper.appendChild(formContainer);

            // Radio button
            var radio = document.createElement('input');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('class', 'form-check-input');
            radio.setAttribute('name', questionId);
            radio.setAttribute('id', answerId);
            radio.setAttribute('value', answerId);
            radio.addEventListener('click', function(arg) {
                return function() {
                    // Hide all alerts
                    let q = arg.getAttribute('name');
                    let answers = questions.find(x => x.questionText == q).answers;
                    for (let a in answers)
                    {
                        var alertId = q + '_' + a + '_alert';
                        document.getElementById(alertId).style.display = 'none';
                    }

                    // Show one alert
                    alertId = arg.getAttribute('id') + '_alert';
                    document.getElementById(alertId).style.display = 'block';
                }
            }(radio));
            formContainer.appendChild(radio);

            // Radio label
            var label = document.createElement('label');
            label.setAttribute('class', 'form-check-label');
            label.setAttribute('for', answerId);
            label.innerHTML = answerText;
            formContainer.appendChild(label);

            // Alert
            var alert = document.createElement('div');
            alert.setAttribute('style', 'display: none');
            alert.setAttribute('id', answerId + '_alert');
            if (isAnswerCorrect)
            {
                // Success
                alert.setAttribute('class', 'alert alert-success alert-dismissible');
                alert.innerHTML = 'Correct!';
                if (this.answerText) {
                    alert.innerHTML += ' ';
                    alert.innerHTML += this.answerText;
                }
            }
            else
            {
                // Warning
                alert.setAttribute('class', 'alert alert-warning alert-dismissible');
                if (answerText == 'CFO')
                {
                    alert.innerHTML = 'Couldn\'t hear you!';
                }
                else if (answerText == 'CFI')
                {
                    alert.innerHTML = 'Didn\'t catch that!';
                }
                else if (answerText == 'CFF')
                {
                    alert.innerHTML = 'Come again?';
                }
                else
                {
                    alert.innerHTML = 'Say that again?';
                }
            }
            formContainer.appendChild(alert);

            // Close alert button
            var closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('class', 'close');
            closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
            closeButton.addEventListener('click', function(arg){
                return function() {
                    let alertId = arg.getAttribute('id') + '_alert';
                    document.getElementById(alertId).style.display = 'none';
                    arg.checked = false;
                }
            }(radio));
            alert.appendChild(closeButton);
        }
    }
}

class Quiz {
    constructor(questions, isShuffle) {
        this.questions = questions;
        this.numQuestions = Object.keys(questions).length;
        this.isShuffle = isShuffle;
    }

    shuffle(list) {
        // Randomly reorder the given list
        length = list.length
        let shuffledList = [];
        for (var i=0; i<length-1; i++)
        {
            // Remove a random element from list and place it into shuffledList
            shuffledList.push(list.splice(Math.floor(Math.random()*list.length), 1)[0]);
        }
        shuffledList.push(list[0]); // Push remaining item into shuffledList
        return shuffledList;
    }

    render() {
        if (this.isShuffle == true) {
            this.questions = this.shuffle(this.questions);
        }

        var wrapper = document.getElementById('js_wrapper');
        for (let q of this.questions)
        {
            q.render(wrapper);
        }
    }
}
