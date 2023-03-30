const pollCreateTemplate = `        JAUNAS APTAUJAS NOSAUKUMS - <input type="text" id="newPollHeadline"/><br>
JAUNAS APTAUJAS VARIANTI - <div id="pollVariantList">
    <input type="text" id="var1"/><br>
    <input type="text" id="var2"/><br>
</div>
<button id="addVariantToNewPoll" onclick="addVarToNewPoll()">+ VARIANTS</button><br>
<button id="newPollSubmit" onclick="submitNewPoll()"><b>OK</b></button>`;

const articleCreationTemplate = `
<b>IZVĒLĒTIES DOCX DATNI -</b> <input type="file" id="inputDocx" name="photo"/><br>
<b>KAD ESAT PĀRLIECINĀTI, SPIEDIET</b> - <button id="submitFile" onclick="submitDocxFile()">ATSŪTĪT</button><br>
`;

function initiateArticleCreation() {
  let output = document.getElementById("output");

  output.innerHTML = articleCreationTemplate;
}

function submitDocxFile() { 
  const selectedFile = document.getElementById("inputDocx").files[0];
  console.log(selectedFile);
``
  let formData = new FormData();
  formData.append("file", selectedFile);
  for (var p of formData) {
    console.log(p);
  }
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
    }
  }
  xhr.timeout = 5000;
  xhr.open("POST", 'adminpanelHandle.php'); 
  xhr.send(formData);
}
