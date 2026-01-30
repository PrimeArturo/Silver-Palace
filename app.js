const PRODUCTS = [
  { id:"SP-001", name:"Sterling Cuban Link Chain", category:"Chains / Bracelets", price:129, tag:"Best Seller", desc:"A bold, clean link chain with showroom shine.", },
  { id:"SP-002", name:"Moissanite Tennis Bracelet", category:"Moissanite", price:189, tag:"New", desc:"High-fire moissanite look for daily wear.", },
  { id:"SP-003", name:"Italian Horn Pendant", category:"Italian Collection", price:59, tag:"Classic", desc:"A timeless Italian charm — clean and sharp.", },
  { id:"SP-004", name:"Script Nameplate Necklace", category:"Ladies", price:79, tag:"Custom", desc:"Personalized-style nameplate (demo listing).", },
  { id:"SP-005", name:"Evil Eye Stud Earrings", category:"Ladies", price:45, tag:"Popular", desc:"Small studs with a luxury feel.", },
  { id:"SP-006", name:"Rhodium Figaro Chain", category:"Chains / Bracelets", price:99, tag:"Premium Finish", desc:"Rhodium style finish for extra brightness.", },
  { id:"SP-007", name:"Classic Signet Ring", category:"Mens", price:74, tag:"Everyday", desc:"A clean signet ring for daily rotation.", },
  { id:"SP-008", name:"Micro Pave Cross Pendant", category:"Religious", price:88, tag:"Iced", desc:"Micro pave sparkle with a refined shape.", },
  { id:"SP-009", name:"Herringbone Necklace", category:"Ladies", price:115, tag:"Trending", desc:"Flat, reflective style—sits perfectly.", },
  { id:"SP-010", name:"Tennis Necklace (Moissanite)", category:"Moissanite", price:249, tag:"Statement", desc:"High shine for nights out and events.", },
];

const fmt = (n) => `$${Number(n).toFixed(2)}`;

function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
}

