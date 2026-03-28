/* script.js – Davi Brinquedos (versão moderna) */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
   *   HEADER: efeito ao rolar
   * ============================================ */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ============================================
   *   MENU MOBILE (hamburger)
   * ============================================ */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  window.fecharMenu = function () {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  };

  /* ============================================
   *   REVEAL AO SCROLL (IntersectionObserver)
   * ============================================ */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* ============================================
   *   CARROSSEL
   * ============================================ */
  let carrosselIndex = 0;
  let carrosselIntervalo;
  const carrossel = document.getElementById('carrossel');

  if (carrossel) {
    const imagens = carrossel.querySelectorAll('img');
    const total = imagens.length;
    const indicadoresContainer = document.getElementById('indicadores');

    imagens.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        carrosselIndex = i;
        atualizarCarrossel();
        reiniciarAutoSlide();
      });
      indicadoresContainer.appendChild(dot);
    });

    function moverCarrossel(direcao) {
      carrosselIndex = (carrosselIndex + direcao + total) % total;
      atualizarCarrossel();
      reiniciarAutoSlide();
    }

    function atualizarCarrossel() {
      carrossel.style.transform = `translateX(-${carrosselIndex * 100}%)`;
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === carrosselIndex);
      });
    }

    function autoSlide() {
      carrosselIntervalo = setInterval(() => moverCarrossel(1), 5000);
    }

    function reiniciarAutoSlide() {
      clearInterval(carrosselIntervalo);
      autoSlide();
    }

    document.querySelector('.carrossel-btn.prev')
    .addEventListener('click', () => moverCarrossel(-1));
    document.querySelector('.carrossel-btn.next')
    .addEventListener('click', () => moverCarrossel(1));

    // Suporte swipe (touch)
    let touchStartX = 0;
    carrossel.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    carrossel.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) moverCarrossel(diff > 0 ? 1 : -1);
    }, { passive: true });

      autoSlide();
  }

  /* ============================================
   *   ABAS
   * ============================================ */
  window.abrirAba = function (id) {
    document.getElementById('conteudo-principal').classList.add('oculto');
    document.querySelectorAll('.aba-conteudo').forEach(s => s.classList.remove('ativa'));
    const aba = document.getElementById(id);
    if (aba) aba.classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.voltarInicio = function () {
    document.getElementById('conteudo-principal').classList.remove('oculto');
    document.querySelectorAll('.aba-conteudo').forEach(s => s.classList.remove('ativa'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ============================================
   *   LIGHTBOX
   * ============================================ */
  const lightbox = document.getElementById('lightbox');
  const imagemLightbox = document.querySelector('.imagem-lightbox');
  const btnFechar = document.getElementById('lightbox-fechar');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');
  let indexLightbox = 0;
  let listaImagens = [];

  function abrirLightbox(imgs, i) {
    listaImagens = Array.from(imgs);
    indexLightbox = i;
    imagemLightbox.src = listaImagens[i].src;
    lightbox.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  }

  function fecharLightbox() {
    lightbox.classList.remove('ativo');
    imagemLightbox.src = '';
    document.body.style.overflow = '';
  }

  function atualizarImagem(i) {
    imagemLightbox.classList.add('fade');
    setTimeout(() => {
      imagemLightbox.src = listaImagens[i].src;
      imagemLightbox.classList.remove('fade');
    }, 200);
  }

  document.querySelectorAll('.galeria-img').forEach((img, i, all) => {
    img.addEventListener('click', () => abrirLightbox(all, i));
  });

  btnFechar.addEventListener('click', fecharLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) fecharLightbox();
  });
    btnPrev.addEventListener('click', e => {
      e.stopPropagation();
      indexLightbox = (indexLightbox - 1 + listaImagens.length) % listaImagens.length;
      atualizarImagem(indexLightbox);
    });
    btnNext.addEventListener('click', e => {
      e.stopPropagation();
      indexLightbox = (indexLightbox + 1) % listaImagens.length;
      atualizarImagem(indexLightbox);
    });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('ativo')) return;
      if (e.key === 'Escape') fecharLightbox();
      if (e.key === 'ArrowLeft') btnPrev.click();
      if (e.key === 'ArrowRight') btnNext.click();
    });

      /* ============================================
       *   PROMOÇÕES
       * ============================================ */
      const promoContainer = document.getElementById('promo-container');

      const promocoes = [
        // Adicione promoções aqui quando quiser! Exemplo:
        // {
        //   titulo: "Cama Elástica + Pula-pula",
        //   descricao: "Pacote especial fim de semana.",
        //   preco: "R$ 149,90",
        //   imagem: "imagens/cama-elastica.jpg"
        // },
      ];

      if (promocoes.length === 0) {
        promoContainer.innerHTML = `
        <div class="card-promocao promo-em-breve" style="grid-column: 1 / -1; min-height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:var(--text-muted); text-align:center; padding:40px;">
        <i class="fas fa-tag" style="font-size:2.5rem; color:var(--border);"></i>
        <strong style="font-family:'Nunito',sans-serif; font-size:1.1rem; color:var(--primary);">Promoções em breve!</strong>
        <span style="font-size:0.9rem;">Entre em contato para saber sobre promoções personalizadas.</span>
        <a href="https://wa.me/5592992176095" target="_blank" class="btn-primary" style="margin-top:8px; font-size:0.9rem; padding:10px 20px;">
        <i class="fab fa-whatsapp"></i> Falar agora
        </a>
        </div>
        `;
      } else {
        promocoes.forEach(promo => {
          const card = document.createElement('div');
          card.className = 'card-promocao';
          card.innerHTML = `
          ${promo.imagem ? `<img src="${promo.imagem}" alt="${promo.titulo}" class="promo-img">` : ''}
          <div class="card-promocao-body">
          <h3>${promo.titulo}</h3>
          <p>${promo.descricao}</p>
          <div class="preco">${promo.preco}</div>
          </div>
          `;
          card.addEventListener('click', () => {
            gtag('event', 'clique_promocao', { event_category: 'promocoes', event_label: promo.titulo });
          });
          promoContainer.appendChild(card);
        });
      }

      /* ============================================
       *   BOTÃO TOPO
       * ============================================ */
      const btnTopo = document.getElementById('btn-topo');
      window.addEventListener('scroll', () => {
        btnTopo.style.display = window.scrollY > 300 ? 'flex' : 'none';
      });

});

/* ============================================
 * FUNÇÕES GLOBAIS
 = =*========================================== */
window.voltarAoTopo = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
