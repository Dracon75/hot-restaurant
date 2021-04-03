let tableListEl = document.getElementById("tableList");
let waitingListEl = document.getElementById("waitList");

fetch("/api/reservations")

    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(generateCard(response)
        // write query to page so user knows what they are viewing

    )
    .catch(function (error) {
        console.error(error);
    });

function generateCard(data) {
    for (let index = 0; index < data.length; index++) {

        tableListEl.append(  `
        <li class="list-group-item mt-4">
            <h2>Table #${index + 1}</h2>
            <hr>
            <h2>ID:  ${data[index].customerID}</h2>
            <h2>Name:  ${data[index].customerName}</h2>
            <h2>Email: ${data[index].customerEmail}</h2>
            <h2>Phone:  ${data[index].phoneNumber}</h2>
        </li>
        `)
    }
    
}