function mountLayout(){
  const headerMount = document.querySelector("[data-header]");
  const footerMount = document.querySelector("[data-footer]");
  if(!headerMount || !footerMount) return;

  // Features based on the reference: B2B banner + $ minimum purchase, language, catalog nav, newsletter prompt. :contentReference[oaicite:1]{index=1}
  headerMount.innerHTML = `
    <div class="topstrip">
      <div class="container inner">
        <div class="top-left">
          <span class="badge"><span class="badge-dot"></span><strong>Silver Palace</strong><span style="opacity:.9">Miami</span></span>
          <span class="pill">Wholesale <b>B2B only</b> • Min order <b>$200</b></span>
          <span class="pill">📍 <b>Downtown Miami</b> • Jewelry District</span>
        </div>
        <div class="top-right">
          <span class="pill">☎️ <b>(305)</b> 000-0000</span>
          <button class="cta-top" id="btnNewsletter" type="button">Subscribe & Save →</button>
          <select class="pill" id="lang" aria-label="Language">
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
      </div>
    </div>

    <div class="site-header">
      <div class="container">
        <div class="header-row">
          <a class="brand" href="index.html">
            <div class="name">SILVER PALACE</div>
            <div class="sub">Sterling Jewelry • Wholesale & Retail</div>
          </a>

          <div class="header-actions">
            <button class="iconbtn" id="btnLogin" type="button">Login / Signup</button>
            <button class="iconbtn" id="btnCart" type="button">Cart <span class="count" id="cartCount">0</span></button>
          </div>
        </div>

        <div class="catnav">
          <div class="row">
            <div class="searchbox" role="search" aria-label="Search">
              🔎 <input id="globalSearch" placeholder="Search products, collections, keywords…" />
            </div>

            <div class="navlinks" aria-label="Catalog Navigation">
              <div class="drop" data-drop>
                <button type="button">Catalog ▾</button>
                <div class="mega" role="menu">
                  <div class="mega-grid">
                    <a href="shop.html">Shop All</a>
                    <a href="shop.html#New">New Arrivals</a>
                    <a href="shop.html#Moissanite">Moissanite</a>
                    <a href="shop.html#Lab">Lab Grown</a>
                    <a href="shop.html#Gold">14K Gold</a>
                    <a href="shop.html#Ladies">Ladies</a>
                    <a href="shop.html#Mens">Mens</a>
                    <a href="shop.html#Chains">Chains / Bracelets</a>
                    <a href="shop.html#Italian">Italian Collection</a>
                    <a href="shop.html#Steel">Stainless Steel</a>
                    <a href="shop.html#Closeout">Closeout</a>
                    <a href="contact.html">Quick Order (Inquiry)</a>
                  </div>
                </div>
              </div>

              <a class="iconbtn" style="box-shadow:none" data-nav href="index.html">Home</a>
              <a class="iconbtn" style="box-shadow:none" data-nav href="shop.html">Shop</a>
              <a class="iconbtn" style="box-shadow:none" data-nav href="about.html">About</a>
              <a class="iconbtn" style="box-shadow:none" data-nav href="contact.html">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <div class="overlay" id="overlayProduct" aria-hidden="true">
      <div class="modal">
        <button class="close" id="closeProduct" type="button">Close</button>
        <div class="modal-inner">
          <div class="modal-media"></div>
          <div class="modal-body">
            <h3 id="mTitle"></h3>
            <div class="modal-meta" id="mMeta"></div>
            <p id="mDesc"></p>
            <hr class="line">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <strong id="mPrice"></strong>
              <button class="btn primary" id="mAdd" type="button">Add to cart (demo)</button>
            </div>
            <p class="small muted" style="margin-top:12px">Demo catalog. Replace photos, SKUs, and pricing after approval.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Popup -->
    <div class="overlay" id="overlayNews" aria-hidden="true">
      <div class="modal pop">
        <button class="close" id="closeNews" type="button">Close</button>
        <div class="pop-inner">
          <div class="pop-head">
            <h3>Subscribe & Save</h3>
            <div class="small" style="opacity:.85">Get promotions + new drops in your inbox.</div>
          </div>
          <div class="pop-body">
            <div class="small muted">Wholesale buyers also get restock alerts and closeout updates.</div>
            <div class="row">
              <input id="newsEmail" placeholder="Your email" />
              <button class="btn primary" id="newsSubmit" type="button">Subscribe</button>
            </div>
            <div class="small muted" style="margin-top:10px">No spam. Unsubscribe anytime.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  footerMount.innerHTML = `
    <div class="footer">
      <div class="container footergrid">
        <div>
          <h5>Silver Palace</h5>
          <div class="small">
            Premium sterling silver catalog experience designed for a Miami Jewelry District wholesale + retail business.
          </div>
          <div class="small" style="margin-top:10px">© ${new Date().getFullYear()} Silver Palace (Demo)</div>
        </div>
        <div>
          <h5>Catalog</h5>
          <div class="small"><a href="shop.html">Shop All</a></div>
          <div class="small"><a href="shop.html#Moissanite">Moissanite</a></div>
          <div class="small"><a href="shop.html#Chains">Chains / Bracelets</a></div>
          <div class="small"><a href="shop.html#Italian">Italian Collection</a></div>
        </div>
        <div>
          <h5>Contact</h5>
          <div class="small">Downtown Miami • Jewelry District</div>
          <div class="small">(305) 000-0000</div>
          <div class="small">sales@silverpalacemiami.com</div>
        </div>
      </div>
    </div>
  `;

  // Mega dropdown behavior
  document.querySelectorAll("[data-drop]").forEach(drop=>{
    const btn = drop.querySelector("button");
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      drop.classList.toggle("open");
    });
  });
  document.addEventListener("click", ()=> {
    document.querySelectorAll("[data-drop].open").forEach(d=>d.classList.remove("open"));
  });

  // Newsletter popup
  const overlayNews = document.getElementById("overlayNews");
  const openNews = () => overlayNews.classList.add("show");
  const closeNews = () => overlayNews.classList.remove("show");

  document.getElementById("btnNewsletter")?.addEventListener("click", openNews);
  document.getElementById("closeNews")?.addEventListener("click", closeNews);
  overlayNews?.addEventListener("click", (e)=>{ if(e.target === overlayNews) closeNews(); });
  document.getElementById("newsSubmit")?.addEventListener("click", ()=>{
    alert("Subscribed (demo).");
    closeNews();
  });

  // Optional: auto-show newsletter once per browser
  const shown = localStorage.getItem("sp_news_shown");
  if(!shown){
    setTimeout(()=>openNews(), 900);
    localStorage.setItem("sp_news_shown","1");
  }

  // Demo login/cart
  document.getElementById("btnLogin")?.addEventListener("click", ()=>alert("Demo login. Next: wholesale portal / Shopify customer accounts."));
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = String(Number(localStorage.getItem("sp_cart") || "0"));
  document.getElementById("btnCart")?.addEventListener("click", ()=>alert("Demo cart. Next step: real checkout via Shopify/Stripe."));

  // Global search routes to shop + prefill query
  document.getElementById("globalSearch")?.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      const q = e.target.value.trim();
      location.href = `shop.html?q=${encodeURIComponent(q)}`;
    }
  });

  // Product modal close
  const overlayProduct = document.getElementById("overlayProduct");
  const closeProduct = () => overlayProduct.classList.remove("show");
  document.getElementById("closeProduct")?.addEventListener("click", closeProduct);
  overlayProduct?.addEventListener("click", (e)=>{ if(e.target === overlayProduct) closeProduct(); });
}

function openProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;

  document.getElementById("mTitle").textContent = p.name;
  document.getElementById("mDesc").textContent = p.desc;
  document.getElementById("mPrice").textContent = fmt(p.price);
  const meta = document.getElementById("mMeta");
  meta.innerHTML = `
    <span class="tag">${p.category}</span>
    <span class="tag">925 Sterling</span>
    <span class="tag">${p.id}</span>
  `;

  document.getElementById("mAdd").onclick = ()=>{
    const count = Number(localStorage.getItem("sp_cart") || "0") + 1;
    localStorage.setItem("sp_cart", String(count));
    document.getElementById("cartCount").textContent = String(count);
    alert("Added to cart (demo).");
  };

  document.getElementById("overlayProduct").classList.add("show");
}

function renderProducts(el, items){
  el.innerHTML = items.map(p=>`
    <article class="card">
      <div class="media"></div>
      <div class="pad">
        <h4>${p.name}</h4>
        <div class="muted small">${p.category}</div>
        <div class="meta">
          <div class="price">${fmt(p.price)}</div>
          <div class="tag">${p.tag}</div>
        </div>
        <button class="btn full" data-open="${p.id}" type="button">Quick View</button>
      </div>
    </article>
  `).join("");

  el.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click", ()=>openProduct(btn.getAttribute("data-open")));
  });
}

function initHome(){
  const grid = document.getElementById("featuredGrid");
  if(grid) renderProducts(grid, PRODUCTS.slice(0,8));
}

function initShop(){
  const grid = document.getElementById("shopGrid");
  if(!grid) return;

  const search = document.getElementById("search");
  const category = document.getElementById("category");
  const count = document.getElementById("resultsCount");

  const categories = ["All", ...new Set(PRODUCTS.map(p=>p.category))];
  category.innerHTML = categories.map(c=>`<option value="${c}">${c}</option>`).join("");

  // Prefill from URL ?q=
  const params = new URLSearchParams(location.search);
  const q0 = params.get("q");
  if(q0) search.value = q0;

  const apply = ()=>{
    const q = (search.value||"").toLowerCase().trim();
    const c = category.value;

    const filtered = PRODUCTS.filter(p=>{
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q);
      const matchesC = (c==="All") || (p.category===c);
      return matchesQ && matchesC;
    });

    renderProducts(grid, filtered);
    count.textContent = `${filtered.length} item(s)`;
  };

  search.addEventListener("input", apply);
  category.addEventListener("change", apply);
  apply();
}

document.addEventListener("DOMContentLoaded", ()=>{
  mountLayout();
  setActiveNav();
  initHome();
  initShop();
});
