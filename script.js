// script.js

alert("🎉 Welcome to PrizePlus!");

let buttons = document.querySelectorAll(".btn");

buttons.forEach(btn=>{
btn.addEventListener("mouseover",()=>{
btn.style.transform="scale(1.05)";
});
btn.addEventListener("mouseout",()=>{
btn.style.transform="scale(1)";
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
