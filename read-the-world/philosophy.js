const PHILOSOPHY_DATA = [
    // ── EURASIA ──────────────────────────────────────────────────
{
    country: "Russia",
    region: "Eurasia",
    entries: [
      { philosopher: "Pyotr Chaadayev",      title: "First Philosophical Letter", year: "1836" },
      { philosopher: "Nikolai Chernyshevsky",  title: "What Is To be Done", year: "1863" },
      { philosopher: "Vladimir Solovyov",      title: "The Meaning of Love", year: "1884" },
    ]
  },
  
  // ── EUROPE ──────────────────────────────────────────────────
  
{
    country: "Greece",
    region: "Europe",
    entries: [
      { philosopher: "Plato",      title: "The Republic",              year: "~375 BC" },
      { philosopher: "Aristotle",  title: "Nicomachean Ethics",        year: "~350 BC" },
      { philosopher: "Plato",      title: "Symposium",                 year: "~385 BC" },
    ]
  },
  {
    country: "Germany",
    region: "Europe",
    entries: [
      { philosopher: "Immanuel Kant",      title: "Critique of Pure Reason",         year: "1781" },
      { philosopher: "Friedrich Nietzsche",title: "Thus Spoke Zarathustra",          year: "1883" },
      { philosopher: "Georg W.F. Hegel",   title: "Phenomenology of Spirit",         year: "1807" },
      { philosopher: "Arthur Schopenhauer",title: "The World as Will and Representation", year: "1818" },
    ]
  },
  {
    country: "France",
    region: "Europe",
    entries: [
      { philosopher: "René Descartes",     title: "Meditations on First Philosophy", year: "1641" },
      { philosopher: "Simone de Beauvoir", title: "The Second Sex",                  year: "1949" },
      { philosopher: "Jean-Paul Sartre",   title: "Being and Nothingness",           year: "1943" },
      { philosopher: "Albert Camus",       title: "The Myth of Sisyphus",            year: "1942" },
      { philosopher: "Michel Foucault",    title: "Discipline and Punish",           year: "1975" },
    ]
  },
  {
    country: "United Kingdom",
    region: "Europe",
    entries: [
      { philosopher: "John Locke",        title: "An Essay Concerning Human Understanding", year: "1689" },
      { philosopher: "David Hume",        title: "A Treatise of Human Nature",              year: "1739" },
      { philosopher: "John Stuart Mill",  title: "On Liberty",                              year: "1859" },
      { philosopher: "Bertrand Russell",  title: "The Problems of Philosophy",              year: "1912" },
    ]
  },
  {
    country: "Austria",
    region: "Europe",
    entries: [
      { philosopher: "Ludwig Wittgenstein", title: "Philosophical Investigations", year: "1953" },
      { philosopher: "Karl Popper",         title: "The Logic of Scientific Discovery", year: "1934" },
    ]
  },
  {
    country: "Denmark",
    region: "Europe",
    entries: [
      { philosopher: "Søren Kierkegaard", title: "Either/Or",                    year: "1843" },
      { philosopher: "Søren Kierkegaard", title: "Fear and Trembling",           year: "1843" },
    ]
  },
  {
    country: "Netherlands",
    region: "Europe",
    entries: [
      { philosopher: "Baruch Spinoza",    title: "Ethics",                       year: "1677" },
      { philosopher: "Erasmus of Rotterdam", title: "In Praise of Folly",        year: "1511" },
    ]
  },
  {
    country: "Italy",
    region: "Europe",
    entries: [
      { philosopher: "Niccolò Machiavelli", title: "The Prince",                 year: "1513" },
      { philosopher: "Thomas Aquinas",      title: "Summa Theologica",           year: "1265" },
    ]
  },
  {
    country: "Poland",
    region: "Europe",
    entries: [
      { philosopher: "Leszek Kołakowski",   title: "Main Currents of Marxism",   year: "1976" },
    ]
  },

  // ── ASIA ────────────────────────────────────────────────────
  {
    country: "China",
    region: "Asia",
    entries: [
      { philosopher: "Confucius",    title: "The Analects",                    year: "~475 BC" },
      { philosopher: "Laozi",        title: "Tao Te Ching",                    year: "~400 BC" },
      { philosopher: "Zhuangzi",     title: "Zhuangzi",                        year: "~300 BC" },
      { philosopher: "Sun Tzu",      title: "The Art of War",                  year: "~500 BC" },
    ]
  },
  {
    country: "India",
    region: "Asia",
    entries: [
      { philosopher: "Nagarjuna",        title: "Mūlamadhyamakakārikā",        year: "~150 AD" },
      { philosopher: "Adi Shankaracharya",title: "Vivekachudamani",            year: "~800 AD" },
      { philosopher: "B.R. Ambedkar",    title: "The Buddha and His Dhamma",   year: "1956" },
      { philosopher: "Rabindranath Tagore",title: "The Religion of Man",       year: "1931" },
    ]
  },
  {
    country: "Japan",
    region: "Asia",
    entries: [
      { philosopher: "Kitaro Nishida",    title: "An Inquiry into the Good",   year: "1911" },
      { philosopher: "Keiji Nishitani",   title: "Religion and Nothingness",   year: "1961" },
      { philosopher: "Dōgen",             title: "Shōbōgenzō",                 year: "~1240" },
    ]
  },
  {
    country: "South Korea",
    region: "Asia",
    entries: [
      { philosopher: "Yi Hwang (Toegye)", title: "Ten Diagrams on Sage Learning",year: "1568" },
    ]
  },

  // ── MIDDLE EAST ─────────────────────────────────────────────
  {
    country: "Iran",
    region: "Middle East",
    entries: [
      { philosopher: "Avicenna (Ibn Sina)", title: "The Book of Healing",       year: "1027" },
      { philosopher: "Al-Ghazali",          title: "The Incoherence of the Philosophers", year: "1095" },
    ]
  },
  {
    country: "Iraq",
    region: "Middle East",
    entries: [
      { philosopher: "Al-Kindi",            title: "On First Philosophy",       year: "~870 AD" },
    ]
  },



  // ── AFRICA ──────────────────────────────────────────────────
  {
    country: "Algeria",
    region: "Africa",
    entries: [
      { philosopher: "Malek Bennabi",        title: "Les Conditions de la Renaissance", year: "1948" },
      { philosopher: "Frantz Fanon",        title: "The Wretched of the Earth", year: "1961" },
    ]
  },
   {
    country: "Angola",
    region: "Africa",
    entries: [
      { philosopher: "Victor Kajibanga",        title: "A Sociologia da Cultura Africana na Obra de Mário Pinto de Andrade", year: "2000" },
      { philosopher: "Luís Kandjimbo",        title: "Apologia de Kalitangi: Ensaio Sobre o Intelectualismo Angolano", year: "1997" },
    ]
  },
    {
    country: "Egypt",
    region: "Africa",
    entries: [
      { philosopher: "Ibn Rushd (Averroes)", title: "The Incoherence of the Incoherence", year: "1180" },
    ]
  },
  {
    country: "South Africa",
    region: "Africa",
    entries: [
      { philosopher: "Steve Biko",          title: "I Write What I Like",       year: "1978" },
    ]
  },
    {
    country: "Tunisia",
    region: "Africa",
    entries: [
      { philosopher: "Ibn Khaldun",         title: "Muqaddimah",                year: "1377" },
    ]
  },
  {
    country: "Kenya",
    region: "Africa",
    entries: [
      { philosopher: "Henry Odera Oruka",   title: "Sage Philosophy",           year: "1990" },
    ]
  },

  // ── AMERICAS ────────────────────────────────────────────────
  {
    country: "United States",
    region: "Americas",
    entries: [
      { philosopher: "William James",       title: "Pragmatism",                year: "1907" },
      { philosopher: "John Dewey",          title: "Experience and Nature",     year: "1925" },
      { philosopher: "Henry David Thoreau", title: "Walden",                    year: "1854" },
      { philosopher: "bell hooks",          title: "Ain't I a Woman",           year: "1981" },
      { philosopher: "W.E.B. Du Bois",      title: "The Souls of Black Folk",   year: "1903" },
    ]
  },
  {
    country: "Brazil",
    region: "Americas",
    entries: [
      { philosopher: "Paulo Freire",        title: "Pedagogy of the Oppressed", year: "1968" },
    ]
  },
  {
    country: "Argentina",
    region: "Americas",
    entries: [
      { philosopher: "Enrique Dussel",      title: "Philosophy of Liberation",  year: "1977" },
    ]
  },
  {
    country: "Mexico",
    region: "Americas",
    entries: [
      { philosopher: "Leopoldo Zea",        title: "The Latin-American Mind",   year: "1949" },
    ]
  },
];

