const questions = {
    "emerging-tech": [
        {
            question: "What is your name",
            options: ["John", "Jane", "Margaret"],
            answer: ["John"]
        },
        { question: "How old are you?",
            options: [12, 15, 18],
            answer: [18]
        },
        { question: "What is your favorite color?",
            options: ["Red", "Blue", "Green"],
            answer: ["Blue"]
        },
        { question: "What is your favorite animal?",
            options: ["Dog", "Cat", "Bird"],
            answer: ["Cat"]
        }
    ],
    "algorithm": [
        {
            question: "What is 2 + 2?",
            options: [3, 4, 5],
            answer: [4]
        },
        { question: "What is 3 * 3?",
            options: [6, 9, 12],
            answer: [9]
        },
        { question: "What is 10 / 2?",
            options: [2, 5, 10],
            answer: [5]
        },
    ],
    "software": [
        {
            question: "What is 2 + 2?", 
            options: [3, 4, 5],
            answer: [4]
        },
        { question: "What is 3 * 3?",
            options: [6, 9, 12],
            answer: [9]
        }
    ]
}

function extractQuestions(topic_id) {
    // extract questions for the selected topic
    return questions[topic_id];
}

document.addEventListener("DOMContentLoaded", () => {
    // Declare variables
    const curriculum = document.querySelector("#curriculum");
    const topicDpd = document.querySelector("#topic");
    const btn = document.querySelector("button");
    let selectedTopic = topicDpd.value; // initialize selection

    // clear all topic sections
    function clearSections() {
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            section.classList.add("disappear");
        })
    }

    // Page refreshed
    window.onload = () => {
        topicDpd.selectedIndex = 0;
    }

    // Track selection
    topicDpd.onchange = () => {

        selectedTopic = topicDpd.value; // update selected topic

        if (!selectedTopic) { // if no selection made
            clearSections(); // clear all topics
            btn.disabled = true;
            curriculum.classList.remove("disappear"); // show curriculum DIV
        } else {
            btn.disabled = false;
        }

    }


    btn.onclick = () => {

        clearSections(); // clear all topic sections

        const topicSection = document.querySelector(`#${selectedTopic}`);

        curriculum.classList.add("disappear"); // hide curriculum DIV

        // Display content of the selected topic
        topicSection.classList.remove("disappear");
        getContent(selectedTopic); // Display quiz
        btn.disabled = true; // disable button
        
    }

    // Custom content
    function getContent(topic_title) {
        const quiz = document.querySelectorAll(`#${topic_title} .quiz`);
        const quizQuestions = extractQuestions(selectedTopic);
        // attach each question, their corresponding to a separate quiz container
        quizQuestions.forEach((q, index) => {
            if (quiz[index]) {
                quiz[index].innerHTML = ""; // clear quiz container
                // Create question element
                const question = document.createElement("h3");
                question.textContent = q.question;
                quiz[index].append(question);

                // Create options container
                const optionsDiv = document.createElement("div");
                optionsDiv.className = "quiz-options";

                // Render options as radio buttons (single answer) or checkboxes (multiple answers)
                const isMultiple = q.answer.length > 1;
                q.options.forEach((opt, optIdx) => {
                    const label = document.createElement("label");
                    label.style.display = "block";
                    const input = document.createElement("input");
                    input.type = isMultiple ? "checkbox" : "radio";
                    input.name = `question_${index}`;
                    input.value = opt;
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(" " + opt));
                    optionsDiv.appendChild(label);
                });
                quiz[index].append(optionsDiv);

                // Create check button
                const checkBtn = document.createElement("button");
                checkBtn.textContent = "Check Answer";
                checkBtn.className = "btn btn-primary check-answer-btn mt-2";

                checkBtn.onclick = function() {
                    // Collect selected answers
                    const selected = [];
                    const inputs = optionsDiv.querySelectorAll("input");
                    inputs.forEach(input => {
                        if (input.checked) selected.push(input.value);
                    });
                    // Compare with correct answer
                    const correct = q.answer.map(String).sort().join(",");
                    const user = selected.map(String).sort().join(",");
                    // Show result
                    let result = quiz[index].querySelector(".quiz-result");
                    if (!result) {
                        result = document.createElement("div");
                        result.className = "quiz-result";
                        quiz[index].appendChild(result);
                    }
                    if (user === correct) {
                        result.textContent = "Correct!";
                        result.style.color = "green";
                    } else {
                        result.textContent = "Incorrect. Try again.";
                        result.style.color = "red";
                    }
                };
                quiz[index].append(checkBtn);
            }
        });
                 
    }

});