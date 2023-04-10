/**
 * Retrieves a list of OpenAI models and writes the results to a new Google sheet named Models in Column A.
 * To use the OpenAI API in this script, you'll need to obtain an API key from OpenAI. 
 * To do so, create an account on the OpenAI website and navigate to the API page. 
 * From there, you can create a new API key and copy it into the apiKey variable below.
 * 
 * Note: Replace "Your Key Here" with your actual API key.
 */

function listModels() {
  // set your secret OpenAI API key here
  var apiKey = "Your Key Here";
  
  // make the API request using UrlFetchApp
  var response = UrlFetchApp.fetch("https://api.openai.com/v1/models", {
    "headers": {
      "Authorization": "Bearer " + apiKey
    }
  });
  
  // create a new sheet named "Models" and get its range
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet("Models");
  var range = sheet.getRange(1, 1);
  
  // parse the response and write it to the sheet
  var models = JSON.parse(response.getContentText()).data;
  var output = models.map(function(model) {
    return [model.id, model.owner, model.permissions, model.training_enabled, model.object_type];
  });
  range.offset(0, 0, output.length, output[0].length).setValues(output);
}
