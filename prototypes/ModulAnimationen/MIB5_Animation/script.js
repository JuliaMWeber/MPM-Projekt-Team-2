// Objekte nachladen
$('object').each(function() {
  $(this).attr('data', $(this).attr('load-data'));
});

// Starten sobald das jeweilige Element geladen wurde
$('#mib5').on('load', () => {
  console.log("SVG Loaded");
  let vivus = new Vivus('mib5', {
    type: "scenario",
  }, function(e) {
    console.log("Animation done");
  }); 
  vivus.play();

});
