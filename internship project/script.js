
// ===== PRODUCT DATA =====
const products = [
  { id: 1,  name: "Neon Oversized Tee",    category: "men",   type: "tshirt", price: 39, oldPrice: 55, tag: "NEW", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80" },
  { id: 2,  name: "Midnight Linen Shirt",  category: "men",   type: "shirt",  price: 79, tag: "HOT", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id: 3,  name: "Acid Wash Crop Tee",    category: "women", type: "tshirt", price: 34, oldPrice: 49, tag: "NEW", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80" },
  { id: 4,  name: "Silk Statement Blouse", category: "women", type: "shirt",  price: 89, img: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=600&q=80" },
  { id: 5,  name: "Graphic Skate Tee",     category: "men",   type: "tshirt", price: 42, tag: "HOT", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80" },
  { id: 6,  name: "Cuban Collar Shirt",    category: "men",   type: "shirt",  price: 69, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80" },
  { id: 7,  name: "Pastel Boxy Tee",       category: "women", type: "tshirt", price: 32, tag: "NEW", img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80" },
  { id: 8,  name: "Oversized Denim Shirt", category: "women", type: "shirt",  price: 74, oldPrice: 95, img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80" },
  { id: 9,  name: "Vintage Band Tee",      category: "men",   type: "tshirt", price: 45, img: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&q=80" },
  { id: 10, name: "Flannel Check Shirt",   category: "men",   type: "shirt",  price: 65, tag: "HOT", img: "https://images.unsplash.com/photo-1608228088998-57828365d486?w=600&q=80" },
  { id: 11, name: "Striped Pocket Tee",    category: "women", type: "tshirt", price: 36, img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80" },
  { id: 12, name: "Satin Button-Up",       category: "women", type: "shirt",  price: 82, tag: "NEW", img: "https://images.unsplash.com/photo-1564257577-2d3ee8740ad8?w=600&q=80" },
];

let activeFilter = "all";
let searchQuery = "";

const productsEl  = document.getElementById("products");
const filtersEl   = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const emptyState  = document.getElementById("emptyState");
const searchToggle = document.getElementById("searchToggle");
const searchBox   = document.getElementById("searchBox");

function renderProducts() {
  const list = products.filter((p) => {
    let pass = true;
    if (activeFilter === "men" || activeFilter === "women") pass = p.category === activeFilter;
    else if (activeFilter === "tshirt" || activeFilter === "shirt") pass = p.type === activeFilter;
    else if (activeFilter === "new") pass = p.tag === "NEW";

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q);

    return pass && matchesSearch;
  });

  productsEl.innerHTML = "";
  if (list.length === 0) { emptyState.hidden = false; return; }
  emptyState.hidden = true;

  list.forEach((p, idx) => {
    const card = document.createElement("article");
    card.className = "product";
    card.style.animationDelay = `${idx * 0.05}s`;
    card.innerHTML = `
      <div class="product-img">
        ${p.tag ? `<span class="tag ${p.tag === 'HOT' ? 'hot' : ''}">${p.tag}</span>` : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <p class="product-cat">${p.category} · ${p.type}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-bottom">
          <div>
            <span class="product-price">$${p.price}</span>
            ${p.oldPrice ? `<span class="product-old">$${p.oldPrice}</span>` : ""}
          </div>
          <button class="view-btn" onclick="viewProduct(${p.id})">View →</button>
        </div>
      </div>`;
    productsEl.appendChild(card);
  });
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  renderProducts();
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

searchToggle.addEventListener("click", () => {
  searchInput.focus();
  searchBox.scrollIntoView({ behavior: "smooth", block: "center" });
});

function viewProduct(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  alert(`👕 ${p.name}\n\nCategory: ${p.category.toUpperCase()} · ${p.type.toUpperCase()}\nPrice: $${p.price}${p.oldPrice ? ` (was $${p.oldPrice})` : ""}\n\n— Built in limited runs. Get it before it's gone.`);
}

function subscribe(form) {
  const email = form.querySelector("input").value;
  const msg = document.getElementById("newsMsg");
  msg.textContent = `✓ You're in. Watch ${email} for the next drop.`;
  form.reset();
  setTimeout(() => { msg.textContent = ""; }, 5000);
}

renderProducts();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.style.opacity = 1; entry.target.style.transform = "translateY(0)"; }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".cat-card, .section-title").forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  io.observe(el);
});