let shareCount = parseInt(localStorage.getItem("shareCount")) || 0;
let submitted = localStorage.getItem("submitted");

const shareBtn = document.getElementById("shareBtn");
const shareCountDisplay = document.getElementById("shareCount");
const form = document.getElementById("registrationForm");
const successMsg = document.getElementById("successMsg");

shareCountDisplay.textContent = `Click count: ${shareCount}/5`;

if (submitted) disableForm();

shareBtn.addEventListener("click", () => {
  // Validate if all form fields are filled
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const college = document.getElementById("college").value.trim();

  if (!name || !phone || !email || !college) {
    alert("Please fill in all your details before sharing.");
    return;
  }

  // Proceed with sharing
  if (shareCount < 5) {
    shareCount++;
    localStorage.setItem("shareCount", shareCount);
    shareCountDisplay.textContent = `Click count: ${shareCount}/5`;

    window.open(
      "https://wa.me/?text=👋%20Hey!%20Join%20me%20in%20the%20*Tech%20for%20Girls*...","_blank");
  

    if (shareCount === 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("Please complete sharing before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("college", document.getElementById("college").value);
  formData.append("screenshot", document.getElementById("screenshot").files[0]);

  // REPLACE with your actual Apps Script Web App URL
  await fetch("https://script.google.com/macros/s/AKfycbxbAT4zutc48ovYkbV0h5GfFgUbcsvqCL1_iTKYFEHP1kH2GmEopSrD5sSuM2YXvVeA/exec", {
    method: "POST",
    body: formData
  });

  localStorage.setItem("submitted", true);
  disableForm();
  successMsg.classList.remove("hidden");
});

function disableForm() {
  document.querySelectorAll("input, button").forEach(el => el.disabled = true);
  shareBtn.disabled = true;
  form.classList.add("disabled");
}
