const myform = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const numberInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date')
const userList = document.querySelector('#users');

myform.addEventListener('submit', onSubmit);
// userDetails = [];

function onSubmit(e) {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const number = numberInput.value;

    userDetails = {
        name: name,
        email: email,
        number: number
    }

    axios.post('https://crudcrud.com/api/e5a43008386443089d0b0f02dd06fc28/appointmentData', userDetails)
        .then((Response) => {
            console.log(Response)
            showOnScreen(userDetails)
        })
        .catch((err) => {
            console.error(err)
        });
}


window.addEventListener("DOMContentLoaded", () => {

    axios.get('https://crudcrud.com/api/e5a43008386443089d0b0f02dd06fc28/appointmentData')
        .then((Response) => {
            console.log(Response)
            for (let i = 0; i < Response.data.length; i++) {
                showOnScreen(Response.data[i])

            }

        })
        .catch((err) => console.error(err));

})

function showOnScreen(user) {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";

    if (localStorage.getItem(user.email) !== null) {
        removeFromScreen(user.email)
    }


    const parentNode = document.getElementById('usersList');
    const childHTML = `<li id= ${user._id}> ${user.name} : ${user.email} : ${user.number} 
                          <button onclick = deleteUser('${user._id}')> Delete </button>
                          <button onclick = editUser('${user.name}','${user.email}','${user.number}','${user._id}')> Edit </button>
                      </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}
// Edit user
function editUser(name, emailId, number, userId) {

    document.getElementById('name').value = name;
    document.getElementById('email').value = emailId;
    document.getElementById('phone').value = number;

    deleteUser(userId);
}

// delete usesr
function deleteUser(userId) {

    axios.delete(`https://crudcrud.com/api/e5a43008386443089d0b0f02dd06fc28/appointmentData/${userId}`)
        .then((Response) => {
            console.log(Response)
            removeFromScreen(userId);
        })
        .catch(err => console.error(err));

}

// remove from the screen
function removeFromScreen(userId) {
    const parentNode = document.getElementById('usersList');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}