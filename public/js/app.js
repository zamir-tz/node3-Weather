console.log("client side javascript");



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#location');
const message2 = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {


    e.preventDefault();

    const location = search.value;

    console.log(location);

    message1.textContent = "loading forecast";
    message2.textContent = "";
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                message1.textContent = data.error;
            } else {
                console.log(data.location);
                console.log(data.forecast);
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        });
    });
});