
const questions = [
    {
        id: "emerging-tech",
        question: "What is your name",
        options: ["John", "Jane", "Margaret"],
        answer: ["John"]
    },
    {
        id: "emerging-tech",
        question: "How old are you?",
        options: [12, 15, 18],
        answer: [18]
    }
];

function extractQuestions(topic_id) {
    // const 
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
        getContent(); // Display quiz
        btn.disabled = true; // disable button
        
    }

    // Custom content
    function getContent() {
        const quiz = document.querySelectorAll("#emerging-tech .quiz");
        quiz[0].innerHTML = ""; // clear quiz container
        const question = document.createElement("h3");
        question.textContent = "What is your name?";
        quiz[0].append(question);
    }

});