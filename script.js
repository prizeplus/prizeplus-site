document.addEventListener("DOMContentLoaded", () => {

  // Handle all forms
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function(e){
      e.preventDefault();

      const btn = this.querySelector("button");
      const oldText = btn ? btn.innerText : "Submit";

      if(btn){
        btn.innerText = "Processing...";
        btn.disabled = true;
      }

      setTimeout(() => {
        alert("Success! Your request has been submitted.");
        this.reset();

        if(btn){
          btn.innerText = oldText;
          btn.disabled = false;
        }
      }, 1200);
    });
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
      const target = document.querySelector(this.getAttribute("href"));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth"});
      }
    });
  });

  // Rotate ticker messages if ticker exists
  const tickerSpan = document.querySelector(".ticker span");
  if(tickerSpan){
    const msgs = [
      "🔥 Maria from Spain entered today",
      "🔥 David from Canada won $500",
      "🔥 Sarah from USA claimed reward",
      "🔥 Liam from UK joined PrizePlus",
      "🔥 Asha from Jamaica entered now"
    ];

    let i = 0;
    setInterval(() => {
      i = (i + 1) % msgs.length;
      tickerSpan.textContent = msgs[i];
    }, 5000);
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(item => {
    const p = item.querySelector("p");
    const h = item.querySelector("h3");

    if(p && h){
      p.style.display = "none";

      h.style.cursor = "pointer";
      h.addEventListener("click", () => {
        p.style.display = p.style.display === "none" ? "block" : "none";
      });
    }
  });

});

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),          // Time Submitted
    data.name || "",     // Full Name
    data.email || "",    // Email
    data.country || "",  // Typed Country / Region
    data.phone || "",    // Phone
    data.ip || "",       // IP Address
    data.device || "",   // Device Info
    data.referrer || ""  // Referrer
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({
      result: "success"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
