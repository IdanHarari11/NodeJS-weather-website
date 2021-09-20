const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = search.value;

    messageOne.innerHTML = 'Loading...';
    messageTwo.innerHTML = '';

    fetch(`/weather?search=${location}`).then((response) => {
    response.json().then((data) => {
        console.log(data);
        if (data.error) {
            console.log(data.error);
            messageOne.innerHTML = data.error;
        } else{
            messageOne.innerHTML = data.location;
            messageTwo.innerHTML = data.forecast;
            console.log(data.location);
            console.log(data.forecast);
        }
    })
});
});

