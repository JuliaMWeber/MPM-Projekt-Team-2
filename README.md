# MIB18 Medien-Projekt: Schwerpunkt Web&Mobile (SoSe 2021) - Team 2

## Stages
- [Netlify: MP-Team2](https://mpteam2.netlify.app/)  
  *Deployment alle 5min*

## Team
- **Antony Zwickl** ([@azwk67](https://git.thm.de/azwk67))   
  Developer
- **Julia Melanie Weber** ([@jmwb03](https://git.thm.de/jmwb03))  
  Developer
- **Leander Theiß** ([@lths23](https://git.thm.de/lths23))  
  Developer
- **Marc Rosenberger** ([@mrsn78](https://git.thm.de/mrsn78))  
  Developer
- **Omer Mohammed Omer Ahmed** ([@omoa28](https://git.thm.de/omoa28))  
  Developer
- **Patrick Walczynski** ([@pwlc82](https://git.thm.de/pwlc82))  
  Developer
- **Benjamin Einert** ([@u11839](https://git.thm.de/u11839))  
  Product Owner

## Externe Dateien & Referenzen
- [Google Drive Ordner](https://drive.google.com/drive/folders/19W8PwGEv4_02BczPSCY18Ag7Ha4xm0PS)


## Dokumentation

### Aktualisierung von Modulen
Datei: `./assets/data/modulhandbuch.json`  
Die Daten einzelner Module lassen sich über die JSON-Datei aktualisieren. 

### Aktualisierung der Modul-Planeten
Die Zuweisung der Planeten zu verschiedenen Modulen erfolgt über das Kürzel (z.B. MIB5) sowie dem Pfad des SVG vom Planeten.  

Datei: `./assets/data/planets.json`
```
{
  "name": "Planet_v1_1.svg", // Name ist optional
  "path": "./assets/svg/Planets/Planet_v1_1.svg",
  "modules": ["MIB1","MIB14","MIB26","MIB38"] // Mehrfachnennung möglich
}
```

### Aktualisierung von Modulanimationen
Die Modulanimationen werden über zwei Dateien gesteuert. Einerseits benötigen sie eine SVG Datei sowie das zugehörige Javascript.
Die Zuweisung des Moduls zur jeweiligen SVG-Datei erfolgt über folgende Datei:  
Datei: `./assets/data/modulAnim.json`  
```
{
  "id" : "MIB3", // Kürzel des Moduls
  "svg" : "./assets/svg/ModulanimationSVGS/MIB3_Final.svg"
}
```

Das jeweilige Javascript kann in der Datei `modulAnimInserter.js` gepflegt werden.  
Datei: `./assets/data/modulAnimInserter.js` 

In der Funktion `loadAnimationScript` (Zeile 26ff) erfolgt die Zuweisung des Moduls zum jeweiligen Javascript der Animation.
```
case "MIB2a" : // Modul-Kürzel
  mib2Anim(content); // JS Animations-Funktion
  break;
```

In der selben Datei kann am Ende eine neue Modulanimation hinzugefügt werden.

### Aktualisierung von Schwerpunktwahl Animationen
Die Zuweisung der Animation folgt in der Datei `schwerpunktwahl.js` (Zeile 63ff).
Datei: `./assets/data/schwerpunktwahl.js` 

```
if (id == 1) { // 'id' entspricht der Hash-Nummer
  animateMP(data, '#medienproduktion'); // Funktion mit Übergabe einer frei wählbaren ID
} else if (id == 2) {
  animateWM(data, '#webmobile');
} else {
  console.log("ID not found");
}
```

Nachfolgend ab Zeile 75ff erfolgt die Erstellung der Javascript Funktion für die oben genannte Zuweisung.