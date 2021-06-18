// Hier kommt das Custom Script Zeug rein

$('object').each(function() {
  $(this).attr('data', $(this).attr('load-data'));
});

$('#svg').on('load', () => {
  console.log("SVG Loaded");

  let content = document.getElementById("svg").contentDocument;
  console.log(content);

  $(content).find("path").each(function() {
    $(this).attr('data-ignore','true');
  }).promise().done( function(){ 
    let vivus = new Vivus('svg', {
      type: "oneByOne",
      duration: 500,
      animTimingFunction: Vivus.EASE
    }, function(e) {
      console.log("Animation done");
    }); 
    vivus.play();
  });



});

