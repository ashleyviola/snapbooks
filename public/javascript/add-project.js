async function newProjectHandler(event) {
  event.preventDefault();

  const project_name = document.querySelector('input[id="project-name"]').value;
  const description = document.querySelector('input[id="project-description"]').value;
  const cost = document.querySelector('input[id="project-cost"]').value;
  const project_order_number = document.querySelector('input[id="project-po"]').value;
  const status1 = document.getElementById('project-status');
  const status = status1.options[status1.selectedIndex].value;
  console.log(status);
  const client_id = document.getElementById('project-client').value;
  console.log(client_id);
  // const pickleTwo = pickle.options[pickle.selectedIndex].value;
  // // const pickleThree = pickleTwo.split(' ');
  // const client_id = pickleThree[0];

  const response = await fetch(`/api/projects`, {
    method: 'POST',
    body: JSON.stringify({
      project_name, description, cost, project_order_number, status, client_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/projects');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-project-form').addEventListener('submit', newProjectHandler);