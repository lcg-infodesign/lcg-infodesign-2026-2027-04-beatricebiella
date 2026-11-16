let data;
let selezionata = "";
//associa ogni voto in stelle a un colore del tuorlo
let coloreStelle = {
  0: "#F3E7C1",
  1: "#F6D36B",
  2: "#F2B33D",
  3: "#E8862A",
  4: "#C95A1B",
  5: "#A8441A",
};

async function setup() {
  data = await loadTable("assets/ramen.csv", ",", "header");
  //console.log('dati: ', data)

  createCanvas(windowWidth, windowHeight);

  let parametri = getURLParams();
  //uso decodeURIComponent perché nell'url gli spazi diventano %20 (tipo Corea%20del%20Sud) e senza questa funzione il nome non avrebbe gli spazi normali
  selezionata = decodeURIComponent(parametri.paese);
}

function draw() {
  drawTavola();
  drawTitolo();
  drawLegenda();

  let dimCasella = 80; //dimensione casella
  let xCorrente = 100;
  let yCorrente = 200;

  for (let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++) {
    let paese = data.getString(rowNumber, "paese");

    if (paese == selezionata) {
      let stelle = data.getNum(rowNumber, "stelle");
      drawUovo(
        xCorrente + 0.5 * dimCasella,
        yCorrente + 0.5 * dimCasella,
        dimCasella * 0.7,
        coloreStelle[stelle]
      );

      xCorrente = xCorrente + dimCasella; //a dx di una casella

      if (xCorrente + dimCasella > width - 450) {
        //xCorrente dove va il prox uovo, + dimCasella aggiunge la sua larghezza cioè dove finisce, > width - 450 controlla se quel punto supera l'inizio della legenda

        yCorrente = yCorrente + dimCasella; //scende di una casella
        xCorrente = 100; //torna all'inizio della riga
      }
    }
  }
}

function drawTavola() {
  //parete titolo
  background("#2E211B");

  //tavolo parte da y = 150 e arriva in fondo
  noStroke();
  fill("#8A5A3B");
  rect(0, 150, width, height - 150);

  //bordo del tavolo
  fill("#6E4630");
  rect(0, 150, width, 12);

  //assi di legno
  stroke("#6E4630");
  strokeWeight(3);
  for (let i = 0; i < height / 70; i++) {
    line(0, 162 + i * 70, width, 162 + i * 70);
  }

  //venature del legno
  stroke("#9A6845");
  strokeWeight(1);
  for (let i = 0; i < height / 70; i++) {
    line(0, 162 + i * 70 + 25, width, 162 + i * 70 + 25);
    line(0, 162 + i * 70 + 45, width, 162 + i * 70 + 45);
  }
}

function drawTitolo() {
  noStroke();

  fill("#FFF6E6");
  textSize(42);
  text(selezionata, 50, 75); //non metto le virgolette a selezionata per far si che scriva quello che c'è nella variabile

  //sottotitolo
  fill("#F1DCC0");
  textSize(20);
  text("Quanto sono buoni i ramen in ciotola di questo paese?", 52, 104);

  fill("#FFF6E6");
  textSize(20);
  text("← Torna alla tavola", 60, height - 30);
}

function drawUovo(x, y, d, coloreTuorlo) {
  //uova che rappresentano tutti i ramen per quel paese
  push();
  translate(x, y);
  noStroke();
  fill("#FFFDF6");
  ellipse(0, 0, d * 0.78, d);
  fill(coloreTuorlo);
  ellipse(0, 0, d * 0.46, d * 0.52);
  pop();
}

function drawLegenda() {
  let x = width - 400;
  let y = 260;

  //riquadro
  noStroke();
  fill("#F2E6D3");
  rect(x, y, 260, 495);

  //titolo
  fill("#2B2220");
  textSize(22);
  text("La votazione", x + 20, y + 40);
  text("dei ramen", x + 20, y + 66);

  //spiegazione
  textSize(15);
  text("Ogni uovo è un ramen:", x + 20, y + 100);
  text("più il tuorlo è scuro,", x + 20, y + 118);
  text("più stelle ha ricevuto", x + 20, y + 136);

  //un uovo per ogni voto
  drawUovo(x + 40, y + 180, 30, coloreStelle[0]);
  fill("#2B2220");
  text("0 stelle", x + 75, y + 185);

  drawUovo(x + 40, y + 235, 30, coloreStelle[1]);
  fill("#2B2220");
  text("1 stella", x + 75, y + 240);

  drawUovo(x + 40, y + 290, 30, coloreStelle[2]);
  fill("#2B2220");
  text("2 stelle", x + 75, y + 295);

  drawUovo(x + 40, y + 345, 30, coloreStelle[3]);
  fill("#2B2220");
  text("3 stelle", x + 75, y + 350);

  drawUovo(x + 40, y + 400, 30, coloreStelle[4]);
  fill("#2B2220");
  text("4 stelle", x + 75, y + 405);

  drawUovo(x + 40, y + 455, 30, coloreStelle[5]);
  fill("#2B2220");
  text("5 stelle", x + 75, y + 460);
}

function mousePressed() {
  if (
    mouseX >= 60 &&
    mouseX <= 60 + 200 &&
    mouseY >= height - 50 &&
    mouseY <= height - 30
  ) {
    window.location.href = "index.html";
  }
}

