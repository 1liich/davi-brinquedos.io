// script.js atualizado

document.addEventListener('DOMContentLoaded', () => {
  console.log("Site de locação de brinquedos carregado!");

  // Carrossel de imagens / Final: autoSlide
  let index = 0;
  let intervalo;
  const carrossel = document.getElementById("carrossel");
  const imagens = carrossel.querySelectorAll("img");
  const total = imagens.length;
  const indicadoresContainer = document.getElementById("indicadores");

  // Criar bolinhas
  imagens.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      atualizarCarrossel();
      reiniciarAutoSlide();
    });
    indicadoresContainer.appendChild(dot);
  });

  function moverCarrossel(direcao) {
    index += direcao;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    atualizarCarrossel();
    reiniciarAutoSlide();
  }

  function atualizarCarrossel() {
    carrossel.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Eventos dos botões
  document.querySelector(".carrossel-btn.prev").addEventListener("click", () => moverCarrossel(-1));
  document.querySelector(".carrossel-btn.next").addEventListener("click", () => moverCarrossel(1));

  // Deslizamento automático
  function autoSlide() {
    intervalo = setInterval(() => {
      moverCarrossel(1);
    }, 5000); // 5 segundos
  }

  function reiniciarAutoSlide() {
    clearInterval(intervalo);
    autoSlide();
  }

  autoSlide(); // Inicia o automático

  // Eventos dos menus
  window.abrirAba = function(id) {
    document.getElementById('conteudo-principal').classList.add('oculto');
    document.querySelectorAll('.aba-conteudo').forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');

    // Faz scroll pro topo da aba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.voltarInicio = function() {
    document.getElementById('conteudo-principal').classList.remove('oculto');
    document.querySelectorAll('.aba-conteudo').forEach(sec => sec.classList.remove('ativa'));

    // Faz scroll pro topo da home
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Lightbox com navegação
  const imagensGaleria = document.querySelectorAll('.galeria-container img');
  const lightbox = document.getElementById('lightbox');
  const imagemLightbox = document.querySelector('.imagem-lightbox');
  const btnFechar = document.getElementById('lightbox-fechar');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');

  let indexAtual = 0;
  const listaImagens = Array.from(imagensGaleria);

  imagensGaleria.forEach((img, index) => {
    img.addEventListener('click', () => {
      imagemLightbox.src = img.src;
      indexAtual = index;
      lightbox.classList.add('ativo');
    });
  });

  function fecharLightbox() {
    lightbox.classList.remove('ativo');
    imagemLightbox.src = '';
  }

  btnFechar.addEventListener('click', fecharLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
  });

  function atualizarImagem(index) {
    imagemLightbox.classList.add('fade');
    setTimeout(() => {
      imagemLightbox.src = listaImagens[index].src;
      imagemLightbox.classList.remove('fade');
    }, 200);
  }

  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    indexAtual = (indexAtual - 1 + listaImagens.length) % listaImagens.length;
    atualizarImagem(indexAtual);
  });

  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    indexAtual = (indexAtual + 1) % listaImagens.length;
    atualizarImagem(indexAtual);
  });
});

// Botão voltar ao topo
window.voltarAoTopo = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

window.addEventListener('scroll', () => {
  const btnTopo = document.getElementById('btn-topo');
  if (window.scrollY > 300) {
    btnTopo.style.display = 'flex';
  } else {
    btnTopo.style.display = 'none';
  }
});


// Função de promoções
const promoContainer = document.getElementById("promo-container");

const promocoes = [
  {
    titulo: "Promoções em breve!",
    descricao: "Em breve!",
    preco: "R$ 00,00",
    imagem: ""
  },
  //{
    //titulo: "Cama Elástica + Pula-pula",
    //descricao: "Pacote especial fim de semana.",
    //preco: "R$ 149,90",
    //imagem: "imagens/cama-elastica.jpg"
  //},
  //{
    //titulo: "Combo 3 Brinquedos",
    //descricao: "Ideal para festas maiores.",
    //preco: "R$ 199,90",
    //imagem: "imagens/combo.jpg"
  //}
];


promocoes.forEach(promo => {
  const card = document.createElement("div");
  card.className = "card-promocao";
  card.innerHTML = `
    <img src="${promo.imagem}" alt="${promo.titulo}" class="promo-img">
    <h3>${promo.titulo}</h3>
    <p>${promo.descricao}</p>
    <div class="preco">${promo.preco}</div>
  `;

  // Adiciona o evento de clique com gtag
  card.addEventListener("click", () => {
    gtag('event', 'clique_promocao', {
      event_category: 'promocoes',
      event_label: promo.titulo
    });
  });
  
  promoContainer.appendChild(card);
});


