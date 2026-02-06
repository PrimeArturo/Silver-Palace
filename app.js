/* ===========================
   app.js (FULL — edited)
   - Logo links to Home
   - Removed phone on left blue header
   - Removed Compare from product cards (UI + JS)
   - Product cards only: Quick View + Quantity + Quick Add
   - Reviews carousel: NO auto-scroll (manual only)
=========================== */

const PRODUCTS = [
  { id:"SP-001", name:"Sterling Cuban Link Chain", category:"Chains / Bracelets", metal:"sterling", price:129, wholesaleNote:"Login to view wholesale tier pricing", inventory:23, badges:["925 Sterling","Fast Seller"], tag:"Best Seller", desc:"A bold, clean link chain with showroom shine.", img:"./images/sp-001-cuban-chain.png", variants:{ lengths:[18,20,22,24], weights:[10,15,20] } },
  { id:"SP-002", name:"Moissanite Tennis Bracelet", category:"Moissanite", metal:"sterling", price:189, wholesaleNote:"Wholesale pricing available after login", inventory:11, badges:["925 Sterling","Moissanite","New Drop"], tag:"New", desc:"High-fire moissanite look for daily wear.", img:"./images/sp-002-tennis-bracelet.png", variants:{ lengths:[7,7.5,8], weights:[8,10,12] } },
  { id:"SP-003", name:"Italian Horn Pendant", category:"Italian Collection", metal:"sterling", price:59, wholesaleNote:"Login to view wholesale tier pricing", inventory:38, badges:["925 Italy","Classic"], tag:"Classic", desc:"A timeless Italian charm — clean and sharp.", img:"./images/sp-003-italian-horn.png", variants:{ lengths:[18,20,22], weights:[4,6,8] } },
  { id:"SP-004", name:"Script Nameplate Necklace", category:"Ladies", metal:"sterling", price:79, wholesaleNote:"Custom options available", inventory:14, badges:["925 Sterling","Custom"], tag:"Custom", desc:"Personalized-style nameplate (demo listing).", img:"./images/sp-004-nameplate.png", variants:{ lengths:[16,18,20], weights:[4,6,8] } },
  { id:"SP-005", name:"Evil Eye Stud Earrings", category:"Ladies", metal:"sterling", price:45, wholesaleNote:"Wholesale pricing available after login", inventory:45, badges:["925 Sterling","Popular"], tag:"Popular", desc:"Small studs with a luxury feel.", img:"./images/sp-005-evil-eye-studs.png", variants:{ lengths:[0], weights:[2,3,4] } },
  { id:"SP-006", name:"Rhodium Figaro Chain", category:"Chains / Bracelets", metal:"sterling", price:99, wholesaleNote:"Login to view wholesale tier pricing", inventory:19, badges:["925 Sterling","Rhodium Finish"], tag:"Premium Finish", desc:"Rhodium-style finish for extra brightness.", img:"./images/sp-006-figaro-chain.png", variants:{ lengths:[18,20,22,24], weights:[8,12,16] } },
  { id:"SP-007", name:"Classic Signet Ring", category:"Mens", metal:"sterling", price:74, wholesaleNote:"Login to view wholesale tier pricing", inventory:27, badges:["925 Sterling","Everyday"], tag:"Everyday", desc:"A clean signet ring for daily rotation.", img:"./images/sp-007-signet-ring.png", variants:{ lengths:[0], weights:[6,8,10] } },
  { id:"SP-008", name:"Micro Pave Cross Pendant", category:"Religious", metal:"sterling", price:88, wholesaleNote:"Wholesale pricing available after login", inventory:9, badges:["925 Sterling","Iced"], tag:"Iced", desc:"Micro pave sparkle with a refined shape.", img:"./images/sp-008-cross-pendant.png", variants:{ lengths:[18,20,22], weights:[6,8,10] } },
  { id:"SP-009", name:"Herringbone Necklace", category:"Ladies", metal:"sterling", price:115, wholesaleNote:"Login to view wholesale tier pricing", inventory:16, badges:["925 Sterling","Trending"], tag:"Trending", desc:"Flat, reflective style—sits perfectly.", img:"./images/sp-009-herringbone.png", variants:{ lengths:[16,18,20,22], weights:[8,10,12] } },
  { id:"SP-010", name:"Tennis Necklace (Moissanite)", category:"Moissanite", metal:"sterling", price:249, wholesaleNote:"Wholesale pricing available after login", inventory:6, badges:["925 Sterling","Moissanite","Statement"], tag:"Statement", desc:"High shine for nights out and events.", img:"./images/sp-010-tennis-necklace.png", variants:{ lengths:[16,18,20], weights:[14,18,22] } },
];

