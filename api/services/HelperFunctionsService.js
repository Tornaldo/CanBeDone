var normalizeUrl = require('normalize-url');

module.exports = {

  normalizeUrl: function(url, removeFragment, removeHttpAndHttps){

    if(!removeFragment){
      url = normalizeUrl(url, {stripFragment: false});
    }
    else{
      url = normalizeUrl(url);
    }

    if(removeHttpAndHttps){
      url = url.replace(/^https:\/\//,'');
      url = url.replace(/^http:\/\//,'');
    }

    return url;

  },

  splitForAutocomplete: function(name, splitIntoWords, minGram, maxGram){

    name = HelperFunctionsService.processForAutocomplete(name);

    var words_in_name = name.split(" ");
    var name_autocomplete = [];
    var returnArr = [];

    minGram = minGram - 1;

    for (var i in words_in_name){
      for (var u in name_autocomplete) {
        name_autocomplete[u] = name_autocomplete[u].concat(" " + words_in_name[i]);
      }
      name_autocomplete.push(words_in_name[i]);
    }

    var wordSoFar = "";

    if(splitIntoWords){

      for (var i = 0; i < words_in_name.length; i++){
        for (var u = 0; u < name_autocomplete[i].length; u++) {
          wordSoFar = wordSoFar + name_autocomplete[i].charAt(u);
          if((u+1)>=minGram && (u+1)<=maxGram) returnArr.push(wordSoFar);
        }
        wordSoFar = "";
      }

    }
    else{

      for (var i = 0; i < name.length; i++) {
        wordSoFar = wordSoFar + name.charAt(i);
        if((i+1)>=minGram && (i+1)<=maxGram){
          returnArr.push(wordSoFar);
        }
      }

    }

    return returnArr;

  },

  processForAutocomplete: function(string){

    return string
      .replace(/[^([A-Za-z0-9\ ]/g,'')
      .replace( /\s\s+/g, ' ' )
      .toLowerCase();

  }
};
