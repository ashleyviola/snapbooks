async function newClientFormHandler(event){
    event.preventDefault();

    const company = document.querySelector('input[name="client-company]').value;
    const address = document.querySelector('input[name="client-address]').value;
    const city = document.querySelector('input[name="client=city]').value;
    const state = document.querySelector('select[name=client-state:checked]').value;
    const zip = document.querySelector('input[name="client-zip"]').value;
    const contact = document.querySelector('input[name="client-contact]').value;
    const email = document.querySelector('input[name="client-email]').value;
    const phone = document.querySelector('input[name="client-tel]').value;

    const response = await fetch(`/api/clients`,{
        method: 'POST',
        body: JSON.stringify({
            company,
            address,
            city,
            state,
            zip,
            contact,
            email,
            phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#create-client-form').addEventListener('submit', newClientFormHandler);