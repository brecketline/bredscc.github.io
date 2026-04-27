document.addEventListener("DOMContentLoaded", async () => {
  const pickBtn = document.getElementById("pickBtn");
  const centerResult = document.getElementById("center-result");
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

  function playSpinSound() {
    if (!uiAudio) return;
    uiAudio.pause(); 
    uiAudio.currentTime = 0; 
    uiAudio.volume = 0.5;
    uiAudio.loop = false;
    uiAudio.play().catch(e => console.warn("Audio blocked by browser."));
  }

  function stopSpinSound() {
    if (!uiAudio) return;
    uiAudio.pause();
    uiAudio.currentTime = 0;
  }

  function playClickSound() {
    if (!uiAudio) return;
    uiAudio.pause();
    uiAudio.currentTime = 0;
    uiAudio.volume = 0.4;
    uiAudio.play().catch(e => {});
    setTimeout(() => { uiAudio.pause(); }, 500);
  }

  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  document.body.classList.add("view-globe");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetTab = btn.dataset.tab;
      playClickSound();

      document.body.classList.toggle("view-globe",      targetTab === "globe");
      document.body.classList.toggle("view-philosophy", targetTab === "philosophy");

      if (targetTab === "philosophy") {
        pickBtn.classList.remove("btn--hidden");
        pickBtn.disabled = false;
        pickBtn.removeAttribute("aria-disabled");
        if (centerResult) {
          centerResult.classList.remove("result--visible");
          centerResult.innerHTML = "";
        }
        setStatus("READY", null);
      }

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


  const backToGlobeBtn = document.getElementById("backToGlobe");
  const tabGlobeBtn    = document.getElementById("tab-globe");
  if (backToGlobeBtn && tabGlobeBtn) {
    backToGlobeBtn.addEventListener("click", () => {
      tabGlobeBtn.click();
    });
  }

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

  pickBtn.addEventListener("pointerdown", (ev) => {
    if (pickBtn.disabled) return;
    createRipple(pickBtn, ev.clientX, ev.clientY);
  });

  pickBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    
    if (pickBtn.disabled) return;

    playSpinSound();
    pickBtn.disabled = true;
    pickBtn.setAttribute("aria-disabled", "true");
    setStatus("SCANNING...", null);

    pickBtn.classList.add("btn--hidden");
    if (centerResult) {
      centerResult.classList.remove("result--visible");
      centerResult.innerHTML = "";
    }

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
      stopSpinSound();
      renderCenterCard(randomCountry, books);  
      setStatus("LOCKED", geo || null);
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

  function renderCenterCard(country, books) {
    if (!centerResult) return;
    centerResult.innerHTML = `
      <article class="card" role="article" aria-label="Destination: ${escapeHtml(country)}">
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
        <button class="btn-spin-again" id="spinAgainBtn" type="button" aria-label="Spin again">
          <span class="material-icons">refresh</span>
          SPIN AGAIN
        </button>
      </article>
    `;

    // Fade in
    requestAnimationFrame(() => {
      setTimeout(() => {
        centerResult.classList.add("result--visible");
        const card = centerResult.querySelector(".card");
        if (card) {
          requestAnimationFrame(() => setTimeout(() => card.classList.add("pop-in"), 15));
        }
        const spinAgainBtn = document.getElementById("spinAgainBtn");
        if (spinAgainBtn) {
          spinAgainBtn.addEventListener("click", resetToButton);
        }
      }, 15);
    });
  }

  function resetToButton() {
    if (!centerResult) return;
    // Fade center result out
    centerResult.classList.remove("result--visible");
    setTimeout(() => {
      centerResult.innerHTML = "";
      // Fade button back in
      pickBtn.classList.remove("btn--hidden");
      pickBtn.disabled = false;
      pickBtn.removeAttribute("aria-disabled");
      setStatus("READY", null);
      pickBtn.focus();
    }, 400);
  }
  // ─────────────────────────────────────────────────────────────────────────

  function renderError(message) {
    if (!centerResult) return;
    centerResult.innerHTML = `
      <article class="card" role="alert">
        <div class="card-body">
          <p class="text-danger">
            <span class="material-icons" aria-hidden="true">error</span>
            ${escapeHtml(message)}
          </p>
        </div>
      </article>
    `;
    centerResult.classList.add("result--visible");
    const card = centerResult.querySelector(".card");
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