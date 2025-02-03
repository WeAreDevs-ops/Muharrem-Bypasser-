document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const cookie = document.getElementById("cookie").value;
    const submitBtn = document.getElementById("submitBtn");
    const responseContainer = document.getElementById("responseContainer");
    submitBtn.textContent = 'Bypassing...';
    submitBtn.disabled = true;
    responseContainer.style.display = 'none';

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `api.php?cookie=${encodeURIComponent(cookie)}`, true);

    xhr.onload = function() {
        submitBtn.textContent = 'Bypass';
        submitBtn.disabled = false;

        try {
            const response = JSON.parse(xhr.responseText);

            responseContainer.style.display = 'block';

            if (response.success === false) {
                responseContainer.className = 'response-container error';
                responseContainer.innerHTML = `<p>${response.response}</p>`;
            } else if (response.success === true) {
                responseContainer.className = 'response-container success';
                responseContainer.innerHTML = `<p>${response.response}</p>`;
            } else {
                responseContainer.className = 'response-container error';
                responseContainer.innerHTML = `<p>Unknown Error!</p>`;
            }
        } catch (e) {
            responseContainer.className = 'response-container error';
            responseContainer.innerHTML = `<p>Unknown Error!</p>`;
        }
    };

    xhr.onerror = function() {
        submitBtn.disabled = false;
        responseContainer.style.display = 'block';
        responseContainer.className = 'response-container error';
        responseContainer.innerHTML = `<p>Unknown Error!</p>`;
    };

    xhr.send();
});
