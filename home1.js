
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
   
    // Get user details from the form
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var languages = document.getElementById('languages').value;
    var workprofession = document.getElementById('work-profession').value;
    var experience = document.getElementById('experience').value;
    // var hobbies = document.getElementById('hobbies').value;
    var profilepic = document.getElementById('profilepic').files[0];
    var reader = new FileReader();
    
    // //get social links from the form
    var linkedin = document.getElementById('linkedin').value;
    var twitter = document.getElementById('twitter').value;
    var github = document.getElementById('github').value;

   
    reader.onload = function(event) {
      var profileCard = document.createElement('div');
      profileCard.classList.add('profileCard');
      
      
    var profilePictureElement = document.createElement('img');
    profilePictureElement.src = event.target.result;
    profilePictureElement.classList.add('profilepic');
    profilePictureElement.style.borderRadius = '50%';
    profilePictureElement.style.width = '160px';
    profilePictureElement.style.height = '160px';
    profilePictureElement.style.display = 'block';
    profilePictureElement.style.margin = '6px auto';
    
   
  
    profileCard.innerHTML = `
      
      <p1> ${username}</p1>
      <p2> ${email}</p2>
      <p3>${languages}</p3>
      <div id="prof-exp">
      <p4>${workprofession}</p4>
      <div class="vl"></div>
      <p5>${experience}</p5>
      </div>
      // <div id="social-links">
      // <a target="_blank" class="social-link" rel="noopener" href="${linkedin}" ><span class="icon1"><i class="fa-brands fa-linkedin"></i></span></a>
      // <a target="_blank" class="social-link" rel="noopener" href="${twitter}" ><span class="icon2"><i  class="fa-brands fa-twitter"></i></span></a>
      // <a target="_blank" class="social-link" rel="noopener" href="${github}" ><span class="icon3"><i class="fa-brands fa-github"></i></span></a>
      // </div>
      
      `;
      // <p4>${hobbies}</p4>
//  profileCard.appendChild(profileCardWrapper);

     profileCard.prepend(profilePictureElement);
     
     document.getElementById('profileCards').appendChild(profileCard);

     
     const downloadButton = document.getElementById('downloadButton');
     downloadButton.style.display = 'inline-block';
     downloadButton.addEventListener('click', downloadProfileCard);
     const downloadFormat = document.getElementById('downloadFormat');
     downloadFormat.style.display = 'inline-block';
    //  document.getElementById('downloadFormat').addEventListener('click',updateDownloadButtonText());

    // const downloadPNGButton = document.getElementById('downloadPNGButton');
    // downloadPNGButton.style.display = 'inline-block'; // Show the button
    // document.getElementById('downloadPNGButton').addEventListener('click', downloadProfileCardAsPNG);
    
    // const downloadHTMLButton = document.getElementById('downloadHTMLButton');
    // downloadHTMLButton.style.display = 'inline-block'; // Show the button
    // document.getElementById('downloadHTMLButton').addEventListener('click', downloadProfileCardAsHTML);

    // const downloadHTMLButton = document.getElementById('downloadPDFButton');
    // downloadPDFButton.style.display = 'inline-block'; // Show the button
    // document.getElementById('downloadPDFButton').addEventListener('click', downloadProfileCardAsPDF);
  };

  reader.readAsDataURL(profilepic);

  // Reset the form

  document.getElementById('profileForm').reset();
  
});



  window.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  });
  
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname; // Get the current page path

  const navLinks = document.querySelectorAll('.navigation-menu .nav-link');

  navLinks.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active'); // Add the active class to the current page link
    }
  });
});

function downloadProfileCardAsPNG() {
  const profileCardContainer = document.getElementById('profileCards');

  // Create an options object to set the desired scale (higher value means higher resolution)
  const options = {
    scale:4, // Increase the scale to get higher resolution (e.g., 2 for double the resolution)
  };

  // Use html2canvas to capture the profile card container and convert it to a canvas
  html2canvas(profileCardContainer, options).then(function(canvas) {
    // Convert the canvas to a data URL representing a PNG image
    const dataURL = canvas.toDataURL('image/png');

    // Create a link element to download the image
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'profile_card.png';
    downloadLink.click();
  });
}

