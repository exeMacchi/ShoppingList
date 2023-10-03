
/**
 * Cargar los events handlers
 */
window.onload = function() {
    const newItemInput = document.querySelector("#newItem");
    const addButton = document.querySelector("#add-item");
    const itemList  = document.querySelector("#item-list");
    const resetButton = document.querySelector("#reset-items");

    // Los botones se deshabilitan
    addButton.disabled = true;
    resetButton.disabled = true;

    // Habilitar o no el botón 'Add item' dependiendo si el input tiene o no texto.
    newItemInput.addEventListener("input", function() {
        if (newItemInput.value !== "") {
            addButton.disabled = false;
        }
        else {
            addButton.disabled = true;
        }
    })
    
    // Agregar un item
    newItemInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addItem(itemList, newItemInput, addButton, resetButton);
        }
    });

    addButton.addEventListener("click", function() {
        addItem(itemList, newItemInput, addButton, resetButton);
        newItemInput.focus();
    });

    // Resetear la lista de items.
    resetButton.addEventListener("click", function() {
        resetItemList(itemList, newItemInput);
        resetButton.disabled = true;
    });
}

/*----------------------------------------------------------------------------*/
/**
 * Crear y añadir un item a la lista de items.
 * @param {HTMLElement} itemList 
 * @param {HTMLInputElement} input 
 * @param {HTMLButtonElement} button 
 * @param {HTMLButtonElement} reset 
 */
function addItem(itemList, input, button, reset) {
    if (input.value !== "") {
        // Crear el nuevo item.
        const newItem = createArticle(input.value);

        // Agregar el nuevo item.
        itemList.appendChild(newItem);

        // Resetear sección 'Add new item' y habilitar el botón de reinicio.
        input.value = "";
        button.disabled = true;
        reset.disabled = false;
    }
    else {
        // Mostrar un mensaje en pantalla que no se puede ingresar un item vacío.
        alert("An empty item cannot be added.");
    }
}

/*----------------------------------------------------------------------------*/
/**
 * Crear y devolver la estructura del nuevo item.
 * @param {String} text input.value
 */
function createArticle(text) {
    const article = document.createElement("article");
    const checkbox = createCheckbox();
    const p = createParagraph(text);
    const deleteButton = createDeleteButton(article);


    article.appendChild(checkbox);
    article.appendChild(p);
    article.appendChild(deleteButton);

    article.classList.add("item-container"); // display: flex;

    return article;
}

/**
 * Crear y devolver el checkbox del item.
 * @returns {HTMLInputElement} Checkbox
 */
function createCheckbox() {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("change", function() {
        const container = checkbox.parentElement;
        const uncheckedColor = getComputedStyle(document.documentElement).getPropertyValue("--tertiary-bg-color");
        const checkedColor = getComputedStyle(document.documentElement).getPropertyValue("--tertiary-color");
        const p = checkbox.nextElementSibling;

        // Aplicar estilos al <article> si el checkbox está seleccionado o no.
        if (checkbox.checked) {
            container.style.backgroundColor = checkedColor;
            p.style.textDecoration = "line-through";
            p.style.color = "gray";
        }
        else {
            container.style.backgroundColor = uncheckedColor;
            p.style.textDecoration = "none";
            p.style.color = "inherit";
        }
    })
    return checkbox;
}

/**
 * Crear y devolver el párrafo con el nombre del item.
 * @param {string} text input.value
 */
function createParagraph(text) {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
}

/**
 * Crear y devolver el botón que permite eliminar el item de la lista.
 * @param {HTMLElement} article - Artículo
 * @returns {HTMLButtonElement} Delete Button
 */
function createDeleteButton(article) {
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "Delete";

    // Cuando se haga click en el botón "Delete", se eliminará el artículo
    // referenciado.
    deleteButton.addEventListener("click", function() {
        article.parentElement.removeChild(article);
        verifyItemList();
    });

    return deleteButton;
}

/*----------------------------------------------------------------------------*/
/**
 * Resetear la lista de items borrando todos los artículos, luego se focusea 
 * el campo de texto.
 * @param {HTMLElement} itemList Original item list
 * @param {HTMLInputElement} input newItemInput
 */
function resetItemList(itemList, input) {
    itemList.replaceChildren();
    input.focus();
}

/**
 * Verificar si la lista de items está vacía o no, si lo está, se deshabilita
 * el botón de reinicio; si no lo está, el botón está habilitado.
 */
function verifyItemList() {
    const itemList = document.querySelector("#item-list");
    const resetButton = document.querySelector("#reset-items");

    if (itemList.children.length === 0) {
        resetButton.disabled = true;
    }
    else {
        resetButton.disabled = false;
    }
}
