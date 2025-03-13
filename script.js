const botaoConverte = document.querySelector("#botaoConverte");
const valorMoeda01 = document.querySelector("#valorMoeda01");
const valorMoeda02 = document.querySelector("#valorMoeda02");
const tipoMoeda01 = document.querySelector("#tipoMoeda01");
const tipoMoeda02 = document.querySelector("#tipoMoeda02");

async function carregaListaMoedas() {
  const urlAPI = "https://economia.awesomeapi.com.br/json/available/uniq";

  function criaOptionTipoMoeda(local, valor, label, defaultSelecionado) {
    const option = document.createElement("option");
    option.value = valor;
    option.textContent = label;
    if (defaultSelecionado == valor) {
      option.setAttribute("selected", "");
    }
    local.appendChild(option);
  }

  fetch(urlAPI)
    .then((data) => {
      return data.json();
    })
    .then((objListaMoedas) => {
      Object.entries(objListaMoedas).forEach((moeda) => {
        criaOptionTipoMoeda(tipoMoeda01, moeda[0], moeda[1], "BRL");
        criaOptionTipoMoeda(tipoMoeda02, moeda[0], moeda[1], "USD");
      });
    });
}

carregaListaMoedas();

async function converte() {
  const de = tipoMoeda02.value;
  const para = tipoMoeda01.value;

  const codigoMoeda = de + "" + para;
  const urlAPI = `https://economia.awesomeapi.com.br/last/${de}-${para}`;

  botaoConverte.textContent = "Carregando...";

  try {
    fetch(urlAPI)
      .then((data) => {
        return data.json();
      })
      .then((objDadosMoedas) => {
        const valorMoedaAtual = objDadosMoedas[codigoMoeda].ask;
        const resultadoMoeda = valorMoedaAtual * valorMoeda01.value;

        valorMoeda02.value = parseFloat(resultadoMoeda).toFixed(2);
        botaoConverte.textContent = "Converter";
      });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
}

botaoConverte.addEventListener("click", converte);
