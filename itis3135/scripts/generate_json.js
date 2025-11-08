// Helper function to escape HTML for display
function escapeHtmlJSON(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function generateJSON() {
  const formData = new FormData(document.querySelector("form"));
  
  // Get ALL form data dynamically
  const firstName = document.getElementById('firstname').value || '';
  const middleName = document.getElementById('middlename').value || '';
  const lastName = document.getElementById('lastname').value || '';
  const preferredName = document.getElementById('pname').value || '';
  const mascotAdjective = document.getElementById('mascotadjective').value || '';
  const mascotAnimal = document.getElementById('mascotanimal').value || '';
  const divider = document.getElementById('divider').value || '';
  const imageCaption = document.getElementById('imageCaption').value || '';
  const personalStatement = document.getElementById('personalStatement').value || '';
  const personalBackground = document.getElementById('personalBackground').value || '';
  const professionalBackground = document.getElementById('professionalBackground').value || '';
  const academicBackground = document.getElementById('academicBackground').value || '';
  const primaryComputer = document.getElementById('primaryComputer').value || '';
  const subjectBackground = document.getElementById('SubjectBackground').value || '';
  const quote = document.getElementById('quote').value || '';
  const quoteAuthor = document.getElementById('quoteAuthor').value || '';
  const funny = document.getElementById('funny').value || '';
  const share = document.getElementById('share').value || '';
  
  // Get image source dynamically
  const imageElement = document.querySelector('#loadImage img');
  const imageSrc = imageElement ? imageElement.src : '';
  
  // Collect courses dynamically
  const courses = [];
  const courseItems = document.querySelectorAll('.course-item');
  courseItems.forEach((item) => {
    const id = item.id.split('-')[1];
    const dept = formData.get(`dept-${id}`);
    const number = formData.get(`number-${id}`);
    const name = formData.get(`name-${id}`);
    const reason = formData.get(`reason-${id}`);
    
    if (dept && number && name && reason) {
      courses.push({
        department: dept,
        number: number,
        name: name,
        reason: reason
      });
    }
  });
  
  // Build JSON object
  const jsonData = {
    firstName: firstName,
    middleInitial: middleName,
    lastName: lastName,
    divider: divider,
    mascotAdjective: mascotAdjective,
    mascotAnimal: mascotAnimal,
    image: imageSrc,
    imageCaption: imageCaption,
    personalStatement: personalStatement,
    personalBackground: personalBackground,
    professionalBackground: professionalBackground,
    academicBackground: academicBackground,
    subjectBackground: subjectBackground,
    primaryComputer: primaryComputer,
    courses: courses,
    quote: quote,
    quoteAuthor: quoteAuthor
  };
  
  // Add preferredName only if provided
  if (preferredName) {
    jsonData.preferredName = preferredName;
  }
  
  // Add optional fields only if provided
  if (funny) {
    jsonData.funny = funny;
  }
  
  if (share) {
    jsonData.share = share;
  }
  
  // Convert to pretty JSON string
  const jsonString = JSON.stringify(jsonData, null, 2);
  
  // Change the H2 heading
  const heading = document.querySelector('main h2');
  if (heading) {
    heading.textContent = 'Introduction JSON';
  }

  // Hide the form
  const form = document.querySelector('form');
  if (form) {
    form.style.display = 'none';
  }

  // Create or get the output container
  let outputContainer = document.getElementById('json-output');
  if (!outputContainer) {
    outputContainer = document.createElement('div');
    outputContainer.id = 'json-output';
    const main = document.querySelector('main');
    main.appendChild(outputContainer);
  }

  // Display the JSON with syntax highlighting
  outputContainer.innerHTML = `
    <section style="margin: 20px 0;">
      <pre style="background: #2d2d2d; padding: 20px; border-radius: 8px; overflow-x: auto;"><code class="language-json">${escapeHtmlJSON(jsonString)}</code></pre>
      <button onclick="backToFormJSON()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Back to Form</button>
    </section>
  `;

  // Apply Highlight.js if available
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
}

function backToFormJSON() {
  // Restore the H2 heading
  const heading = document.querySelector('main h2');
  if (heading) {
    heading.textContent = 'Build Your Own Introduction Form';
  }

  // Show the form again
  const form = document.querySelector('form');
  if (form) {
    form.style.display = 'block';
  }

  // Remove the JSON output container
  const outputContainer = document.getElementById('json-output');
  if (outputContainer) {
    outputContainer.remove();
  }
}