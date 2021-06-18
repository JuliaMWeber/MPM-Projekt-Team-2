// Device Daten speichern
let device = {};
device.width = document.documentElement.clientWidth;
device.height = document.documentElement.clientHeight;

/**
 * Liefert zufällige Ganzzahl aus einer bestimmten Range
 *
 * @param int min
 * @param int max
 * @return int 
 */
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Liefert zufälligen Dezimalzahl aus einer bestimmten Range
 *
 * @param float min
 * @param float max
 * @param int [places=0] Nachkommastellen
 * @return float 
 */
function randomFloatBetween(min, max, places = 0) {
  return (Math.random() * (max - min) + min).toFixed(places);
}

/**
 * Liefert X & Y Koordinaten eines Elements als Object zurück
 *
 * @param Node element
 * @return Object 
 */
function getPositionOfElement(element) {
  let rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top
  };
}

/**
 * Summiert Werte einer Array zusammen
 *
 * @param array array
 * @return int 
 */
function sumArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

/**
 * Generiert eine zufällige Zeichenkette für eine Zuweisung über IDs oder Klassen
 *
 * @return string 
 */
function generateGUID() {
  return 'guid_xxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Liefert den Mittelpunkt eines Elements zurück
 *
 * @need jQuery
 * @param Node element
 * @return object 
 */
function getCenterOfElement(element) {
  let coords = getPositionOfElement(element);

  return {
    x: coords.x + ($(element).width() / 2),
    y: coords.y + ($(element).height() / 2)
  }
}

/**
 * Wartet auf eine Variable bis sie gesetzt wurde
 *
 * @param string variable
 * @param function callback
 * @param int delay
 */
function waitFor(variable, callback, delay) {
  var interval = setInterval(function() {
    if (window[variable]) {
      clearInterval(interval);
      callback();
    }
  }, delay);
}