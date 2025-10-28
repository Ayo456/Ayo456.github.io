const formElement = document.querySelector("form");
let courseCount = 0;

// Prefilled course data from introduction.html
const defaultCourses = [
  {
    dept: "ANTH",
    number: "1501",
    name: "Global Social Science (Anthropology)",
    reason: "Needed a Global Science."
  },
  {
    dept: "ITIS",
    number: "3135",
    name: "Front-End Web App Development",
    reason: "I took it for my concentration but I also love Front-End and want to become more proficient with it."
  },
  {
    dept: "ITSC",
    number: "1600",
    name: "Computing Professionals",
    reason: "I'm a transfer student from an Early College High School, so I need to take it despite my credits."
  },
  {
    dept: "ITSC",
    number: "3146",
    name: "Introduction to Operating Systems and Networks",
    reason: "Needed as a core course for my major"
  },
  {
    dept: "PSYC",
    number: "1101",
    name: "General Psychology",
    reason: "Needed as an Elective course, and have heard good things about the topic in general."
  }
];

function addCourse(prefilledData = null) {
  courseCount++;
  const coursesList = document.getElementById('courseList');
  const li = document.createElement('li');
  li.className = 'course-item';
  li.id = `course-${courseCount}`;
  
  const { dept: deptValue = '', number: numberValue = '', name: nameValue = '', reason: reasonValue = '' } =
  prefilledData || {};
  
  li.innerHTML = `
    <div class="course-inputs">
      <label>Department:</label>
      <input type="text" name="dept-${courseCount}" placeholder="4-digit department code" value="${deptValue}" required>
      
      <label>Course Number:</label>
      <input type="text" name="number-${courseCount}" placeholder="4-digit course number" value="${numberValue}" required>
      
      <label>Course Name:</label>
      <input type="text" name="name-${courseCount}" placeholder="Course name" value="${nameValue}" required>
      
      <label>Reason for Taking:</label>
      <input name="reason-${courseCount}" type="text" placeholder="Why are you taking this course?" style="width: 400px; height: 20px;" value="${reasonValue}" required>
      
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
  
  // Get form data
  const firstName = document.getElementById('firstname').value;
  const middleName = document.getElementById('middlename').value;
  const lastName = document.getElementById('lastname').value;
  const preferredName = document.getElementById('pname').value;
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
  
  // Collect courses (if any exist)
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
      <h2 class="subheader">${firstName}${middleName ? ' ' + middleName : ''} ${lastName} ${divider} ${mascotAdjective} ${mascotAnimal}</h2>
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
          </li>${courses.length > 0 ? `
          <li>
            Courses I'm Taking & Why:${coursesHTML}
          </li>` : ''}${funny ? `
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
  // Clear all courses
  document.getElementById('courseList').innerHTML = '';
  courseCount = 0;
});

// Form submit handler
formElement.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // No longer require courses - allow submission with zero courses
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

window.addEventListener('DOMContentLoaded', function () {
  // Add all 5 default courses with prefilled data
  defaultCourses.forEach(function (courseData) {
    addCourse(courseData);
  });
});
