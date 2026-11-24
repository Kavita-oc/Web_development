// ---------- DOM selectors ----------
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

const sumMatch = document.querySelector("#sumMatch");
const sumStand = document.querySelector("#sumStand");
const sumPrice = document.querySelector("#sumPrice");
const sumQty = document.querySelector("#sumQty");
const sumTotal = document.querySelector("#sumTotal");

// ---------- Toast ----------
// If your project already has showToast() from an earlier activity, delete this one.
let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

// ---------- Helpers ----------
const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

function getQuantity() {
  let qty = parseInt(quantityInput.value, 10);
  const max = parseInt(quantityInput.max, 10) || 10;
  if (isNaN(qty) || qty < 1) qty = 1;
  if (qty > max) qty = max;
  return qty;
}

// ---------- Update summary ----------
function updateSummary() {
  const matchOption = matchSelect.options[matchSelect.selectedIndex];
  const standOption = standSelect.options[standSelect.selectedIndex];
  const qty = getQuantity();
  quantityInput.value = qty; // keep the field in sync with the valid value

  const matchChosen = matchSelect.value !== "";
  const standChosen = standSelect.value !== "";

  const base = matchChosen ? Number(matchOption.dataset.base) : 0;
  const multiplier = standChosen ? Number(standOption.dataset.multiplier) : 0;
  const pricePerTicket = base * multiplier;
  const total = pricePerTicket * qty;

  sumMatch.textContent = matchChosen ? matchSelect.value : "Not selected";
  sumStand.textContent = standChosen ? standSelect.value : "Not selected";
  sumPrice.textContent = formatINR(pricePerTicket);
  sumQty.textContent = qty;
  sumTotal.textContent = formatINR(total);

  if (matchChosen && standChosen) {
    showToast(`Summary updated: ${qty} ticket(s), total ${formatINR(total)}`);
  }
}

// ---------- Event listeners ----------
matchSelect.addEventListener("change", updateSummary);
standSelect.addEventListener("change", updateSummary);
quantityInput.addEventListener("change", updateSummary);
