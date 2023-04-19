/*
This function generates single-word responses using the OpenAI API and writes them to a Google Sheets spreadsheet. 
It loops through a specified number of prompts and for each prompt, it writes the prompt text to column A in the current row, 
makes an API request to generate a single-word response based on the prompt, parses the response to extract the generated single-word text, 
and writes the single-word text to column B in the current row. 
*/

function generateSingleWordResponses() {
  // set your OpenAI API key here
  var apiKey = "Your API key here";
  
  // get the current spreadsheet and sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // specify the number of prompts you want to generate
  var numberOfPrompts = 10;

  // loop through the specified number of prompts, starting from row 2 (skipping the header row)
  for (var i = 2; i <= numberOfPrompts + 1; i++) {
    // write the prompt text to column A in the current row
    var prompt = "Prompt " + (i - 1);
    sheet.getRange(i, 1).setValue(prompt);

    // set the parameters for the API request, using the prompt
    var data = {
      "prompt": "Write one word",
      "temperature": 0.6,
      "max_tokens": 15,
      "top_p": 1,
      "n": 1,
      "model": "text-davinci-003"
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
    
    // parse the response and extract the generated single-word text
    var result = JSON.parse(response.getContentText());
    var singleWord = result.choices[0].text.trim(); // trim leading and trailing white spaces
    
    // save the single-word text in column B in the current row
    sheet.getRange(i, 1).setValue(singleWord);
  }
}