function downloadProfileCardAsPDF() {
  const profileCardHTML = generateProfileCardHTML();

  const opt = {
    margin: [0, 0],
    filename: 'profile_card.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Generate PDF from HTML content
  html2pdf().from(profileCardHTML).set(opt).save();
}

// Function to generate the HTML content of the profile card
function generateProfileCardHTML() {
  const profileCardContainer = document.getElementById('profileCards');
  // Clone and replace dynamic content here as explained in the previous responses

  // Return the HTML content as a string
  return profileCardContainer.outerHTML;
}

// Function to download the profile card as HTML
function downloadProfileCardAsHTML() {
  const profileCardHTML = generateProfileCardHTML();

  // Create a Blob with the HTML content
  const blob = new Blob([profileCardHTML], { type: 'text/html' });

  // Save the Blob as a file
  saveAs(blob, 'profile_card.html');
}

function updateDownloadButtonText() {
  const selectedFormat = document.getElementById('downloadFormat').value;
  const downloadButton = document.getElementById('downloadButton');
  
  switch (selectedFormat) {
    case 'png':
      downloadButton.textContent = 'Download PNG';
      break;
    case 'html':
      downloadButton.textContent = 'Download HTML';
      break;
    case 'pdf':
      downloadButton.textContent = 'Download PDF';
      break;
    default:
      downloadButton.textContent = 'Download';
      break;
  }
}

function downloadProfileCard() {
  const selectedFormat = document.getElementById('downloadFormat').value;

  switch (selectedFormat) {
    case 'png':
      downloadProfileCardAsPNG();
      break;
    case 'html':
      downloadProfileCardAsHTML();
      break;
    case 'pdf':
      downloadProfileCardAsPDF();
      break;
    default:
      alert('Invalid format selected');
      break;
  }
}

// Call the updateDownloadButton Text function when the user makes a selection in the dropdown
document.getElementById('downloadFormat').addEventListener('change', updateDownloadButtonText);

// Set the initial button text when the page loads
updateDownloadButtonText();

function downloadResumeAsPNG() {
  const ResumeContainer = document.getElementById('Resumecard');

  // Create an options object to set the desired scale (higher value means higher resolution)
  const option = {
    scale:4, // Increase the scale to get higher resolution (e.g., 2 for double the resolution)
  };

  // Use html2canvas to capture the profile card container and convert it to a canvas
  html2canvas(ResumeContainer, option).then(function(canvas) {
    // Convert the canvas to a data URL representing a PNG image
    const dataURL = canvas.toDataURL('image/png');

    // Create a link element to download the image
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'Resume.png';
    downloadLink.click();
  });
}


document.getElementById('resumeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get user details from the form
  const fullname = document.getElementById('fullname').value;
  const Email = document.getElementById('Email').value;
  // const Linkedin = document.getElementById('Linkedin').value;
  const contactNo = document.getElementById('contactNo').value;
  const address = document.getElementById('address').value;
  const education = document.getElementById('education').value;
  const Experience = document.getElementById('Experience').value;
  const skills = document.getElementById('skills').value;
  const hobbies = document.getElementById('hobbies').value;
  // Get other input values (email, LinkedIn, contact no, address, experience, education, skills, hobbies, profile pic)

  // Read profile picture and create an Image object
  const profilePicFile = document.getElementById('profilePic').files[0];
  const profilePicReader = new FileReader();

  profilePicReader.onload = function(event) {
    const profilePicImage = new Image();
    profilePicImage.src = event.target.result;

    // Generate the HTML content for the resume
    const resumeHTML = `
    <html lang="en">
    <head>
      <title>${fullname}'s Resume</title>
      <style>
      *{
        margin:0px;
        padding:0px;
      }
      body {
        font-family: Arial, sans-serif;
        
      }
      #Resumecard {
        width: 750px;
        margin-left: 402px;
        margin-top: 80px;
        border: 1px double #00000036;
      }
      #header {
        background-color: #add8e694;
        width: 750px;
        height: 150px;
      }
      
      p1 {
        font-size: 21px;
        color: black;
        display: inline-block;
        margin-left: 53px;
        margin-bottom: 3px;
        letter-spacing: 2px;
        margin-top: 53px;
        font-weight: bold;
      }
      p2 {
        color: #000000;
        font-size: 12px;
        margin-left: 53px;
        letter-spacing: 1px;
        
        display: block;
      }
      p3 {
        color: #000000;
        font-size: 12px;
        margin-left: 53px;
        letter-spacing: 1px;
        display: inline-block;
        margin-top: 2px;
      }
      .profilePic {
        width: 130px;
        height: 130px;
        object-fit: cover;
        display: inline-block;
        
        margin-left: 610px;
        margin-top: -105px;
      }
      .profileDetails {
        
        width: 750px;
       
        margin-top: 28px;
        margin-left: 38px;
        margin-bottom: 28px;
      }
      .profileDetails p {
        margin: 28px 0;
        
      }
      .sectionHeader {
        font-weight: bold;
        
        font-size: 26px;
       
        
        color: #0fa8d6;
        background-color: #ffe4e1bf;
        width: 620px;
        padding-left: 23px;
        
      }
      p4 {
        color: black;
        font-size: 16px;
        margin-left: 33px;
      }
      hr {
        color: white;
        width: 646px;
        height: 1px;
      }
      #downloadResume{
        margin: 32px 375px 144px 703px;
        display:inline-block;
        text-align:center;
        outline: none;
        text-decoration: none;
        background:gray;
        border-radius:5px;
        border: 1px groove white;
        cursor:pointer;
        color:white;
        font-size:15px;
        padding:10px;
        transition: all 0.3s;
        width: 130px;
        font-weight:700;
        box-shadow: 4px 5px 1px orangered;
      }
      #downloadResume:hover{
        background: #D8BFD8;
        font-size:18px;
        transform: scale(1.5s);
    }
      </style>
    </head>
    <body>
      <div id="Resumecard">
          <div id="header">

          <p1>${fullname}</p1>
          <p2>${Email}</p2>
          <p3>${contactNo}, ${address}</p3>
          <img class="profilePic" src="${event.target.result}" alt="Profile-Picture">
        </div>
        <div class="profileDetails">
          
          <p class="sectionHeader">Education</p>
          <p4>${education}</p4><hr>
          <p class="sectionHeader">Experience</p>
          <p4>${Experience}</p4><hr>
          <p class="sectionHeader">Skills</p>
          <p4>${skills}</p4><hr>
          <p class="sectionHeader">Hobbies</p>
          <p4>${hobbies}</p4>
        </div>
      </div>
      <button id="downloadResume">Download</button>
       
    </body>
    </html>
    `;

    // Open a new window and write the resume content
    // document.getElementById('profileCards').appendChild(profileCard);
    
    const resumeWindow = window.open('', '_blank');
    resumeWindow.document.write(resumeHTML);

    const downloadResume = document.getElementById('downloadResume');
    //  downloadResume.style.display = 'inline-block';
   downloadResume.addEventListener('click', downloadResumeAsPNG);

  };

  profilePicReader.readAsDataURL(profilePicFile);

  // Reset Form 

  // event.target.reset();
});





