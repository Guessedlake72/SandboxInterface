const loginForm = document.getElementById("login-form");
const uploadForm = document.getElementById("upload-form");
const loginButton = document.getElementById("login-form-submit");
const uploadButton = document.getElementById("upload-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
axios.defaults.headers.common = {
    "X-API-Key": "636af092e9a77f5984220834",  
  };
// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    axios.get('https://vrsandbox-62fc.restdb.io/rest/assets', {
        params: {
            "X-API-Key": "636af092e9a77f5984220834",  
        }
    })
    .then(function (response) {
        console.log(response);
        const tablebody = document.getElementById("table-body");
        for(let i = 0; i< response.data.length;i++){
            let tr = document.createElement("tr");
            let td = document.createElement("td")
            td.setAttribute("data-label", "ID");
            td.innerHTML=response.data[i]["_id"];
            tr.appendChild(td);
            td = document.createElement("td")
            td.setAttribute("date-label", "userID");
            td.innerHTML=response.data[i]["userID"];
            tr.appendChild(td);
            td = document.createElement("td")
            td.setAttribute("date-label", "src");
            td.innerHTML=response.data[i]["src"];
            tr.appendChild(td);
            td = document.createElement("td")
            td.setAttribute("date-label", "type");
            td.innerHTML=response.data[i]["type"];
            tr.appendChild(td);
            tablebody.appendChild(tr);
        }
    })
})

uploadButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const userID = uploadForm.userID.value;
    const src = uploadForm.src.value;
    const type = uploadForm.type.value;

    axios.post("https://vrsandbox-62fc.restdb.io/rest/assets", {
        userID: userID,
        src: src,
        type: type
        })
    .then((response) => console.log(response.data))
})