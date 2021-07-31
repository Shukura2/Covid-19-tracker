let fname = document.getElementById('fname')
let email = document.getElementById('email')
let gender = document.getElementById('gender')
let check = document.getElementById('check')
var submit = document.getElementById('submit')
let seletedRow = null

//Overall function, in it are some functions invoked to make the app work
const onFormSubmit = () => {
    var formData = readFormData()
    if (seletedRow == null){
        insertNewRecord(formData)
        resetForm()
    }else {
        updateEdit(formData)
        submit.innerHTML='Submit'
        resetForm()
    }
}

//Targeting values from each input field and wrapping it up in a function
const readFormData = () => {
    //save all inputs value into the object and return object
    const formData = {}
    formData["fname"] = fname.value + ' ' + lname.value; //concatnate two cells
    formData["email"] = email.value;
    formData["gender"] = gender.value
    return formData;
}

//All patient information being passed to the tbody
const insertNewRecord = (data) => {
    let table = document.getElementById('patient-list').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length)
    let checkbox = $("#check").prop('checked');
   
    let cell1 = newRow.insertCell(0)
    cell1.innerHTML = data.fname 
    let cell2 = newRow.insertCell(1)
    cell2.innerHTML = data.email
    let cell3 = newRow.insertCell(2)
    cell3.innerHTML = data.gender
    let cell4 = newRow.insertCell(3)
    if (checkbox) {
        cell4.innerHTML = 'Yes'
    } else {
        cell4.innerHTML = 'No'
    }
    let cell5 = newRow.insertCell(4)
    cell5.innerHTML = '<button onClick="edit(this)">Edit</button>'
    let cell6 = newRow.insertCell(5)
    cell6.innerHTML = '<button onClick="deleteRow(this)">Delete</button>'    
}

//Return form to its default after submission
const resetForm = () => {
    fname.value = ''
    lname.value = ''
    email.value = ''
    gender.value = 'none'
}

//Edit row when the edit button is clicked
const edit = (td) => {
    seletedRow = td.parentElement.parentElement

    //Split the concatnated cell and return each to its initial cell
    let realname = seletedRow.cells[0].innerHTML
    let newArr= realname.split(' ')

    fname.value= newArr[0]
    lname.value = newArr[1]

    let emailData = seletedRow.cells[1].innerHTML
    email.value = emailData

    let genderData = seletedRow.cells[2].innerHTML
    gender.value = genderData

    submit.innerHTML = 'Update'    
}

//Update the row edited
const updateEdit = (formData) => {    
    seletedRow.cells[0].innerHTML = formData.fname;
    seletedRow.cells[1].innerHTML = formData.email; 
    seletedRow.cells[2].innerHTML = formData.gender;  
}

//Delete the selected row
let deleteRow = (td) => {
    if (confirm('Do you want to delete this record')){
        row = td.parentElement.parentElement
        document.getElementById('patient-list').deleteRow(row.rowIndex)
        resetForm();
    }   
}