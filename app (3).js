// ---------- Toast ----------
let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

// ---------- Hamburger menu ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
}
hamburger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
// Close the menu after choosing a link
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => setMenu(false))
);

// ---------- Team filter ----------
const teamFilter = document.getElementById("teamFilter");
const matchCards = document.querySelectorAll(".match-card");
const emptyMsg = document.getElementById("emptyMsg");

function filterMatches() {
  const team = teamFilter.value;
  let visible = 0;
  matchCards.forEach((card) => {
    const teams = card.dataset.teams.split(" ");
    const show = team === "all" || teams.includes(team);
    card.hidden = !show;
    if (show) visible++;
  });
  emptyMsg.hidden = visible > 0;
  showToast(team === "all" ? "Showing all matches" : `Showing ${visible} match(es) for ${team}`);
}
teamFilter.addEventListener("change", filterMatches);

// ---------- Grid / list toggle ----------
const matchContainer = document.getElementById("matchContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

function setView(view) {
  const isList = view === "list";
  matchContainer.classList.toggle("list-view", isList);
  gridBtn.classList.toggle("active", !isList);
  listBtn.classList.toggle("active", isList);
  gridBtn.setAttribute("aria-pressed", String(!isList));
  listBtn.setAttribute("aria-pressed", String(isList));
  showToast(isList ? "List view" : "Grid view");
}
gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// ---------- Booking summary (Activity 7) ----------
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");
const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

function updateSummary() {
  const matchOpt = matchSelect.options[matchSelect.selectedIndex];
  const standOpt = standSelect.options[standSelect.selectedIndex];

  let qty = parseInt(quantityInput.value, 10);
  if (isNaN(qty) || qty < 1) qty = 1;
  if (qty > 10) qty = 10;
  quantityInput.value = qty;

  const matchChosen = matchSelect.value !== "";
  const standChosen = standSelect.value !== "";
  const price = (matchChosen ? Number(matchOpt.dataset.base) : 0) *
                (standChosen ? Number(standOpt.dataset.multiplier) : 0);
  const total = price * qty;

  document.querySelector("#sumMatch").textContent = matchChosen ? matchSelect.value : "Not selected";
  document.querySelector("#sumStand").textContent = standChosen ? standSelect.value : "Not selected";
  document.querySelector("#sumPrice").textContent = formatINR(price);
  document.querySelector("#sumQty").textContent = qty;
  document.querySelector("#sumTotal").textContent = formatINR(total);

  if (matchChosen && standChosen) showToast(`Summary updated: total ${formatINR(total)}`);
}
[matchSelect, standSelect, quantityInput].forEach((el) =>
  el.addEventListener("change", updateSummary)
);
