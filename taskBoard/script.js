const columns = document.querySelectorAll(".column__cards");

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.add("column--highlight");
    }
};

const dragLeave = ({ target }) => {
    target.classList.remove("column--highlight");
};

const drop = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        target.classList.remove("column--highlight");
        target.append(draggedCard);
    }
};

const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) return;

    const card = document.createElement("section");
    card.className = "card";
    card.draggable = "true";

    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
        card.remove();
    });

    card.addEventListener("focusout", () => {
        if (!card.textContent.trim()) card.remove();
    });

    card.addEventListener("mouseenter", () => {
        deleteButton.style.display = "block";
    });

    card.addEventListener("mouseleave", () => {
        deleteButton.style.display = "none";
    });
    card.addEventListener("dragstart", dragStart);

   
    const content = document.createElement("div");
    content.className = "card-content";
    content.contentEditable = "true";
    content.style.outline = "none";

    content.addEventListener("focusout", () => {
        if (!content.textContent.trim()) card.remove();
    });

    card.append(content, deleteButton);
    target.append(card);
    content.focus();
};

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});
