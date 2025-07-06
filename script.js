function calculateBMI() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("loader").style.display = "block";

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";

    const unit = document.querySelector('input[name="unit"]:checked').value;
    const result = document.getElementById("result");

    let height, weight;

    if (unit === "metric") {
      height = parseFloat(document.getElementById("height").value);
      weight = parseFloat(document.getElementById("weight").value);
      if (!height || !weight || height <= 0 || weight <= 0) {
        result.innerHTML = `<span style="color:red;">Enter valid metric values!</span>`;
        return;
      }
      height = height / 100;
    } else {
      const feet = parseFloat(document.getElementById("feet").value);
      const inches = parseFloat(document.getElementById("inches").value);
      const pounds = parseFloat(document.getElementById("pounds").value);
      if ((!feet && feet !== 0) || (!inches && inches !== 0) || !pounds || feet < 0 || inches < 0 || pounds <= 0) {
        result.innerHTML = `<span style="color:red;">Enter valid imperial values!</span>`;
        return;
      }
      height = ((feet * 12) + inches) * 0.0254;
      weight = pounds * 0.453592;
    }

    const bmi = (weight / (height * height)).toFixed(2);

    let category = '', className = '';
    if (bmi < 18.5) { category = "Underweight"; className = "underweight"; }
    else if (bmi < 24.9) { category = "Normal"; className = "normal"; }
    else if (bmi < 29.9) { category = "Overweight"; className = "overweight"; }
    else { category = "Obese"; className = "obese"; }

    result.innerHTML = `<div>Your BMI is <strong>${bmi}</strong></div>
      <div class="bmi-result ${className}">${category}</div>`;
  }, 1000);
}

document.querySelectorAll('input[name="unit"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const metric = document.getElementById("metric-inputs");
    const imperial = document.getElementById("imperial-inputs");
    const note = document.getElementById("unit-note");

    if (radio.value === "metric") {
      metric.style.display = "block";
      imperial.style.display = "none";
      note.style.display = "none";
    } else {
      metric.style.display = "none";
      imperial.style.display = "block";
      note.style.display = "block";
    }
  });
});

document.getElementById("toggle-dark").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
