  let times = JSON.parse(localStorage.getItem("timesList")) || [];

function saveTimes() {
  localStorage.setItem("timesList", JSON.stringify(times));
}

function loadSchedule() {
  const table = document.getElementById("schedule");
  table.innerHTML = "";

  times.forEach(({ subject, time }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${subject}</td><td>${time}</td>`;
    table.appendChild(row);
  });
}

function addSubject() {
  const subject = document.getElementById("subject").value.trim();
  const time = document.getElementById("time").value;

  if (!subject || !time) {
    alert("يرجى ملء المادة والوقت.");
    return;
  }

  times.push({ subject, time });
  saveTimes();
  loadSchedule();

  document.getElementById("subject").value = "";
  document.getElementById("time").value = "";
}

function removeLastSubject() {
  if (times.length === 0) {
    alert("لا توجد حصص لحذفها!");
    return;
  }

 <script>
// ============================
// تحديث عدد المتبرعين تلقائيًا
// ============================
async function updateDonorCount() {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyaG-XqQF26ERgL9VCwxHi_AoUWHI1sWq4YW5IZDGabY6q6h-rcdl_SNmrrEOaLP60rUw/exec");
    const data = await res.json();
    if(data.status === "success"){
      document.getElementById('donorNumber').textContent = data.results.length;
    } else {
      console.error("خطأ في جلب البيانات:", data.message);
    }
  } catch(err) {
    console.error("فشل الاتصال بالخادم:", err);
  }
}

// تحديث عند تحميل الصفحة
updateDonorCount();

// ============================
// Modal التفاعل مع النماذج
// ============================
const modal = document.getElementById('modal');
const modalMsg = document.getElementById('modalMsg');

function openModal(msg){
  modalMsg.textContent = msg;
  modal.showModal();
}

function closeModal(){
  modal.close();
}

// ============================
// معالجة نموذج المتبرعين بالدم
// ============================
document.getElementById('donorForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;

  const data = {
    full_name: f.name.value.trim(),
    phone: f.phone.value.trim(),
    blood_type: f.bloodType.value,
    wilaya: f.city.value.trim(),
    availability: f.availability.value,
    notes: f.notes.value.trim(),
    ts: new Date().toISOString()
  };

  if(!data.full_name || !data.phone || !data.blood_type || !data.wilaya){
    return openModal('يرجى تعبئة الحقول المطلوبة.');
  }

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyaG-XqQF26ERgL9VCwxHi_AoUWHI1sWq4YW5IZDGabY6q6h-rcdl_SNmrrEOaLP60rUw/exec", {
      method: "POST",
      body: new URLSearchParams(data)
    });
    const result = await res.json();
    if(result.status === "success"){
      f.reset();
      openModal('شكراً لتسجيلك كمتبرّع بالدم. سنقوم بالتواصل عند الحاجة.');
      updateDonorCount(); // تحديث العدد فورًا
    } else {
      openModal("⚠️ حصل خطأ: " + result.message);
    }
  } catch(err) {
    openModal("❌ فشل الاتصال بالخادم");
  }
});

// ============================
// البحث عن متبرعين
// ============================
document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const type = document.getElementById('needBloodType').value;
  const city = document.getElementById('needCity').value.trim();

  openModal('جاري البحث عن متبرعين…');

  try {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyaG-XqQF26ERgL9VCwxHi_AoUWHI1sWq4YW5IZDGabY6q6h-rcdl_SNmrrEOaLP60rUw/exec?blood_type=${encodeURIComponent(type)}&wilaya=${encodeURIComponent(city)}`);
    const result = await res.json();
    const box = document.getElementById('results');

    if(result.results.length === 0){
      openModal('لا توجد نتائج مطابقة، ابحث في ولاية قريبة لك.');
      box.innerHTML = '';
      return;
    }

    box.innerHTML = result.results.map(d => `
      <div sty

 