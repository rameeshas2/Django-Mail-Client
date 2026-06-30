document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // Add form submission handling
  document.querySelector('#compose-form').onsubmit = function (event) {
    event.preventDefault(); // Prevent page reload

    //Get form values
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;

    //  Validate recipient field before sending request
    if (!recipients) {
      alert("Recipient field cannot be empty.");
      return; // stop here if empty
    }

    // Send emails via POST
    fetch('/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Print result
        // Load the sent mailbox
        load_mailbox('sent');
      })
  }
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch all emails for the given mailbox (inbox, sent, archive, etc.)
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())    // Convert response to JSON
    .then(emails => {

      // Loop through each email object returned from the server
      emails.forEach(email => {

        // Create a new <div> to hold the current email preview
        const emailDiv = document.createElement('div');

        // Add a CSS class for styling (defined in styles.css)
        emailDiv.classList.add('email-item');
        if (email.read) {
          emailDiv.classList.add('read');
        } else {
          emailDiv.classList.add('unread');
        }


        emailDiv.addEventListener('click', () => view_email(email.id));


        /* 
           Build the inner HTML for each email preview:
           
           - If the current mailbox is "sent", show the recipients (could be multiple → use .join(', ')).
           - Otherwise (in inbox, archive, etc.), show the sender.
           - After that, show the subject of the email.
           - &nbsp;&nbsp; is used to insert two spaces between the name and subject.
           - Finally, add the timestamp inside a <span> with a class "timestamp"
             (so we can style it separately in CSS).
        */
        emailDiv.innerHTML = `
        <strong>
          ${mailbox === 'sent' ? email.recipients.join(', ') : email.sender}
        </strong>
        &nbsp;&nbsp; 
        ${email.subject}
        <span class="timestamp">${email.timestamp}</span>
      `;

        // Append the newly created email preview <div> into the #emails-view container
        document.querySelector('#emails-view').append(emailDiv);
      });
    });

}

function view_email(id) {

  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  const view = document.querySelector('#emails-view');
  view.innerHTML = ''; //Clear previous content

  fetch(`/emails/${id}`)
    .then(response => response.json())
    .then(email => {

      const details = document.createElement('div');
      details.innerHTML =
        `
    <p> <strong>From: </strong> ${email.sender} </p>
    <p> <strong>To: </strong> ${email.recipients.join(', ')} </p>
    <p> <strong>Subject: </strong> ${email.subject} </p>
    <p> <strong>Timestamp: </strong> ${email.timestamp} </p>
    
    <hr>
    <div class="email-body">${email.body}</div>

    `;

      const replyButton = document.createElement('button');
      replyButton.className = 'btn btn-sm btn-outline-primary m-1';
      replyButton.innerHTML = 'Reply';
      replyButton.addEventListener('click', () => reply_email(email));

      const archiveButton = document.createElement('button');
      archiveButton.className = 'btn btn-sm btn-outline-secondary m-1';
      archiveButton.innerHTML = email.archived ? "Unarchive" : "Archive";
      archiveButton.addEventListener('click', () => {
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: !email.archived
          })
        })
          .then(() => load_mailbox('inbox'));
      });

      // Delete Button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-sm btn-outline-danger m-1';
      deleteButton.id = "delete";
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", () => delete_email(email.id));

      //Append everything
      view.append(details);
      view.append(replyButton);
      // if(email.sender !== document.querySelector('h2').innerText){
      if (email.sender !== 'sent') {
        view.append(archiveButton);
      }
      view.append(deleteButton);
    })

  // Mark email as read
  fetch(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  });


}

function reply_email(email) {
  compose_email();

  // Get logged-in user
  const loggedInUser = document.querySelector(".user-email").innerText.trim();

  // Pre-fill recipient & subject
  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value =
    email.subject.startsWith("Re: ") ? email.subject : `Re: ${email.subject}`;

  // Pre-fill body with quoted chain style
  document.querySelector('#compose-body').value =
`\n\n
On ${email.timestamp}, ${email.sender} wrote:
${email.body.split("\n").map(line => `"${line}"`).join("\n")}

On ${new Date().toLocaleString()}, ${loggedInUser} wrote:
""
`;
}







function delete_email(email_id) {
  if (!confirm("Are you sure you want to delete this email?")) return;

  fetch(`/emails/${email_id}/delete`, {
    method: "DELETE",
    headers: { "X-CSRFToken": getCookie("csrftoken") }
  })
  .then(response => {
    if (response.ok) {
      alert("Email deleted.");
      load_mailbox("inbox"); // Reload inbox after deletion
    } else {
      alert("Error deleting email.");
    }
  });
}

// Helper function for CSRF (needed for DELETE in Django)
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
