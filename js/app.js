const URL = "https://script.google.com/macros/s/AKfycbyrZpABm_VQ2XJwwlDwiG-PcbWWU8jRMQXkdJQedK6ATclcfp1j0xWLqSvmOVBzjogO/exec";

// 🔹 carregar nomes (autocomplete)
fetch(URL)
.then(res => res.json())
.then(lista => {
  const datalist = document.getElementById("nomes");

  lista.forEach(item => {
    const option = document.createElement("option");
    option.value = item.nome;
    datalist.appendChild(option);
  });
});

// 🔹 registrar presença
function registrar() {

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!nome || !cpf) {
    alert("Preencha todos os campos");
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