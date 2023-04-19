/*
Make a new sheet to populate information about craigslist for later use
*/

function getCraigslistData() {
  var url = "http://reference.craigslist.org/Areas";
  var response = UrlFetchApp.fetch(url);
  var dataAll = JSON.parse(response.getContentText());
  
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clearContents();
  
  sheet.appendRow(["Abbreviation", "AreaID", "Country", "Description", "Hostname", "Latitude", "Longitude", "Region", "ShortDescription", "Timezone"]);
  
  for (var i = 0; i < dataAll.length; i++) {
    var data = dataAll[i];
    var abbreviation = data["Abbreviation"];
    var areaID = data["AreaID"];
    var country = data["Country"];
    var description = data["Description"];
    var hostName = data["Hostname"];
    var latitude = data["Latitude"];
    var longitude = data["Longitude"];
    var region = data["Region"];
    var shortDescription = data["ShortDescription"];
    var timezone = data["Timezone"];
    
    
    sheet.appendRow([abbreviation, areaID, country, description, hostName, latitude, longitude, region, shortDescription, timezone]);
  }
}
