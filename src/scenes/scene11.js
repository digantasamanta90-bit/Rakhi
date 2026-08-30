import { content } from '../content/content.js';

export class Scene11Gifts {
  constructor({ manager, audio, particles, achievements }) {
    this.manager = manager;
    this.audio = audio;
    this.particles = particles;
    this.achievements = achievements;
    this.tl = null;
  }

  enter(container) {
    return new Promise((resolve) => {
      const c = content.scene11;
      const t = c.timing || {};
      const assets = c.assets || {};
      const caseData = c.gift1 || {};
      const gift2Data = c.gift2 || {};
      const narratives = c.narratives || [
        "I still wanted to give these to you myself.",
        "So here they are."
      ];

      // 1. Storefronts for Continuous Parallax Stream (Layer 2)
      const shopsData = c.marketShops || [
        { name: 'SWEET BAZAAR 🍬', awning: 'repeating-linear-gradient(90deg, #dc2626 0, #dc2626 12px, #ffffff 12px, #ffffff 24px)', color: '#7c2d12', signColor: '#fef08a' },
        { name: 'GIFT STATION 🎁', awning: 'repeating-linear-gradient(90deg, #fbbf24 0, #fbbf24 12px, #1e293b 12px, #1e293b 24px)', color: '#1e293b', signColor: '#fbbf24' },
        { name: 'BAKERY & CHAI ☕', awning: 'repeating-linear-gradient(90deg, #15803d 0, #15803d 12px, #fef08a 12px, #fef08a 24px)', color: '#78350f', signColor: '#ffffff' },
        { name: 'FLOWER CORNER 🌸', awning: 'repeating-linear-gradient(90deg, #f43f5e 0, #f43f5e 12px, #ffffff 12px, #ffffff 24px)', color: '#451a03', signColor: '#fecdd3' },
        { name: 'ROYAL CHOCOLATES 🍫', awning: 'repeating-linear-gradient(90deg, #d97706 0, #d97706 12px, #451a03 12px, #451a03 24px)', color: '#1e1b4b', signColor: '#fbbf24' },
        { name: 'PERFUMERY 💐', awning: 'repeating-linear-gradient(90deg, #0284c7 0, #0284c7 12px, #ffffff 12px, #ffffff 24px)', color: '#0f172a', signColor: '#bae6fd' }
      ];

      let shopsHTML = shopsData.map((shop, i) => `
        <div class="market-shop-card" style="flex-shrink:0;width:140px;height:165px;background:${shop.color};border:1.5px solid rgba(255,255,255,0.15);margin-right:20px;border-radius:6px;position:relative;display:flex;flex-direction:column;box-shadow:0 8px 24px rgba(0,0,0,0.6);align-self:flex-end;">
          <!-- Striped Awning -->
          <div style="width:100%;height:32px;background:${shop.awning};border-radius:4px 4px 0 0;box-shadow:0 4px 10px rgba(0,0,0,0.4);position:relative;">
            <div style="position:absolute;bottom:-6px;left:0;right:0;height:6px;background:inherit;clip-path:polygon(0 0, 100% 0, 95% 100%, 85% 0, 75% 100%, 65% 0, 55% 100%, 45% 0, 35% 100%, 25% 0, 15% 100%, 5% 0, 0 100%);"></div>
          </div>
          <!-- Shop Signboard -->
          <div style="margin:10px auto 4px auto;padding:3px 8px;background:rgba(0,0,0,0.7);border-radius:4px;border:1px solid rgba(255,255,255,0.2);color:${shop.signColor};font-family:var(--font-mono);font-size:0.65rem;font-weight:700;letter-spacing:0.06em;text-align:center;">
            ${shop.name}
          </div>
          <!-- Storefront Display Window -->
          <div style="flex:1;margin:4px 8px 8px 8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#cbd5e1;font-size:1.2rem;">
            ${i % 2 === 0 ? '✨' : '🛍️'}
          </div>
        </div>
      `).join('');

      const kitkatImgPath = assets.kitkat || 'assets/gifts/kitkat.png';
      const bellavitaImgPath = assets.bellavita || 'assets/gifts/bellavita.png';

      container.innerHTML = `
        <div class="market-street-env" id="s11-viewport" style="position:relative;width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%, #451a03 0%, #1e293b 50%, #070c18 100%);">
          
          <!-- Morning Sunbeam Atmosphere -->
          <div class="golden-hour-beam" style="opacity:0.35;filter:blur(30px);"></div>

          <!-- Layer 3: Overhead Electrical Wires & Street Poles (Foreground Parallax) -->
          <div id="mkt-overhead-wires" style="position:absolute;top:10%;left:0;width:300%;height:50px;pointer-events:none;z-index:5;will-change:transform;">
            <svg viewBox="0 0 1200 50" preserveAspectRatio="none" style="width:100%;height:100%;">
              <path d="M 0 10 Q 300 35 600 15 T 1200 20" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none"/>
              <path d="M 0 25 Q 300 45 600 30 T 1200 35" stroke="rgba(255,255,255,0.18)" stroke-width="1" fill="none"/>
            </svg>
          </div>

          <!-- Layer 2: Living Street Parallax Stream (Shops pass the camera) -->
          <div id="mkt-shops-stream" style="position:absolute;bottom:8%;left:0;width:350%;height:220px;display:flex;align-items:flex-end;pointer-events:none;z-index:4;will-change:transform;opacity:0.65;">
            ${shopsHTML}
          </div>

          <!-- Section A: Main Focal Gift Stage Container (Center Spotlight) -->
          <div id="g-main-stage" style="position:relative;width:100%;max-width:360px;height:440px;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:20;">
            
            <!-- Shot 1: KitKat Hero Object (Real PNG Asset) -->
            <div id="g-kitkat-view" style="position:absolute;display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(-40px) scale(0.9);z-index:20;cursor:pointer;">
              <div style="position:relative;width:210px;height:140px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
                <img src="${kitkatImgPath}" alt="${caseData.title || 'KitKat Rich'}" id="g-kitkat-img" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 16px 36px rgba(0,0,0,0.85));" />
              </div>
              <div class="gift-label" style="font-size:1.15rem;color:#f8fafc;font-family:var(--font-serif);font-weight:700;letter-spacing:0.02em;text-shadow:0 2px 10px rgba(0,0,0,0.8);">${caseData.title}</div>
              <div class="text-whisper" style="font-size:0.7rem;color:var(--cinema-text-muted);margin-top:4px;letter-spacing:0.14em;">${caseData.subtitle.toUpperCase()}</div>
            </div>

            <!-- Shot 2: Case File 04 Investigation Board (Dossier) -->
            <div id="g-casefile-board" style="position:absolute;width:315px;background:rgba(15,23,42,0.96);border:1px solid rgba(255,255,255,0.18);border-radius:14px;padding:18px 16px;box-shadow:0 18px 50px rgba(0,0,0,0.9);opacity:0;transform:scale(0.85);z-index:25;pointer-events:none;backdrop-filter:blur(12px);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px dashed rgba(255,255,255,0.2);padding-bottom:6px;">
                <span class="text-timestamp-sm" style="color:#f8fafc;font-size:0.7rem;font-weight:700;letter-spacing:0.06em;">${caseData.reportTitle}</span>
                <span class="text-whisper" style="font-size:0.62rem;color:#ef4444;font-weight:700;">${caseData.classifiedTag || 'CLASSIFIED'}</span>
              </div>
              
              <div style="font-size:0.8rem;color:#cbd5e1;margin-bottom:10px;line-height:1.4;font-style:italic;">
                ${caseData.subtext || '"Selecting this was not as simple as it should\'ve been."'}
              </div>

              <!-- Candidate Evaluations -->
              <div style="display:flex;flex-direction:column;gap:6px;font-size:0.76rem;">
                <div id="g-cand-1" style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.06);border-radius:4px;opacity:0;">
                  <span style="color:#cbd5e1;">${caseData.candidates[0]}</span>
                </div>
                <div id="g-cand-2" style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.06);border-radius:4px;opacity:0;">
                  <span style="color:#cbd5e1;">${caseData.candidates[1]}</span>
                </div>
                <div id="g-cand-3" style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(255,255,255,0.12);border-radius:4px;border:1px solid rgba(255,255,255,0.3);opacity:0;">
                  <span style="color:#ffffff;font-weight:700;">${caseData.candidates[2]}</span>
                </div>
              </div>

              <div id="g-case-footer" style="margin-top:10px;padding-top:6px;border-top:1px dashed rgba(255,255,255,0.2);font-size:0.7rem;color:#94a3b8;display:flex;justify-content:space-between;opacity:0;">
                <span>${caseData.footerNote}</span>
              </div>
            </div>

            <!-- Shot 3: Bellavita Fragrance Object (Real PNG Asset) -->
            <div id="g-bellavita-view" style="position:absolute;display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(40px) scale(0.9);z-index:20;cursor:pointer;">
              <div style="position:relative;width:210px;height:145px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;">
                <img src="${bellavitaImgPath}" alt="${gift2Data.title || 'Bellavita'}" id="g-bellavita-img" style="width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 16px 36px rgba(0,0,0,0.85));" />
              </div>
              <div class="gift-label" style="font-size:1.15rem;color:#f8fafc;font-family:var(--font-serif);font-weight:700;letter-spacing:0.02em;text-shadow:0 2px 10px rgba(0,0,0,0.8);">${gift2Data.title}</div>
              <div class="text-whisper" style="font-size:0.7rem;color:var(--cinema-text-muted);margin-top:4px;letter-spacing:0.14em;">${gift2Data.subtitle.toUpperCase()}</div>
            </div>

            <!-- Narrative Lines (Bottom) -->
            <div id="g-narrative-zone" style="position:absolute;bottom:15px;text-align:center;padding:0 20px;z-index:25;pointer-events:none;">
              <p id="g-line-1" class="text-dialogue" style="opacity:0;font-size:clamp(1.05rem,3.6vw,1.22rem);color:#f8fafc;margin:0;font-style:italic;text-shadow:0 2px 12px rgba(0,0,0,0.9);">
                "${narratives[0]}"
              </p>
              <p id="g-line-2" class="text-emotional" style="opacity:0;font-size:clamp(1.1rem,3.8vw,1.3rem);color:#f8fafc;margin:4px 0 0 0;font-style:italic;text-shadow:0 0 16px rgba(255,255,255,0.4);">
                "${narratives[1]}"
              </p>
            </div>
          </div>
        </div>
      `;

      const shopsStream = container.querySelector('#mkt-shops-stream');
      const wires = container.querySelector('#mkt-overhead-wires');
      const kitkatView = container.querySelector('#g-kitkat-view');
      const kitkatImg = container.querySelector('#g-kitkat-img');
      const casefileBoard = container.querySelector('#g-casefile-board');
      const cand1 = container.querySelector('#g-cand-1');
      const cand2 = container.querySelector('#g-cand-2');
      const cand3 = container.querySelector('#g-cand-3');
      const caseFooter = container.querySelector('#g-case-footer');
      const bellavitaView = container.querySelector('#g-bellavita-view');
      const bellavitaImg = container.querySelector('#g-bellavita-img');
      const line1 = container.querySelector('#g-line-1');
      const line2 = container.querySelector('#g-line-2');
      const mainStage = container.querySelector('#g-main-stage');
      const viewport = container.querySelector('#s11-viewport');

      const parDur = t.parallaxDuration ?? 5.6;
      const kkHold = t.kitkatHeroHold ?? 1.1;
      const caseHold = t.casefileReadHold ?? 1.0;
      const bvHold = t.bellavitaHeroHold ?? 1.1;

      this.tl = gsap.timeline();

      this.tl
        // 1. Living Market Street Parallax Movement
        .to(shopsStream, { x: '-60%', duration: parDur, ease: 'none' }, 0)
        .to(wires, { x: '-50%', duration: 3.5, ease: 'none', repeat: 1 }, 0)

        // 2. KitKat Hero Entrance - Full Screen Presence
        .to(kitkatView, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.2)' }, 0.1)
        .to(line1, { opacity: 1, duration: 0.4 }, 0.25)
        .to({}, { duration: kkHold }, 0.65) // Dedicated hero moment to view KitKat

        // 3. Case File 04 Investigation Reveal
        .to(kitkatView, { scale: 0.75, y: -65, opacity: 0.2, duration: 0.35, ease: 'power2.inOut' }, 0.65 + kkHold)
        .to(casefileBoard, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.2)' }, 0.75 + kkHold)
        .to(cand1, { opacity: 1, x: 0, duration: 0.2 }, 1.05 + kkHold)
        .to(cand2, { opacity: 1, x: 0, duration: 0.2 }, 1.25 + kkHold)
        .to(cand3, { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(1.4)' }, 1.45 + kkHold)
        .to(caseFooter, { opacity: 1, duration: 0.3 }, 1.75 + kkHold)
        .to({}, { duration: caseHold }, 2.05 + kkHold) // Investigation reading pause

        // 4. Case File closes -> Bellavita Collection emerges
        .to(casefileBoard, { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in' }, 2.95 + kkHold + caseHold)
        .to(kitkatView, { opacity: 0, duration: 0.2 }, 2.95 + kkHold + caseHold)
        .to(bellavitaView, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }, 3.15 + kkHold + caseHold)
        .to(line1, { opacity: 0, duration: 0.2 }, 3.15 + kkHold + caseHold)
        .to(line2, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 3.35 + kkHold + caseHold)
        .to({}, { duration: bvHold }, 3.8 + kkHold + caseHold) // Bellavita hero moment

        // 5. Seamless Transition directly into Sibling Zone (Scene 12)
        .to(mainStage, { opacity: 0, scale: 0.96, y: -10, duration: 0.4, ease: 'power2.inOut' }, parDur - 0.4)
        .to(viewport, { opacity: 0, duration: 0.4, ease: 'power2.in' }, parDur - 0.4)
        .call(() => {
          this.manager.next();
          resolve();
        }, null, parDur);

      // Tactile physical taps on gift objects
      if (kitkatView) {
        kitkatView.addEventListener('click', (e) => {
          e.stopPropagation();
          gsap.fromTo(kitkatImg, { scale: 1.15 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      }

      if (bellavitaView) {
        bellavitaView.addEventListener('click', (e) => {
          e.stopPropagation();
          gsap.fromTo(bellavitaImg, { scale: 1.15 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      }
    });
  }

  exit() {
    if (this.tl) this.tl.kill();
    return Promise.resolve();
  }
}
