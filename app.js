const KEY="detox-rencoeng-content-v1";
const EXPORTED_DATA = null;
const defaults={
  brand:"DETOX RENCOENG",
  heroTitle:"DETOX RENCOENG",
  heroText:"Nikmati kesegaran dan khasiat alami ramuan herbal pilihan dari kunyit, jahe, sereh, dan lengkuas — diolah secara tradisional untuk membantu detoksifikasi dan menjaga kebugaran tubuh Anda.",
  phone:"6281234567890", email:"pesan@detoxrencoeng.id", address:"Dikirim dari Yogyakarta ke seluruh Indonesia",
  images:{heroImage:"images/hero.svg",flatlayImage:"images/flatlay.svg",variantsImage:"images/variants.svg"},
  ingredients:[
    ["Kunyit","Kandungan kurkumin membantu detoks alami dan menjaga daya tahan tubuh.","images/k1.svg"],
    ["Jahe","Menghangatkan tubuh dan meredakan pegal serta masuk angin.","images/k2.svg"],
    ["Sereh","Memberi aroma segar dan membantu melancarkan pencernaan.","images/k3.svg"],
    ["Lengkuas","Menambah kehangatan rempah dan mendukung kebugaran tubuh.","images/k4.svg"]
  ],
  advantages:[
    ["100% Alami","Tanpa bahan kimia tambahan, murni dari rempah pilihan."],
    ["Tanpa Pengawet","Dikeringkan secara alami sehingga tahan lebih lama."],
    ["Bahan Pilihan","Dipilih dari empon-empon segar kualitas terbaik."],
    ["Praktis Diseduh","Cukup seduh air panas, siap dinikmati kapan saja."]
  ],
  benefits:["Membantu melancarkan pencernaan","Menghangatkan tubuh dari dalam","Meningkatkan daya tahan tubuh","Meredakan pegal dan lelah","Membantu proses detoks alami"],
  steps:["Seduh 1 sachet DETOX RENCOENG dengan 200 ml air panas.","Diamkan selama 3–5 menit agar khasiat rempah keluar sempurna.","Tambahkan madu atau gula sesuai selera.","Aduk rata dan minuman herbal siap dinikmati."],
  gallery:[
    ["Paket Racik Alami","images/variants.svg"],["Celup Jahe Kunyit","images/hero.svg"],["Irisan Kering Empon","images/flatlay.svg"]
  ],
  products:[
    ["Paket Racik Alami","Kombinasi terbaik: irisan tipis dan serbuk halus kunyit, jahe, sereh, serta lengkuas dalam satu kemasan. Praktis diseduh, aroma rempahnya paling lengkap.","Paling Laris","images/variants.svg"],
    ["Celup Jahe Kunyit","Bahan halus yang dikemas dalam kantong teh celup. Tanpa ampas, cukup celupkan ke air panas dan racikan herbal siap dinikmati kapan saja.","Praktis","images/hero.svg"],
    ["Irisan Kering Empon","Irisan tipis bahan kering kunyit, jahe, sereh, dan lengkuas. Cocok untuk direbus bersama gula batu atau madu sesuai selera keluarga.","Tradisional","images/flatlay.svg"]
  ]
};
function getData(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(EXPORTED_DATA||defaults)}catch{return structuredClone(EXPORTED_DATA||defaults)}}
function setData(d){localStorage.setItem(KEY,JSON.stringify(d))}
let data=getData();
const money=n=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
function render(){
 document.querySelectorAll("[data-cms]").forEach(e=>{e.textContent=data[e.dataset.cms]||""});
 document.querySelectorAll("[data-cms-img]").forEach(e=>e.src=data.images[e.dataset.cmsImg]||e.src);
 document.getElementById("ingredients").innerHTML=data.ingredients.map(x=>`<article class="card"><img src="${x[2]}" alt="${x[0]}"><div class="card-body"><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join("");
 document.getElementById("advantages").innerHTML=data.advantages.map(x=>`<div class="adv"><div class="check">✓</div><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("");
 document.getElementById("benefits").innerHTML=data.benefits.map(x=>`<li>✓ &nbsp;${x}</li>`).join("");
 document.getElementById("steps").innerHTML=data.steps.map((x,i)=>`<li class="step"><div class="step-num">${i+1}</div><div>${x}</div></li>`).join("");
 document.getElementById("gallery").innerHTML=data.gallery.map(x=>`<figure><img src="${x[1]}" alt="${x[0]}"><figcaption>${x[0]}</figcaption></figure>`).join("");
 document.getElementById("products").innerHTML=data.products.map((x,i)=>`<article class="product"><div class="product-img"><img src="${x[3]}" alt="${x[0]}"><span class="badge">${x[2]}</span></div><div class="product-body"><h3>${x[0]}</h3><p>${x[1]}</p><div class="product-price">Rp 20.000 <small style="font:400 13px sans-serif;color:#756f64">/ isi 15</small></div><button class="btn primary full order-btn" data-i="${i}">🛍 Pesan</button></div></article>`).join("");
 const select=document.getElementById("variant"); select.innerHTML=data.products.map((x,i)=>`<option value="${i}">${x[0]}</option>`).join("");
 document.getElementById("waLink").href=`https://wa.me/${data.phone}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang DETOX RENCOENG.")}`;
 document.getElementById("waLink").textContent="WhatsApp +"+data.phone;
 document.getElementById("emailLink").href="mailto:"+data.email; document.getElementById("emailLink").textContent=data.email;
 document.getElementById("addressText").textContent=data.address;
 document.querySelectorAll(".order-btn").forEach(b=>b.onclick=()=>{document.getElementById("variant").value=b.dataset.i;updateSummary();document.getElementById("pesan").scrollIntoView({behavior:"smooth"})});
 updateSummary();
}
function updateSummary(){
 const i=+document.getElementById("variant").value||0,q=Math.max(1,+document.getElementById("quantity").value||1),p=data.products[i];
 document.getElementById("sumVariant").textContent=p?.[0]||"";document.getElementById("sumQty").textContent=q+" paket";document.getElementById("sumPrice").textContent=money(20000);document.getElementById("sumTotal").textContent=money(q*20000);document.getElementById("summaryImage").src=p?.[3]||"images/variants.svg";
}
document.getElementById("variant").addEventListener("change",updateSummary);document.getElementById("quantity").addEventListener("input",updateSummary);
document.getElementById("orderForm").addEventListener("submit",e=>{
 e.preventDefault(); const i=+variant.value,q=Math.max(1,+quantity.value||1),p=data.products[i];
 const msg=`Halo, saya ingin memesan DETOX RENCOENG.%0A%0ANama: ${encodeURIComponent(buyerName.value)}%0AWhatsApp: ${encodeURIComponent(whatsapp.value)}%0AAlamat: ${encodeURIComponent(address.value)}%0AVarian: ${encodeURIComponent(p[0])}%0AJumlah: ${q} paket%0ATotal: ${encodeURIComponent(money(q*20000))}%0ACatatan: ${encodeURIComponent(note.value||"-")}`;
 location.href=`https://wa.me/${data.phone}?text=${msg}`;
});
render();
