/**
 * Landing Page Component — Paradise Nursery (Redesigned)
 * Organic luxury aesthetic: deep forest greens, warm creams, editorial typography,
 * generous whitespace, botanical illustrations feel, premium micro-interactions.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, ArrowRight, Heart, Truck, ThumbsUp,
  Menu, X, Instagram, Facebook, Twitter,
  Quote, SunMedium, Droplets, Home, Star, ChevronLeft, ChevronRight
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';

/* ─── Design tokens injected via a style tag ─────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    :root {
      --forest:   #1a2e1a;
      --moss:     #2d4a2d;
      --sage:     #6b8f5e;
      --fern:     #8aad7a;
      --cream:    #f7f3ec;
      --parchment:#efe8d8;
      --terracotta:#c4714a;
      --gold:     #c9a84c;
      --charcoal: #2a2a2a;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .pn-root {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      overflow-x: hidden;
    }

    /* ── Typography ── */
    .display { font-family: 'Cormorant Garamond', serif; }

    /* ── Nav ── */
    .pn-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(247,243,236,0.92);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(107,143,94,0.15);
      transition: transform .35s cubic-bezier(.4,0,.2,1), box-shadow .3s;
    }
    .pn-nav.scrolled   { box-shadow: 0 4px 32px rgba(26,46,26,.08); }
    .pn-nav.nav-hidden { transform: translateY(-100%); }
    .pn-page-offset    { padding-top: 72px; }
    .pn-nav-inner {
      max-width: 1280px; margin: 0 auto;
      padding: 0 2rem;
      display: flex; align-items: center; justify-content: space-between;
      height: 72px;
    }
    .pn-logo { display: flex; align-items: center; gap: .6rem; cursor: pointer; text-decoration: none; }
    .pn-logo-icon {
      width: 40px; height: 40px;
      background: var(--forest);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: transform .3s;
    }
    .pn-logo:hover .pn-logo-icon { transform: rotate(15deg) scale(1.05); }
    .pn-logo-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.35rem; font-weight: 500;
      color: var(--forest); letter-spacing: .02em;
    }
    .pn-nav-links {
      display: flex; align-items: center; gap: 2.5rem;
      list-style: none;
    }
    .pn-nav-link {
      font-size: .85rem; font-weight: 400; letter-spacing: .06em; text-transform: uppercase;
      color: var(--moss); background: none; border: none; cursor: pointer;
      text-decoration: none;
      position: relative; padding-bottom: 2px;
    }
    .pn-nav-link::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 0; height: 2px; background: var(--terracotta);
      transition: width .25s ease;
    }
    .pn-nav-link:hover::after, .pn-nav-link.shop::after { width: 100%; }
    .pn-nav-link.shop { color: var(--terracotta); }
    .pn-nav-cta {
      background: var(--forest); color: var(--cream);
      border: none; border-radius: 100px;
      padding: .5rem 1.4rem; font-size: .82rem; font-weight: 500;
      letter-spacing: .05em; cursor: pointer; text-decoration: none;
      transition: background .2s, transform .2s;
    }
    .pn-nav-cta:hover { background: var(--moss); transform: translateY(-1px); }

    /* ── Mobile menu ── */
    .pn-hamburger {
      display: none; background: none; border: 1.5px solid rgba(45,74,45,.3);
      border-radius: 8px; padding: .4rem; cursor: pointer; color: var(--forest);
    }
    @media (max-width: 768px) {
      .pn-nav-links, .pn-nav-cta-wrap { display: none; }
      .pn-hamburger { display: flex; align-items: center; justify-content: center; }
    }
    .pn-mobile-menu {
      background: var(--cream); border-bottom: 1px solid rgba(107,143,94,.15);
      padding: 1rem 2rem 1.5rem;
      display: flex; flex-direction: column; gap: .75rem;
    }
    .pn-mobile-menu .pn-nav-link { font-size: .95rem; padding: .35rem 0; }

    /* ── Hero ── */
    .pn-hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .pn-hero-bg {
      position: absolute; inset: 0;
      background-image: url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&q=85');
      background-size: cover; background-position: center;
    }
    .pn-hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(160deg, rgba(26,46,26,.75) 0%, rgba(26,46,26,.5) 50%, rgba(26,46,26,.72) 100%);
    }
    .pn-hero-noise {
      position: absolute; inset: 0; opacity: .04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .pn-hero-content {
      position: relative; z-index: 2;
      max-width: 800px; margin: 0 auto;
      padding: 6rem 2rem 4rem; text-align: center;
    }
    .pn-hero-eyebrow {
      display: inline-flex; align-items: center; gap: .5rem;
      background: rgba(201,168,76,.15); border: 1px solid rgba(201,168,76,.4);
      border-radius: 100px; padding: .35rem 1rem;
      font-size: .75rem; letter-spacing: .15em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 2rem;
      animation: fadeUp .8s .1s both;
    }
    .pn-hero-h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3.5rem, 9vw, 7.5rem);
      font-weight: 300; line-height: 1;
      color: #fff; letter-spacing: -.01em;
      margin-bottom: .5rem;
      animation: fadeUp .9s .25s both;
    }
    .pn-hero-h1 em { font-style: italic; color: var(--fern); }
    .pn-hero-sub {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.25rem, 3vw, 1.75rem);
      font-weight: 300; font-style: italic;
      color: rgba(255,255,255,.75);
      margin-bottom: 1.5rem;
      animation: fadeUp .9s .4s both;
    }
    .pn-hero-p {
      font-size: 1rem; line-height: 1.75; font-weight: 300;
      color: rgba(255,255,255,.7);
      max-width: 520px; margin: 0 auto 2.5rem;
      animation: fadeUp .9s .55s both;
    }
    .pn-hero-actions {
      display: flex; align-items: center; justify-content: center;
      gap: 1rem; flex-wrap: wrap;
      animation: fadeUp .9s .7s both;
    }
    .pn-btn-primary {
      background: var(--terracotta); color: #fff;
      border: none; border-radius: 100px;
      padding: .85rem 2rem; font-size: .9rem; font-weight: 500;
      cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: .5rem;
      transition: background .2s, transform .2s, box-shadow .2s;
      box-shadow: 0 8px 24px rgba(196,113,74,.35);
    }
    .pn-btn-primary:hover {
      background: #b8603d; transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(196,113,74,.45);
    }
    .pn-btn-ghost {
      background: rgba(255,255,255,.1); color: #fff;
      border: 1px solid rgba(255,255,255,.3);
      border-radius: 100px; padding: .85rem 2rem;
      font-size: .9rem; font-weight: 400;
      cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: .5rem;
      transition: background .2s, transform .2s;
      backdrop-filter: blur(8px);
    }
    .pn-btn-ghost:hover { background: rgba(255,255,255,.18); transform: translateY(-2px); }
    .pn-hero-stats {
      display: flex; justify-content: center; gap: 3rem;
      flex-wrap: wrap; margin-top: 3.5rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,.12);
      animation: fadeUp .9s .9s both;
    }
    .pn-hero-stat { text-align: center; }
    .pn-hero-stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem; font-weight: 300;
      color: #fff; line-height: 1;
    }
    .pn-hero-stat-label {
      font-size: .72rem; letter-spacing: .1em; text-transform: uppercase;
      color: rgba(255,255,255,.55); margin-top: .25rem;
    }
    .pn-hero-scroll {
      display: flex; flex-direction: column; align-items: center; gap: .4rem;
      color: rgba(255,255,255,.4); font-size: .7rem; letter-spacing: .12em;
      text-transform: uppercase; margin-top: 2rem;
      animation: fadeIn 1s 1.2s both;
    }
    .pn-scroll-line {
      width: 1px; height: 36px; background: rgba(255,255,255,.25);
      animation: scrollPulse 2s ease-in-out infinite;
    }

    /* ── Section layout helpers ── */
    .pn-section { padding: 7rem 0; }
    .pn-container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .pn-section-label {
      display: block; font-size: .72rem; letter-spacing: .18em;
      text-transform: uppercase; color: var(--sage); margin-bottom: 1rem;
    }
    .pn-section-h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 400; line-height: 1.1;
      color: var(--forest); margin-bottom: 1rem;
    }
    .pn-section-h2 em { font-style: italic; color: var(--terracotta); }
    .pn-section-sub {
      font-size: 1rem; line-height: 1.75; color: #666; max-width: 520px;
    }

    /* ── Features ── */
    .pn-features { background: var(--forest); }
    .pn-features .pn-section-label { color: var(--fern); }
    .pn-features .pn-section-h2 { color: var(--cream); }
    .pn-features .pn-section-sub { color: rgba(247,243,236,.6); }
    .pn-features-grid {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 15px;
      margin-top: 4rem;
    }
    @media (max-width: 900px) { .pn-features-grid { grid-template-columns: 1fr; } }
    .pn-feature-card {
      background: rgba(255,255,255,.04);
      padding: 3rem 2.5rem;
      border: 1px solid rgba(255,255,255,.06);
      transition: background .3s;
      position: relative; overflow: hidden;
      border-radius :15px;
    }
    .pn-feature-card::before {
      content: ''; position: absolute; top: 0; left: 0;
      width: 3px; height: 0; background: var(--terracotta);
      transition: height .4s ease;
    }
    .pn-feature-card:hover { background: rgba(255,255,255,.07); }
    .pn-feature-card:hover::before { height: 100%; }
    .pn-feature-icon {
      width: 52px; height: 52px; border-radius: 16px;
      background: rgba(138,173,122,.12);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 1.5rem; color: var(--fern);
      transition: transform .3s;
    }
    .pn-feature-card:hover .pn-feature-icon { transform: scale(1.1) rotate(4deg); }
    .pn-feature-h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; font-weight: 500; color: var(--cream); margin-bottom: .75rem;
    }
    .pn-feature-p { font-size: .9rem; line-height: 1.7; color: rgba(247,243,236,.55); }

    /* ── Kits ── */
    .pn-kits { background: var(--parchment); }
    .pn-kits-grid {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem;
      margin-top: 4rem;
    }
    @media (max-width: 900px) { .pn-kits-grid { grid-template-columns: 1fr; } }
    .pn-kit-card {
      background: var(--cream); border-radius: 20px;
      padding: 2.5rem; display: flex; flex-direction: column;
      border: 1px solid rgba(107,143,94,.15);
      transition: transform .3s, box-shadow .3s;
    }
    .pn-kit-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(26,46,26,.12);
    }
    .pn-kit-icon {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(26,46,26,.07);
      display: flex; align-items: center; justify-content: center;
      color: var(--forest); margin-bottom: 1.5rem;
    }
    .pn-kit-h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem; font-weight: 500; color: var(--forest); margin-bottom: .5rem;
    }
    .pn-kit-p { font-size: .88rem; line-height: 1.65; color: #777; flex: 1; margin-bottom: 1.5rem; }
    .pn-kit-price {
      font-size: .82rem; font-weight: 500; color: var(--sage);
      letter-spacing: .04em; margin-bottom: 1rem;
    }
    .pn-kit-btn {
      display: inline-flex; align-items: center; gap: .4rem;
      font-size: .82rem; font-weight: 500; color: var(--forest);
      text-decoration: none; letter-spacing: .05em;
      padding-bottom: 1px; border-bottom: 1px solid var(--forest);
      transition: color .2s, border-color .2s;
    }
    .pn-kit-btn:hover { color: var(--terracotta); border-color: var(--terracotta); }

    /* ── 3D Showcase ── */
    .pn-showcase { background: var(--cream); }
    .pn-showcase-inner {
      display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
    }
    @media (max-width: 900px) { .pn-showcase-inner { grid-template-columns: 1fr; gap: 3rem; } }
    .pn-showcase-badges { display: flex; flex-wrap: wrap; gap: .75rem; margin: 2rem 0; }
    .pn-badge {
      background: rgba(26,46,26,.06); border-radius: 100px;
      padding: .4rem 1rem; font-size: .78rem; font-weight: 500;
      color: var(--forest); display: flex; align-items: center; gap: .4rem;
    }
    .pn-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sage); }
    .pn-showcase-card {
      border-radius: 28px; overflow: hidden;
      box-shadow: 0 32px 80px rgba(26,46,26,.2);
      transition: transform .15s ease; transform-style: preserve-3d;
      cursor: default;
    }
    .pn-showcase-img {
      width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block;
    }
    .pn-showcase-caption {
      background: var(--forest); padding: 1.75rem 2rem;
      display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem;
    }
    .pn-showcase-stat-n {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem; color: var(--cream); font-weight: 400;
    }
    .pn-showcase-stat-l { font-size: .72rem; color: rgba(247,243,236,.5); letter-spacing: .06em; text-transform: uppercase; margin-top: .15rem; }

    /* ── Testimonials ── */
    .pn-testimonials { background: var(--forest); }
    .pn-testimonials .pn-section-label { color: var(--fern); }
    .pn-testimonials .pn-section-h2 { color: var(--cream); }
    .pn-testi-card {
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 24px; padding: 2.5rem 2rem;
      display: flex; flex-direction: column; gap: 1.25rem;
      align-items: flex-start;
    }
    .pn-testi-stars { display: flex; gap: .25rem; color: var(--gold); }
    .pn-testi-quote {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.2rem; font-style: italic; line-height: 1.65;
      color: rgba(247,243,236,.85); flex: 1;
    }
    .pn-testi-author { display: flex; align-items: center; gap: .75rem; }
    .pn-testi-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      object-fit: cover; border: 2px solid rgba(138,173,122,.4);
    }
    .pn-testi-name { font-size: .88rem; font-weight: 500; color: var(--cream); }
    .pn-testi-role { font-size: .75rem; color: rgba(247,243,236,.4); }
    .pn-carousel-controls {
      display: flex; justify-content: center; align-items: center; gap: 1rem;
      margin-top: 3rem;
    }
    .pn-carousel-btn {
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
      display: flex; align-items: center; justify-content: center;
      color: var(--cream); cursor: pointer; transition: background .2s;
    }
    .pn-carousel-btn:hover { background: rgba(255,255,255,.15); }
    .pn-carousel-dots { display: flex; gap: .5rem; }
    .pn-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: rgba(255,255,255,.2); transition: all .3s; cursor: pointer;
    }
    .pn-dot.active { background: var(--fern); width: 20px; border-radius: 3px; }

    /* ── Contact ── */
    .pn-contact { background: var(--parchment); }
    .pn-contact-inner {
      display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
    }
    @media (max-width: 900px) { .pn-contact-inner { grid-template-columns: 1fr; gap: 3rem; } }
    .pn-contact-info { display: flex; flex-direction: column; gap: 1.5rem; }
    .pn-contact-item { display: flex; flex-direction: column; gap: .2rem; }
    .pn-contact-item-label { font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: var(--sage); }
    .pn-contact-item-val { font-size: .95rem; color: var(--forest); font-weight: 400; }
    .pn-form {
      background: var(--cream); border-radius: 24px;
      padding: 2.5rem; border: 1px solid rgba(107,143,94,.12);
      box-shadow: 0 8px 40px rgba(26,46,26,.06);
      display: flex; flex-direction: column; gap: 1.25rem;
    }
    .pn-field { display: flex; flex-direction: column; gap: .4rem; }
    .pn-label { font-size: .78rem; font-weight: 500; letter-spacing: .04em; color: var(--forest); }
    .pn-input {
      width: 100%; background: var(--parchment);
      border: 1px solid rgba(107,143,94,.2); border-radius: 10px;
      padding: .7rem 1rem; font-size: .9rem; font-family: 'DM Sans', sans-serif;
      color: var(--charcoal); outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    .pn-input:focus {
      border-color: var(--sage);
      box-shadow: 0 0 0 3px rgba(107,143,94,.12);
    }
    .pn-textarea { resize: none; }
    .pn-submit {
      background: var(--forest); color: var(--cream);
      border: none; border-radius: 100px;
      padding: .85rem 2rem; font-size: .88rem; font-weight: 500;
      font-family: 'DM Sans', sans-serif; letter-spacing: .04em;
      cursor: pointer; transition: background .2s, transform .2s;
    }
    .pn-submit:hover { background: var(--moss); transform: translateY(-1px); }

    /* ── Footer ── */
    .pn-footer {
      background: var(--charcoal); color: rgba(255,255,255,.6);
      padding: 4rem 0 2.5rem;
    }
    .pn-footer-inner {
      max-width: 1280px; margin: 0 auto; padding: 0 2rem;
    }
    .pn-footer-top {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem;
      margin-bottom: 3rem;
    }
    @media (max-width: 900px) { .pn-footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; } }
    @media (max-width: 580px) { .pn-footer-top { grid-template-columns: 1fr; } }
    .pn-footer-brand-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.25rem; color: #fff; margin-bottom: .5rem;
    }
    .pn-footer-brand-p { font-size: .82rem; line-height: 1.65; max-width: 240px; }
    .pn-footer-socials { display: flex; gap: 1rem; margin-top: 1.25rem; }
    .pn-social {
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,.6); text-decoration: none;
      transition: background .2s, color .2s;
    }
    .pn-social:hover { background: var(--terracotta); color: #fff; border-color: var(--terracotta); }
    .pn-footer-col-title {
      font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
      color: rgba(255,255,255,.4); margin-bottom: 1rem;
    }
    .pn-footer-links { list-style: none; display: flex; flex-direction: column; gap: .6rem; }
    .pn-footer-links a {
      font-size: .85rem; color: rgba(255,255,255,.55); text-decoration: none;
      transition: color .2s;
    }
    .pn-footer-links a:hover { color: #fff; }
    .pn-newsletter-input-wrap { display: flex; gap: .5rem; margin-top: .25rem; }
    .pn-nl-input {
      flex: 1; background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.12); border-radius: 100px;
      padding: .55rem 1rem; font-size: .82rem;
      font-family: 'DM Sans', sans-serif; color: #fff; outline: none;
      transition: border-color .2s;
    }
    .pn-nl-input::placeholder { color: rgba(255,255,255,.35); }
    .pn-nl-input:focus { border-color: rgba(138,173,122,.5); }
    .pn-nl-btn {
      background: var(--terracotta); color: #fff; border: none;
      border-radius: 100px; padding: .55rem 1.1rem;
      font-size: .8rem; cursor: pointer; white-space: nowrap;
      font-family: 'DM Sans', sans-serif;
      transition: background .2s;
    }
    .pn-nl-btn:hover { background: #b8603d; }
    .pn-footer-divider { border: none; border-top: 1px solid rgba(255,255,255,.07); margin-bottom: 1.5rem; }
    .pn-footer-bottom {
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .75rem;
      font-size: .78rem;
    }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes scrollPulse {
      0%, 100% { transform: scaleY(1); opacity: .5; }
      50%       { transform: scaleY(.6); opacity: 1; }
    }
    @keyframes leafSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `}</style>
);

/* ─── 3-D Showcase Card ─────────────────────────────────────────────── */
const ShowcaseCard = () => {
  const ref = React.useRef(null);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 18;
    const y = ((e.clientY - r.top)  / r.height - .5) * -18;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="pn-showcase-card"
      style={{ transition: 'transform .18s ease' }}
    >
      <img
        src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&h=600&fit=crop&q=80"
        alt="Indoor plant arrangement"
        className="pn-showcase-img"
      />
      <div className="pn-showcase-caption">
        {[{n:'+42%',l:'More Add-to-Carts'},{n:'3D',l:'Depth Preview'},{n:'100%',l:'Happiness Guaranteed'}].map(s => (
          <div key={s.l}>
            <div className="pn-showcase-stat-n">{s.n}</div>
            <div className="pn-showcase-stat-l">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Testimonials Data ─────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Sara M.', role: 'Interior Designer',
    quote: 'Paradise Nursery completely transformed my apartment. Every plant arrived healthy, lush, and more beautiful than the photos.',
    photo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop',
    stars: 5
  },
  {
    name: 'James K.', role: 'Architect',
    quote: "The team helped me pick low-maintenance plants that actually thrive in my studio's north-facing light. Exceptional guidance.",
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    stars: 5
  },
  {
    name: 'Lena G.', role: 'Plant Enthusiast',
    quote: "Fast delivery, brilliant packaging, and the care cards are genuinely useful. I've ordered three times and every experience is flawless.",
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    stars: 5
  }
];

/* ─── Main Component ────────────────────────────────────────────────── */
const Landing = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [navHidden, setNavHidden] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const lastScrollY = React.useRef(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: false,
  });

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      // hide nav when scrolling DOWN past 80px, show when scrolling UP
      if (y > 80) {
        setNavHidden(y > lastScrollY.current);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveSlide(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    const t = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(t);
    };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) { emblaApi.scrollPrev(); }
  }, [emblaApi]);
  const scrollNext = React.useCallback(() => {
    if (emblaApi) { emblaApi.scrollNext(); }
  }, [emblaApi]);
  const scrollToSlide = React.useCallback((i) => {
    if (emblaApi) { emblaApi.scrollTo(i); }
  }, [emblaApi]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Features', id: 'features' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="pn-root">
      <GlobalStyles />

      {/* ── Navigation ─────────────────────────────── */}
      <header className={`pn-nav${scrolled ? ' scrolled' : ''}${navHidden ? ' nav-hidden' : ''}`}>
        <div className="pn-nav-inner">
          <button onClick={() => scrollTo('hero')} className="pn-logo">
            <div className="pn-logo-icon">
              <Leaf size={18} color="#f7f3ec" />
            </div>
            <span className="pn-logo-text">Paradise Nursery</span>
          </button>

          <nav>
            <ul className="pn-nav-links">
              {navLinks.map(l => (
                <li key={l.id}>
                  <button className="pn-nav-link" onClick={() => scrollTo(l.id)}>
                    {l.label}
                  </button>
                </li>
              ))}
              
            </ul>
          </nav>

          <div className="pn-nav-cta-wrap" style={{ display: 'flex' }}>
            <Link to="/products" className="pn-nav-cta">Shop Now</Link>
          </div>

          <button
            className="pn-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="pn-mobile-menu">
            {navLinks.map(l => (
              <button key={l.id} className="pn-nav-link" onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
            <Link to="/products" className="pn-nav-link shop" onClick={() => setMenuOpen(false)}>
              Shop Plants
            </Link>
          </nav>
        )}
      </header>

      <div className="pn-page-offset">
      {/* ── Hero ───────────────────────────────────── */}
      <section id="hero" className="pn-hero">
        <div className="pn-hero-bg" />
        <div className="pn-hero-overlay" />
        <div className="pn-hero-noise" />

        <div className="pn-hero-content">
          <div className="pn-hero-eyebrow">
            <Leaf size={12} />
            Est. 2018 · Premium Indoor Plants
          </div>
          <h1 className="pn-hero-h1">
            Bring the<br /><em>garden</em> inside
          </h1>
          <p className="pn-hero-sub">Your sanctuary starts with a single leaf.</p>
          <p className="pn-hero-p">
            Expertly curated plants, delivered with care guides and a happiness guarantee.
            Transform any corner into a living, breathing oasis.
          </p>
          <div className="pn-hero-actions">
            <Link to="/products" className="pn-btn-primary">
              Shop Collection <ArrowRight size={16} />
            </Link>
            <button className="pn-btn-ghost" onClick={() => scrollTo('features')}>
              Learn More
            </button>
          </div>

          <div className="pn-hero-stats">
            {[
              {n:'2,400+', l:'Happy Customers'},
              {n:'150+',   l:'Plant Varieties'},
              {n:'98%',    l:'Arrival Rating'},
            ].map(s => (
              <div key={s.l} className="pn-hero-stat">
                <div className="pn-hero-stat-num">{s.n}</div>
                <div className="pn-hero-stat-label">{s.l}</div>
              </div>
            ))}
          </div>

        
        </div>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section id="features" className="pn-section pn-features">
        <div className="pn-container">
          <span className="pn-section-label">Why us</span>
          <h2 className="pn-section-h2" style={{ maxWidth: 500 }}>
            Quality rooted in <em>every</em> step
          </h2>
          <p className="pn-section-sub" style={{ color: 'rgba(247,243,236,.55)' }}>
            From greenhouse to doorstep, we obsess over the details so your plants arrive thriving.
          </p>

          <div className="pn-features-grid">
            {[
              {
                icon: <Heart size={22} />,
                title: 'Hand-Selected Plants',
                desc: 'Every plant is individually inspected for health, vigour, and beauty before it leaves our nursery.'
              },
              {
                icon: <Truck size={22} />,
                title: 'Climate-Safe Delivery',
                desc: 'Insulated packaging and 2-day shipping ensure your plant arrives as fresh as the day it was picked.'
              },
              {
                icon: <ThumbsUp size={22} />,
                title: 'Expert Care Guides',
                desc: 'Personalised care instructions based on your specific plant variety and local climate are included with every order.'
              },
            ].map(f => (
              <article key={f.title} className="pn-feature-card">
                <div className="pn-feature-icon">{f.icon}</div>
                <h3 className="pn-feature-h3">{f.title}</h3>
                <p className="pn-feature-p">{f.desc}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <Link to="/products" className="pn-btn-primary">
              Browse Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Starter Kits ───────────────────────────── */}
      <section className="pn-section pn-kits">
        <div className="pn-container">
          <span className="pn-section-label">Curated bundles</span>
          <h2 className="pn-section-h2">Starter kits for <em>every</em> space</h2>
          <p className="pn-section-sub">
            Not sure where to begin? Pick a bundle matched to your light and lifestyle,
            then make it yours.
          </p>

          <div className="pn-kits-grid">
            {[
              {
                icon: <Home size={20} />,
                title: 'Cozy Corner Kit',
                desc: 'Three compact plants that soften shelves, desks, and bedside tables with minimal fuss.',
                price: 'From $39 · Includes care guide',
                link: 'View cozy picks'
              },
              {
                icon: <SunMedium size={20} />,
                title: 'Sunny Window Bundle',
                desc: 'Bright-light lovers that thrive in south-facing spots and deliver maximum drama.',
                price: 'From $49 · Perfect for south-facing',
                link: 'Explore sunny plants'
              },
              {
                icon: <Droplets size={20} />,
                title: 'Low-Maintenance Trio',
                desc: 'Resilient, forgiving plants that look great even if you occasionally forget to water them.',
                price: 'From $35 · Beginner approved',
                link: 'Shop easy plants'
              },
            ].map(k => (
              <article key={k.title} className="pn-kit-card">
                <div className="pn-kit-icon">{k.icon}</div>
                <h3 className="pn-kit-h3">{k.title}</h3>
                <p className="pn-kit-p">{k.desc}</p>
                <div className="pn-kit-price">{k.price}</div>
                <Link to="/products" className="pn-kit-btn">
                  {k.link} <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase ───────────────────────────────── */}
      <section className="pn-section pn-showcase">
        <div className="pn-container">
          <div className="pn-showcase-inner">
            <div>
              <span className="pn-section-label">The difference</span>
              <h2 className="pn-section-h2">Turn any corner into a <em>green oasis</em></h2>
              <p style={{ fontSize: '.95rem', lineHeight: 1.75, color: '#666', marginBottom: '1.5rem' }}>
                Most customers start with one or two plants and return within the month.
                Start small today and watch your space come alive.
              </p>
              <div className="pn-showcase-badges">
                {['Free shipping over $50','Happiness guarantee','Care cards included','Expert support'].map(b => (
                  <div key={b} className="pn-badge">
                    <span className="pn-badge-dot" />
                    {b}
                  </div>
                ))}
              </div>
              <Link to="/products" className="pn-btn-primary" style={{ background: 'var(--forest)', boxShadow: '0 8px 24px rgba(26,46,26,.25)' }}>
                Shop Best Sellers <ArrowRight size={16} />
              </Link>
            </div>
            <ShowcaseCard />
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────── */}
      <section id="testimonials" className="pn-section pn-testimonials">
        <div className="pn-container">
          <span className="pn-section-label">Kind words</span>
          <h2 className="pn-section-h2">Loved by <em>plant lovers</em></h2>

          <div ref={emblaRef} style={{ overflow: 'hidden', marginTop: '3rem' }}>
            <div style={{ display: 'flex', touchAction: 'pan-y', marginLeft: '-1.5rem' }}>
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  style={{ flex: '0 0 80%', minWidth: 0, paddingLeft: '1.5rem' }}
                >
                  <article className="pn-testi-card">
                    <div className="pn-testi-stars">
                      {Array.from({length: t.stars}).map((_,i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="pn-testi-quote">"{t.quote}"</p>
                    <div className="pn-testi-author">
                      <img src={t.photo} alt={t.name} className="pn-testi-avatar" />
                      <div>
                        <div className="pn-testi-name">{t.name}</div>
                        <div className="pn-testi-role">{t.role}</div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="pn-carousel-controls">
            <button className="pn-carousel-btn" onClick={scrollPrev} aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="pn-carousel-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`pn-dot${i === activeSlide ? ' active' : ''}`}
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="pn-carousel-btn" onClick={scrollNext} aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────── */}
      <section id="contact" className="pn-section pn-contact">
        <div className="pn-container">
          <div className="pn-contact-inner">
            <div>
              <span className="pn-section-label">Get in touch</span>
              <h2 className="pn-section-h2">Let's grow something <em>beautiful</em></h2>
              <p style={{ fontSize: '.95rem', lineHeight: 1.75, color: '#666', marginBottom: '2rem', maxWidth: 400 }}>
                Questions about the right plant for your space? Our team of botanists
                are here to help you find your perfect green companion.
              </p>
              <div className="pn-contact-info">
                <div className="pn-contact-item">
                  <span className="pn-contact-item-label">Email</span>
                  <span className="pn-contact-item-val">support@paradisenursery.com</span>
                </div>
                <div className="pn-contact-item">
                  <span className="pn-contact-item-label">Phone</span>
                  <span className="pn-contact-item-val">+1 (555) 123-4567</span>
                </div>
                <div className="pn-contact-item">
                  <span className="pn-contact-item-label">Hours</span>
                  <span className="pn-contact-item-val">Mon–Fri, 9am–6pm EST</span>
                </div>
              </div>
            </div>

            <form className="pn-form" onSubmit={e => e.preventDefault()}>
              <div className="pn-field">
                <label className="pn-label" htmlFor="pn-name">Name</label>
                <input id="pn-name" type="text" placeholder="Your name" className="pn-input" />
              </div>
              <div className="pn-field">
                <label className="pn-label" htmlFor="pn-email">Email</label>
                <input id="pn-email" type="email" placeholder="you@example.com" className="pn-input" />
              </div>
              <div className="pn-field">
                <label className="pn-label" htmlFor="pn-msg">Message</label>
                <textarea id="pn-msg" rows={4} placeholder="Tell us what you have in mind…" className="pn-input pn-textarea" />
              </div>
              <button type="submit" className="pn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="pn-footer">
        <div className="pn-footer-inner">
          <div className="pn-footer-top">
            <div>
              <div className="pn-footer-brand-name">Paradise Nursery</div>
              <p className="pn-footer-brand-p">
                Bringing nature home, one plant at a time. Premium indoor plants
                delivered to your door with expert care.
              </p>
              <div className="pn-footer-socials">
                {[
                  { href: 'https://instagram.com', icon: <Instagram size={15} />, label: 'Instagram' },
                  { href: 'https://facebook.com',  icon: <Facebook  size={15} />, label: 'Facebook'  },
                  { href: 'https://twitter.com',   icon: <Twitter   size={15} />, label: 'Twitter'   },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label} className="pn-social">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="pn-footer-col-title">Shop</p>
              <ul className="pn-footer-links">
                <li><Link to="/products">All Plants</Link></li>
                <li><Link to="/products">Starter Kits</Link></li>
                <li><Link to="/products">Best Sellers</Link></li>
                <li><Link to="/products">New Arrivals</Link></li>
              </ul>
            </div>

            <div>
              <p className="pn-footer-col-title">Help</p>
              <ul className="pn-footer-links">
                <li><a href="#contact" onClick={() => scrollTo('contact')}>Contact Us</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#shipping">Shipping Policy</a></li>
                <li><a href="#returns">Returns</a></li>
              </ul>
            </div>

            <div>
              <p className="pn-footer-col-title">Newsletter</p>
              <p style={{ fontSize: '.82rem', marginBottom: '.75rem', lineHeight: 1.6 }}>
                Plant care tips, new arrivals, and exclusive offers.
              </p>
              <div className="pn-newsletter-input-wrap">
                <input type="email" placeholder="your@email.com" className="pn-nl-input" />
                <button className="pn-nl-btn">Join</button>
              </div>
            </div>
          </div>

          <hr className="pn-footer-divider" />
          <div className="pn-footer-bottom">
            <span>© 2024 Paradise Nursery. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#privacy" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none', fontSize: '.78rem' }}>Privacy</a>
              <a href="#terms"   style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'none', fontSize: '.78rem' }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
      </div>{/* end pn-page-offset */}
    </div>
  );
};

export default Landing;