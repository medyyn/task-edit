const endpoint = "http://localhost:3000/users/"
const row = document.querySelector("#row")
const modalBody = document.querySelector("#modalBody")
const form = document.querySelector("#form")
const newUserNameInp = document.querySelector("#newUserNameInp")

const getData = async () => {
    try {
        const { data } = await axios.get(endpoint)
    row.innerHTML = ""
    if (data.length > 0) {
        data.forEach(({ id, username }) => {
            row.innerHTML += `
                <div class="col-4 border p-2">
                    <h3 class = "d-inline">${username}</h3>
                    <button
                    data-bs-toggle="modal"
                    class = "btn btn-warning ms-3"
                    data-bs-target="#exampleModal"
                    onclick = "setModal('${id}','${username}')">
                    𓂃🖋
                    </button>
                </div>
                            `
        })
    } else {
        row.innerHTML = `<div class="col-12"> melumat yoxdur. </div>`
    }
    } catch(err){
        Toastify({
            text: err.message,
            className: "info",
            close: true,
            style: {
                background: "linear-gradient(to right,rgb(176, 0, 0),rgb(104, 0, 0))",
            }
        }).showToast();
    }
}
getData()
const setModal = (id, username) => {
    newUserNameInp.value = username
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const data = {
            username: newUserNameInp.value,
        }
        try{
            const res = await axios.put(endpoint + id, data)
            if (res.status === 200 && res.statusText === "OK") {
                Toastify({
                    text: "Username changed successfully!",
                    className: "info",
                    close: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
                getData()
            }
        } catch (err){
            Toastify({
                text: err.message,
                className: "info",
                close: true,
                style: {
                    background: "linear-gradient(to right,rgb(176, 0, 0),rgb(104, 0, 0))",
                }
            }).showToast();
        }
    })
}