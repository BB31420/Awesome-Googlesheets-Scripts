/*
Makes a new sheet named Categories and populates data for later use
*/


function getCraigslistCategories() {
  var url = "http://reference.craigslist.org/Categories";
  var headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  };
  var options = {
    "headers": headers
  };
  var response = UrlFetchApp.fetch(url, options);
  var dataAll = JSON.parse(response.getContentText());
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Categories");
  if (!sheet) {
    sheet = ss.insertSheet("Categoriess");
    sheet.appendRow(["Abbreviation", "CategoryID", "Description", "Type"]);
  } else {
    sheet.clearContents();
  }
  
  for (var i = 0; i < dataAll.length; i++) {
    var data = dataAll[i];
    var Abbreviation = data["Abbreviation"];
    var CategoryID = data["CategoryID"];
    var Description = data["Description"];
    var Type = data["Type"];
    
    sheet.appendRow([Abbreviation, CategoryID, Description, Type]);
  }
}