// ── RENDER ────────────────────────────────────────────────────

function renderPhilosophy(filterRegion = "all", searchQuery = "") {
  const grid  = document.getElementById("philoGrid");
  const empty = document.getElementById("philoEmpty");
  if (!grid) return;

  const q = searchQuery.toLowerCase().trim();

  const filtered = PHILOSOPHY_DATA.filter(item => {
    const regionMatch = filterRegion === "all" || item.region === filterRegion;
    if (!regionMatch) return false;
    if (!q) return true;

    const inCountry = item.country.toLowerCase().includes(q);
    const inEntries = item.entries.some(
      e => e.philosopher.toLowerCase().includes(q) || e.title.toLowerCase().includes(q)
    );
    return inCountry || inEntries;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;

  grid.innerHTML = filtered.map(item => `
    <div class="philo-card" data-country="${escapeHtml(item.country)}" data-region="${escapeHtml(item.region)}">
      <div class="philo-card-head">
        <div class="philo-country">${escapeHtml(item.country)}</div>
        <div class="philo-region-tag">${escapeHtml(item.region)}</div>
      </div>
      <div class="philo-books">
        ${item.entries.map(e => `
          <div class="philo-entry">
            <div class="philo-philosopher">${escapeHtml(e.philosopher)}</div>
            <div class="philo-book-title">${escapeHtml(e.title)}</div>
            <div class="philo-year">${escapeHtml(e.year)}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[&<>"'`=\/]/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
    "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
  })[s]);
}

// ── INIT ──────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  let activeRegion = "all";
  let searchQuery  = "";

  renderPhilosophy(activeRegion, searchQuery);

  const chips = document.querySelectorAll(".chip[data-region]");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeRegion = chip.dataset.region;
      renderPhilosophy(activeRegion, searchQuery);
    });
  });

  const searchInput = document.getElementById("philoSearch");
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = searchInput.value;
        renderPhilosophy(activeRegion, searchQuery);
      }, 180);
    });
  }
});
