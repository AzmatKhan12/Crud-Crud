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
        })
        .catch((err) => {
            console.error(err)
        });
    // localStorage.setItem(userDetails.email, JSON.stringify(userDetails));
    // showOnScreen(userDetails);
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
    // const localStorageObj = localStorage;
    // const localstoragekeys = Object.keys(localStorageObj)

    // for (var i = 0; i < localstoragekeys.length; i++) {
    //     const key = localstoragekeys[i]
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     showOnScreen(userDetailsObj)
    // }
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
                          <button onclick = deleteUser('${user.email}')> Delete </button>
                          <button onclick = editUser('${user.name}','${user.email}','${user.number}')> Edit </button>
                      </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}
// Edit user
function editUser(name, emailId, number) {
    console.log({ emailId, name, number })

    document.getElementById('name').value = name;
    document.getElementById('email').value = emailId;
    document.getElementById('phone').value = number;

    deleteUser(emailId);

}

// delete usesr
function deleteUser(emailId) {

    localStorage.removeItem(emailId);

    console.log('delete user clicked');

    removeFromScreen(emailId);

}

// remove from the screen
function removeFromScreen(emailId) {
    const parentNode = document.getElementById('usersList');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}