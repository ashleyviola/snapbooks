async function newClientFormHandler(event){
    event.preventDefault();

    const company_name = document.querySelector('input[name="client-company"]').value;
    const address = document.querySelector('input[name="client-address"]').value;
    const city = document.querySelector('input[name="client-city"]').value;
    const state = document.querySelector('input[name="client-state"]').value;
    const zip = document.querySelector('input[name="client-zip"]').value;
    const contact_first_name = document.querySelector('input[name="client-first-name"]').value;
    const contact_last_name = document.querySelector('input[name="client-last-name"]').value;
    const email = document.querySelector('input[name="client-email"]').value;
    const phone_number = document.querySelector('input[name="client-tel"]').value;

    const response = await fetch(`/api/clients`,{
        method: 'POST',
        body: JSON.stringify({
            company_name,
            address,
            city,
            state,
            zip,
            contact_first_name,
            contact_last_name,
            email,
            phone_number
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard/clients');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.create-client-form').addEventListener('submit', newClientFormHandler);