const REVIEWS = [
  { name:"Steppe N Here", stars:5, when:"2 months ago", text:"I found this place on Google. I can honestly say they have a very large section to choose from! I was looking for a solid gold rope chain and they had exactly what I wanted!" },
  { name:"Shawn", stars:5, when:"2 months ago", text:"Very nice store with a lot of inventory. They offer silver, diamonds, and gold. Check them out!" },
  { name:"Jonathan Herman", stars:5, when:"a month ago", text:"Best place to buy jewelry great price" },
  { name:"Veronica Larrier", stars:5, when:"9 months ago", text:"Ramon came through in the quickness with excellent service in providing my daughter, a customized class ring for her ring ceremony high school. Thank you so much." },
  { name:"Tricia Geter", stars:5, when:"2 years ago", text:"The best prices in town for gold and diamond jewelry, excellent customer service skills!" },
  { name:"CED MOGUL", stars:5, when:"2 months ago", text:"Happy Returning customers" },
  { name:"Lenore Falise", stars:5, when:"3 years ago", text:"Very friendly people, beautiful custom pieces, great prices!" },
  { name:"George “King Mack” Mack", stars:5, when:"4 years ago", text:"Best place to get Gold and Diamonds." },
];

const fmt = (n) => `$${Number(n).toFixed(2)}`;
const LS_CART = "sp_cart";
const LS_RECENT = "sp_recent";
const LS_METAL = "sp_metal";

function getCartCount(){ return Number(localStorage.getItem(LS_CART) || "0"); }
function setCartCount(n){ localStorage.setItem(LS_CART, String(n)); }

function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
}

function starString(n){
  return "★★★★★".slice(0,n) + "☆☆☆☆☆".slice(0,5-n);
}

