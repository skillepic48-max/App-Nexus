(function() {
  "use strict";

  /* =========================
      DOM ELEMENTS
      ========================= */
  const dom = {
    views: {
      home: document.getElementById('home-view'),
      product: document.getElementById('product-page'),
      checkout: document.getElementById('checkout-view')
    },
    search: {
        input: document.getElementById('product-search'),
        container: document.getElementById('search-container'),
        clearBtn: document.getElementById('clear-search-btn')
    },
    cart: {
      bar: document.getElementById('cart-bar'),
      list: document.getElementById('cart-items'),
      total: document.getElementById('cart-total'),
      count: document.getElementById('cart-count'),
      toggleBtn: document.getElementById('cart-toggle-btn'),
    },
    explain: {
      overlay: document.getElementById('explain-overlay'),
      text: document.getElementById('explain-text'),
      okBtn: document.getElementById('explain-ok-btn'),
    },
    whyBuy: {
        overlay: document.getElementById('why-buy-overlay'),
        backBtn: document.getElementById('why-buy-back-btn'),
    },
    checkout: {
      noteStep: document.getElementById('note-step'),
      receiptStep: document.getElementById('receipt-step'),
      noteText: document.getElementById('note-text'),
      noteOkBtn: document.getElementById('note-ok-btn'),
      copyReceiptBtn: document.getElementById('copy-receipt-btn'),
      nextBtn: document.getElementById('next-btn'),
      receiptText: document.getElementById('receipt-text'),
      receipts: {
        single: document.getElementById('receipt-single'),
        multi: document.getElementById('receipt-multi'),
        r1_item: document.getElementById('r1-item'),
        r1_plan: document.getElementById('r1-plan'),
        r1_duration: document.getElementById('r1-duration'),
        r1_price: document.getElementById('r1-price'),
        rm_itemList: document.getElementById('rm-item-list'),
        rm_total: document.getElementById('rm-total'),
      }
    }
  };

  /* =========================
      STARFIELD BACKGROUND
      ========================= */
  (function starfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.min(350, Math.floor((W * H) / 8000));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + .4, s: Math.random() * .6 + .2, a: Math.random() * .6 + .4 }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.y += s.s;
        s.x += s.s * .15;
        if (s.y > H) s.y = -2;
        if (s.x > W) s.x = -2;
        const tw = s.a + Math.sin((s.x + s.y) * .01) * .25;
        ctx.globalAlpha = Math.max(.15, Math.min(1, tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#cfe9ff';
        ctx.fill();
        ctx.globalAlpha = tw * .25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = '#7fbfff';
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize();
    draw();
  })();

  /* =========================
      PRODUCT DATA & ASSETS
      ========================= */
  const imageFor = { 
    "CapCut": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-C695-D25-1.png", 
    "AlightMotion": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9675-E38-1.png", 
    "Wink": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6373-C12.png", 
    "Meitu": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9460-A69.png", 
    "PicsArt": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-C2-C2-B1-B.png", 
    "Canva": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B7-E9-D62.png", 
    "VSCO": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A7-EE340.png", 
    "PhotoRoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-9-A11032.png", 
    "Remini": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-CBAFAF8.png", 
    "NordVpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-1-FBC099.png", 
    "Express Vpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-7-D8-AC42-1.png", 
    "Surfshark Vpn": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B51-A628.png", 
    "Windows License": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-041-CB23.png", 
    "Microsoft 365": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A872-E8-C.png", 
    "Netflix": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-0-F69823.png", 
    "Disney+": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-FEB8336.png", 
    "HBO Max": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-E7812-FA.png", 
    "Prime Video": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-8750-DEF.png", 
    "Spotify": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-D73314-D.png", 
    "Apple Music": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-53-CD4-A0.png", 
    "Qobuz": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-953E931.png",
    "Google Drive": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-1-A43-DD6.png", 
    "Google One": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-009-BD4-E.png", 
    "iCloud": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-30-EDAEA.png", 
    "ChatGPT Plus": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-6-CB3-A91-1.png", 
    "Gemini Veo 3": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-906-D5-F0.png", 
    "Grammarly AI": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-087-AC47.png", 
    "Zoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-5270010.png", 
    "YouTube": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-DCD6-D5.png", 
    "Tinder": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-DCDE0-B9.png", 
    "Telegram": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-A162-FC1.png", 
    "Discord": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-D060367.png",
    "Perplexity Ai": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-F59-EE5-A.png", 
    "GAGAOOLALA": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B18851-D.png", 
    "BSTATION": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-631-CC84.png", 
    "INSHOT": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-10-16-13-54-58-884.png", 
    "Duolingo Super": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-E560-B70.png", 
    "SCRIBD": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-2-FA4502.png", 
    "WPS Office": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-49DAE75.png",
    "TradingView": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-02-36-751.png",
    "TeraBox": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-11-10-18-01-52-861.png",
    "PlaySafeCard": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-478-B983.png",
    "TikTok Official": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B93-FC6-C.png",
    "TikTok Non Official": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-B93-FC6-C.png",
    "Telegram Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-ED17968.png",
    "YouTube Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-87-A43-F1.png",
    "Facebook Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-10387-D3.png",
    "Instagram Boosting": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-01-CA830.png",
    "Custom Website Service": "https://ik.imagekit.io/dkdlgynlu/Picsart-25-10-26-17-49-23-686.png",
    "LightRoom": "https://ik.imagekit.io/dkdlgynlu/New-Project-52-75A8C0F.png",
    "Wattpad": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_DF63C42_.png",
    "Photoshop": "https://ik.imagekit.io/dkdlgynlu/Photoshop%20_83C7623_.png",
    "Adobe Creative Cloud": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_3DECB4E_.png?updatedAt=1766482936190",
    "HMA VPN": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A5A675F_.png?updatedAt=1766482936062",
    "Crunchyroll": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_A70E5F8_.png",
    "Telegram Star": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_AEF396E_.png",
    "Google Play Gift Card": "https://ik.imagekit.io/dkdlgynlu/Wattpad%20_E847DAF_.png?updatedAt=1767023159606",
    // REGION FLAGS
    "Google Play Turkey": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_C5A9149_.png",
    "Google Play Indonesia": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_9D4756B_.png",
    "Google Play Brazil": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_294445A_.png",
    "Google Play South Korea": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_3A8F735_.png",
    "Google Play India": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_1A15120_.png",
    "Google Play Australia": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_9B033CA_.png",
    "Google Play Germany": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_1AEDA1C_.png",
    "Google Play France": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_8426624_.png",
    "Google Play Italy": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_21CBE50_.png",
    "Google Play Switzerland": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_9A39E21_.png",
    "Google Play Canada": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_E5C533F_.png",
    "Google Play UAE": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_3833C90_.png",
    "Google Play Poland": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_CAAF62D_.png?updatedAt=1767116441268",
    "Google Play Japan": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_42752FB_.png",
    "Google Play US": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_3BDD96E_.png",
    "Google Play UK": "https://ik.imagekit.io/dkdlgynlu/New%20Project%207%20_BD37C1B_.png"
  };

  const regionalProducts = {
      "Google Play Gift Card": [
          { name: "Google Play Turkey", img: imageFor["Google Play Turkey"] },
          { name: "Google Play Indonesia", img: imageFor["Google Play Indonesia"] },
          { name: "Google Play Brazil", img: imageFor["Google Play Brazil"] },
          { name: "Google Play South Korea", img: imageFor["Google Play South Korea"] },
          { name: "Google Play India", img: imageFor["Google Play India"] },
          { name: "Google Play Australia", img: imageFor["Google Play Australia"] },
          { name: "Google Play Germany", img: imageFor["Google Play Germany"] },
          { name: "Google Play France", img: imageFor["Google Play France"] },
          { name: "Google Play Italy", img: imageFor["Google Play Italy"] },
          { name: "Google Play Switzerland", img: imageFor["Google Play Switzerland"] },
          { name: "Google Play Canada", img: imageFor["Google Play Canada"] },
          { name: "Google Play UAE", img: imageFor["Google Play UAE"] },
          { name: "Google Play Poland", img: imageFor["Google Play Poland"] },
          { name: "Google Play US", img: imageFor["Google Play US"] },
          { name: "Google Play UK", img: imageFor["Google Play UK"] },
          { name: "Google Play Japan", img: imageFor["Google Play Japan"] }
      ]
  };

  const customConfigs = {
    "Google Play US": { min: 5, max: 200, rate: 6000, curr: "$" },
    "Google Play UK": { min: 1, max: 500, rate: 7800, curr: "£" },
    "Google Play Australia": { min: 1, max: 500, rate: 7200, curr: "A$" },
    "Google Play Germany": { min: 1, max: 500, rate: 7200, curr: "€" },
    "Google Play France": { min: 1, max: 500, rate: 7200, curr: "€" },
    "Google Play Italy": { min: 1, max: 500, rate: 7200, curr: "€" },
    "Google Play Switzerland": { min: 1, max: 1000, rate: 7800, curr: "CHF" },
    "Google Play UAE": { min: 5, max: 1000, rate: 1800, curr: "AED" }
  };

  const productData = { 
    "CapCut": { 
      Share: [{ duration: "1 Month", price: "8,000 Kyats" }], 
      Private: [{ duration: "7 Days", price: "4,000 Kyats" }, { duration: "1 Month", price: "13,000 Kyats" }],
      "Private Own Mail": [{ duration: "7 Days", price: "6,000 Kyats" }, { duration: "1 Month", price: "17,000 Kyats" }]
    }, 
    "AlightMotion": { 
        Share: [{ duration: "9 Months", price: "3,500 Kyats" }, { duration: "1 Year", price: "5,000 Kyats" }], 
        Private: [{ duration: "9 Months", price: "5,500 Kyats" }, { duration: "1 Year", price: "7,000 Kyats" }], 
        "Private (Own Mail)": [{ duration: "9 Months", price: "7,500 Kyats" }, { duration: "1 Year", price: "9,000 Kyats" }] 
    }, 
    "Wink": { 
        "Share": [{ "duration": "1 Month", "price": "9,000 Kyats" }, { "duration": "1 Year", "price": "70,000 Kyats" }], 
        "Private": [{ "duration": "1 Week", "price": "5,000 Kyats" }, { "duration": "1 Month", "price": "23,000 Kyats" }],
        "Private (Own Mail)": [{ "duration": "1 Month", "price": "25,000 Kyats" }]
    }, 
    "Meitu": { 
        "Private": [{ duration: "1 Week", price: "5,000 Kyats" }, { duration: "20 Days", price: "10,000 Kyats" }], 
        "Share": [{ duration: "20 Days", price: "6,500 Kyats" }] 
    }, 
    "PicsArt": { "Share": [{ duration: "1 Month", price: "5,000 Kyats" }], "Private": [{ duration: "1 Month", price: "8,000 Kyats" }] }, 
    "Canva": { 
      "Pro Share": [{ duration: "1 Month", price: "2,500 Kyats" }], 
      "Educational(Invite)": [{ duration: "Lifetime", price: "5,000 Kyats" }],
      "Pro Private": [{ duration: "1 Month", price: "7,000 Kyats" }, { duration: "3 Months", price: "20,000 Kyats" }] 
    }, 
    "PhotoRoom": { Share: [{ duration: "1 Year", price: "8,000 Kyats" }] }, 
    "VSCO": { Share: [{ duration: "1 Year", price: "8,500 Kyats" }] }, 
    "Remini": { 
      Share: [{ duration: "1 Month (Web)", price: "5,000 Kyats" }, { duration: "1 Year (APK Lite)", price: "18,000 Kyats" }, { duration: "1 Year (APK Pro)", price: "24,000 Kyats" }], 
      Private: [{ duration: "1 Month (Web)", price: "8,500 Kyats" }]
    }, 
    "Express Vpn": { 
      Share: [{ duration: "1 Month", price: "3,000 Kyats" }, { duration: "PC / Laptop (1 Month)", price: "4,500 Kyats" }], 
      Private: [{ duration: "1 Month", price: "12,000 Kyats" }] 
    }, 
    "NordVpn": { Share: [{ duration: "1 Year", price: "30,000 Kyats" }], Private: [{ duration: "3 Months", price: "26,000 Kyats" }] }, 
    "Surfshark Vpn": { 
        Share: [{ duration: "1 Month", price: "8,500 Kyats" }, { duration: "2 Months", "price": "11,000 Kyats" }], 
        Private: [{ duration: "2 Months", "price": "29,000 Kyats" }] 
    }, 
    "Windows License": { Private: [{ duration: "Windows 10 Pro", price: "20,000 Kyats" }, { duration: "Windows 11 Pro", price: "21,000 Kyats" }] }, 
    "Microsoft 365": { "Individual": [{ duration: "1 Month", price: "Out of stock" }], "Invite with email": [{ duration: "1 Month", price: "8,000 Kyats" }], "Family Head(Can Invite 5 email)": [{ duration: "1 Month", price: "16,000 Kyats" }] }, 
    "Netflix": { 
      "1 Profile": [{ duration: "(Semiprivate 2 devices 1Month)", price: "16,500 Kyats" }], 
      "Whole Account": [{ duration: "5 Profiles (1 Month)", price: "60,000 Kyats" }] 
    }, 
    "Disney+": { 
        "Plan Basic": [{ duration: "Sharing 6U (Limited Screen)", price: "Out of stock" }], 
        "Plan Premium": [{ duration: "Sharing 6U (Limited Screen)", price: "Out of stock" }, { duration: "Sharing 3U (No Limit)", price: "Out of stock" }]
    }, 
    "HBO Max": { 
        "HBO MAX (ULTIMATE) 1 Month": [{ duration: "1P 2U", price: "9,000 Kyats" }, { duration: "Semiprivate", price: "16,000 Kyats" }],
        "Private Whole Account (1 Month)": [{ duration: "5 Profile", price: "51,000 Kyats" }]
    }, 
    "Prime Video": { Share: [{ duration: "1 Month", price: "6,900 Kyats" }], Private: [{ duration: "1 Month", price: "13,500 Kyats" }] }, 
    "Spotify": { "Individual Plan(Private)": [{ "duration": "3 Months", "price": "35,000 Kyats" }] }, 
    "Apple Music": { "Individual Plan": [{ "duration": "1 Month (Can renew)", "price": "7,000 Kyats" }] },
    "Qobuz": { "Individual Plan": [{ "duration": "1 Month", "price": "12,000 Kyats" }] },
    "Google Drive": { Private: [{ duration: "Lifetime (1000GB)", price: "39,000 Kyats" }] }, 
    "iCloud": { Share: [{ duration: "Gift Card — 1 Month (50GB)", price: "Out of stock" }, { duration: "Invite Email — 1 Month (100GB)", price: "Out of stock" }] }, 
    "Google One": { Private: [{ duration: "1 Year (2000GB + Veo3 Gemini AI)", price: "29,000 Kyats" }] }, 
    "TeraBox": { "Sharing": [{ duration: "1 Year (2TB)", price: "21,000 Kyats" }] },
    "ChatGPT Plus": { 
        "Personal Plus (Private)": [{ duration: "1 Month", price: "18,000 Kyats" }],
        "Business - Invite Own Email": [{ duration: "1 Month", price: "15,000 Kyats" }],
        "Business Plus Own": [{ duration: "1 Month", price: "25,000 Kyats" }],
        "Business Plus Own(Full Warranty)": [{ duration: "1 Month", price: "29,900 Kyats" }]
    },
    "Gemini Veo 3": { 
        "Private(Can Invite 5 Email)": [{ duration: "1 Month (+2000GB storage)", price: "12,500 Kyats" }, { duration: "1 Year (+2000GB storage)", price: "27,000 Kyats" }]
    }, 
    "Grammarly AI": { Share: [{ duration: "1 Month", price: "6,500 Kyats" }] }, 
    "Zoom": { "Private": [{ "duration": "14 Days", "price": "6,000 Kyats" }, { "duration": "1 Month", "price": "10,599 Kyats" }] }, 
    "YouTube": { "Private": [{ "duration": "1 Month", "price": "7,000 Kyats" }, { "duration": "3 Months", "price": "19,000 Kyats" }] }, 
    "Tinder": { "Tinder Plus Share": [{ "duration": "6 Months", "price": "Out of stock" }] }, 
    "Telegram": { 
      "Login": [{ "duration": "1 Month", "price": "24,000 Kyats" }, { "duration": "1 Year", "price": "121,000 Kyats" }], 
      "Gift Plan": [{ "duration": "3 Months", "price": "62,500 Kyats" }, { "duration": "6 Months", "price": "86,500 Kyats" }, { "duration": "12 Months", "price": "158,000 Kyats" }], 
      "Link Plan": [{ "duration": "3 Months", "price": "57,500 Kyats" }, { "duration": "6 Months", "price": "78,500 Kyats" }, { "duration": "12 Months", "price": "137,000 Kyats" }] 
    }, 
    "Discord": { "Nitro Basic (Key)": [{ "duration": "3 Months", "price": "38,500 Kyats" }] },
    "Perplexity Ai": { 
        "Share": [{ duration: "1 Month", price: "12,000 Kyats" }], 
        "Private": [{ duration: "1 Month", price: "22,000 Kyats" }], 
        "OwnMail Private": [{ duration: "1 Month", price: "24,000 Kyats" }] 
    }, 
    "GAGAOOLALA": { "Private": [{ duration: "1 Month", price: "7,000 Kyats" }] }, 
    "BSTATION": { "Private": [{ duration: "1 Month", price: "19,000 Kyats" }] }, 
    "INSHOT": { "Lifetime Premium": [{ duration: "Lifetime", price: "18,000 Kyats" }] }, 
    "Duolingo Super": { 
        "Family Head(Can Invite 5 email)": [{ duration: "14 Days", price: "7,500 Kyats" }, { duration: "1 Month", price: "14,000 Kyats" }],
        "Invite Private": [{ duration: "14 Days", price: "3,800 Kyats" }, { duration: "1 Month", price: "7,000 Kyats" }]
    }, 
    "SCRIBD": { "Private": [{ duration: "2 Months", price: "8,500 Kyats" }] },
    "WPS Office": { "Sharing Pro": [{ duration: "1 Month", price: "10,000 Kyats" }, { duration: "1 Year", price: "39,500 Kyats" }] },
    "TradingView": { "Private": [{ duration: "1 Month", price: "33,000 Kyats" }] },
    "PlaySafeCard": { "Voucher": [{ duration: "1 Card", price: "5,000 Kyats" }] }, 
    "TikTok Official": { "Login method": [{ "duration": "100 Coin", "price": "5,300 Kyats" }] },
    "TikTok Non Official": {
      "Views (NoDrop)": [{ "duration": "10,000 Views", "price": "1,500 Kyats" }, { "duration": "100,000 Views", "price": "7,500 Kyats" }, { "duration": "1,000,000 Views", "price": "25,000 Kyats" }],
      "Likes (NoDrop)": [{ "duration": "1,000 Likes", "price": "3,000 Kyats" }, { "duration": "10,000 Likes", "price": "16,500 Kyats" }, { "duration": "100,000 Likes", "price": "120,000 Kyats" }],
      "Package Plan": [{ "duration": "100k Views + 10k Likes", "price": "15,000 Kyats" }, { "duration": "1M Views + 100k Likes", "price": "135,000 Kyats" }],
      "Livestream Views": [{ "duration": "1,000 Views (15 min)", "price": "12,000 Kyats" }, { "duration": "1,000 Views (30 min)", "price": "25,000 Kyats" }, { "duration": "1,000 Views (60 min)", "price": "42,000 Kyats" }, { "duration": "10,000 Views (15 min)", "price": "90,000 Kyats" }],
      "Livestream Likes": [{ "duration": "1,000 Likes", "price": "1500 Kyats" }, { "duration": "10,000 Likes", "price": "3,000 Kyats" }, { "duration": "100,000 Likes", "price": "20,000 Kyats" }],
      "Livestream Share": [{ "duration": "1,000 Shares", "price": "2000 Kyats" }, { "duration": "10,000 Shares", "price": "9,000 Kyats" }]
    },
    "Telegram Boosting": {
      "Post Views": [{ "duration": "1,000 Views", price: "1500 Kyats" }, { "duration": "10,000 Views", price: "2,000 Kyats" }, { "duration": "100,000 Views", price: "15,000 Kyats" }],
      "Positive Reactions": [{ "duration": "1,000 Reactions", price: "1500 Kyats" }, { "duration": "10,000 Reactions", price: "6,500 Kyats" }],
      "Negative Reactions": [{ "duration": "1,000 Reactions", price: "1500 Kyats" }, { "duration": "10,000 Reactions", price: "6,500 Kyats" }],
      "Custom Reactions": [{ "duration": "1,000 Reactions", price: "1500 Kyats" }],
      "Premium Reactions": [{ "duration": "1,000 Reactions", price: "3,000 Kyats" }],
      "Members (30Days Refill)": [{ "duration": "1,000 Members", price: "16,000 Kyats" }]
    },
    "YouTube Boosting": {
      "Livestream Views": [{ "duration": "10,000 Views (15 min)", price: "8,000 Kyats" }, { "duration": "10,000 Views (30 min)", price: "19,000 Kyats" }],
      "Comment - Impression Type": [{ "duration": "1,000 Comment (15 min)", price: "16,500 Kyats" }],
      "Comment - Custom Type": [{ "duration": "1 Comment", price: "200 Kyats" }]
    },
    "Facebook Boosting": {
        "Video Views(Lifetime Refill)": [{ "duration": "1,000 Views", "price": "2,000 Kyats" }, { "duration": "10,000 Views", "price": "7,500 Kyats" }, { "duration": "100,000 Views", "price": "50,000 Kyats" }, { "duration": "1,000,000 Views", "price": "430,000 Kyats" }],
        "Post Like(30Days Refill)": [{ "duration": "1,000 Likes", "price": "6,500 Kyats" }, { "duration": "10,000 Likes", "price": "65,000 Kyats" }, { "duration": "100,000 Likes", "price": "530,000 Kyats" }],
        "Post Like(1Year Refill)": [{ "duration": "1,000 Likes", "price": "8,500 Kyats" }, { "duration": "10,000 Likes", "price": "65,000 Kyats" }, { "duration": "100,000 Likes", "price": "640,000 Kyats" }],
        "Post Like(Lifetime Refill)": [{ "duration": "1,000 Likes", "price": "9,500 Kyats" }, { "duration": "10,000 Likes", "price": "77,000 Kyats" }, { "duration": "100,000 Likes", "price": "740,000 Kyats" }],
        "Profile Followers(Lifetime Refill)": [{ "duration": "1,000 Followers", "price": "13,000 Kyats" }, { "duration": "10,000 Followers", "price": "130,000 Kyats" }],
        "Page follower(No Drop 2Year Warranty)": [{ "duration": "1,000 Followers", "price": "17,000 Kyats" }, { "duration": "10,000 Followers", "price": "170,000 Kyats" }],
        "Follower(Page&Profile)(30Days Refill)": [{ "duration": "1,000 followers", "price": "5,000 Kyats" }, { "duration": "10,000 followers", "price": "40,000 Kyats" }],
        "Live Stream Views": [{ "duration": "1,000 Views", "price": "15,000 Kyats" }]
    },
    "Instagram Boosting": {
        "Video Views & Reels(SLOW)": [{ "duration": "1,000 Views", "price": "1500 Kyats" }, { "duration": "10,000 Views", "price": "3500 Kyats" }, { "duration": "100,000 Views", "price": "4,800 Kyats" }, { "duration": "1,000,000 Views", "price": "23,000 Kyats" }],
        "Video Views & Reels(FAST)": [{ "duration": "1,000 Views", "price": "2500 Kyats" }, { "duration": "10,000 Views", "price": "3,000 Kyats" }, { "duration": "100,000 Views", "price": "4,700 Kyats" }, { "duration": "1,000,000 Views", "price": "30,000 Kyats" }],
        "Likes(FAST & 30DAYS REFILL)": [{ "duration": "1,000 Likes", "price": "3,500 Kyats" }, { "duration": "10,000 Likes", "price": "23,000 Kyats" }, { "duration": "100,000 Likes", "price": "180,000 Kyats" }],
        "Likes(SUPER FAST & LIFETIME)": [{ "duration": "1,000 Likes", "price": "3,200 Kyats" }, { "duration": "10,000 Likes", "price": "31,000 Kyats" }, { "duration": "100,000 Likes", "price": "240,000 Kyats" }],
        "Share(Slow but Cheapest)": [{ "duration": "1,000 Shares", "price": "1500 Kyats" }, { "duration": "10,000 Shares", "price": "3,500 Kyats" }, { "duration": "100,000 Shares", "price": "42,000 Kyats" }],
        "Share(FAST)": [{ "duration": "1,000 Shares", "price": "4,000 Kyats" }, { "duration": "10,000 Shares", "price": "4,000 Kyats" }, { "duration": "100,000 Shares", "price": "17,000 Kyats" }],
        "Save(FAST)": [{ "duration": "1,000 Saves", "price": "4,000 Kyats" }, { "duration": "10,000 Saves", "price": "10,500 Kyats" }, { "duration": "100,000 Saves", "price": "82,000 Kyats" }],
        "Reach+Impression(Normal Speed)": [{ "duration": "1,000 RI", "price": "2,000 Kyats" }, { "duration": "10,000 RI", "price": "12,000 Kyats" }, { "duration": "100,000 RI", "price": "88,000Kyats" }],
        "Followers(SLOW)": [{ "duration": "1,000(30Days Refill)", "price": "10,000 Kyats" }, { "duration": "1,000(1Year Refill)", "price": "15,000 Kyats" }, { "duration": "1,000(Lifetime Refill)", "price": "18,500 Kyats" }],
        "Followers(FAST)": [{ "duration": "1,000(30Days Refill)", "price": "16,000 Kyats" }, { "duration": "1,000(1Year Refill)", "price": "15,000 Kyats" }]
    },
    "Custom Website Service": { "Base Service": [{ "duration": "Fully functional website", price: "150,000 Kyats" }], "Normal Plan": [{ "duration": "Custom Design & Fully Functional", price: "200,000 Kyats" }] },
    "LightRoom": { "Share": [{ "duration": "1 Year", price: "15,599 Kyats" }] },
    "Wattpad": { "Sharing": [{ "duration": "1 Month", price: "5,000 Kyats" }, { "duration": "3 Months", price: "12,000 Kyats" }, { "duration": "6 Months", price: "19,000 Kyats" }, { "duration": "1 Year", price: "30,000 Kyats" }] },
    "Photoshop": { "Web Private": [{ "duration": "12 Months", price: "18,000 Kyats" }] },
    "Adobe Creative Cloud": { "Private": [{ "duration": "4 Months", price: "30,000 Kyats" }], "OwnMail Private": [{ "duration": "4 Months", price: "37,000 Kyats" }] },
    "HMA VPN": { "Private": [{ "duration": "1 Month", price: "11,000 Kyats" }] },
    "Crunchyroll": { "Share": [{ "duration": "9 Months", price: "26,000 Kyats" }] },
    "Telegram Star": { "Stars": [{ "duration": "50 Stars", price: "5,800 Kyats" }, { "duration": "100 Stars", price: "11,600 Kyats" }] },
    "Google Play Japan": { "Japan Region (¥)": [{ "duration": "¥500", price: "21,000 Kyats" }, { "duration": "¥1,000", price: "42,000 Kyats" }, { "duration": "¥1,500", price: "63,000 Kyats" }] },
    "Google Play US": { "US Region ($)": [{ "duration": "$5", price: "30,000 Kyats" }, { "duration": "$10", price: "60,000 Kyats" }, { "duration": "$50", price: "300,000 Kyats" }, { "duration": "$100", price: "600,000 Kyats" }] },
    "Google Play UK": { "UK Region (£)": [{ "duration": "£5", price: "39,000 Kyats" }, { "duration": "£10", price: "78,000 Kyats" }, { "duration": "£50", price: "390,000 Kyats" }, { "duration": "£100", price: "780,000 Kyats" }, { "duration": "£500", price: "3,900,000 Kyats" }] },
    "Google Play Turkey": { "Turkey Region (TL)": [{ "duration": "25 TL", price: "3,780 Kyats" }, { "duration": "50 TL", price: "7,560 Kyats" }, { "duration": "75 TL", price: "11,340 Kyats" }, { "duration": "100 TL", price: "15,120 Kyats" }] },
    "Google Play Indonesia": { "Indonesia Region (IDR)": [{ "duration": "5,000 IDR", price: "1,740 Kyats" }, { "duration": "10,000 IDR", price: "3,480 Kyats" }, { "duration": "100,000 IDR", price: "34,800 Kyats" }] },
    "Google Play Brazil": { "Brazil Region (BRL)": [{ "duration": "15 BRL", price: "17,400 Kyats" }, { "duration": "20 BRL", price: "23,200 Kyats" }, { "duration": "25 BRL", price: "29,000 Kyats" }, { "duration": "30 BRL", price: "34,800 Kyats" }, { "duration": "40 BRL", price: "46,400 Kyats" }, { "duration": "50 BRL", price: "58,000 Kyats" }, { "duration": "75 BRL", price: "87,000 Kyats" }, { "duration": "150 BRL", price: "174,000 Kyats" }, { "duration": "250 BRL", price: "290,000 Kyats" }, { "duration": "300 BRL", price: "348,000 Kyats" }] },
    "Google Play South Korea": { "Korea Region (₩)": [{ "duration": "5,000 ₩", price: "22,200 Kyats" }, { "duration": "10,000 ₩", price: "44,400 Kyats" }, { "duration": "30,000 ₩", price: "133,200 Kyats" }] },
    "Google Play India": { "India Region (₹)": [{ "duration": "10 ₹", price: "960 Kyats" }, { "duration": "25 ₹", price: "2,070 Kyats" }, { "duration": "30 ₹", price: "2,412 Kyats" }, { "duration": "50 ₹", price: "3,522 Kyats" }, { "duration": "100 ₹", price: "7,050 Kyats" }, { "duration": "300 ₹", price: "21,150 Kyats" }, { "duration": "500 ₹", price: "35,250 Kyats" }, { "duration": "1000 ₹", price: "70,500 Kyats" }] },
    "Google Play Australia": { "Australia Region (A$)": [{ "duration": "$5", price: "36,000 Kyats" }, { "duration": "$10", price: "72,000 Kyats" }, { "duration": "$50", price: "360,000 Kyats" }, { "duration": "$100", price: "720,000 Kyats" }] },
    "Google Play Germany": { "Germany Region (€)": [{ "duration": "€5", price: "36,000 Kyats" }, { "duration": "€10", price: "72,000 Kyats" }, { "duration": "€50", price: "360,000 Kyats" }, { "duration": "€100", price: "720,000 Kyats" }] },
    "Google Play France": { "France Region (€)": [{ "duration": "€5", price: "36,000 Kyats" }, { "duration": "€10", price: "72,000 Kyats" }, { "duration": "€50", price: "360,000 Kyats" }, { "duration": "€100", price: "720,000 Kyats" }] },
    "Google Play Italy": { "Italy Region (€)": [{ "duration": "€5", price: "36,000 Kyats" }, { "duration": "€10", price: "72,000 Kyats" }, { "duration": "€50", price: "360,000 Kyats" }, { "duration": "€100", price: "720,000 Kyats" }] },
    "Google Play Switzerland": { "Switzerland Region (CHF)": [{ "duration": "5 CHF", price: "39,000 Kyats" }, { "duration": "10 CHF", price: "78,000 Kyats" }, { "duration": "50 CHF", price: "390,000 Kyats" }, { "duration": "100 CHF", price: "780,000 Kyats" }] },
    "Google Play Canada": { "Canada Region (C$)": [{ "duration": "$10", price: "59,160 Kyats" }, { "duration": "$20", price: "96,000 Kyats" }, { "duration": "$30", price: "142,620 Kyats" }, { "duration": "$75", price: "356,580 Kyats" }, { "duration": "$100", price: "475,440 Kyats" }] },
    "Google Play Poland": { "Poland Region (PLN)": [{ "duration": "20 PLN", price: "35,400 Kyats" }, { "duration": "30 PLN", price: "43,980 Kyats" }, { "duration": "50 PLN", price: "88,080 Kyats" }, { "duration": "75 PLN", price: "120,480 Kyats" }, { "duration": "150 PLN", price: "264,000 Kyats" }] },
    "Google Play UAE": { "UAE Region (AED)": [] }
  };

  const paymentInfoBlock = `\n\nPayment Methods:\n✅ KBZPay\n✅ WavePay\n✅ CBPay\n✅ UABPay\n✅ AYAPay\n\nAll above methods use this same number:\n09950004440\n(Name: Thet Paing Soe)\n\nWATCH OUT FOR SCAMMER!!`; 
    
  const generalDetailsBlock = `\n\nPayment Methods:\n✅ KBZPay\n✅ WavePay\n✅ CBPay\n✅ UABPay\n✅ AYAPay\n\nAll above methods use this same number:\n09950004440\n(Name: Thet Paing Soe)\n\nWATCH OUT FOR SCAMMER!!`;

  const expressVpnShareNoteBase = `\nတခါတလေအကောင့်ကထွက်တာမျိုးနေဖြစ်နိုင်တယ်but ပြန်ဝင်လို့ရပါတယ်\n\nပီးတော့စဝယ်တဲ့ရက်ကနေ premium ရက် 25ကနေ 31ရက်ကြားက stock ရှိတာရမာပါ။\n`;

  const chatGptWarrantyNote = `$20≈$30နဲ့ဝယ်တဲ့ဟာတေမမဟုတ်ရင် Deactivate errorဖြစ်နိုင်လို့ warranty အနေနဲ့ဖြစ်ခဲ့ရင် 1ခုအသစ်ပြန်လဲပေးမာပါ တခါပဲလဲပေးမာမလို့အဆင်ပြေမယူပေးပါ`;

  const netflixUhdNote = `Subscription: Premium UHD\n•Ultra HD (4K) video quality\n•HDR support (on compatible titles/devices)\n•Best audio quality (including Dolby Atmos on some titles/devices)\n•Download on multiple devices (highest limit vs other plans)\n•Works on all devices (TV, phone, tablet, laptop)\n•Includes full Netflix library (movies, series, originals)`;

  const moreDetailsByProduct = { 
    "CapCut": `Share\nOne device only\nဖုန်းတလုံးပဲသုံးလို့ရပါတယ် Android & iOS\n• Sharing အကောင့်တေက Pro ပြုတ်တယ်ပါတယ်။\nDevice limit ကျော်သုံးရင်တခြားလူနဲ့ Shareသုံးရတာမလို့ဖြစ်လာရင်ဘယ်သူလုပ်လဲမသိရတာမလို့ warranty 15ရက်ပဲ ပေးပါတယ်။\n(we fully renew if Pro stops)\n\nPrivate\n2 devices max. Full warranty for the entire plan duration.\n\nPrivate Own Mail\n2 devices max. Full warranty for the entire plan duration.` + generalDetailsBlock,
    "AlightMotion": `Share\nFull warranty for full duration\nCovers premium subscription errors\nWe'll renew a new one if any error occurs\n\nPrivate\nFull warranty for full duration\n8 devices max\nCovers premium subscription errors\nWe'll renew a new one if any error occurs\n\nPrivate (Own Mail)\nFull warranty for full duration\n8 devices max\nCovers premium subscription errors\nWe'll renew a new one if any error occurs` + generalDetailsBlock,
    "Wink": `Share\nOne device only\nFull warranty for full duration\n\nPrivate\nFull warranty for full duration\n3 devices max\n\nPrivate (Own Mail)\nFull warranty for full duration` + generalDetailsBlock, 
    "Meitu": `Share\nOne device only\nFull warranty.\n\nPrivate\nFull warranty.\n3 devices max` + generalDetailsBlock, 
    "PicsArt": `Share\nFull warranty for full duration\nOne device only\nSharingမို့လို့ Edit history တေတခြား Shareဝယ်တဲ့သူတေနဲ့အကုန်မြင်နေမာပါ။\nအဆင်ပြေတယ်ဆိုမသာယူပါ။\n\nPrivate\nFull warranty for full duration\nUp to 5 devices` + generalDetailsBlock, 
    "Canva": `Pro Share\nFull warranty\n\nEducational(Invite)\nIs education edition (limited features)\n\nPro Private\nFull warranty\nUp to 100 accounts via invite email\nCanva Account တေက device limit ကန့်သတ်ချက်မရှိလို့ကြိုက်သလောက်သုံးလို့ရပါတယ် email တခုကို။` + generalDetailsBlock, 
    "VSCO": `Share\nFull warranty for full duration\nOne device only` + generalDetailsBlock, 
    "PhotoRoom": `Share\n6-months warranty\nNo warranty ≠ will fail\nOne device only` + generalDetailsBlock, 
    "Remini": `Share\nWebsite 1-Month: full warranty\nAPK 1-Year: 6-months warranty\nOne device only\n\nPrivate\n1 Month (Web)\n5 devices maxသုံးလို့ရပါတယ်။\nSupport All device\nFull Warranty` + generalDetailsBlock,
    "NordVpn": `Share\n1-Year: 6-months warranty\nOne device only\n\nPrivate\nFull warranty for full duration\nUp to 6 devices` + generalDetailsBlock, 
    "Express Vpn": `Share\nFull warranty for full duration\nOne device only\n\nPrivate\nFull warranty for full duration\nUp to 9 devices: 8 Phones & 1 PC or Laptop\nCustom Password` + generalDetailsBlock, 
    "Surfshark Vpn": `Share\nFull warranty for full duration\nOne device only\n\nPrivate\n10 Devices can use.\nSupport all device.\nFull warranty` + generalDetailsBlock, 
    "Windows License": `100% original license\nSupports 32/64-bit\nOriginal retail key` + generalDetailsBlock, 
    "Microsoft 365": `Individual\nUp to 5 devices\n\nInvite with email\nOnly 1 device per invite\n\nFamily Head(Can Invite 5 email)\nကျနော်ပေးမဲ့ Head အကောင့်အပါအဝင်တခြား email 5ခုလုံးက(Word, Excel, etc.) and 1TB of OneDrive storageစတဲ့ Microsoft Copilot Proမာပါတဲ့ features တေအကုန်သုံးလို့ရသွားမာပါ။` + generalDetailsBlock, 
    "Netflix": `1 Profile\nOwn 1 profile you can use 2 devices\nNetflix အကောင့်တေကိုwarrantyအပြည့်ပေးထားပါတယ်ဒါပေမဲ့ setting တေကလိပီးဖြစ်လာတဲ့ error တေအတွက်fixing time 1 to 2Days လောက်ထိကြာနိုင်ပါတယ်။ကိုယ်ကဘာမမလုပ်ရင်တောင်တခြားpfကလူတေလုပ်လို့ဖြစ်ရင်လဲfixing time စောင့်ရမာပါ။\n\nWhole Account\nOwn 5 profiles you can use 10 devices` + generalDetailsBlock, 
    "Disney+": `Plan Basic (Limited Screen)\nSharing up to 6 users.\n\nPlan Premium (No Limit)\nSharing up to 3 users with full control, no screen limits.` + generalDetailsBlock, 
    "HBO Max": `HBO MAX (ULTIMATE) 1 Month\n1P 2U: 1 Profile / 2 Users\nSemiprivate: 1 Profile / Semi-Private\n\nPrivate Whole Account (1 Month)\n5 Profile` + generalDetailsBlock, 
    "Prime Video": `Share\nFull warranty • One device only\n\nPrivate\nFull warranty • Up to 3 devices` + generalDetailsBlock, 
    "Spotify": `Individual Plan(Private)\n• Private Plan မို့လို့ 1 person 1 device ပဲသုံးသင့်ပါတယ်။ Visa Card payment နဲ့လုပ် ပေးမာပါ။ 3 Months အတွင်း full warranty ဖြစ်လို့တခုခုဖြစ်ခဲ့ရင် warranty အနေနဲ့အခုပြန်လဲ ပေးမာပါ တခါပဲလဲ ပေးမာပါ။ Setting ထဲသွားပီး account delete တာတို့တော့မပါပါဘူး。\n\nOfficial appမာသုံးရတာဆိုပေမဲ့တစ်လကို$11.99ပေးပီးဝယ်တာမဟုတ်လို့ Risk ကတော့ရှိပါတယ်။အဆင်ပြေတယ်ဆိုမယူပါ။\n\nOld account က Playlist, Favorite Artist, Favorite Songs, Favorite albums,Liked Songsအကုန်အကာင့်အသစ်ကိုပြောင်းပေးပါတယ်။` + generalDetailsBlock,
    "Apple Music": `Individual Plan\nOnly for Android.\nThis did not work on iOS.\nFull warranty.\nRenewလို့ရပါတယ်။သက်တန်းတိုးရင်တော့တစ်လကို6,000Ksပါ။` + generalDetailsBlock,
    "Qobuz": `Individual Plan\nRecommend for iOS device\nFull warranty.` + generalDetailsBlock,
    "Google One": `Private (own mail)\nIncludes GeminiVeo3 AI + premium features\nFull warranty` + generalDetailsBlock, 
    "Google Drive": `Private (own mail)\n30-days warranty` + generalDetailsBlock, 
    "TeraBox": `Sharing (2TB)\nShared account. One device only.\nFull warranty for plan duration.` + generalDetailsBlock, 
    "ChatGPT Plus": `Personal Plus (Private)\nUp to 5 devices (not recommended)\n${chatGptWarrantyNote}\n\nBusiness - Invite Own Email\n1 device\nဒါကကိုယ်သုံးနေတဲ့ Emailကို GPT Plus ပြောင်းပေးတာဖြစ်ပီး history ကလဲကိုယ့်အကောင့်ပဲမို့ private history နဲ့သုံးရမာပါ။\n${chatGptWarrantyNote}\n\nBusiness Plus Own\nCan invite 4 Email\n${chatGptWarrantyNote}\n\nBusiness Plus Own(Full Warranty)\nFull Warranty for full duration. Deactivateဖြစ်လဲတစ်လပြည့်တဲ့ထိလဲပေးမာပါ။` + generalDetailsBlock,
    "Gemini Veo 3": `Private(Can Invite 5 Email)\nIncludes 2000GB Google storage\nFull warranty • Unlimited devices` + generalDetailsBlock, 
    "Grammarly AI": `Share\nFull warranty • One device only` + generalDetailsBlock, 
    "Zoom": `Full warranty.\nAll pro features unlock.\nCan use 2-5 devices.` + generalDetailsBlock, 
    "YouTube": `Private (Individual Plan)\nFull warranty.\nNo ads with all YouTube premium features.\nIncluding YouTube music.` + generalDetailsBlock, 
    "Tinder": `Code redeem use.\n1× warranty. Can only use one devices` + generalDetailsBlock, 
    "Telegram": `Login\n• 1 Month — 21,000 Kyats\n• 1 Year — 112,000 Kyats\n• Login planကကျနော်တို့ဘက်ကအကောင့်ထဲဝင်ပီး Premium ဝယ်ပေးမာပါ။2 to 3Minလောက်ကြာနိုင်ပါတယ်။\n\nGift Plan & Link Plan\nGiftPlan and Link Plan are same premium features.\nContact admin for more details.` + generalDetailsBlock, 
    "Discord": `Nitro Basic (Key)\nThis code can only be used on accounts that are at least one month old and have never subscribed to Discord Nitro.\nAn active payment method is required to activate the code.\nThe code can only be activated once per IP address or payment method.\nThe code must be used within 1 week.\nThe code must be activated via the https://discord.com/billing/promotions/(YOURKEY)` + generalDetailsBlock,
    "Perplexity Ai": `Share\nOne device only\nFull warranty.\n\nPrivate\nCan use up to 5 devices.\nFull warranty.\nကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။\n\nOwnMail Private\nCan use up to 5 devices.\nFull warranty.\nကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။` + generalDetailsBlock, 
    "GAGAOOLALA": `Private\nFull warranty.` + generalDetailsBlock, 
    "BSTATION": `Private\nFull warranty.` + generalDetailsBlock, 
    "INSHOT": `Lifetime Premium\nMod appမဟုတ်ပါဘူး။Android onlyပဲသူံးလို့ရပါတယ်။ Playstore ကappမာပဲသုံးလို့ရပါမယ်။\nWarranty 3လပေးပါတယ်။\nShare plan မို့လို့ 1 device ပဲသုံးလို့ရပါမယ်။` + generalDetailsBlock, 
    "Duolingo Super": `Family Head(Can Invite 5 email)\nFull warranty for plan duration.\n\nInvite Private\nFull warranty for plan duration.` + generalDetailsBlock, 
    "SCRIBD": `Private\nFull warranty for plan duration.` + generalDetailsBlock,
    "WPS Office": `Sharing Pro\nFull warranty for full duration.\nOne device only.\nIncludes all premium features in WPS. (Word, Spreadsheets, Presentation, PDF tools)` + generalDetailsBlock, 
    "TradingView": `Private\nFull warranty for full duration.\nSupports all devices.` + generalDetailsBlock, 
    "PlaySafeCard": `Voucher Code\nExpires in 7 Days.\nPlease contact admin for usage details.` + generalDetailsBlock,
    "TikTok Official": `Coinက TikTok official boostတဲ့နေရာမာ Coin တေကိုသုံးရတာပါ။အဲ့ Coin ကိုရောင်းပေးတာပါ။ Login ဝင်ပီးဝယ်ရတာပါ။ buttt email password ဘာမပေးစရာမလိုပါဘူး။` + generalDetailsBlock,
    "TikTok Non Official": `Views (NoDrop)\nNo dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။\n\nLikes (NoDrop)\nNo dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။\n\nPackage Plan\nNo dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။` + generalDetailsBlock,
    "Telegram Boosting": `Post Reactions are Lifetime No-Drop. Members have a 30-day refill guarantee.` + generalDetailsBlock,
    "YouTube Boosting": `Livestream Views are Impression type, please contact admin for specific details before purchasing.` + generalDetailsBlock,
    "Facebook Boosting": `Various boosting services for views, likes, and followers. Please provide the correct link/URL for the service.` + generalDetailsBlock,
    "Instagram Boosting": `Views, Likes, and Followers services. Please provide the correct link/URL for the service.` + generalDetailsBlock,
    "Custom Website Service": `Base Service\nဒါက Any kinds of Website ကိုလိုချင်တဲ့ functionတေfully functionalဖြစ်တဲ့ထိလုပ်ပေးမာပါ။ Inspired design request လို့ရပါတယ်။ Custom Design package မဟုတ်လို့အရမ်း complex ဖြစ်တာတေတော့‌ Request လို့မရပါဘူး။ Website Codeတေလဲအပိုင်မရပါဘူး။ Domains ရှိရင်ထည့်ပေးပါတယ်။ မထည့်ပဲကျနော်လုပ်ပေးတဲ့အတိုင်းဆို lifetime ဘာhosting feeမပေးစရာမလိုပဲသူံးလို့ရပါတယ်။\nMore information on DM. Price may vary based on complexity.\n\nNormal Plan\nဒါက Any kinds of Website ကိုလိုချင်တဲ့ functionတေfully functionalဖြစ်တဲ့ထိလုပ်ပေးမာပါ။ Custom Design packageဖြစ်လို့ Inspired Design တေစိတ်ကြိုက်ဖြစ်တဲ့ထိလုပ်‌ပေးမာပါ။ Website Codeတေက‌တော့အပိုင်မရပါဘူး။` + generalDetailsBlock,
    "LightRoom": `Share\nOne device only\nSharing account will mix projects with others user.` + generalDetailsBlock,
    "Wattpad": `Sharing\nOne device only\nFull warranty.` + generalDetailsBlock,
    "Photoshop": `Web Private\nwarranty back free only.` + generalDetailsBlock,
    "Adobe Creative Cloud": `Adobe Creative Cloud မာဆိုရင်\n\nPhotoshop → edit photos & images\n\nIllustrator → make logos & vector designs\n\nPremiere Pro → edit videos\n\nAfter Effects → add animations & effects\n\nInDesign → design posters, books, layouts\n\nAcrobat Pro → edit & sign PDFs\n\nစတဲ့ App တေရဲ့ Pro version တေအပြင်တခြား audio, animation, UI design, and content creationလုပ်ဖို့လိုတဲ့ Appတေပါပါမာပါ။` + generalDetailsBlock,
    "HMA VPN": `Can use 5 to 10 devices. Recommend for desktop devices.` + generalDetailsBlock,
    "Crunchyroll": `Share\n5-Months warranty • One device only` + generalDetailsBlock,
    "Telegram Star": `Usernameပဲလိုပါမယ်` + generalDetailsBlock
  };
    
  const deviceSupport = { 
    "CapCut": ["android", "ios", "pc"], 
    "AlightMotion": ["android", "ios"], 
    "Wink": ["android", "ios"], 
    "Meitu": ["android", "ios"], 
    "PicsArt": ["android", "ios", "pc"], 
    "Canva": ["android", "ios", "pc"], 
    "VSCO": ["android", "ios"], 
    "PhotoRoom": ["android", "ios"], 
    "Remini": ["android", "ios"], 
    "NordVpn": ["android", "ios", "pc"], 
    "Express Vpn": ["android", "ios", "pc"], 
    "Surfshark Vpn": ["android", "ios", "pc"], 
    "Windows License": ["pc"], 
    "Microsoft 365": ["pc", "android", "ios"], 
    "Netflix": ["android", "ios", "pc", "tv"], 
    "Disney+": ["android", "ios", "pc", "tv"], 
    "HBO Max": ["android", "ios", "pc", "tv"], 
    "Prime Video": ["android", "ios", "pc", "tv"], 
    "Spotify": ["android", "ios", "pc"], 
    "Apple Music": ["android", "pc"],
    "Qobuz": ["android", "ios", "pc"], 
    "Google Drive": ["android", "ios", "pc"], 
    "iCloud": ["ios", "pc"], 
    "Google One": ["android", "ios", "pc"], 
    "TeraBox": ["android", "ios", "pc"], 
    "ChatGPT Plus": ["android", "ios", "pc"], 
    "Gemini Veo 3": ["android", "ios", "pc"], 
    "Grammarly AI": ["pc", "android", "ios"], 
    "Zoom": ["pc", "android", "ios"], 
    "YouTube": ["pc", "android", "ios", "tv"], 
    "Tinder": ["android", "ios"], 
    "Telegram": ["android", "ios", "pc"], 
    "Discord": ["android", "ios", "pc"], 
    "Perplexity Ai": ["android", "ios", "pc"], 
    "GAGAOOLALA": ["android", "ios", "pc", "tv"], 
    "BSTATION": ["android", "ios", "pc", "tv"], 
    "INSHOT": ["android"], 
    "Duolingo Super": ["android", "ios", "pc"], 
    "SCRIBD": ["android", "ios", "pc"],
    "WPS Office": ["android", "ios", "pc"], 
    "TradingView": ["android", "ios", "pc"], 
    "PlaySafeCard": [],
    "TikTok Official": ["android", "ios", "pc"],
    "TikTok Non Official": ["android", "ios", "pc"],
    "Telegram Boosting": ["android", "ios", "pc"],
    "YouTube Boosting": ["android", "ios", "pc"],
    "Facebook Boosting": ["android", "ios", "pc"],
    "Instagram Boosting": ["android", "ios", "pc"],
    "Custom Website Service": ["pc"],
    "LightRoom": ["android", "ios", "pc"],
    "Wattpad": ["android", "ios", "pc"],
    "Photoshop": ["pc"],
    "Adobe Creative Cloud": ["pc", "android", "ios"],
    "HMA VPN": ["pc", "android", "ios"],
    "Crunchyroll": ["android", "ios", "pc"],
    "Telegram Star": ["android", "ios", "pc"],
    "Google Play Gift Card": ["android", "ios", "pc"],
    "Google Play Turkey": ["android", "ios", "pc"],
    "Google Play Indonesia": ["android", "ios", "pc"],
    "Google Play Brazil": ["android", "ios", "pc"],
    "Google Play South Korea": ["android", "ios", "pc"],
    "Google Play India": ["android", "ios", "pc"],
    "Google Play Australia": ["android", "ios", "pc"],
    "Google Play Germany": ["android", "ios", "pc"],
    "Google Play France": ["android", "ios", "pc"],
    "Google Play Italy": ["android", "ios", "pc"],
    "Google Play Switzerland": ["android", "ios", "pc"],
    "Google Play Canada": ["android", "ios", "pc"],
    "Google Play UAE": ["android", "ios", "pc"],
    "Google Play Poland": ["android", "ios", "pc"],
    "Google Play Japan": ["android", "ios", "pc"],
    "Google Play US": ["android", "ios", "pc"],
    "Google Play UK": ["android", "ios", "pc"]
  };

  const deviceIconMap = { "android": '<i class="fa-brands fa-android"></i>', "ios": '<i class="fa-brands fa-apple"></i>', "pc": '<i class="fa-solid fa-desktop"></i>', "tv": '<i class="fa-solid fa-tv"></i>' };
    
  /* =========================
      STATE
      ========================= */
  let cart = [];
  let lastScroll = 0;
  let lastViewBeforeCheckout = 'home';
  let productCards = []; 

  /* =========================
      UTILITY FUNCTIONS
      ========================= */
  const escapeHTML = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
    
  const parseKyats = t => { const m = (t || "").replace(/,/g, "").replace(/Ks/g, "").replace(/≈/g, "").trim().match(/(\d+(\.\d+)?)/); return m ? Number(m[1]) : null; }; 
    
  const formatKyats = n => (n || 0).toLocaleString("en-US") + " Kyats";
  const cartKey = ({ product, section, duration, priceText }) => [product, section, duration, priceText].join("|");

  /* =========================
      CART LOGIC
      ========================= */
  function addToCart(item) {
    const key = cartKey(item);
    const existing = cart.find(x => cartKey(x) === key);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    renderCart();
    reflectQuantitiesOnRows();
  }

  function decFromCart(item) {
    const key = cartKey(item);
    const index = cart.findIndex(x => cartKey(x) === key);
    if (index > -1) {
      cart[index].qty -= 1;
      if (cart[index].qty <= 0) cart.splice(index, 1);
      renderCart();
      reflectQuantitiesOnRows();
    }
  }

  function removeItemFromCart(key) {
    const index = cart.findIndex(x => cartKey(x) === key);
    if (index > -1) {
      cart.splice(index, 1);
      renderCart();
      reflectQuantitiesOnRows();
    }
  }

  function clearCart() {
    cart = [];
    renderCart();
    reflectQuantitiesOnRows();
  }

  /* =========================
      RENDERING FUNCTIONS
      ========================= */
  function renderCart() {
    if (!cart.length) {
      dom.cart.bar.style.display = "none";
      document.body.style.paddingBottom = "0";
      return;
    }
    dom.cart.bar.style.display = "block";
    dom.cart.list.innerHTML = cart.map(i => {
      const sub = i.unitPrice * i.qty;
      return `<div class="cart-item">
        <div class="meta"><span class="title">${escapeHTML(i.product)} • ${escapeHTML(i.section)}</span>
        <span class="sub">${escapeHTML(i.duration)} • ${escapeHTML(i.priceText)}</span></div>
        <div class="subtotal">${formatKyats(sub)}</div>
        <button class="remove-btn" data-cart-key="${escapeHTML(cartKey(i))}">×</button>
      </div>`;
    }).join("");
    const total = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
    dom.cart.total.textContent = formatKyats(total);
    dom.cart.count.textContent = String(cart.reduce((s, i) => s + i.qty, 0));
    requestAnimationFrame(() => {
      let cartBarHeight = dom.cart.bar.classList.contains('collapsed') ? 60 : dom.cart.bar.offsetHeight;
      document.body.style.paddingBottom = (cartBarHeight) + "px";
    });
  }

  function reflectQuantitiesOnRows() {
    document.querySelectorAll(".qty-val").forEach(el => {
      const key = el.dataset.itemKey;
      const item = cart.find(i => cartKey(i) === key);
      el.textContent = item ? item.qty : 0;
    });
  }

  function showView(viewName) {
    Object.values(dom.views).forEach(v => v.classList.remove('active'));
    if (dom.views[viewName]) dom.views[viewName].classList.add('active');
    if (viewName === 'home') dom.search.container.style.display = 'flex';
    else {
        dom.search.container.style.display = 'none';
        dom.search.input.value = '';
        filterProducts('');
    }
  }
    
  function filterProducts(query) {
    query = query.toLowerCase().trim();
    dom.search.clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    dom.views.home.classList.toggle('is-searching', query.length > 0);
    if (query.length === 0) {
        productCards.forEach(card => card.classList.remove('search-match'));
        return;
    }
    productCards.forEach(card => {
        const name = card.dataset.productName.toLowerCase();
        if (name.includes(query)) card.classList.add('search-match');
        else card.classList.remove('search-match');
    });
  }

  const popularList = ["CapCut", "Canva", "Telegram", "Express Vpn", "Google Drive", "TeraBox", "Gemini Veo 3", "ChatGPT Plus"];
  function renderPopular(containerId, excludeName) {
    const cont = document.getElementById(containerId);
    if (!cont) return;
    const items = popularList.filter(n => excludeName ? n !== excludeName : true);
    const oneSetHTML = items.map(name => `
      <div class="pop-card" data-product-name="${escapeHTML(name)}">
        <img src="${imageFor[name]}" alt="${escapeHTML(name)}">
        <p>${escapeHTML(name)}</p>
      </div>`).join("");
    const track = document.createElement("div");
    track.className = "pop-track";
    track.innerHTML = oneSetHTML.repeat(3);
    cont.innerHTML = "";
    cont.appendChild(track);
    enableAutoScroll(cont, track);
  }

  const _autoScrollState = new WeakMap();
  function enableAutoScroll(container, track) {
    const SPEED = 120, USER_PAUSE_MS = 1200; 
    let rafId, lastUserTs = performance.now();
    const singleWidth = track.scrollWidth / 3;
    container.scrollLeft = singleWidth;
    function tick() {
      const now = performance.now();
      if (now - lastUserTs > USER_PAUSE_MS) {
        container.scrollLeft += SPEED;
        if (container.scrollLeft >= singleWidth * 2) container.scrollLeft -= singleWidth;
        if (container.scrollLeft < 0) container.scrollLeft += singleWidth;
      }
      rafId = requestAnimationFrame(tick);
    }
    const prev = _autoScrollState.get(container);
    if (prev && prev.rafId) cancelAnimationFrame(prev.rafId);
    rafId = requestAnimationFrame(tick);
    _autoScrollState.set(container, { rafId });
    const userActive = () => { lastUserTs = performance.now(); };
    ["wheel", "pointerdown", "pointerup", "touchstart", "touchmove", "scroll"].forEach(ev => container.addEventListener(ev, userActive, { passive: true }));
  }

  function openProduct(productName) {
    lastScroll = window.scrollY;
    if (regionalProducts[productName]) {
        renderRegionalSelector(productName, regionalProducts[productName]);
        return;
    }
    const devices = deviceSupport[productName] || [];
    const deviceIconsHtml = devices.length > 0 ? `
        <div class="supported-devices">
            ${devices.map(device => `<span class="device-icon">${deviceIconMap[device] || ''}</span>`).join('')}
        </div>
    ` : '';
    const pdata = productData[productName] || {};
    let sectionsHTML = '';
    const firstValue = Object.values(pdata)[0];
    const isPlatformNested = firstValue && typeof firstValue === 'object' && !Array.isArray(firstValue) && (Object.keys(firstValue).includes('Share') || Object.keys(firstValue).includes('Private'));

    if (isPlatformNested) {
        sectionsHTML = Object.entries(pdata).map(([platformName, platformData]) => {
            const platformPlansHTML = Object.entries(platformData).map(([sectionName, plans]) => {
                if (!plans || !plans.length) return "";
                const rows = plans.map(p => {
                    const unit = parseKyats(p.price);
                    const itemBase = { product: `${productName} (${platformName})`, section: sectionName, duration: p.duration || "", unitPrice: unit, priceText: p.price || "" };
                    const key = cartKey(itemBase);
                    const dataAttr = `data-item='${escapeHTML(JSON.stringify(itemBase))}'`;
                    const qty = (cart.find(i => cartKey(i) === key)?.qty) || 0;
                    const isDisabled = p.price === "Out of stock";
                    return `
                      <div class="plan-row tap-anim-target">
                        <span class="plan-left">${escapeHTML(p.duration || "")}</span>
                        <span class="plan-price">${escapeHTML(p.price || "")}</span>
                        <span class="plan-qty">
                          ${unit == null || isDisabled ? '' : `
                            <span class="qty">
                              <button class="qty-btn" data-action="dec" ${dataAttr} ${isDisabled ? 'disabled' : ''}>−</button>
                              <span class="qty-val" data-item-key="${escapeHTML(key)}">${qty}</span>
                              <button class="qty-btn" data-action="inc" ${dataAttr} ${isDisabled ? 'disabled' : ''}>+</button>
                            </span>`}
                        </span>
                      </div>`;
                }).join("");
                return `<div class="plan-box"><div class="plan-title">${escapeHTML(sectionName)}</div><div class="plan-rows">${rows}</div></div>`;
            }).join("");
            return `<div class="platform-title">${escapeHTML(platformName)}</div>${platformPlansHTML}`;
        }).join("");
    } else {
        sectionsHTML = Object.entries(pdata).map(([sectionName, plans]) => {
            if (!plans || !plans.length) return "";
            const rows = plans.map(p => {
                const unit = parseKyats(p.price);
                const itemBase = { product: productName, section: sectionName, duration: p.duration || "", unitPrice: unit, priceText: p.price || "" };
                const key = cartKey(itemBase);
                const dataAttr = `data-item='${escapeHTML(JSON.stringify(itemBase))}'`;
                const qty = (cart.find(i => cartKey(i) === key)?.qty) || 0;
                const isDisabled = p.price === "Out of stock";
                return `
                  <div class="plan-row tap-anim-target">
                    <span class="plan-left">${escapeHTML(p.duration || "")}</span>
                    <span class="plan-price">${escapeHTML(p.price || "")}</span>
                    <span class="plan-qty">
                      ${unit == null || isDisabled ? '' : `
                        <span class="qty">
                          <button class="qty-btn" data-action="dec" ${dataAttr} ${isDisabled ? 'disabled' : ''}>−</button>
                          <span class="qty-val" data-item-key="${escapeHTML(key)}">${qty}</span>
                          <button class="qty-btn" data-action="inc" ${dataAttr} ${isDisabled ? 'disabled' : ''}>+</button>
                        </span>`}
                    </span>
                  </div>`;
            }).join("");
            let title = sectionName;
            if (productName === 'Express Vpn' && sectionName === 'Private') title = 'Private Own 9 Devices';
            return `<div class="plan-box"><div class="plan-title">${title}</div><div class="plan-rows">${rows}</div></div>`;
        }).join("");
    }
    let heroImageSrc = imageFor[productName] || imageFor["Google Play Gift Card"];
    const pageHTML = `
      <button class="back-btn" id="product-back-btn">← Back</button>
      <div class="product-hero">
        <div class="hero-img-wrap"><img src="${heroImageSrc}" alt="${escapeHTML(productName)} logo" /></div>
        <div class="hero-title">${escapeHTML(productName)}</div>
        ${deviceIconsHtml} 
        <div class="button-container">
            <button class="btn btn-outline hero-more" data-product-name="${escapeHTML(productName)}">More Details</button>
            <button class="btn btn-outline" id="why-buy-btn">ဘာကြောင့်ဝယ်သင့်တာလဲ</button>
        </div>
      </div>
      ${sectionsHTML}
      <section class="popular-section">
        <div class="popular-head">
          <h2 class="popular-title">Popular</h2>
          <div class="popular-underline"></div>
        </div>
        <div class="pop-scroller" id="popular-product"></div>
      </section>`;
    dom.views.product.innerHTML = pageHTML;
    const customConf = customConfigs[productName];
    if (customConf) {
        const customHTML = `
        <div class="plan-box">
          <div class="plan-title">Custom Amount (${customConf.min} - ${customConf.max} ${customConf.curr})</div>
          <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
             <div style="display:flex; gap:10px;">
                <input type="number" id="custom-amount-input" min="${customConf.min}" max="${customConf.max}" placeholder="${customConf.min}-${customConf.max}" 
                       style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;">
                <div id="custom-calc-price" style="align-self:center; font-weight:bold; color:#00e676; min-width:100px; text-align:right;">0 Kyats</div>
             </div>
             <button id="btn-add-custom" class="btn btn-primary" style="width:100%;">Add to Cart</button>
          </div>
        </div>`;
        const popularSection = dom.views.product.querySelector('.popular-section');
        popularSection.insertAdjacentHTML('beforebegin', customHTML);
        const input = document.getElementById('custom-amount-input');
        const priceDisplay = document.getElementById('custom-calc-price');
        const addBtn = document.getElementById('btn-add-custom');
        input.addEventListener('input', () => {
             const val = parseFloat(input.value);
             if (!val || val < customConf.min || val > customConf.max) {
                 addBtn.style.backgroundColor = '#ff4444'; 
                 priceDisplay.textContent = "0 Kyats";
             } else {
                 addBtn.style.removeProperty('background-color');
                 const price = Math.floor(val * customConf.rate);
                 priceDisplay.textContent = formatKyats(price);
             }
        });
        addBtn.addEventListener('click', () => {
             const val = parseFloat(input.value);
             if (!val || val < customConf.min || val > customConf.max) return;
             const price = Math.floor(val * customConf.rate);
             const item = { product: productName, section: "Custom Amount", duration: `${customConf.curr}${val}`, unitPrice: price, priceText: formatKyats(price) };
             addToCart(item);
             addBtn.textContent = "Added!";
             setTimeout(() => addBtn.textContent = "Add to Cart", 1000);
        });
    }
    renderPopular("popular-product", productName);
    showView('product');
    window.scrollTo(0, 0);
  }

  function renderRegionalSelector(productName, regions) {
      const pageHTML = `
      <button class="back-btn" id="product-back-btn">← Back</button>
      <div class="product-hero">
        <div class="hero-img-wrap"><img src="${imageFor[productName]}" alt="${escapeHTML(productName)} logo" /></div>
        <div class="hero-title">${escapeHTML(productName)}</div>
        <div class="hero-subtitle" style="opacity:0.8; margin-bottom:10px;">Select Region</div>
      </div>
      <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap: 10px;">
        ${regions.map(region => `
            <div class="card tap" data-product-name="${escapeHTML(region.name)}">
                <img src="${region.img}" alt="${escapeHTML(region.name)}">
            </div>
        `).join('')}
      </div>`;
      dom.views.product.innerHTML = pageHTML;
      showView('product');
      window.scrollTo(0, 0);
  }

  function getNoteForCartItem(item) {
    const productName = item.product.replace(/ \(.+\)$/, '');
    if (productName === "TikTok Non Official" && item.section.toLowerCase().includes("livestream")) return null; 
    const fullText = moreDetailsByProduct[productName]; 
    if (!fullText) return null;
    const lines = fullText.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const sectionHeaders = /^(Share|Private|SemiPrivate|FullPrivate|Login|Gift Plan|Link Plan|Views|Likes|Package Plan|Livestream|Post Views|Reactions|Members|Custom)/i; 
    let targetSection = item.section.replace(/ \(.*\)/, ''); 
    const sectionStartIndex = lines.findIndex(line => line.toLowerCase().includes(targetSection.toLowerCase()));
    if (sectionStartIndex !== -1) {
      let sectionEndIndex = lines.findIndex((line, index) => index > sectionStartIndex && (sectionHeaders.test(line) || line.includes("Payment Methods")));
      if (sectionEndIndex === -1) sectionEndIndex = lines.length;
      return lines.slice(sectionStartIndex + 1, sectionEndIndex).filter(l => l.length > 0).join('\n').trim();
    }
    return fullText.replace(generalDetailsBlock.trim(), '');
  }
  
  function goCheckoutView() {
    if (!cart.length) { alert("Your cart is empty."); return; }
    lastViewBeforeCheckout = dom.views.product.classList.contains('active') ? 'product' : 'home';
    localStorage.setItem('blp_cart', JSON.stringify(cart));
    const uniqueProductNotes = new Map();
    cart.forEach(item => {
        const productKey = item.product + item.section; 
        const noteContent = getNoteForCartItem(item); 
        if (noteContent) uniqueProductNotes.set(productKey, { item, noteContent });
    });
    const noteBlocks = Array.from(uniqueProductNotes.values()).map(({ item, noteContent }) => `
      <div style="margin-bottom:12px"><strong>${escapeHTML(item.product)} • ${escapeHTML(item.section)}</strong>
        ${noteContent.split('\n').map(l => `<div class="nt-line burmese-font">${escapeHTML(l.trim())}</div>`).join('')}
      </div>`).join('');
    dom.checkout.noteText.innerHTML = noteBlocks + formatNotes(paymentInfoBlock.trim());
    dom.checkout.noteStep.style.display = 'block';
    dom.checkout.receiptStep.style.display = 'none';
    dom.checkout.nextBtn.style.display = 'none';
    showView('checkout');
    window.scrollTo(0, 0);
  }

  function buildReceipt() {
    const c = JSON.parse(localStorage.getItem('blp_cart') || '[]');
    const total = c.reduce((s, x) => s + x.unitPrice * x.qty, 0);
    if (c.length === 1) {
      const x = c[0];
      dom.checkout.receipts.single.style.display = 'block';
      dom.checkout.receipts.multi.style.display = 'none';
      dom.checkout.receipts.r1_item.textContent = x.product;
      dom.checkout.receipts.r1_plan.textContent = x.section;
      dom.checkout.receipts.r1_duration.textContent = x.duration + (x.qty > 1 ? ` × ${x.qty}` : '');
      dom.checkout.receipts.r1_price.textContent = formatKyats(x.unitPrice * x.qty);
    } else {
        dom.checkout.receipts.single.style.display = 'none';
        dom.checkout.receipts.multi.style.display = 'block';
        dom.checkout.receipts.rm_itemList.innerHTML = c.map(i => `
            <div class="receipt-line-item">
                <div class="title">${escapeHTML(i.product)}${i.qty > 1 ? ` (x${i.qty})` : ''}</div>
                <div class="details">${escapeHTML(i.section)} • ${escapeHTML(i.duration)}</div>
                <div class="price">${formatKyats(i.unitPrice * i.qty)}</div>
            </div>`).join('');
        dom.checkout.receipts.rm_total.textContent = formatKyats(total);
    }
    const clipboardText = c.map(i => `- ${i.product} (${i.section})${i.qty > 1 ? ` x${i.qty}` : ''}\n  Price: ${formatKyats(i.unitPrice * i.qty)}`).join('\n\n') + `\n-------------------\nTotal: ${formatKyats(total)}`;
    dom.checkout.receiptText.value = clipboardText;
  }

  function formatDetails(raw) {
    const lines = raw.trim().split(/\n+/).map(line => {
      let t = line.trim(); if (!t) return "";
      return `<div class="md-p burmese-font">${escapeHTML(t)}</div>`;
    }).join("");
    return lines;
  }
  
  function formatNotes(raw) {
    return raw.split(/\n+/).map(line => `<div class="nt-line burmese-font">${escapeHTML(line.trim())}</div>`).join("");
  }

  dom.search.input.addEventListener('input', (e) => { if (dom.views.home.classList.contains('active')) filterProducts(e.target.value); });
  dom.search.clearBtn.addEventListener('click', () => { dom.search.input.value = ''; filterProducts(''); });
  document.addEventListener('DOMContentLoaded', () => { productCards = Array.from(dom.views.home.querySelectorAll('.card[data-product-name]')); renderPopular("popular-home"); });
  document.getElementById('checkout-btn').addEventListener('click', goCheckoutView);
    
  document.body.addEventListener('click', async (e) => {
    const target = e.target;
    const productCard = target.closest('[data-product-name]');
    if (productCard && (productCard.classList.contains('card') || productCard.classList.contains('pop-card'))) {
      openProduct(productCard.dataset.productName);
      return;
    }
    if (target.id === 'product-back-btn') {
      const currentTitle = document.querySelector('.hero-title')?.innerText;
      if (currentTitle?.includes('Google Play') && !currentTitle?.includes('Gift Card')) {
          renderRegionalSelector("Google Play Gift Card", regionalProducts["Google Play Gift Card"]);
          return;
      }
      showView('home');
      window.scrollTo(0, lastScroll);
      return;
    }
    if (target.closest('.hero-more')) {
      const productName = target.closest('.hero-more').dataset.productName;
      dom.explain.text.innerHTML = formatDetails(moreDetailsByProduct[productName] || "More details coming soon.");
      dom.explain.overlay.style.display = "grid";
      return;
    }
    if (target.closest('#why-buy-btn')) { dom.whyBuy.overlay.style.display = "grid"; return; }
    if (target.closest('#explain-ok-btn')) { dom.explain.overlay.style.display = "none"; return; }
    if (target.closest('#why-buy-back-btn')) { dom.whyBuy.overlay.style.display = "none"; return; }
    const qtyBtn = target.closest('.qty-btn');
    if (qtyBtn) {
      const item = JSON.parse(qtyBtn.dataset.item);
      if (qtyBtn.dataset.action === "inc") addToCart(item);
      else decFromCart(item);
      return;
    }
    if (target.id === 'clear-cart-btn') { clearCart(); return; }
    if (target.id === 'checkout-back-btn') { showView(lastViewBeforeCheckout); return; }
    if (target.closest('#note-ok-btn')) {
      dom.checkout.noteStep.style.display = 'none';
      dom.checkout.receiptStep.style.display = 'block';
      buildReceipt();
      return;
    }
    if (target.closest('#copy-receipt-btn')) {
      await navigator.clipboard.writeText(dom.checkout.receiptText.value);
      target.closest('#copy-receipt-btn').textContent = 'Copied!';
      dom.checkout.nextBtn.style.display = 'inline-block';
      return;
    }
  });

})();
