function calculate() {
  let basicTotal = document.getElementById("basicRate").value * document.getElementById("basicDays").value;
  let otTotal = document.getElementById("otRate").value * document.getElementById("otHours").value;
  let holidayTotal = document.getElementById("holidayRate").value * document.getElementById("holidayDays").value;
  let otherTotal = parseFloat(document.getElementById("otherEarnings").value) || 0;

  document.getElementById("basicTotal").innerText = basicTotal;
  document.getElementById("otTotal").innerText = otTotal;
  document.getElementById("holidayTotal").innerText = holidayTotal;
  document.getElementById("otherTotal").innerText = otherTotal;

  let totalEarnings = basicTotal + otTotal + holidayTotal + otherTotal;
  document.getElementById("totalEarnings").innerText = totalEarnings;

  let sss = parseFloat(document.getElementById("sss").value) || 0;
  let philhealth = parseFloat(document.getElementById("philhealth").value) || 0;
  let pagibig = parseFloat(document.getElementById("pagibig").value) || 0;
  let tax = parseFloat(document.getElementById("tax").value) || 0;
  let loan = parseFloat(document.getElementById("loan").value) || 0;

  let totalDeductions = sss + philhealth + pagibig + tax + loan;
  document.getElementById("totalDeductions").innerText = totalDeductions;

  let netPay = totalEarnings - totalDeductions;
  document.getElementById("netPay").innerText = netPay;
}

// Logo upload
const logoUpload = document.getElementById("logoUpload");
logoUpload.addEventListener("change", function(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("logo").src = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
});

// Auto calculate when values change
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", calculate);
});

// Save as Image
function saveAsImage() {
  html2canvas(document.querySelector("#payslip")).then(canvas => {
    let link = document.createElement("a");
    link.download = "payslip.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Clear all data
function clearAll() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  calculate();
}

// Duplicate payslip for printing
function preparePrint() {
  let payslip = document.getElementById("payslip").outerHTML;
  let printArea = document.getElementById("printArea");
  printArea.innerHTML = payslip + payslip + payslip + payslip;
}

// Load html2canvas dynamically
(function loadScript() {
  let script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  document.body.appendChild(script);
})();

// Hook into print
window.onbeforeprint = preparePrint;

// Initialize first calculation
window.onload = calculate;
