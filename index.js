const button = document.getElementById("button");
const clearBtn = document.getElementById("clearBtn");
const logContainer = document.getElementById("logDisplay");

// ✅ Display one log
function displayLog(entry) {
  const div = document.createElement("div");
  div.className = "entry"; // Apply CSS
  div.innerHTML = `
    <p><strong>Date:</strong> ${entry.date}</p>
    <p><strong>Hours:</strong> ${entry.hours}</p>
    <p><strong>Topics:</strong> ${entry.topics}</p>
    <p><strong>Learned:</strong> ${entry.learned}</p>
  `;
  logContainer.appendChild(div); // Add to log container
}

// ✅ Load and display logs on page load
window.onload = function () {
  const savedLogs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
  savedLogs.forEach(displayLog);
};

// ✅ Add new log
button.addEventListener("click", () => {
  const date = document.getElementById("date").value;
  const hours = document.getElementById("hours").value;
  const topics = document.getElementById("topics").value;
  const learned = document.getElementById("learned").value;

  if (!date || !hours || !topics || !learned) {
    alert("Please fill in all fields");
    return;
  }

  const newEntry = { date, hours, topics, learned };

  let logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
  logs.push(newEntry);
  localStorage.setItem("dailyLogs", JSON.stringify(logs));

  displayLog(newEntry);

  // Clear inputs
  document.getElementById("date").value = "";
  document.getElementById("hours").value = "";
  document.getElementById("topics").value = "";
  document.getElementById("learned").value = "";
});

// ✅ Clear all logs
clearBtn.addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to delete all logs?");
  if (confirmClear) {
    localStorage.removeItem("dailyLogs");
    logContainer.innerHTML = ""; // Clear display
  }
});
