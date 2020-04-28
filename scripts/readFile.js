async function readFile(file) {
    const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
    switch (extension) {
        case "txt":
            return readTxt(file);
        //case "pdf":
        //    return readPdf(file);
        default:
            alert("Please enter a .txt file.");
            return "";
    }
}

// Handle .txt files
function readUploadedFileAsText(file) {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(file);
  });
}

async function readTxt(file) {
    return await readUploadedFileAsText(file);
}

// Handle .pdf files
/*
async function readPdf(pdf) {
    var temp = await postData('/pdf-to-text', { pdf: JSON.stringify(pdf) });
    console.log(temp);
    return temp;
}
*/
