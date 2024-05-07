document.addEventListener("DOMContentLoaded", function() {
    var clickButton = document.getElementById("clickButton");
    var clickCountDisplay = document.getElementById("clickCount");
    var clickCount = 0;
  
    clickButton.addEventListener("click", function() {
      clickCount++;
      clickCountDisplay.textContent = clickCount;
    });
  });