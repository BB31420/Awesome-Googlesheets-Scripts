*/
Adds a new sheet named as the query and checks for duplicates before ammending 
/*

function getCraigslistItemsNewSheetByQuery() {
  
  var area = "pittsburgh"; // Area
  var category = "sys"; // for sale - Computers
  var query = "i7"; // search query

  var url = "https://" + area + ".craigslist.org/jsonsearch/" + category + "?query=" + query + "&srchType=A&hasPic=1&bundleDuplicates=1&format=json";
  
  console.log(url);

  var response = UrlFetchApp.fetch(url);

  var dataAll = JSON.parse(response.getContentText());

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = query;
  var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["CategoryID", "ImageThumb", "Latitude", "Longitude", "PostedDate", "PostingTitle", "PostingURL", "Price"]);
  }

  for (var i = 0; i < dataAll[0].length; i++) {
    var data = dataAll[0][i];
    var categoryID = data["CategoryID"];
    var imageThumb = data["ImageThumb"];
    var latitude = data["Latitude"];
    var longitude = data["Longitude"];
    var postedDate = data["PostedDate"];
    var postingTitle = data["PostingTitle"];
    var postingURL = data["PostingURL"];
    var price = data["price"];
    
    if (!isDuplicate(sheet, postingURL)) {
      sheet.appendRow([categoryID, imageThumb, latitude, longitude, postedDate, postingTitle, postingURL, price]);
    }
  }
}

function isDuplicate(sheet, postingURL) {
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][6] === postingURL) {
      return true;
    }
  }
  return false;
}
