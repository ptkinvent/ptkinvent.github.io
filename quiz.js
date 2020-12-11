class Question {
    constructor(questionText, answers) {
        this.questionText = questionText;
        this.answers = answers;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.numQuestions = Object.keys(questions).length;
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

    generateHtml() {
        questions = this.shuffle(this.questions)

        let i = 0;
        var wrapper = document.getElementById('js_wrapper');
        for (let q of questions)
        {
            let questionText = q.questionText;

            var question = document.createElement('h3');
            question.setAttribute('class', 'mt-4');
            question.innerHTML = 'Q' + ++i + '. ' + questionText;
            wrapper.appendChild(question);

            for (const [answerText, isAnswerCorrect] of Object.entries(q.answers))
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
                        q = arg.getAttribute('name');
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
                        alert.innerHTML = 'Say that one more time?';
                    }
                    else
                    {
                        alert.innerHTML = 'Come again?';
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
}
