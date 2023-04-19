/*
This function generates text iteratively, using the OpenAI API, and saves the results in a Google Sheet. It prompts the API with text from a column in the sheet and recursively generates new columns with generated text. The number of columns generated is specified by the variable n.
*/

function generateTextIterativelySpaningN() {
  // set your OpenAI API key here
  var apiKey = "Your API key here";
  
  // get the current spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // find the last row of the sheet
  var lastRow = sheet.getLastRow();
  
  // set the starting row and column for the prompt
  var promptRow = 2;
  var promptCol = 4;
  
  // set the starting row and column for the generated text
  var textRow = 2;
  var textCol = 5;
  
  // set the number of times to recursively generate new columns
  var n = 5;
  
  for (var i = 0; i < n; i++) {
    // loop through each row in the current prompt column
    for (var j = promptRow; sheet.getRange(j, promptCol).getValue() != ""; j++) {
      // get the prompt text from the current prompt column
      var prompt = sheet.getRange(j, promptCol).getValue();

      // set the parameters for the API request, using the prompt and secondary prompt
      var data = {
        "prompt": prompt,
        "temperature": 0.7,
        "max_tokens": 300,
        "top_p": 1,
        "n": 1,
        "model": "text-curie-001"
      };
      
      // make the API request using UrlFetchApp
      var response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        "payload": JSON.stringify(data)
      });
      
      // parse the response and extract the generated text
      var result = JSON.parse(response.getContentText());
      var generatedText = result.choices[0].text.trim(); // trim leading and trailing white spaces
      
      // save the generated text in the next row of the generated text column
      sheet.getRange(textRow, textCol).setValue(generatedText);
      
      // move the prompt row down by one for the next iteration
      promptRow++;
      
      // move to the next row in the generated text column for the next iteration
      textRow++;
    }
    
    // set the new prompt column to be the generated text column
    promptCol++;
    
    // set the starting row for the new prompt column
    promptRow = 2;
    
    // set the starting row for the new generated text column
    textRow = 2;
    
    // add a new column for the generated text
    sheet.insertColumnAfter(textCol + i);
    
    // update the text column variable to be the new column
    textCol++;
  }
}
