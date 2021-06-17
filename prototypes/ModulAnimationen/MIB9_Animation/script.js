// Hier kommt das Custom Script Zeug rein
//testanimation mib9
let mib9Object = document.getElementById("mib9");
let thmColorless = mib9Object.contentDocument.getElementById("THMungefaerbt");
let thmColorfull = mib9Object.contentDocument.getElementById("THMgefaerbt");
gsap.from(thmColorless, {opacity: 0, delay: 1.5});
gsap.from(thmColorfull, {opacity: 0, duration: 3, delay: 3});