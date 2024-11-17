var word = "";
var musicsrc = "";
// speaker logo
var speaker = document.getElementById("speaker");
// audio id
var pronounciation = document.getElementById("pronounciation");

document.getElementById("search").addEventListener("click", function (event) {
  if ((event.target.tagName = "BUTTON")) {
    word = document.getElementById("word").value;
    meaning(word);
  }
});

async function meaning(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const maindiv = document.getElementById("maindiv");
    maindiv.innerHTML = "";
    const subdiv = document.createElement("div");
    subdiv.className = "subdiv";
    subdiv.innerHTML = `
    <h1>Word: ${word}</h1>   
    `;
    if (!response.ok) {
      const newerror = document.createElement("h4");
      newerror.textContent = `"Error: " + ${response.status}`;
      maindiv.appendChild(newerror);
    }
    const data = await response.json();

    data.forEach(function (wordinfo) {
      // set audio link//
      wordinfo.phonetics.forEach(function (music) {
        if (music.audio != "") {
          musicsrc = music.audio;
          pronounciation.src = "";
          pronounciation.src = musicsrc;
          console.log("pronounciation.src:" + pronounciation.src);
        }
      });

      console.log("music src:" + musicsrc);

      wordinfo.meanings.forEach(function (defn, index) {
        const meaning = document.createElement("h2");
        meaning.textContent = `Parts of speech: ${defn.partOfSpeech}`;
        subdiv.appendChild(meaning);

        defn.definitions.forEach(function (definitions, indexdef) {
          // definitions
          if (definitions.definition != "") {
            const defitn = document.createElement("h4");
            defitn.textContent = `${indexdef + 1}. Definition: ${
              definitions.definition
            }`;
            subdiv.appendChild(defitn);

            // synonyms
            if (definitions.synonyms != "") {
              const synonyms = document.createElement("li");
              synonyms.textContent = `synonyms: ${definitions.synonyms}`;
              subdiv.appendChild(synonyms);
            }

            // antonyms
            if (definitions.antonyms != "") {
              const antonyms = document.createElement("li");
              antonyms.textContent = `antonyms: ${definitions.antonyms}`;
              subdiv.appendChild(antonyms);
            }

            //examples
            if (definitions.example != "") {
              const example = document.createElement("h4");
              example.textContent = `example: ${definitions.example}`;
              subdiv.appendChild(example);
            }
          }
        });

        // synonyms
        defn.synonyms.forEach(function (synm, indexa) {
          if (synm != "") {
            const synonyms1 = document.createElement("li");
            synonyms1.innerHTML = ` synonyms ${indexa + 1}: ${synm}`;
            subdiv.appendChild(synonyms1);
          }
        });

        // antonyms1
        defn.antonyms.forEach(function (anym, indexs) {
          if (anym != "") {
            const antonyms1 = document.createElement("li");
            antonyms1.textContent = `antonyms ${indexs + 1} :  ${anym}`;
            subdiv.appendChild(antonyms1);
          }
        });
      });

      maindiv.appendChild(subdiv);
    });
  } catch (error) {
    alert(error.stack);
  }
}

speaker.addEventListener("click", function () {
  if (pronounciation.paused && speaker.className == "fa-solid fa-volume-low") {
    pronounciation.play();
    speaker.className = "fa-solid fa-volume-high";
  } else {
    pronounciation.pause();
    speaker.className = "fa-solid fa-volume-low";
  }
});
speaker.className = "fa-solid fa-volume-low";