/* ===========================
   Layout (Header/Footer)
=========================== */
function mountLayout(){
  const headerMount = document.querySelector("[data-header]");
  const footerMount = document.querySelector("[data-footer]");
  if(!headerMount || !footerMount) return;

  headerMount.innerHTML = `
    <div class="topstrip">
      <div class="container inner">
        <div class="top-left">
          <a class="toplink" href="contact.html">Wholesale Inquiry</a>
          <span class="toplink" style="opacity:.8">18 N Miami Ave</span>
        </div>

        <div class="top-center">
          <a class="topbrand" href="index.html" aria-label="Silver Palace Home">SILVER PALACE</a>
          <div class="topsub">Miami Jewelry District • Wholesale B2B • Min order $200</div>
        </div>

        <div class="top-right">
          <a class="toplink" href="#" id="btnNewsletter">Subscribe & Save</a>
          <select class="topselect" id="lang" aria-label="Language">
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
      </div>
    </div>

    <div class="site-header">
      <div class="container">
        <div class="header-row">
          <div style="width:220px"></div>
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
                    <a href="shop.html#Ladies">Ladies</a>
                    <a href="shop.html#Mens">Mens</a>
                    <a href="shop.html#Chains">Chains / Bracelets</a>
                    <a href="shop.html#Italian">Italian Collection</a>
                    <a href="shop.html#Closeout">Closeout</a>
                    <a href="contact.html">Quick Order (Inquiry)</a>
                  </div>
                </div>
              </div>

              <a class="navpill" data-nav href="index.html">Home</a>
              <a class="navpill" data-nav href="shop.html">Shop</a>
              <a class="navpill" data-nav href="about.html">About</a>
              <a class="navpill" data-nav href="contact.html">Contact</a>
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
            <div class="variantRow" id="mVariants"></div>
            <hr class="line">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <strong id="mPrice"></strong>
              <button class="btn primary" id="mAdd" type="button">Add to cart (demo)</button>
            </div>
            <p class="small muted" style="margin-top:10px" id="mWholesale"></p>
            <p class="small muted">Tip: click the SKU to copy.</p>
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
            <div class="small muted">Wholesale buyers get restock alerts and closeout updates.</div>
            <div class="row">
              <input id="newsEmail" placeholder="Your email" />
              <button class="btn primary" id="newsSubmit" type="button">Subscribe</button>
            </div>
            <div class="small muted" style="margin-top:10px">No spam. Unsubscribe anytime.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recently Viewed Tray -->
    <div class="tray" id="rvTray">
      <div class="trayHead">
        <strong>Recently Viewed</strong>
        <button type="button" id="rvToggle">Toggle</button>
      </div>
      <div class="trayBody" id="rvBody"></div>
    </div>
  `;

  footerMount.innerHTML = `
    <div class="footer">
      <div class="container footergrid">
        <div>
          <h5>Silver Palace</h5>
          <div class="small">
            Premium jewelry showroom experience designed for Miami Jewelry District wholesale + retail buyers.
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
          <div class="small">18 N Miami Ave, Miami, FL 33130</div>
          <div class="small"><a href="tel:13053718987">(305) 371-8987</a></div>
          <div class="small">Mon–Fri 10:00 AM–5:30 PM</div>
          <div class="small">Sat 10:00 AM–3:00 PM • Sun Closed</div>
        </div>
      </div>
    </div>
  `;

  // dropdown
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

  // newsletter popup
  const overlayNews = document.getElementById("overlayNews");
  const openNews = () => overlayNews.classList.add("show");
  const closeNews = () => overlayNews.classList.remove("show");
  document.getElementById("btnNewsletter")?.addEventListener("click", (e)=>{ e.preventDefault(); openNews(); });
  document.getElementById("closeNews")?.addEventListener("click", closeNews);
  overlayNews?.addEventListener("click", (e)=>{ if(e.target === overlayNews) closeNews(); });
  document.getElementById("newsSubmit")?.addEventListener("click", ()=>{
    alert("Subscribed (demo).");
    closeNews();
  });

  // login
  document.getElementById("btnLogin")?.addEventListener("click", ()=>{
    alert("Demo login: Next step is wholesale portal + tier pricing after approval.");
  });

  // cart
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = String(getCartCount());
  document.getElementById("btnCart")?.addEventListener("click", ()=>{
    alert("Demo cart. Next: real checkout + wholesale account pricing.");
  });

  // global search
  document.getElementById("globalSearch")?.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      const q = e.target.value.trim();
      location.href = `shop.html?q=${encodeURIComponent(q)}`;
    }
  });

  // product modal close
  const overlayProduct = document.getElementById("overlayProduct");
  const closeProduct = () => overlayProduct.classList.remove("show");
  document.getElementById("closeProduct")?.addEventListener("click", closeProduct);
  overlayProduct?.addEventListener("click", (e)=>{ if(e.target === overlayProduct) closeProduct(); });

  // recently viewed toggle
  const tray = document.getElementById("rvTray");
  document.getElementById("rvToggle")?.addEventListener("click", ()=>{
    tray.classList.toggle("collapsed");
    localStorage.setItem("sp_rv_collapsed", tray.classList.contains("collapsed") ? "1":"0");
  });
  if(localStorage.getItem("sp_rv_collapsed")==="1"){ tray.classList.add("collapsed"); }
}

