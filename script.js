
/**
 * Cargar los events handlers
 */
window.onload = function() {
    const newItemInput = document.querySelector("input");
    const addButton = document.querySelector("#add-item");
    const itemList  = document.querySelector("#item-list");
    const resetButton = document.querySelector("#reset-items");

    addButton.disabled = true;

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
            addItem(itemList, newItemInput, addButton);
        }
    });

    addButton.addEventListener("click", function() {
        addItem(itemList, newItemInput, addButton);
        newItemInput.focus();
    });

    // Resetear la lista de items.
    resetButton.addEventListener("click", function() {
        resetItemList(itemList, newItemInput);
    });
}

/*----------------------------------------------------------------------------*/
function addItem(itemList, input, button) {
    if (input.value !== "") {
        // Crear el nuevo item.
        const newItem = createNewItem(input.value);

        // Agregar el nuevo item.
        itemList.appendChild(newItem);

        // Resetear sección 'Add new item'
        input.value = "";
        button.disabled = true;
    }
    else {
        // Mostrar un mensaje en pantalla que no se puede ingresar un item vacío.
        alert("An empty item cannot be added.")
    }
}


function createNewItem(text) {
    const article = createArticle(text);
    return article;
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

    article.classList.add("item-container");

    return article;
}

/**
 * Crear y devolver el checkbox del item.
 * @returns {HTMLInputElement} Checkbox
 */
function createCheckbox() {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
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
