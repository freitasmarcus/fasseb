const URL = "https://script.google.com/macros/s/AKfycbzCCLdUTCtZ-nsPL5f5lBM8SW1jxRAWBekY9nJvCQX1M47R7AHJo9tA6JwYfFWKRbHZ/exec";

// 🔹 carregar nomes (autocomplete)
fetch(URL)
.then(res => res.json())
.then(lista => {

  console.log("Lista recebida:", lista); // 👈 DEBUG

  const datalist = document.getElementById("nomes");

  lista.forEach(item => {
    const option = document.createElement("option");
    option.value = item.nome;
    datalist.appendChild(option);
  });

})
.catch(err => {
  console.error("Erro no autocomplete:", err);
});

// 🔹 registrar presença
function registrar() {

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!nome || !cpf) {
    alert("Preencha todos os campos");
    return;
  }
if (cpf.length !== 11) {
  alert("CPF deve conter 11 números");
  return;
}
  navigator.geolocation.getCurrentPosition(pos => {

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        nome,
        cpf,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
    .then(res => res.json())
    .then(res => {
      document.getElementById("msg").innerText = res.mensagem;
    });

  }, () => {
    alert("Ative a localização!");
  });
}
