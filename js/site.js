/* Auto Wiss — shared site behaviours (header, menu, reveal, counters, skeleton) */
(function () {
    'use strict';

    // Current year
    var yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();

    // Sticky header solid state
    var head = document.querySelector('.site-head');
    if (head) {
        var onScroll = function () { head.classList.toggle('solid', window.scrollY > 40); };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Mobile menu
    var burger = document.getElementById('burger');
    var menu = document.getElementById('menu');
    if (burger && menu) {
        burger.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            burger.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', open);
        });
        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                menu.classList.remove('open');
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Skeleton image loading — reveal each image once decoded, drop the shimmer
    document.querySelectorAll('.media img').forEach(function (img) {
        var media = img.closest('.media');
        var done = function () { img.classList.add('loaded'); if (media) media.classList.add('done'); };
        if (img.complete && img.naturalWidth > 0) { done(); }
        else {
            img.addEventListener('load', done);
            img.addEventListener('error', function () { if (media) media.classList.add('done'); });
        }
    });

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll reveal
    var revs = document.querySelectorAll('.rv');
    if (reduce || !('IntersectionObserver' in window)) {
        revs.forEach(function (el) { el.classList.add('in'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.14 });
        revs.forEach(function (el) { io.observe(el); });
        // Hero reveals fire immediately (above the fold)
        document.querySelectorAll('.hero .rv').forEach(function (el) { el.classList.add('in'); });
    }

    // Count-up numbers
    var counters = document.querySelectorAll('[data-count]');
    var runCount = function (el) {
        var target = +el.dataset.count;
        var suffix = el.dataset.suffix || '';
        if (reduce) { el.textContent = target.toLocaleString('de-CH') + suffix; return; }
        var dur = 1500, start = performance.now();
        var step = function (now) {
            var p = Math.min((now - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target).toLocaleString('de-CH') + (p === 1 ? suffix : '');
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) {
        counters.forEach(runCount);
    } else {
        var co = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
        }, { threshold: 0.6 });
        counters.forEach(function (el) { co.observe(el); });
    }
})();
