document.addEventListener("DOMContentLoaded", async () => {
  const pickBtn = document.getElementById("pickBtn");
  const result = document.getElementById("result");
  const statusIndicator = document.getElementById("statusIndicator");
  const statusCoords = document.getElementById("statusCoords");
  
  const uiAudio = document.getElementById('ui-sound');

  let data = null;
  let countryGeoData = {};

  const countryNameMap = {
    "UK": "United Kingdom",
    "USA": "United States",
    "Congo (DRC)": "Congo, The Democratic Republic of the",
    "República Checa": "Czech Republic",
    "Rússia": "Russian Federation",
    "Russia": "Russian Federation"
  };

  // Funções de Áudio Otimizadas para Mobile
  function playSpinSound() {
    if (!uiAudio) return;
    uiAudio.pause(); // Garante que para qualquer som anterior
    uiAudio.currentTime = 0; 
    uiAudio.volume = 0.5;
    uiAudio.loop = false; // Segurança extra contra loops infinitos
    uiAudio.play().catch(e => console.warn("Audio blocked by browser."));
  }

  function stopSpinSound() {
    if (!uiAudio) return;
    // Parada imediata (fade out costuma bugar no mobile)
    uiAudio.pause();
    uiAudio.currentTime = 0;
  }

  function playClickSound() {
    if (!uiAudio) return;
    uiAudio.pause();
    uiAudio.currentTime = 0;
    uiAudio.volume = 0.4;
    uiAudio.play().catch(e => {});
    // Corta o som após meio segundo para não encavalar
    setTimeout(() => { uiAudio.pause(); }, 500);
  }

  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetTab = btn.dataset.tab;
      playClickSound();

      tabBtns.forEach(b => {
        b.classList.toggle("active", b.dataset.tab === targetTab);
        b.setAttribute("aria-selected", b.dataset.tab === targetTab ? "true" : "false");
      });

      tabPanels.forEach(panel => {
        const isTarget = panel.id === `panel-${targetTab}`;
        panel.classList.toggle("active", isTarget);
        panel.hidden = !isTarget;
      });
    });
  });

  function createRipple(target, x, y) {
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const size = Math.max(rect.width, rect.height) * 1.4;
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (x - rect.left - size / 2) + "px";
    ripple.style.top  = (y - rect.top  - size / 2) + "px";
    target.querySelector(".btn-content")?.appendChild(ripple) || target.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = "scale(1)";
      ripple.style.opacity   = "0.12";
    });
    setTimeout(() => { ripple.style.opacity = "0"; ripple.style.transform = "scale(1.3)"; }, 260);
    setTimeout(() => ripple.remove(), 700);
  }

  try {
    const [booksData, geoDataContainer] = await Promise.all([
      fetch("countries_books.json").then(r => r.json()),
      fetch("country-codes-lat-long-alpha3.json").then(r => r.json()),
    ]);

    data = booksData;
    const geoList = geoDataContainer.ref_country_codes;

    countryGeoData = geoList.reduce((acc, current) => {
      acc[current.country] = {
        lat: parseFloat(current.latitude),
        lon: parseFloat(current.longitude),
      };
      return acc;
    }, {});

    setStatus("READY", null);

  } catch (err) {
    console.error("Error loading data:", err);
    renderError("FATAL ERROR: Data sync failed.");
    setStatus("FATAL_ERROR", null);
    return;
  }

  function setStatus(label, geo) {
    if (statusIndicator) statusIndicator.textContent = label;
    if (statusCoords && geo) {
      statusCoords.textContent = `LAT:${geo.lat.toFixed(2)} LON:${geo.lon.toFixed(2)}`;
    } else if (statusCoords) {
      statusCoords.textContent = "LAT:---.-- LON:---.--";
    }
  }

  // Pointerdown lida melhor com o delay do mobile
  pickBtn.addEventListener("pointerdown", (ev) => {
    if (pickBtn.disabled) return;
    createRipple(pickBtn, ev.clientX, ev.clientY);
  });

  pickBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita disparos duplicados em alguns navegadores mobile
    
    if (pickBtn.disabled) return;

    playSpinSound();
    pickBtn.disabled = true;
    pickBtn.setAttribute("aria-disabled", "true");
    setStatus("SCANNING...", null);

    const randomCountry = getRandomKey(data);
    const books = data[randomCountry]?.books || [];
    const geoKey = countryNameMap[randomCountry] || randomCountry;
    const geo = countryGeoData[geoKey];

    if (geo && window.globeControls?.spinToCountry) {
      window.globeControls.spinToCountry(geo.lat, geo.lon);
    } else if (window.globeControls?.pokeGlobe) {
      window.globeControls.pokeGlobe();
    }

    setTimeout(() => {
      stopSpinSound(); // Parada seca aqui
      renderCard(randomCountry, books);
      setStatus("LOCKED", geo || null);
      pickBtn.disabled = false;
      pickBtn.removeAttribute("aria-disabled");
      pickBtn.focus();
    }, 2500); 
  });

  pickBtn.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      pickBtn.click();
    }
  });

  function getRandomKey(keysObj) {
    const keys = Object.keys(keysObj);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function renderCard(country, books) {
    result.innerHTML = `
      <article class="card" role="article" aria-label="Books from ${escapeHtml(country)}">
        <div class="card-header">
          <div class="card-header-tag">DESTINATION LOCKED</div>
          <h2>
            <span class="material-icons" aria-hidden="true">place</span>
            ${escapeHtml(country)}
          </h2>
        </div>
        <div class="card-body">
          ${books.length
            ? `<p class="books-intro">RECOMMENDED READS</p>
               <ul>
                 ${books.map((b, i) => `
                   <li>
                     <span class="book-num">${String(i + 1).padStart(2, "0")}</span>
                     <span class="material-icons" aria-hidden="true">menu_book</span>
                     <span>${escapeHtml(b)}</span>
                   </li>`).join("")}
               </ul>`
            : `<p class="text-muted">
                 <span class="material-icons" aria-hidden="true">search_off</span>
                 No books listed yet for this country
               </p>`}
        </div>
      </article>
    `;

    const card = result.querySelector(".card");
    if (card) {
      card.tabIndex = -1;
      card.focus({ preventScroll: true });
      requestAnimationFrame(() => setTimeout(() => card.classList.add("pop-in"), 15));
      card.addEventListener("keydown", (ev) => { if (ev.key === "Escape") pickBtn.focus(); });
    }
  }

  function renderError(message) {
    result.innerHTML = `
      <article class="card" role="alert">
        <div class="card-body">
          <p class="text-danger">
            <span class="material-icons" aria-hidden="true">error</span>
            ${escapeHtml(message)}
          </p>
        </div>
      </article>
    `;
    const card = result.querySelector(".card");
    if (card) { card.classList.add("pop-in"); card.tabIndex = -1; card.focus({ preventScroll: true }); }
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str.replace(/[&<>"'`=\/]/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
      "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
    })[s]);
  }
});