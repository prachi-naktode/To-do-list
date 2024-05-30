const listArray = localStorage.getItem('todo_list') ? JSON.parse(localStorage.getItem("todo_list")) : []

window.addEventListener('load', () => {
    render();
    console.log(listArray);
    
    const form = document.querySelector('#add_new_task');
    const input = document.querySelector('#new_input');
    // const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert('Please add some task');
            return;
        }

        var todo_obj = {
            task_id : listArray.length + 1,
            task_name : task
        };

        listArray.push(todo_obj);
        localStorage.setItem('todo_list', JSON.stringify(listArray));

        render();
        e.target.reset();
    });
});


const render = () => {

    const list_el = document.querySelector('#tasks');
    list_el.innerHTML = '';

    listArray.forEach((item) => {
        const toDo_el = document.createElement("div");
        toDo_el.classList.add("task");

        const toDo_content_div = document.createElement("div");
        toDo_content_div.classList.add("input_div");

        const toDo_content_input = document.createElement("input");
        toDo_content_input.classList.add("text");
        toDo_content_input.type = "text";
        toDo_content_input.value = item.task_name;
        toDo_content_input.setAttribute("readonly", "readonly");

        toDo_content_div.appendChild(toDo_content_input);
        toDo_el.appendChild(toDo_content_div);

        const toDo_action_div = document.createElement("div");
        toDo_action_div.classList.add("action");

        const toDo_action_edit = document.createElement("button");
        toDo_action_edit.classList.add("edit");
        toDo_action_edit.innerHTML = "Edit";
        toDo_action_edit.task_id = item.task_id

        const toDo_action_delete = document.createElement("button");
        toDo_action_delete.classList.add("delete");
        toDo_action_delete.innerHTML = "Delete";
        toDo_action_delete.task_id = item.task_id

        toDo_action_div.appendChild(toDo_action_edit);
        toDo_action_div.appendChild(toDo_action_delete);

        toDo_el.appendChild(toDo_action_div);

        list_el.appendChild(toDo_el);

        toDo_action_edit.addEventListener('click', (e) => {

            if (toDo_action_edit.innerHTML == "Edit") {
                toDo_content_input.removeAttribute("readonly");
                toDo_content_input.focus();
                toDo_action_edit.innerHTML = "Save";
            }
            else {
                toDo_action_edit.innerHTML = "Edit";
                toDo_content_input.setAttribute("readonly", "readonly");

                const index = listArray.findIndex((object) => {
                    return object.task_id == e.target.task_id;
                });
                listArray[index].task_name = toDo_content_input.value;
                localStorage.setItem('todo_list', JSON.stringify(listArray));
                console.log(toDo_content_input.value);
            }
        });

        toDo_action_delete.addEventListener('click', (e) => {
            console.log(e.target.task_id);
            const index = listArray.findIndex((object) => {
                return object.task_id == e.target.task_id;
            });
            listArray.splice(index, 1);
            localStorage.setItem("todo_list", JSON.stringify(listArray));
            list_el.removeChild(toDo_el);
        });
    })
}