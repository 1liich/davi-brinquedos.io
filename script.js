// script.js atualizado

document.addEventListener('DOMContentLoaded', () => {
  console.log("Site de locação de brinquedos carregado!");

  const promos = document.querySelectorAll('.promo-item');
  promos.forEach(promo => {
    promo.addEventListener('click', () => {
      alert('Entre em contato pelo WhatsApp para aproveitar esta promoção!');
    });
  });

  let index = 0;
  const carrossel = document.querySelector('.carrossel');
  const imagens = document.querySelectorAll('.carrossel img');
  const total = imagens.length;

  const moverCarrossel = (direcao = 1) => {
    index += direcao;
    if (index >= total) index = 0;
    if (index < 0) index = total - 1;
    carrossel.style.transform = `translateX(-${index * 100}%)`;
  };

  document.querySelector('.carrossel-btn.prev').addEventListener('click', () => moverCarrossel(-1));
  document.querySelector('.carrossel-btn.next').addEventListener('click', () => moverCarrossel(1));

  setInterval(() => moverCarrossel(1), 4000);

  // Eventos dos menus
  window.abrirAba = function(id) {
    document.getElementById('conteudo-principal').classList.add('oculto');
    document.querySelectorAll('.aba-conteudo').forEach(sec => sec.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
  };

  window.voltarInicio = function() {
    document.getElementById('conteudo-principal').classList.remove('oculto');
    document.querySelectorAll('.aba-conteudo').forEach(sec => sec.classList.remove('ativa'));
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
