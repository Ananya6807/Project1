/*clock*/
function updateClock() {
  let now = new Date();

  let time = now.toLocaleTimeString();
  let date = now.toLocaleDateString();
  

  document.getElementById("clock").innerText = time;
  document.getElementById("date").innerText = date;
}

// update every second
setInterval(updateClock, 1000);

updateClock();

/*quote display*/
async function getQuote() {
  try {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    console.log(data); // see actual data

    document.getElementById("quoteText").innerText =
      `"${data.quote || data.q}" — ${data.author || data.a}`;
  } catch (error) {
    document.getElementById("quoteText").innerText =
      "Believe in yourself and keep going.";
  }
}

getQuote();

/*section selection*/

function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

showSection("home");


/*assignments*/
let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function addAssignment() {
  let titleInput = document.getElementById("title");
  let deadlineInput = document.getElementById("deadline");

  let title = titleInput.value.trim();
  let deadline = deadlineInput.value;

  if (title === "" || deadline === "") {
    alert("Fill both fields");
    return;
  }

  let newAssignment = {
    title: title,
    deadline: deadline
  };

  assignments.push(newAssignment);

  localStorage.setItem("assignments", JSON.stringify(assignments));

  displayAssignments();
  displayDueToday();

  titleInput.value = "";
  deadlineInput.value = "";
}

function displayAssignments() {
  let list = document.getElementById("assignmentList");
  list.innerHTML = "";

  if (assignments.length === 0) {
    list.innerHTML = "<li>No assignments added</li>";
    return;
  }

  for (let i = 0; i < assignments.length; i++) {
    let li = document.createElement("li");

    li.innerHTML = `
      ${assignments[i].title} - ${assignments[i].deadline}
      <button onclick="deleteAssignment(${i})">Delete</button>
    `;

    list.appendChild(li);
  }
}

function displayDueToday() {
  let dueTodayList = document.getElementById("dueTodayList");
  dueTodayList.innerHTML = "";

  let today = new Date().toISOString().split("T")[0];
  let found = false;

  for (let i = 0; i < assignments.length; i++) {
    if (assignments[i].deadline === today) {
      let li = document.createElement("li");

      li.innerHTML = `
        ${assignments[i].title}
        <button onclick="deleteAssignment(${i})">Delete</button>
      `;

      dueTodayList.appendChild(li);
      found = true;
    }
  }

  if (!found) {
    dueTodayList.innerHTML = "<li>No assignments due today</li>";
  }
}

function deleteAssignment(index) {
  assignments.splice(index, 1);

  localStorage.setItem("assignments", JSON.stringify(assignments));

  displayAssignments();
  displayDueToday();
}

displayAssignments();
displayDueToday();
/*notes*/

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNote() {
  let text = document.getElementById("noteInput").value;

  if (text === "") {
    alert("Write something!");
    return;
  }

  notes.push(text);
  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();

  document.getElementById("noteInput").value = "";
}

function displayNotes() {
  let container = document.getElementById("savedNotes");
  container.innerHTML = "";

  notes.forEach((note, index) => {
    let div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      ${note}
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}


/*timetable*/

function showTodayLectures() {
  let day = new Date().getDay();
  let lectures = "";

  if (day === 1) {
    lectures =
      document.getElementById("mon1").innerText + " (9:00-10:00am)<br>" +
      document.getElementById("mon2").innerText + " (10:00am–1:00pm)<br>" +
      document.getElementById("mon3").innerText + " (2:00-3:00pm)<br>" +
      document.getElementById("mon4").innerText + " (3:00-4:00pm)<br>" +
      document.getElementById("mon5").innerText + " (4:00-5:00pm)<br>" +
      document.getElementById("mon6").innerText + " (5:00-6:00pm)";
  }

  else if (day === 2) {
    lectures =
      document.getElementById("tue1").innerText + " (9:00-10:00am)<br>" +
      document.getElementById("tue2").innerText + " (10:00am–1:00pm)<br>" +
      document.getElementById("tue3").innerText + " (2:00-3:00pm)<br>" +
      document.getElementById("tue4").innerText + " (3:00-4:00pm)<br>" +
      document.getElementById("tue5").innerText + " (4:00-5:00pm)<br>" +
      document.getElementById("tue6").innerText + " (5:00-6:00pm)";
  }

  else if (day === 3) {
    lectures =
      document.getElementById("wed1").innerText + " (9:00-10:00am)<br>" +
      document.getElementById("wed2").innerText + " (10:00am–1:00pm)<br>" +
      document.getElementById("wed3").innerText + " (2:00-3:00pm)<br>" +
      document.getElementById("wed4").innerText + " (3:00-4:00pm)<br>" +
      document.getElementById("wed5").innerText + " (4:00-5:00pm)<br>" +
      document.getElementById("wed6").innerText + " (5:00-6:00pm)";
  }

  else if (day === 4) {
    lectures =
      document.getElementById("thu1").innerText + " (9:00-10:00am)<br>" +
      document.getElementById("thu2").innerText + " (10:00am–1:00pm)<br>" +
      document.getElementById("thu3").innerText + " (2:00-3:00pm)<br>" +
      document.getElementById("thu4").innerText + " (3:00-4:00pm)<br>" +
      document.getElementById("thu5").innerText + " (4:00-5:00pm)<br>" +
      document.getElementById("thu6").innerText + " (5:00-6:00pm)";
  }

  else if (day === 5) {
    lectures =
      document.getElementById("fri1").innerText + " (9:00-10:00am)<br>" +
      document.getElementById("fri2").innerText + " (10:00am–1:00pm1)<br>" +
      document.getElementById("fri3").innerText + " (2:00-3:00pm)<br>" +
      document.getElementById("fri4").innerText + " (3:00-4:00pm)<br>" +
      document.getElementById("fri5").innerText + " (4:00-5:00pm)<br>" +
      document.getElementById("fri6").innerText + " (5:00-6:00pm)";
  }

  else {
    lectures = "No classes today";
  }

  document.getElementById("todayLectures").innerHTML = lectures;
}

showTodayLectures();
/*theme*/
function toggleTheme() {
  document.body.classList.toggle("dark");

  let btn = document.getElementById("themeBtn");

  if (document.body.classList.contains("dark")) {
    btn.innerText = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    btn.innerText = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
}
function loadTheme() {
  let theme = localStorage.getItem("theme");
  let btn = document.getElementById("themeBtn");

  if (theme === "dark") {
    document.body.classList.add("dark");
    btn.innerText = "Light Mode";
  }
}

loadTheme();
displayNotes();










