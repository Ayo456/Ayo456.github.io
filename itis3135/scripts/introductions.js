const formElement = document.querySelector("form");
let courseCount = 0;

function addCourse() {
  courseCount++;
  const coursesList = document.getElementById('courseList');
  const li = document.createElement('li');
  li.className = 'course-item';
  li.id = `course-${courseCount}`;
  
  li.innerHTML = `
    <div class="course-inputs">
      <label>Department:</label>
      <input type="text" name="dept-${courseCount}" placeholder="4-digit department code" required>
      
      <label>Course Number:</label>
      <input type="text" name="number-${courseCount}" placeholder="4-digit course number" required>
      
      <label>Course Name:</label>
      <input type="text" name="name-${courseCount}" placeholder="Course name" required>
      
      <label>Reason for Taking:</label>
      <input name="reason-${courseCount}" type="text" placeholder="Why are you taking this course?" style="width: 400px; height: 20px;" required>
      
      <button type="button" class="remove-btn" onclick="removeCourse(${courseCount})">Delete Course</button>
    </div>
  `;
  
  coursesList.appendChild(li);
}

function removeCourse(id) {
  const course = document.getElementById(`course-${id}`);
  if (course) {
    course.remove();
  }
}

function loadImage() {
  const imageInput = document.getElementById('introImage');
  if (imageInput.files && imageInput.files[0]) {
    const image = imageInput.files[0];
    const imageURL = URL.createObjectURL(image);
    document.getElementById('loadImage').innerHTML = `<img src="${imageURL}" style="max-width: 300px; margin-top: 10px;">`;
  }
}

function resetForm() {
  location.reload(); 
}

function generateOutputPage() {
  const formData = new FormData(formElement);
  
  // Get form data - using the actual id attributes since name attributes conflict
  const firstName = document.getElementById('firstname').value;
  const middleName = document.getElementById('middlename').value;
  const lastName = document.getElementById('lastname').value;
  const preferredName = document.getElementById('pname').value;
  const initials = document.getElementById('initials').value;
  const date = document.getElementById('date').value;
  const mascotAdjective = document.getElementById('mascotadjective').value;
  const mascotAnimal = document.getElementById('mascotanimal').value;
  const divider = document.getElementById('divider').value;
  const imageCaption = document.getElementById('imageCaption').value;
  const personalStatement = document.getElementById('personalStatement').value;
  const personalBackground = document.getElementById('personalBackground').value;
  const professionalBackground = document.getElementById('professionalBackground').value;
  const academicBackground = document.getElementById('academicBackground').value;
  const primaryComputer = document.getElementById('primaryComputer').value;
  const subjectBackground = document.getElementById('SubjectBackground').value;
  const quote = document.getElementById('quote').value;
  const quoteAuthor = document.getElementById('quoteAuthor').value;
  const funny = document.getElementById('funny').value;
  const share = document.getElementById('share').value;
  const cltWeb = document.getElementById('cltWeb').value;
  const github = document.getElementById('github').value;
  const githubIo = document.getElementById('githubIo').value;
  const freeCodeCamp = document.getElementById('freeCodeCamp').value;
  const codecademy = document.getElementById('codecademy').value;
  const linkedIn = document.getElementById('linkedIn').value;
  
  // Collect courses
  const courses = [];
  for (let i = 1; i <= courseCount; i++) {
    const dept = formData.get(`dept-${i}`);
    const number = formData.get(`number-${i}`);
    const name = formData.get(`name-${i}`);
    const reason = formData.get(`reason-${i}`);
    
    if (dept && number && name && reason) {
      courses.push({ dept, number, name, reason });
    }
  }
  
  // Build courses HTML - exactly matching introduction.html format
  let coursesHTML = '';
  if (courses.length > 0) {
    coursesHTML = '<ul>';
    courses.forEach((course) => {
      coursesHTML += `
              <li>
                ${course.dept} ${course.number} - ${course.name}: ${course.reason}
              </li>`;
    });
    coursesHTML += `
            </ul>`;
  }
  
  // Get image source
  const imageElement = document.querySelector('#loadImage img');
  const imageSrc = imageElement ? imageElement.src : '';
  
  // Generate output page matching introduction.html structure EXACTLY
  let outputHTML = `
      <h2 class="subheader">${firstName}${middleName ? ' ' + middleName : ''} ${lastName} | ${mascotAdjective} ${mascotAnimal}</h2>
      ${preferredName ? `<p class="center-text italics white-text">Preferred Name: ${preferredName}</p>` : ''}
      
      <p class="white-text center-text">
        ${personalStatement}
      </p>
      <figure class="center-img image">
        <img
          src="${imageSrc}"
          alt="${imageCaption}"
          style="max-width: 300px; height: auto;"
        />
        <figcaption class="white-text">${imageCaption}</figcaption>
      </figure>

      <section>
        <h2 class="subheader">More About Me</h2>
        <ul class="white-text">
          <li>
            Personal Background: ${personalBackground}
          </li>
          <li>Professional Background: ${professionalBackground}</li>
          <li>
            Academic Background: ${academicBackground}
          </li>
          <li>
            Background in this Subject: ${subjectBackground}
          </li>
          <li>
            Primary Computer: ${primaryComputer}
          </li>
          <li>
            Courses I'm Taking & Why:${coursesHTML}
          </li>${funny ? `
          <li>
            Something Funny to Remember Me: ${funny}
          </li>` : ''}${share ? `
          <li>
            Something I'd Like to Share: ${share}
          </li>` : ''}
        </ul>
        <h2 class="subheader">Favorite Quote</h2>
        <p class="center-text white-text">
          "${quote}"
        </p>
        <p class="center-text italics white-text">
          -${quoteAuthor}
        </p>
      </section>
      
      <p class="white-text">I acknowledge that the information I present here is public. - ${initials}</p>
      <p class="white-text italics">Date: ${date}</p>
      
      <nav class="white-text">
        <a href="${cltWeb}">CLT Web</a> ${divider}
        <a href="${github}">GitHub</a> ${divider}
        <a href="${githubIo}">GitHub.io</a> ${divider}
        <a href="${freeCodeCamp}">freeCodeCamp</a> ${divider}
        <a href="${codecademy}">Codecademy</a> ${divider}
        <a href="${linkedIn}">LinkedIn</a> ${divider}
      </nav>
      
      
  `;
  
  // Replace main content
  const main = document.querySelector('main');
  main.innerHTML = outputHTML;
}

// Clear button functionality
document.querySelector("#clear").addEventListener("click", function (event) {
  Array.from(document.querySelectorAll("form input")).forEach((input) => {
    input.value = "";
  });
});

// Form submit handler
formElement.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Check if at least one course has been added
  if (courseCount === 0) {
    alert("Please add at least one course using the 'Add Course' button!");
    return;
  }
  
  const requiredFields = formElement.querySelectorAll('[required]');
  let allValid = true;
  
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      allValid = false;
      field.style.border = "2px solid red";
    } else {
      field.style.border = "";
    }
  });
  
  if (!allValid) {
    alert("Please fill in all required fields!");
    return;
  }
  
  generateOutputPage();
});