/* ===========================
   Reviews Carousel (manual only)
=========================== */
function initReviewsCarousel(){
  const track = document.getElementById("reviewTrack");
  const dots = document.getElementById("reviewDots");
  const prev = document.getElementById("revPrev");
  const next = document.getElementById("revNext");
  if(!track || !dots) return;

  track.innerHTML = REVIEWS.map(r=>`
    <article class="review-card">
      <div class="review-top">
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-meta">${r.when}</div>
        </div>
        <div class="stars" aria-label="${r.stars} stars">${starString(r.stars)}</div>
      </div>
      <div class="review-text">${r.text}</div>
    </article>
  `).join("");

  dots.innerHTML = REVIEWS.map((_,i)=>`<span class="review-dot" data-dot="${i}"></span>`).join("");

  const dotEls = [...dots.querySelectorAll(".review-dot")];
  const cards = () => [...track.querySelectorAll(".review-card")];

  const setActiveDot = (idx)=>{
    dotEls.forEach(d=>d.classList.remove("active"));
    if(dotEls[idx]) dotEls[idx].classList.add("active");
  };

  const scrollToIndex = (idx)=>{
    const list = cards();
    if(!list[idx]) return;
    list[idx].scrollIntoView({ behavior:"smooth", inline:"start", block:"nearest" });
    setActiveDot(idx);
  };

  dotEls.forEach(d=>{
    d.addEventListener("click", ()=>scrollToIndex(Number(d.getAttribute("data-dot"))));
  });

  let current = 0;
  setActiveDot(0);

  prev?.addEventListener("click", ()=>{
    current = (current - 1 + REVIEWS.length) % REVIEWS.length;
    scrollToIndex(current);
  });
  next?.addEventListener("click", ()=>{
    current = (current + 1) % REVIEWS.length;
    scrollToIndex(current);
  });

  track.addEventListener("scroll", ()=>{
    const list = cards();
    const left = track.scrollLeft;
    let bestIdx = 0, bestDist = Infinity;
    list.forEach((el,i)=>{
      const dist = Math.abs(el.offsetLeft - left);
      if(dist < bestDist){ bestDist = dist; bestIdx = i; }
    });
    current = bestIdx;
    setActiveDot(bestIdx);
  });
}

/* ===========================
   Collection tile loops
=========================== */
function initCollectionLoops(){
  const tiles = document.querySelectorAll(".tilecard[data-loop]");
  if(!tiles.length) return;

  const sets = {
    chains: ["./images/sp-001-cuban-chain.png","./images/sp-006-figaro-chain.png","./images/sp-009-herringbone.png"],
    moissanite: ["./images/sp-002-tennis-bracelet.png","./images/sp-010-tennis-necklace.png","./images/sp-008-cross-pendant.png"],
    italian: ["./images/sp-003-italian-horn.png","./images/sp-004-nameplate.png","./images/sp-007-signet-ring.png"],
    closeout: ["./images/sp-005-evil-eye-studs.png","./images/sp-008-cross-pendant.png","./images/sp-003-italian-horn.png"],
  };

  tiles.forEach(tile=>{
    const key = tile.getAttribute("data-loop");
    const imgBox = tile.querySelector(".img");
    const imgs = sets[key] || [];
    if(!imgBox || !imgs.length) return;

    imgBox.classList.add("loopbox");
    imgBox.innerHTML = `<img class="loopimg a" alt="" /><img class="loopimg b" alt="" />`;

    imgs.forEach(src=>{ const im = new Image(); im.src = src; });

    const a = imgBox.querySelector("img.a");
    const b = imgBox.querySelector("img.b");
    let idx = 0;
    let showingA = true;

    a.src = imgs[0];
    b.src = imgs[1 % imgs.length];
    a.classList.add("show");

    setInterval(()=>{
      idx = (idx + 1) % imgs.length;
      const next = imgs[idx];

      if(showingA){
        b.src = next; b.classList.add("show"); a.classList.remove("show");
      } else {
        a.src = next; a.classList.add("show"); b.classList.remove("show");
      }
      showingA = !showingA;
    }, 3200);
  });
}

