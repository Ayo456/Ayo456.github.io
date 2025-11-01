// Helper function to escape HTML for display
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function generateHTML() {
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
      courses.push({ dept, number, name, reason });
    }
  });
  
  // Get image source dynamically
  const imageElement = document.querySelector('#loadImage img');
  const imageSrc = imageElement ? imageElement.src : '';
  
  // Build the HTML code string with ACTUAL user input
  let htmlCodeString = '';
  
  // Add header with actual names
  htmlCodeString += `<h2 class="subheader">${firstName}${middleName ? ' ' + middleName : ''} ${lastName} ${divider} ${mascotAdjective} ${mascotAnimal}</h2>\n`;
  
  // Add preferred name only if provided
  if (preferredName) {
    htmlCodeString += `<p class="center-text italics white-text">Preferred Name: ${preferredName}</p>\n`;
  }
  
  htmlCodeString += `\n`;
  
  // Add personal statement
  htmlCodeString += `<p class="white-text center-text">\n`;
  htmlCodeString += `  ${personalStatement}\n`;
  htmlCodeString += `</p>\n`;
  
  // Add figure with actual image
  htmlCodeString += `<figure class="center-img image">\n`;
  htmlCodeString += `  <img\n`;
  htmlCodeString += `    src="${imageSrc}"\n`;
  htmlCodeString += `    alt="${imageCaption}"\n`;
  htmlCodeString += `    style="max-width: 300px; height: auto;"\n`;
  htmlCodeString += `  />\n`;
  htmlCodeString += `  <figcaption class="white-text">${imageCaption}</figcaption>\n`;
  htmlCodeString += `</figure>\n\n`;
  
  // Add section
  htmlCodeString += `<section>\n`;
  htmlCodeString += `  <h2 class="subheader">More About Me</h2>\n`;
  htmlCodeString += `  <ul class="white-text">\n`;
  htmlCodeString += `    <li>\n`;
  htmlCodeString += `      Personal Background: ${personalBackground}\n`;
  htmlCodeString += `    </li>\n`;
  htmlCodeString += `    <li>Professional Background: ${professionalBackground}</li>\n`;
  htmlCodeString += `    <li>\n`;
  htmlCodeString += `      Academic Background: ${academicBackground}\n`;
  htmlCodeString += `    </li>\n`;
  htmlCodeString += `    <li>\n`;
  htmlCodeString += `      Background in this Subject: ${subjectBackground}\n`;
  htmlCodeString += `    </li>\n`;
  htmlCodeString += `    <li>\n`;
  htmlCodeString += `      Primary Computer: ${primaryComputer}\n`;
  htmlCodeString += `    </li>\n`;
  
  // Add courses only if they exist
  if (courses.length > 0) {
    htmlCodeString += `    <li>\n`;
    htmlCodeString += `      Courses I'm Taking & Why:\n`;
    htmlCodeString += `      <ul>\n`;
    courses.forEach((course) => {
      htmlCodeString += `        <li>\n`;
      htmlCodeString += `          ${course.dept} ${course.number} - ${course.name}: ${course.reason}\n`;
      htmlCodeString += `        </li>\n`;
    });
    htmlCodeString += `      </ul>\n`;
    htmlCodeString += `    </li>\n`;
  }
  
  // Add funny thing only if provided
  if (funny) {
    htmlCodeString += `    <li>\n`;
    htmlCodeString += `      Something Funny to Remember Me: ${funny}\n`;
    htmlCodeString += `    </li>\n`;
  }
  
  // Add share only if provided
  if (share) {
    htmlCodeString += `    <li>\n`;
    htmlCodeString += `      Something I'd Like to Share: ${share}\n`;
    htmlCodeString += `    </li>\n`;
  }
  
  htmlCodeString += `  </ul>\n`;
  
  // Add quote section
  htmlCodeString += `  <h2 class="subheader">Favorite Quote</h2>\n`;
  htmlCodeString += `  <p class="center-text white-text">\n`;
  htmlCodeString += `    "${quote}"\n`;
  htmlCodeString += `  </p>\n`;
  htmlCodeString += `  <p class="center-text italics white-text">\n`;
  htmlCodeString += `    -${quoteAuthor}\n`;
  htmlCodeString += `  </p>\n`;
  htmlCodeString += `</section>`;

  // Change the H2 heading
  const heading = document.querySelector('main h2');
  if (heading) {
    heading.textContent = 'Introduction HTML';
  }

  // Hide the form
  const form = document.querySelector('form');
  if (form) {
    form.style.display = 'none';
  }

  // Create or get the output container
  let outputContainer = document.getElementById('html-output');
  if (!outputContainer) {
    outputContainer = document.createElement('div');
    outputContainer.id = 'html-output';
    const main = document.querySelector('main');
    main.appendChild(outputContainer);
  }

  // Display the HTML with syntax highlighting plus a back button
  outputContainer.innerHTML = `
    <section style="margin: 20px 0;">
      <pre style="background: #2d2d2d; padding: 20px; border-radius: 8px; overflow-x: auto;"><code class="language-html">${escapeHtml(htmlCodeString)}</code></pre>
      <button onclick="backToForm()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Back to Form</button>
    </section>
  `;

  // Apply Highlight.js if available
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
}

function backToForm() {
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

  // Remove the HTML output container
  const outputContainer = document.getElementById('html-output');
  if (outputContainer) {
    outputContainer.remove();
  }
}