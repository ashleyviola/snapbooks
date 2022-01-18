async function newProjectHandler(event){
    event.preventDefault();

    const name = document.querySelector('input[name="project-name"]').value;
    const description = document.querySelector('input[name="project-description"]').value;
    const cost = document.querySelector('input[name="project-cost"]').value;
    const purchase_order = document.querySelector('input[name="project-po"]').value;
    const status = document.querySelector('select[name="project-status:checked"]').value;
    const client = document.querySelector('select[name="project-client:checked"]').value;

    const response = await fetch(`/api/projects`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            cost,
            purchase_order,
            status,
            client
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

document.querySelector('#new-project-form').addEventListener('submit', newProjectHandler);