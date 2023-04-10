/* This script uses the OpenAI API to generate text based on prompts provided the active Google Sheet.
The prompt retrieves the first cell from Column B after the header row then sends the completed prompt variable to the API. The reponse is written in the corresponding
cell in Column C. 
*/

function generateTextIteratively() {
  // set your OpenAI API key here
  var apiKey = "Your Key Here";
  
  // get the current spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // find the last row of the sheet
  var lastRow = sheet.getLastRow();
  
  // loop through each row in column B, starting from row 2 (skipping the header row)
  for (var i = 2; sheet.getRange(i, 2).getValue() != ""; i++) {
    // get the prompt text from column B in the current row
    var prompt = "Describe the OpenAI model " + sheet.getRange(i, 2).getValue() + " using less than 400 characters.";

    // set the parameters for the API request, using the prompt and secondary prompt
    var data = {
      "prompt": prompt,
      "temperature": 0.7,
      "max_tokens": 100,
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
    
    // save the prompt and generated text in column C in the current row
    sheet.getRange(i, 3).setValue(generatedText);
  }
}