/* ===========================
   Recently Viewed
=========================== */
function getRecent(){
  try{ return JSON.parse(localStorage.getItem(LS_RECENT) || "[]"); }catch{ return []; }
}
function addRecent(id){
  let rec = getRecent().filter(x=>x!==id);
  rec.unshift(id);
  rec = rec.slice(0,4);
  localStorage.setItem(LS_RECENT, JSON.stringify(rec));
  renderRecentTray();
}
function renderRecentTray(){
  const body = document.getElementById("rvBody");
  if(!body) return;

  const ids = getRecent();
  if(!ids.length){
    body.innerHTML = `<div class="small muted">View a product to see it here.</div>`;
    return;
  }

  const items = ids.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  body.innerHTML = items.map(p=>`
    <div class="rvItem" role="button" tabindex="0" data-rv="${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy"/>
      <div class="txt">
        <div class="t">${p.name}</div>
        <div class="s">${p.category} • ${fmt(p.price)}</div>
      </div>
    </div>
  `).join("");

  body.querySelectorAll("[data-rv]").forEach(el=>{
    el.addEventListener("click", ()=>openProduct(el.getAttribute("data-rv")));
  });
}

/* ===========================
   Product modal
=========================== */
function openProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;

  addRecent(id);

  document.querySelector("#overlayProduct .modal-media").innerHTML =
    `<img src="${p.img}" alt="${p.name}" />`;

  const mTitle = document.getElementById("mTitle");
  mTitle.innerHTML = `${p.name}
    <div class="small muted skuCopy" id="skuCopy" title="Click to copy SKU">${p.id} • Click to copy</div>
  `;

  document.getElementById("mDesc").textContent = p.desc;
  document.getElementById("mPrice").textContent = fmt(p.price);

  const meta = document.getElementById("mMeta");
  meta.innerHTML = `
    <span class="tag">${p.category}</span>
    <span class="tag">Stock: ${p.inventory}</span>
    <span class="tag">${p.metal.toUpperCase()}</span>
  `;

  document.getElementById("mWholesale").textContent = p.wholesaleNote || "Wholesale pricing available after login.";

  const v = document.getElementById("mVariants");
  v.innerHTML = "";

  if(p.variants?.lengths?.length){
    v.innerHTML += `
      <div class="vline">
        <div class="label">Length</div>
        <div class="pills" id="lenPills"></div>
      </div>
    `;
    const lenPills = v.querySelector("#lenPills");
    lenPills.innerHTML = p.variants.lengths.map((L,i)=>
      `<button type="button" data-len="${L}" class="${i===0?'active':''}">${L}${L>=10?'in':''}</button>`
    ).join("");
    lenPills.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        lenPills.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  if(p.variants?.weights?.length){
    v.innerHTML += `
      <div class="vline">
        <div class="label">Weight</div>
        <div class="pills" id="wgtPills"></div>
      </div>
    `;
    const wgtPills = v.querySelector("#wgtPills");
    wgtPills.innerHTML = p.variants.weights.map((W,i)=>
      `<button type="button" data-wgt="${W}" class="${i===0?'active':''}">${W}g</button>`
    ).join("");
    wgtPills.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        wgtPills.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  document.getElementById("skuCopy")?.addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText(p.id);
      alert(`Copied SKU: ${p.id}`);
    }catch{
      alert(`SKU: ${p.id}`);
    }
  });

  document.getElementById("mAdd").onclick = ()=>{
    const next = getCartCount() + 1;
    setCartCount(next);
    document.getElementById("cartCount").textContent = String(next);
    alert("Added to cart (demo).");
  };

  document.getElementById("overlayProduct").classList.add("show");
}

