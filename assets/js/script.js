
/* ── Intersection Observer para reveals ── */
const allReveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
allReveals.forEach(el => revealObs.observe(el));

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Contadores animados (strip + dashboard) ── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(target * ease);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ── Mini bar chart ── */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.mini-bar').forEach((bar, i) => {
        const h = bar.dataset.h;
        setTimeout(() => { bar.style.height = h + '%'; }, i * 100);
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const barChart = document.getElementById('bar-chart');
if (barChart) barObs.observe(barChart);

/* ── Progress bars ── */
const progressObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-fill').forEach((fill, i) => {
        setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, i * 150);
      });
      progressObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.dash-card').forEach(card => {
  if (card.querySelector('.progress-fill')) progressObs.observe(card);
});

/* ── Sparkline animation ── */
const sparkObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const path = entry.target.querySelector('.spark-path');
      const fill = entry.target.querySelector('.spark-path-fill');
      if (path) {
        setTimeout(() => {
          path.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)';
          path.style.strokeDashoffset = '0';
        }, 200);
      }
      if (fill) {
        setTimeout(() => {
          fill.style.transition = 'opacity 0.8s ease';
          fill.style.opacity = '1';
        }, 600);
      }
      sparkObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sparkline-wrap').forEach(el => sparkObs.observe(el));

/* ── NPS Arc ── */
const npsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const arc = entry.target.querySelector('.nps-arc');
      if (arc) {
        const total = 188;
        const pct = 78 / 100;
        const offset = total - (total * pct);
        setTimeout(() => {
          arc.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.34,1.1,0.64,1)';
          arc.style.strokeDashoffset = offset;
        }, 300);
      }
      npsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.dash-card').forEach(card => {
  if (card.querySelector('.nps-arc')) npsObs.observe(card);
});

/* ── Donut segments animation ── */
const donutObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.donut-seg').forEach((seg, i) => {
        seg.style.transition = 'none';
        const orig = seg.getAttribute('stroke-dasharray').split(' ')[0];
        const full = 276.46;
        seg.setAttribute('stroke-dasharray', `0 ${full}`);
        setTimeout(() => {
          seg.style.transition = `stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1) ${i*0.15}s`;
          seg.setAttribute('stroke-dasharray', `${orig} ${full - parseFloat(orig)}`);
        }, 100);
      });
      donutObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.donut-wrap').forEach(el => donutObs.observe(el));


window.addEventListener("load",()=>{

    const loader=document.getElementById("pageLoader");

    if(loader){

        setTimeout(()=>{

            loader.style.opacity="0";

            setTimeout(()=>{

                loader.remove();

            },700);

        },900);

    }

});