// //Resume Builder
// document.getElementById('resumeForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent form submission
 
//   // Get user details from the form
//   var username = document.getElementById('username').value;
//   var email = document.getElementById('email').value;
//   var linkedin = document.getElementById('linkedin').value;
//   var contactNo = document.getElementById('contactNo').value;
//   var address = document.getElementById('address').value;
//   var education = document.getElementById('education').value;
//   var experience = document.getElementById('experience').value;
//   var skills = document.getElementById('skills').value;
//   var hobbies = document.getElementById('hobbies').value;
//   // Add more code here to get other details from the form

//   // Generate the resume using the user details and display it
//   generateResume(username, email,linkedin,contactNo, address,education,experience,skills,hobbies);

//   // Reset the form
//   document.getElementById('resumeForm').reset();
// });

// function generateResume(username, email,linkedin, contactNo, address,education,experience,skills,hobbies) {
//   // Create a new window to display the generated resume
//   var resumeWindow = window.open('', '_blank');
//   var resumeContent = `
//       <strong>Name:</strong><h2>${username}</h2>
//       <p><strong>Email: </strong>${email}</p>
//       <p><strong>Linkedin:</strong> ${linkedin}</p>
//       <p><strong>Contact:</strong> ${contactNo}</p>
//       <p><strong>Address:<strong>${address}</p>
//       <p><strong>Education:<strong>${education}</p>
//       <p><strong>Experience:<strong>${experience}</p>
//       <p><strong>Skills:<strong>${skills}</p>
//       <p><strong>Hobbies:<strong>${hobbies}</p>
//       <!-- Add more content here for other details -->
//   `;
//   resumeWindow.document.write(resumeContent);
//   resumeWindow.document.close();
// }








