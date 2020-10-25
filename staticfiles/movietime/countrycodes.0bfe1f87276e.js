document.addEventListener("DOMContentLoaded", () => {
    fetch('static/movietime/codes.js')
        .then((response) => response.json())
        .then((codes) => {
            console.log(codes);
             codes.forEach((code) => {
                var item = document.createElement('option');
                item.innerHTML = `${code.name} - ${code.dial_code}`;
                item.value = code.dial_code;
                document.querySelector('#option').appendChild(item);
            });

        });
    });
