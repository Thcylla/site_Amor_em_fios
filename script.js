let carrinho = [];

function scrollToProdutos() {
  const section = document.getElementById("produtos");
  section.scrollIntoView({ behavior: "smooth" });
}

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
  abrirCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const total = document.getElementById("total-carrinho");
  const botaoFinalizar = document.getElementById("finalizar-compra");

  lista.innerHTML = "";
  let soma = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} 
      <button onclick="removerItem(${index})">X</button>`;
    lista.appendChild(li);
    soma += item.preco;
  });

  total.textContent = `Total: R$ ${soma.toFixed(2)}`;
  botaoFinalizar.disabled = carrinho.length === 0;
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function abrirCarrinho() {
  document.getElementById("carrinho-modal").classList.add("carrinho-aberto");
}

function fecharCarrinho() {
  document.getElementById("carrinho-modal").classList.remove("carrinho-aberto");
}

function finalizarCompra() {
  if (carrinho.length === 0) return;

  // Salva os dados no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Redireciona para a página de pagamento
  window.location.href = "pagina_pagamento.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".produto button");
  botoes.forEach(botao => {
    botao.addEventListener("click", (e) => {
      const produto = e.target.closest(".produto");
      const nome = produto.querySelector("h4").textContent;
      const preco = parseFloat(produto.querySelector("p").textContent.replace("R$ ", "").replace(",", "."));
      adicionarAoCarrinho(nome, preco);
    });
  });

  document.getElementById("abrir-carrinho").addEventListener("click", (e) => {
    e.preventDefault();
    abrirCarrinho();
  });

  document.getElementById("fechar-carrinho").addEventListener("click", fecharCarrinho);

  const btnFinalizar = document.getElementById("finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", finalizarCompra);
  }
});