/* ===========================
   Product cards (Quick View + Quantity + Quick Add only)
=========================== */
function renderProducts(el, items){
  el.innerHTML = items.map(p=>`
    <article class="card reveal">
      <div class="media">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>

      <div class="pad">
        <h4>${p.name}</h4>
        <div class="muted small">${p.category}</div>

        <div class="badges">
          ${p.badges.map(b=>`<span class="badge ${b.includes('Fast')||b.includes('Rhodium')?'hot':''}">${b}</span>`).join("")}
          <span class="badge soft">${p.tag}</span>
        </div>

        <div class="meta">
          <div class="price">${fmt(p.price)}</div>
          <div class="tag">${p.metal.toUpperCase()}</div>
        </div>

           <!-- Quantity (full width) -->
        <div class="qtyrow">
          <div class="stepper wide">
            <button type="button" data-minus="${p.id}">–</button>
            <input type="text" value="1" inputmode="numeric" data-qty="${p.id}" />
            <button type="button" data-plus="${p.id}">+</button>
          </div>
        </div>

        <!-- Buttons (side-by-side) -->
        <div class="btnrow">
          <button class="btn split" data-open="${p.id}" type="button">Quick View</button>
          <button class="qa-btn split" data-qa="${p.id}" type="button">Quick Add</button>
        </div>

    </article>
  `).join("");

  el.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click", ()=>openProduct(btn.getAttribute("data-open")));
  });

  const clampQty = (n)=> Math.max(1, Math.min(999, n));

  el.querySelectorAll("[data-minus]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-minus");
      const input = el.querySelector(`[data-qty="${id}"]`);
      input.value = String(clampQty(Number(input.value||"1") - 1));
    });
  });

  el.querySelectorAll("[data-plus]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-plus");
      const input = el.querySelector(`[data-qty="${id}"]`);
      input.value = String(clampQty(Number(input.value||"1") + 1));
    });
  });

  el.querySelectorAll("[data-qa]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-qa");
      const input = el.querySelector(`[data-qty="${id}"]`);
      const qty = clampQty(Number(input.value||"1"));
      const next = getCartCount() + qty;
      setCartCount(next);
      document.getElementById("cartCount").textContent = String(next);
      alert(`Added ${qty} to cart (demo).`);
    });
  });

  requestAnimationFrame(()=>{
    el.querySelectorAll(".reveal").forEach((x,i)=>{
      setTimeout(()=>x.classList.add("in"), 60 + i*30);
    });
  });
}

/* ===========================
   Home + Shop init
=========================== */
function initHome(){
  const grid = document.getElementById("featuredGrid");
  if(grid) renderProducts(grid, PRODUCTS.slice(0,8));
  initCollectionLoops();
  initReviewsCarousel();
  renderRecentTray();
}

function initShop(){
  const grid = document.getElementById("shopGrid");
  if(!grid) return;

  const search = document.getElementById("search");
  const category = document.getElementById("category");
  const count = document.getElementById("resultsCount");

  let metal = localStorage.getItem(LS_METAL) || "sterling";
  const metalBtns = document.querySelectorAll("[data-metal]");
  metalBtns.forEach(btn=>{
    if(btn.getAttribute("data-metal") === metal) btn.classList.add("active");
    btn.addEventListener("click", ()=>{
      metalBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      metal = btn.getAttribute("data-metal");
      localStorage.setItem(LS_METAL, metal);
      apply();
    });
  });

  const categories = ["All", ...new Set(PRODUCTS.map(p=>p.category))];
  category.innerHTML = categories.map(c=>`<option value="${c}">${c}</option>`).join("");

  const params = new URLSearchParams(location.search);
  const q0 = params.get("q");
  if(q0) search.value = q0;

  const apply = ()=>{
    const q = (search.value||"").toLowerCase().trim();
    const c = category.value;

    const filtered = PRODUCTS.filter(p=>{
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q) || p.badges.join(" ").toLowerCase().includes(q);
      const matchesC = (c==="All") || (p.category===c);
      const matchesMetal = (metal==="sterling") ? (p.metal==="sterling") : true;
      return matchesQ && matchesC && matchesMetal;
    });

    renderProducts(grid, filtered);
    count.textContent = `${filtered.length} item(s)`;
    renderRecentTray();
  };

  search?.addEventListener("input", apply);
  category?.addEventListener("change", apply);
  apply();
}

function initReveal(){
  document.querySelectorAll(".reveal").forEach((el,i)=>{
    setTimeout(()=>el.classList.add("in"), 50 + i*60);
  });
}

/* ===========================
   DOM ready
=========================== */
document.addEventListener("DOMContentLoaded", ()=>{
  mountLayout();
  setActiveNav();
  initReveal();
  initHome();
  initShop();
  renderRecentTray();

  const cc = document.getElementById("cartCount");
  if(cc) cc.textContent = String(getCartCount());
});
