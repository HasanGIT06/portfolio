const roles = ["Data Science Enthusiast"];
let ri = 0;
let ci = 0;
let del = false;
const el = document.getElementById("role");

(function type() {
    const w = roles[ri];
    el.textContent = w.slice(0, ci);

    if (!del && ci++ === w.length) {
        del = true;
        return setTimeout(type, 1500);
    }
    if (del && ci-- === 0) {
        del = false;
        ri = (ri + 1) % roles.length;
    }
    setTimeout(type, del ? 40 : 80);
})();

// ========== Animasi muncul saat di-scroll ==========
const io = new IntersectionObserver(entries => {
    entries.forEach(x => {
        if (x.isIntersecting) x.target.classList.add("in");
    });
}, { threshold: .12 });

document.querySelectorAll(".rv").forEach(x => io.observe(x));

// ========== Filter proyek ==========
document.querySelectorAll(".f").forEach(b => {
    b.onclick = () => {
        document.querySelectorAll(".f").forEach(x => x.classList.remove("on"));
        b.classList.add("on");

        document.querySelectorAll(".proj").forEach(p => {
            const sembunyi = b.dataset.f !== "all" && p.dataset.c !== b.dataset.f;
            p.classList.toggle("hide", sembunyi);
        });
    };
});

// ========== Indikator scroll & menu aktif ==========
const bar = document.getElementById("bar");
const ls = [...document.querySelectorAll(".links a")];
const secs = ls.map(a => document.querySelector(a.hash));

addEventListener("scroll", () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";

    let cur = -1;
    secs.forEach((s, i) => {
        if (s.getBoundingClientRect().top < 140) cur = i;
    });
    ls.forEach((a, i) => a.classList.toggle("on", i === cur));
}, { passive: true });

// ========== Form kontak (membuka aplikasi email) ==========
document.getElementById("cf").onsubmit = e => {
    e.preventDefault();
    const f = e.target;

    location.href = "mailto:email@contoh.com?subject=" +
        encodeURIComponent("Pesan dari " + f.n.value) +
        "&body=" +
        encodeURIComponent(f.m.value + "\n\n" + f.n.value + " (" + f.e.value + ")");

    document.getElementById("ok").textContent = "Opening your email app…";
};