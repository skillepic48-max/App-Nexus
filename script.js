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

  // --- CONFIG FOR CUSTOM AMOUNT CALCULATOR ---
  // Updated rates based on price increase (approx +20%)
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
      Share: [
        { duration: "1 Month", price: "8,000 Kyats" }  
      ], 
      Private: [
        { duration: "7 Days", price: "4,000 Kyats" }, 
        { duration: "1 Month", price: "13,000 Kyats" }
      ],
      "Private Own Mail": [
        { duration: "7 Days", price: "6,000 Kyats" },  
        { duration: "1 Month", price: "17,000 Kyats" }  
      ]
    }, 
    "AlightMotion": { 
        Share: [{ duration: "9 Months", price: "3,500 Kyats" }, { duration: "1 Year", price: "5,000 Kyats" }], 
        Private: [{ duration: "9 Months", price: "5,500 Kyats" }, { duration: "1 Year", price: "7,000 Kyats" }], 
        "Private (Own Mail)": [{ duration: "9 Months", price: "7,500 Kyats" }, { duration: "1 Year", price: "9,000 Kyats" }] 
    }, 
    "Wink": { 
        "Share": [
            { "duration": "1 Month", "price": "9,000 Kyats" },
            { "duration": "1 Year", "price": "70,000 Kyats" }
        ], 
        "Private": [
            { "duration": "1 Week", "price": "5,000 Kyats" }, 
            { "duration": "1 Month", "price": "23,000 Kyats" }
        ],
        "Private (Own Mail)": [
            { "duration": "1 Month", "price": "25,000 Kyats" } 
        ]
    }, 
    "Meitu": { 
        "Private": [
            { duration: "1 Week", price: "5,000 Kyats" }, 
            { duration: "20 Days", price: "10,000 Kyats" }
        ], 
        "Share": [
            { duration: "20 Days", price: "6,500 Kyats" }
        ] 
    }, 
    "PicsArt": { "Share": [{ duration: "1 Month", price: "5,000 Kyats" }], "Private": [{ duration: "1 Month", price: "8,000 Kyats" }] }, 
    "Canva": { 
      "Pro Share": [
        { duration: "1 Month", price: "2,500 Kyats" }
      ], 
      "Educational(Invite)": [
        { duration: "Lifetime", price: "5,000 Kyats" } 
      ],
      "Pro Private": [{ duration: "1 Month", price: "7,000 Kyats" }, { duration: "3 Months", price: "20,000 Kyats" }] 
    }, 
    "PhotoRoom": { Share: [{ duration: "1 Year", price: "8,000 Kyats" }], Private: [] }, 
    "VSCO": { Share: [{ duration: "1 Year", price: "8,500 Kyats" }], Private: [] }, 
    "Remini": { 
      Share: [{ duration: "1 Month (Web)", price: "5,000 Kyats" }, { duration: "1 Year (APK Lite)", price: "18,000 Kyats" }, { duration: "1 Year (APK Pro)", price: "24,000 Kyats" }], 
      Private: [{ duration: "1 Month (Web)", price: "8,500 Kyats" }]
    }, 
    "Express Vpn": { 
      Share: [{ duration: "1 Month", price: "3,000 Kyats" }, { duration: "PC / Laptop (1 Month)", price: "4,500 Kyats" }], 
      Private: [{ duration: "1 Month", price: "9,900 Kyats" }] 
    }, 
    "NordVpn": { Share: [{ duration: "1 Year", price: "30,000 Kyats" }], Private: [{ duration: "3 Months", price: "26,000 Kyats" }] }, 
    "Surfshark Vpn": { 
        Share: [
            { duration: "1 Month", price: "8,500 Kyats" }, 
            { duration: "2 Months", "price": "11,000 Kyats" }
        ], 
        Private: [
            { duration: "2 Months", "price": "29,000 Kyats" }
        ] 
    }, 
    "Windows License": { 
        Share: [], 
        Private: [
            { duration: "Windows 10 Pro", price: "20,000 Kyats" }, 
            { duration: "Windows 11 Pro", price: "21,000 Kyats" }
        ] 
    }, 
    "Microsoft 365": { "Individual": [{ duration: "1 Month", price: "Out of stock" }], "Invite with email": [{ duration: "1 Month", price: "8,000 Kyats" }], "Family Head(Can Invite 5 email)": [{ duration: "1 Month", price: "16,000 Kyats" }] }, 
    "Netflix": { 
      "1 Profile": [ 
        { duration: "(Semiprivate 2 devices 1Month)", price: "16,500 Kyats" }
      ], 
      "Whole Account": [ 
        { duration: "5 Profiles (1 Month)", price: "60,000 Kyats" } 
      ] 
    }, 
    "Disney+": { 
        "Plan Basic": [
            { duration: "Sharing 6U (Limited Screen)", price: "Out of stock" } 
        ], 
        "Plan Premium": [
            { duration: "Sharing 6U (Limited Screen)", price: "Out of stock" }, 
            { duration: "Sharing 3U (No Limit)", price: "Out of stock" }
        ]
    }, 
    "HBO Max": { 
        "HBO MAX (ULTIMATE) 1 Month": [ 
            { duration: "1P 2U", price: "9,000 Kyats" }, 
            { duration: "Semiprivate", price: "16,000 Kyats" } 
        ],
        "Private Whole Account (1 Month)": [ 
            { duration: "5 Profile", price: "51,000 Kyats" } 
        ]
    }, 
    "Prime Video": { Share: [{ duration: "1 Month", price: "6,900 Kyats" }], Private: [{ duration: "1 Month", price: "13,500 Kyats" }] }, 
    "Spotify": { 
      "Individual Plan(Private)": [ 
        { "duration": "3 Months", "price": "35,000 Kyats" } 
      ] 
    }, 
    "Apple Music": { 
        "Individual Plan": [{ "duration": "1 Month (Can renew)", "price": "7,000 Kyats" }] 
    },
    "Qobuz": {
        "Individual Plan": [
            { "duration": "1 Month", "price": "12,000 Kyats" }
        ]
    },
    "Google Drive": { Share: [], Private: [{ duration: "Lifetime (1000GB)", price: "39,000 Kyats" }] }, 
    "iCloud": { 
        Share: [
            { duration: "Gift Card — 1 Month (50GB)", price: "Out of stock" }, 
            { duration: "Invite Email — 1 Month (100GB)", price: "Out of stock" }
        ], 
        Private: [] 
    }, 
    "Google One": { Share: [], Private: [{ duration: "1 Year (2000GB + Veo3 Gemini AI)", price: "29,000 Kyats" }] }, 
    "TeraBox": { 
        "Sharing": [
            { duration: "1 Year (2TB)", price: "22,000 Kyats" }
        ]
    },
    "ChatGPT Plus": { 
        "Personal Plus (Private)": [
            { duration: "1 Month", price: "19,000 Kyats" } 
        ],
        "Business - Invite Own Email": [
            { duration: "1 Month", price: "16,000 Kyats" } 
        ],
        "Business Plus Own": [
            { duration: "1 Month", price: "27,000 Kyats" } 
        ],
        "Business Plus Own(Full Warranty)": [
            { duration: "1 Month", price: "30,900 Kyats" } 
        ]
    },
    "Gemini Veo 3": { 
        "Private(Can Invite 5 Email)": [ 
            { duration: "1 Month (+2000GB storage)", price: "13,500 Kyats" }, 
            { duration: "1 Year (+2000GB storage)", price: "28,000 Kyats" }
        ]
    }, 
    "Grammarly AI": { Share: [{ duration: "1 Month", price: "6,500 Kyats" }], Private: [] }, 
    "Zoom": { 
        "Private": [
            { "duration": "14 Days", "price": "6,000 Kyats" },
            { "duration": "1 Month", "price": "10,599 Kyats" }
        ] 
    }, 
    "YouTube": { 
      "Private": [
        { "duration": "1 Month", "price": "7,000 Kyats" }, 
        { "duration": "3 Months", "price": "19,000 Kyats" } 
      ] 
    }, 
    "Tinder": { "Tinder Plus Share": [{ "duration": "6 Months", "price": "Out of stock" }] }, 
    "Telegram": { 
      "Login": [
        { "duration": "1 Month", "price": "24,000 Kyats" }, 
        { "duration": "1 Year", "price": "121,000 Kyats" } 
      ], 
      "Gift Plan": [
        { "duration": "3 Months", "price": "62,500 Kyats" }, 
        { "duration": "6 Months", "price": "86,500 Kyats" }, 
        { "duration": "12 Months", "price": "158,000 Kyats" } 
      ], 
      "Link Plan": [
        { "duration": "3 Months", "price": "57,500 Kyats" }, 
        { "duration": "6 Months", "price": "78,500 Kyats" }, 
        { "duration": "12 Months", "price": "137,000 Kyats" } 
      ] 
    }, 
    "Discord": {
        "Nitro Basic (Key)": [
            { "duration": "3 Months", "price": "38,500 Kyats" }
        ]
    },
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
    "WPS Office": { 
        "Sharing Pro": [
            { duration: "1 Month", price: "10,000 Kyats" },
            { duration: "1 Year", price: "39,500 Kyats" }
        ]
    },
    "TradingView": { 
        "Private": [
            { duration: "1 Month", price: "33,000 Kyats" }
        ]
    },
    "PlaySafeCard": { "Voucher": [{ duration: "1 Card", price: "5,000 Kyats" }] }, 
    
    // RESTORED PRODUCTS WITH NEW PRICES
    "TikTok Official": {
      "Login method": [
        { "duration": "100 Coin", "price": "5,300 Kyats" }
      ]
    },
    "TikTok Non Official": {
      "Views (NoDrop)": [
        { "duration": "10,000 Views", "price": "1,500 Kyats" },
        { "duration": "100,000 Views", "price": "7,500 Kyats" }, 
        { "duration": "1,000,000 Views", "price": "25,000 Kyats" }
      ],
      "Likes (NoDrop)": [
        { "duration": "1,000 Likes", "price": "3,000 Kyats" },
        { "duration": "10,000 Likes", "price": "16,500 Kyats" },
        { "duration": "100,000 Likes", "price": "120,000 Kyats" }
      ],
      "Package Plan": [
        { "duration": "100k Views + 10k Likes", "price": "15,000 Kyats" },
        { "duration": "1M Views + 100k Likes", "price": "135,000 Kyats" }
      ],
      "Livestream Views": [
        { "duration": "1,000 Views (15 min)", "price": "12,000 Kyats" },
        { "duration": "1,000 Views (30 min)", "price": "25,000 Kyats" },
        { "duration": "1,000 Views (60 min)", "price": "42,000 Kyats" },
        { "duration": "10,000 Views (15 min)", "price": "90,000 Kyats" }
      ],
      "Livestream Likes": [
        { "duration": "1,000 Likes", "price": "1,500 Kyats" },
        { "duration": "10,000 Likes", "price": "3,000 Kyats" },
        { "duration": "100,000 Likes", "price": "20,000 Kyats" }
      ],
      "Livestream Share": [
        { "duration": "1,000 Shares", "price": "2,000 Kyats" },
        { "duration": "10,000 Shares", "price": "9,000 Kyats" }
      ]
    },
    "Telegram Boosting": {
      "Post Views": [
        { "duration": "1,000 Views", price: "1,500 Kyats" }, 
        { "duration": "10,000 Views", price: "2,000 Kyats" }, 
        { "duration": "100,000 Views", price: "15,000 Kyats" }
      ],
      "Positive Reactions": [
        { "duration": "1,000 Reactions", price: "1,500 Kyats" }, 
        { "duration": "10,000 Reactions", price: "6,500 Kyats" }
      ],
      "Negative Reactions": [
        { "duration": "1,000 Reactions", price: "1,500 Kyats" }, 
        { "duration": "10,000 Reactions", price: "6,500 Kyats" }
      ],
      "Custom Reactions": [
        { "duration": "1,000 Reactions", price: "1,500 Kyats" }
      ],
      "Premium Reactions": [
        { "duration": "1,000 Reactions", price: "3,000 Kyats" }
      ],
      "Members (30Days Refill)": [
        { "duration": "1,000 Members", price: "16,000 Kyats" }
      ]
    },
    "YouTube Boosting": {
      "Livestream Views": [
        { "duration": "10,000 Views (15 min)", price: "8,000 Kyats" },
        { "duration": "10,000 Views (30 min)", price: "19,000 Kyats" }
      ],
      "Comment - Impression Type": [
        { "duration": "1,000 Comment (15 min)", price: "16,500 Kyats" }
      ],
      "Comment - Custom Type": [
        { "duration": "1 Comment", price: "200 Kyats" }
      ]
    },
    "Facebook Boosting": {
        "Video Views(Lifetime Refill)": [
            { "duration": "1,000 Views", "price": "2,000 Kyats" },
            { "duration": "10,000 Views", "price": "7,500 Kyats" },
            { "duration": "100,000 Views", "price": "50,000 Kyats" },
            { "duration": "1,000,000 Views", "price": "430,000 Kyats" }
        ],
        "Post Like(30Days Refill)": [
            { "duration": "1,000 Likes", "price": "6,500 Kyats" },
            { "duration": "10,000 Likes", "price": "65,000 Kyats" },
            { "duration": "100,000 Likes", "price": "530,000 Kyats" }
        ],
        "Post Like(1Year Refill)": [
            { "duration": "1,000 Likes", "price": "8,500 Kyats" },
            { "duration": "10,000 Likes", "price": "65,000 Kyats" },
            { "duration": "100,000 Likes", "price": "640,000 Kyats" }
        ],
        "Post Like(Lifetime Refill)": [
            { "duration": "1,000 Likes", "price": "9,500 Kyats" },
            { "duration": "10,000 Likes", "price": "77,000 Kyats" },
            { "duration": "100,000 Likes", "price": "740,000 Kyats" }
        ],
        "Profile Followers(Lifetime Refill)": [
            { "duration": "1,000 Followers", "price": "13,000 Kyats" },
            { "duration": "10,000 Followers", "price": "130,000 Kyats" }
        ],
        "Page follower(No Drop 2Year Warranty)": [
            { "duration": "1,000 Followers", "price": "17,000 Kyats" },
            { "duration": "10,000 Followers", "price": "170,000 Kyats" }
        ],
        "Follower(Page&Profile)(30Days Refill)": [
            { "duration": "1,000 followers", "price": "5,000 Kyats" },
            { "duration": "10,000 followers", "price": "40,000 Kyats" }
        ],
        "Live Stream Views": [
            { "duration": "1,000 Views", "price": "15,000 Kyats" }
        ]
    },
    "Instagram Boosting": {
        "Video Views & Reels(SLOW)": [
            { "duration": "1,000 Views", "price": "1,500 Kyats" },
            { "duration": "10,000 Views", "price": "3,500 Kyats" },
            { "duration": "100,000 Views", "price": "4,800 Kyats" },
            { "duration": "1,000,000 Views", "price": "23,000 Kyats" }
        ],
        "Video Views & Reels(FAST)": [
            { "duration": "1,000 Views", "price": "2,500 Kyats" },
            { "duration": "10,000 Views", "price": "3,000 Kyats" },
            { "duration": "100,000 Views", "price": "4,700 Kyats" },
            { "duration": "1,000,000 Views", "price": "30,000 Kyats" }
        ],
        "Likes(FAST & 30DAYS REFILL)": [
            { "duration": "1,000 Likes", "price": "3,500 Kyats" },
            { "duration": "10,000 Likes", "price": "23,000 Kyats" },
            { "duration": "100,000 Likes", "price": "180,000 Kyats" }
        ],
        "Likes(SUPER FAST & LIFETIME)": [
            { "duration": "1,000 Likes", "price": "3,200 Kyats" },
            { "duration": "10,000 Likes", "price": "31,000 Kyats" },
            { "duration": "100,000 Likes", "price": "240,000 Kyats" }
        ],
        "Share(Slow but Cheapest)": [
            { "duration": "1,000 Shares", "price": "1,500 Kyats" },
            { "duration": "10,000 Shares", "price": "3,500 Kyats" },
            { "duration": "100,000 Shares", "price": "42,000 Kyats" }
        ],
        "Share(FAST)": [
            { "duration": "1,000 Shares", "price": "4,000 Kyats" },
            { "duration": "10,000 Shares", "price": "4,000 Kyats" },
            { "duration": "100,000 Shares", "price": "17,000 Kyats" }
        ],
        "Save(FAST)": [
            { "duration": "1,000 Saves", "price": "4,000 Kyats" },
            { "duration": "10,000 Saves", "price": "10,500 Kyats" },
            { "duration": "100,000 Saves", "price": "82,000 Kyats" }
        ],
        "Reach+Impression(Normal Speed)": [
            { "duration": "1,000 RI", "price": "2,000 Kyats" },
            { "duration": "10,000 RI", "price": "12,000 Kyats" },
            { "duration": "100,000 RI", "price": "88,000Kyats" }
        ],
        "Followers(SLOW)": [
            { "duration": "1,000(30Days Refill)", "price": "10,000 Kyats" },
            { "duration": "1,000(1Year Refill)", "price": "15,000 Kyats" },
            { "duration": "1,000(Lifetime Refill)", "price": "18,500 Kyats" }
        ],
        "Followers(FAST)": [
            { "duration": "1,000(30Days Refill)", "price": "16,000 Kyats" },
            { "duration": "1,000(1Year Refill)", "price": "15,000 Kyats" }
        ]
    },
    "Custom Website Service": { 
        "Base Service": [
            { "duration": "Fully functional website", price: "150,000 Kyats" }
        ],
        "Normal Plan": [
            { "duration": "Custom Design & Fully Functional", price: "200,000 Kyats" }
        ]
    },
    "LightRoom": { 
        "Share": [
            { "duration": "1 Year", price: "15,599 Kyats" }
        ]
    },
    "Wattpad": { 
        "Sharing": [
            { "duration": "1 Month", price: "5,000 Kyats" },
            { "duration": "3 Months", price: "12,000 Kyats" },
            { "duration": "6 Months", price: "19,000 Kyats" },
            { "duration": "1 Year", price: "30,000 Kyats" }
        ]
    },
    "Photoshop": { 
        "Web Private": [
            { "duration": "12 Months", price: "18,000 Kyats" }
        ]
    },
    "Adobe Creative Cloud": {
        "Private": [
            { "duration": "4 Months", price: "30,000 Kyats" }
        ],
        "OwnMail Private": [
            { "duration": "4 Months", price: "37,000 Kyats" }
        ]
    },
    "HMA VPN": {
        "Private": [
            { "duration": "1 Month", price: "11,000 Kyats" }
        ]
    },
    "Crunchyroll": {
        "Share": [
            { "duration": "9 Months", price: "26,000 Kyats" }
        ]
    },
    "Telegram Star": {
        "Stars": [
            { "duration": "50 Stars", price: "5,800 Kyats" },
            { "duration": "100 Stars", price: "11,600 Kyats" }
        ]
    },
    "Google Play Gift Card": {
        "Select Region": []
    },
    "Google Play Japan": {
        "Japan Region (¥)": [
            { "duration": "¥500", price: "21,000 Kyats" },
            { "duration": "¥1,000", price: "42,000 Kyats" },
            { "duration": "¥1,500", price: "63,000 Kyats" }
        ]
    },
    "Google Play US": {
        "US Region ($)": [
             { "duration": "$5", price: "30,000 Kyats" },
             { "duration": "$10", price: "60,000 Kyats" },
             { "duration": "$50", price: "300,000 Kyats" },
             { "duration": "$100", price: "600,000 Kyats" }
        ]
    },
    "Google Play UK": {
        "UK Region (£)": [
            { "duration": "£5", price: "39,000 Kyats" },
            { "duration": "£10", price: "78,000 Kyats" },
            { "duration": "£50", price: "390,000 Kyats" },
            { "duration": "£100", price: "780,000 Kyats" },
            { "duration": "£500", price: "3,900,000 Kyats" }
        ]
    },
    "Google Play Turkey": {
        "Turkey Region (TL)": [
             { "duration": "25 TL", price: "3,780 Kyats" },
             { "duration": "50 TL", price: "7,560 Kyats" },
             { "duration": "75 TL", price: "11,340 Kyats" },
             { "duration": "100 TL", price: "15,120 Kyats" }
        ]
    },
    "Google Play Indonesia": {
        "Indonesia Region (IDR)": [
             { "duration": "5,000 IDR", price: "1,740 Kyats" },
             { "duration": "10,000 IDR", price: "3,480 Kyats" },
             { "duration": "100,000 IDR", price: "34,800 Kyats" }
        ]
    },
    "Google Play Brazil": {
        "Brazil Region (BRL)": [
             { "duration": "15 BRL", price: "17,400 Kyats" },
             { "duration": "20 BRL", price: "23,200 Kyats" },
             { "duration": "25 BRL", price: "29,000 Kyats" },
             { "duration": "30 BRL", price: "34,800 Kyats" },
             { "duration": "40 BRL", price: "46,400 Kyats" },
             { "duration": "50 BRL", price: "58,000 Kyats" },
             { "duration": "75 BRL", price: "87,000 Kyats" },
             { "duration": "150 BRL", price: "174,000 Kyats" },
             { "duration": "250 BRL", price: "290,000 Kyats" },
             { "duration": "300 BRL", price: "348,000 Kyats" }
        ]
    },
    "Google Play South Korea": {
        "Korea Region (₩)": [
             { "duration": "5,000 ₩", price: "22,200 Kyats" },
             { "duration": "10,000 ₩", price: "44,400 Kyats" },
             { "duration": "30,000 ₩", price: "133,200 Kyats" }
        ]
    },
    "Google Play India": {
        "India Region (₹)": [
             { "duration": "10 ₹", price: "960 Kyats" },
             { "duration": "25 ₹", price: "2,070 Kyats" },
             { "duration": "30 ₹", price: "2,412 Kyats" },
             { "duration": "50 ₹", price: "3,522 Kyats" },
             { "duration": "100 ₹", price: "7,050 Kyats" },
             { "duration": "300 ₹", price: "21,150 Kyats" },
             { "duration": "500 ₹", price: "35,250 Kyats" },
             { "duration": "1000 ₹", price: "70,500 Kyats" }
        ]
    },
    "Google Play Australia": {
        "Australia Region (A$)": [
             { "duration": "$5", price: "36,000 Kyats" },
             { "duration": "$10", price: "72,000 Kyats" },
             { "duration": "$50", price: "360,000 Kyats" },
             { "duration": "$100", price: "720,000 Kyats" }
        ]
    },
    "Google Play Germany": {
        "Germany Region (€)": [
             { "duration": "€5", price: "36,000 Kyats" },
             { "duration": "€10", price: "72,000 Kyats" },
             { "duration": "€50", price: "360,000 Kyats" },
             { "duration": "€100", price: "720,000 Kyats" }
        ]
    },
    "Google Play France": {
        "France Region (€)": [
             { "duration": "€5", price: "36,000 Kyats" },
             { "duration": "€10", price: "72,000 Kyats" },
             { "duration": "€50", price: "360,000 Kyats" },
             { "duration": "€100", price: "720,000 Kyats" }
        ]
    },
    "Google Play Italy": {
        "Italy Region (€)": [
             { "duration": "€5", price: "36,000 Kyats" },
             { "duration": "€10", price: "72,000 Kyats" },
             { "duration": "€50", price: "360,000 Kyats" },
             { "duration": "€100", price: "720,000 Kyats" }
        ]
    },
    "Google Play Switzerland": {
        "Switzerland Region (CHF)": [
             { "duration": "5 CHF", price: "39,000 Kyats" },
             { "duration": "10 CHF", price: "78,000 Kyats" },
             { "duration": "50 CHF", price: "390,000 Kyats" },
             { "duration": "100 CHF", price: "780,000 Kyats" }
        ]
    },
    "Google Play Canada": {
        "Canada Region (C$)": [
             { "duration": "$10", price: "59,160 Kyats" },
             { "duration": "$20", price: "96,000 Kyats" },
             { "duration": "$30", price: "142,620 Kyats" },
             { "duration": "$75", price: "356,580 Kyats" },
             { "duration": "$100", price: "475,440 Kyats" }
        ]
    },
    "Google Play Poland": {
        "Poland Region (PLN)": [
             { "duration": "20 PLN", price: "35,400 Kyats" },
             { "duration": "30 PLN", price: "43,980 Kyats" },
             { "duration": "50 PLN", price: "88,080 Kyats" },
             { "duration": "75 PLN", price: "120,480 Kyats" },
             { "duration": "150 PLN", price: "264,000 Kyats" }
        ]
    },
    "Google Play UAE": {
         "UAE Region (AED)": [] // Custom only
    }
  };

  const paymentInfoBlock = `\n\nWe only accept KBZpay & Wave pay\nWe only use this number for both Payments\nKBZpay-09771664207\n(Name MyinMyintMaw)\nWave - 09771664207\n(Name MyinMyintMaw)\n\nWATCH OUT FOR SCAMMER!!`; 
    
  const generalDetailsBlock = `\n\nWe only accept KBZpay & Wave pay\nWe only use this number for both Payments\nKBZpay-09771664207\n(Name MyinMyintMaw)\nWave - 09771664207\n(Name MyinMyintMaw)\n\nWATCH OUT FOR SCAMMER!!`;

  const expressVpnShareNoteBase = `
တခါတလေအကောင့်ကထွက်တာမျိုးနေဖြစ်နိုင်တယ်but ပြန်ဝင်လို့ရပါတယ်

ပီးတော့စဝယ်တဲ့ရက်ကနေ premium ရက် 25ကနေ 31ရက်ကြားက stock ရှိတာရမာပါ။
`;

  const chatGptWarrantyNote = `$20≈$30နဲ့ဝယ်တဲ့ဟာတေမမဟုတ်ရင် Deactivate errorဖြစ်နိုင်လို့ warranty အနေနဲ့ဖြစ်ခဲ့ရင် 1ခုအသစ်ပြန်လဲပေးမာပါ တခါပဲလဲပေးမာမလို့အဆင်ပြေမယူပေးပါ`;

  // --- NEW: Constant Description for Netflix ---
  const netflixUhdNote = `Subscription: Premium UHD
•Ultra HD (4K) video quality
•HDR support (on compatible titles/devices)
•Best audio quality (including Dolby Atmos on some titles/devices)
•Download on multiple devices (highest limit vs other plans)
•Works on all devices (TV, phone, tablet, laptop)
•Includes full Netflix library (movies, series, originals)`;

  const moreDetailsByProduct = { 
    "CapCut": `Share
One device only
ဖုန်းတလုံးပဲသုံးလို့ရပါတယ် Android & iOS
• Sharing အကောင့်တေက Pro ပြုတ်တယ်ပါတယ်။
Device limit ကျော်သုံးရင်တခြားလူနဲ့ Shareသုံးရတာမလို့ဖြစ်လာရင်ဘယ်သူလုပ်လဲမသိရတာမလို့ warranty 15ရက်ပဲ ပေးပါတယ်။
(we fully renew if Pro stops)

Private
2 devices max. Full warranty for the entire plan duration.

Private Own Mail
2 devices max. Full warranty for the entire plan duration.` + generalDetailsBlock,
    "AlightMotion": `Share
Full warranty for full duration
Covers premium subscription errors
We'll renew a new one if any error occurs

Private
Full warranty for full duration
8 devices max
Covers premium subscription errors
We'll renew a new one if any error occurs

Private (Own Mail)
Full warranty for full duration
8 devices max
Covers premium subscription errors
We'll renew a new one if any error occurs` + generalDetailsBlock,
    "Wink": `Share
One device only
Full warranty for full duration

Private
Full warranty for full duration
3 devices max

Private (Own Mail)
Full warranty for full duration` + generalDetailsBlock, 
    "Meitu": `Share\nOne device only\nFull warranty.\n\nPrivate\nFull warranty.\n3 devices max` + generalDetailsBlock, 
    "PicsArt": `Share
Full warranty for full duration
One device only
Sharingမို့လို့ Edit history တေတခြား Shareဝယ်တဲ့သူတေနဲ့အကုန်မြင်နေမာပါ။
အဆင်ပြေတယ်ဆိုမသာယူပါ။

Private
Full warranty for full duration
Up to 5 devices` + generalDetailsBlock, 
    "Canva": `Pro Share
Full warranty

Educational(Invite)
Is education edition (limited features)

Pro Private
Full warranty
Up to 100 accounts via invite email
Canva Account တေက device limit ကန့်သတ်ချက်မရှိလို့ကြိုက်သလောက်သုံးလို့ရပါတယ် email တခုကို။` + generalDetailsBlock, 
    "VSCO": `Share\nFull warranty for full duration\nOne device only` + generalDetailsBlock, 
    "PhotoRoom": `Share\n6-months warranty\nNo warranty ≠ will fail\nOne device only` + generalDetailsBlock, 
    "Remini": `Share
Website 1-Month: full warranty
APK 1-Year: 6-months warranty
One device only

Private
1 Month (Web)
5 devices maxသုံးလို့ရပါတယ်။
Support All device
Full Warranty` + generalDetailsBlock,
    "NordVpn": `Share\n1-Year: 6-months warranty\nOne device only\n\nPrivate\nFull warranty for full duration\nUp to 6 devices` + generalDetailsBlock, 
    "Express Vpn": `Share\nFull warranty for full duration\nOne device only\n\nPrivate\nFull warranty for full duration\nUp to 9 devices: 8 Phones & 1 PC or Laptop\nCustom Password` + generalDetailsBlock, 
    "Surfshark Vpn": `Share
Full warranty for full duration
One device only

Private
10 Devices can use. 
Support all device.
Full warranty` + generalDetailsBlock, 
    "Windows License": `100% original license\nSupports 32/64-bit\nOriginal retail key` + generalDetailsBlock, 
    "Microsoft 365": `Individual
Up to 5 devices

Invite with email
Only 1 device per invite

Family Head(Can Invite 5 email)
ကျနော်ပေးမဲ့ Head အကောင့်အပါအဝင်တခြား email 5ခုလုံးက(Word, Excel, etc.) and 1TB of OneDrive storageစတဲ့ Microsoft Copilot Proမာပါတဲ့ features တေအကုန်သုံးလို့ရသွားမာပါ။` + generalDetailsBlock, 
    // UPDATED: Netflix Description
    "Netflix": `1 Profile
Own 1 profile you can use 2 devices
Netflix အကောင့်တေကိုwarrantyအပြည့်ပေးထားပါတယ်ဒါပေမဲ့ setting တေကလိပီးဖြစ်လာတဲ့ error တေအတွက်fixing time 1 to 2Days လောက်ထိကြာနိုင်ပါတယ်။ကိုယ်ကဘာမမလုပ်ရင်တောင်တခြားpfကလူတေလုပ်လို့ဖြစ်ရင်လဲfixing time စောင့်ရမာပါ။

Whole Account
Own 5 profiles you can use 10 devices` + generalDetailsBlock, 
    "Disney+": `Plan Basic (Limited Screen)
Sharing up to 6 users.

Plan Premium (No Limit)
Sharing up to 3 users with full control, no screen limits.` + generalDetailsBlock, 
    "HBO Max": `HBO MAX (ULTIMATE) 1 Month
1P 2U: 1 Profile / 2 Users
Semiprivate: 1 Profile / Semi-Private

Private Whole Account (1 Month)
5 Profile` + generalDetailsBlock, 
    "Prime Video": `Share\nFull warranty • One device only\n\nPrivate\nFull warranty • Up to 3 devices` + generalDetailsBlock, 
    "Spotify": `Individual Plan(Private)
• Private Plan မို့လို့ 1 person 1 device ပဲသုံးသင့်ပါတယ်။ Visa Card payment နဲ့လုပ် ပေးမာပါ။ 3 Months အတွင်း full warranty ဖြစ်လို့တခုခုဖြစ်ခဲ့ရင် warranty အနေနဲ့အခုပြန်လဲ ပေးမာပါ တခါပဲလဲ ပေးမာပါ။ Setting ထဲသွားပီး account delete တာတို့တော့မပါပါဘူး။

Official appမာသုံးရတာဆိုပေမဲ့တစ်လကို$11.99ပေးပီးဝယ်တာမဟုတ်လို့ Risk ကတော့ရှိပါတယ်။အဆင်ပြေတယ်ဆိုမယူပါ။

Old account က Playlist, Favorite Artist, Favorite Songs, Favorite albums,Liked Songsအကုန်အကာင့်အသစ်ကိုပြောင်းပေးပါတယ်။` + generalDetailsBlock,
    "Apple Music": `Individual Plan
Only for Android.
This did not work on iOS.
Full warranty.
Renewလို့ရပါတယ်။သက်တန်းတိုးရင်တော့တစ်လကို6,000Ksပါ။` + generalDetailsBlock,
    "Qobuz": `Individual Plan
Recommend for iOS device
Full warranty.` + generalDetailsBlock,
    "Google One": `Private (own mail)\nIncludes GeminiVeo3 AI + premium features\nFull warranty` + generalDetailsBlock, 
    "Google Drive": `Private (own mail)\n30-days warranty` + generalDetailsBlock, 
    "TeraBox": `Sharing (2TB)
Shared account. One device only.
Full warranty for plan duration.` + generalDetailsBlock, 
    "ChatGPT Plus": `Personal Plus (Private)
Up to 5 devices (not recommended)
${chatGptWarrantyNote}

Business - Invite Own Email
1 device
ဒါကကိုယ်သုံးနေတဲ့ Emailကို GPT Plus ပြောင်းပေးတာဖြစ်ပီး history ကလဲကိုယ့်အကောင့်ပဲမို့ private history နဲ့သုံးရမာပါ။
${chatGptWarrantyNote}

Business Plus Own
Can invite 4 Email
${chatGptWarrantyNote}

Business Plus Own(Full Warranty)
Full Warranty for full duration. Deactivateဖြစ်လဲတစ်လပြည့်တဲ့ထိလဲပေးမာပါ။` + generalDetailsBlock,
    "Gemini Veo 3": `Private(Can Invite 5 Email)
Includes 2000GB Google storage
Full warranty • Unlimited devices` + generalDetailsBlock, 
    "Grammarly AI": `Share\nFull warranty • One device only` + generalDetailsBlock, 
    "Zoom": `Full warranty.\nAll pro features unlock.\nCan use 2-5 devices.` + generalDetailsBlock, 
    "YouTube": `Private (Individual Plan)
Full warranty.
No ads with all YouTube premium features.
Including YouTube music.` + generalDetailsBlock, 
    "Tinder": `Code redeem use.\n1× warranty. Can only use one devices` + generalDetailsBlock, 
    "Telegram": `Login
• 1 Month — 21,000 Kyats
• 1 Year — 112,000 Kyats
• Login planကကျနော်တို့ဘက်ကအကောင့်ထဲဝင်ပီး Premium ဝယ်ပေးမာပါ။2 to 3Minလောက်ကြာနိုင်ပါတယ်။

Gift Plan & Link Plan
GiftPlan and Link Plan are same premium features.
Contact admin for more details.` + generalDetailsBlock, 
    "Discord": `Nitro Basic (Key)
This code can only be used on accounts that are at least one month old and have never subscribed to Discord Nitro. 
An active payment method is required to activate the code. 
The code can only be activated once per IP address or payment method. 
The code must be used within 1 week. 
The code must be activated via the https://discord.com/billing/promotions/(YOURKEY)` + generalDetailsBlock,
    "Perplexity Ai": `Share
One device only
Full warranty.

Private
Can use up to 5 devices.
Full warranty.
ကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။

OwnMail Private
Can use up to 5 devices.
Full warranty.
ကုန်ရင်သက်တန်းတိုးလို့ရပါတယ်။` + generalDetailsBlock, 
    "GAGAOOLALA": `Private\nFull warranty.` + generalDetailsBlock, 
    "BSTATION": `Private\nFull warranty.` + generalDetailsBlock, 
    "INSHOT": `Lifetime Premium
Mod appမဟုတ်ပါဘူး။Android onlyပဲသူံးလို့ရပါတယ်။ Playstore ကappမာပဲသုံးလို့ရပါမယ်။
Warranty 3လပေးပါတယ်။
Share plan မို့လို့ 1 device ပဲသုံးလို့ရပါမယ်။` + generalDetailsBlock, 
    "Duolingo Super": `Family Head(Can Invite 5 email)\nFull warranty for plan duration.\n\nInvite Private\nFull warranty for plan duration.` + generalDetailsBlock, 
    "SCRIBD": `Private\nFull warranty for plan duration.` + generalDetailsBlock,
    "WPS Office": `Sharing Pro
Full warranty for full duration.
One device only.
Includes all premium features in WPS. (Word, Spreadsheets, Presentation, PDF tools)` + generalDetailsBlock, 
    "TradingView": `Private
Full warranty for full duration.
Supports all devices.` + generalDetailsBlock, 
    "PlaySafeCard": `Voucher Code
Expires in 7 Days.
Please contact admin for usage details.` + generalDetailsBlock,
    "TikTok Official": `Coinက TikTok official boostတဲ့နေရာမာ Coin တေကိုသုံးရတာပါ။အဲ့ Coin ကိုရောင်းပေးတာပါ။ Login ဝင်ပီးဝယ်ရတာပါ။ buttt email password ဘာမပေးစရာမလိုပါဘူး။` + generalDetailsBlock,
    "TikTok Non Official": `Views (NoDrop)
    No dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။
       
    Likes (NoDrop)
    No dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။
       
    Package Plan
    No dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။` + generalDetailsBlock,
    "Telegram Boosting": `Post Reactions are Lifetime No-Drop. Members have a 30-day refill guarantee.` + generalDetailsBlock,
    "YouTube Boosting": `Livestream Views are Impression type, please contact admin for specific details before purchasing.` + generalDetailsBlock,
    "Facebook Boosting": `Various boosting services for views, likes, and followers. Please provide the correct link/URL for the service.` + generalDetailsBlock,
    "Instagram Boosting": `Views, Likes, and Followers services. Please provide the correct link/URL for the service.` + generalDetailsBlock,
    "Custom Website Service": `Base Service
ဒါက Any kinds of Website ကိုလိုချင်တဲ့ functionတေfully functionalဖြစ်တဲ့ထိလုပ်ပေးမာပါ။ Inspired design request လို့ရပါတယ်။ Custom Design package မဟုတ်လို့အရမ်း complex ဖြစ်တာတေတော့‌ Request လို့မရပါဘူး။ Website Codeတေလဲအပိုင်မရပါဘူး။ Domains ရှိရင်ထည့်ပေးပါတယ်။ မထည့်ပဲကျနော်လုပ်ပေးတဲ့အတိုင်းဆို lifetime ဘာhosting feeမပေးစရာမလိုပဲသူံးလို့ရပါတယ်။
More information on DM. Price may vary based on complexity.

Normal Plan
ဒါက Any kinds of Website ကိုလိုချင်တဲ့ functionတေfully functionalဖြစ်တဲ့ထိလုပ်ပေးမာပါ။ Custom Design packageဖြစ်လို့ Inspired Design တေစိတ်ကြိုက်ဖြစ်တဲ့ထိလုပ်‌ပေးမာပါ။ Website Codeတေက‌တော့အပိုင်မရပါဘူး။` + generalDetailsBlock,
    "LightRoom": `Share\nOne device only\nSharing account will mix projects with others user.` + generalDetailsBlock,
    "Wattpad": `Sharing\nOne device only\nFull warranty.` + generalDetailsBlock,
    "Photoshop": `Web Private\nwarranty back free only.` + generalDetailsBlock,
    "NordVpn": `Share\n1-Year: 6-months warranty\nOne device only\n\nPrivate\nFull warranty for full duration\nUp to 6 devices` + generalDetailsBlock, 
    "Surfshark Vpn": `Share\nFull warranty for full duration\nOne device only` + generalDetailsBlock, 
    "Adobe Creative Cloud": `Adobe Creative Cloud မာဆိုရင်

Photoshop → edit photos & images

Illustrator → make logos & vector designs

Premiere Pro → edit videos

After Effects → add animations & effects

InDesign → design posters, books, layouts

Acrobat Pro → edit & sign PDFs

စတဲ့ App တေရဲ့ Pro version တေအပြင်တခြား audio, animation, UI design, and content creationလုပ်ဖို့လိုတဲ့ Appတေပါပါမာပါ။` + generalDetailsBlock,
    "HMA VPN": `Can use 5 to 10 devices. Recommend for desktop devices.` + generalDetailsBlock,
    "Crunchyroll": `Share\n5-Months warranty • One device only` + generalDetailsBlock,
    "Telegram Star": `Usernameပဲလိုပါမယ်` + generalDetailsBlock,
    // DEFAULT DESCRIPTIONS FOR NEW GOOGLE PLAY REGIONS
    "Google Play Turkey": "Region: Turkey (TL)\nBuy specific amounts for Turkey Region accounts." + generalDetailsBlock,
    "Google Play Indonesia": "Region: Indonesia (IDR)\nBuy specific amounts for Indonesia Region accounts." + generalDetailsBlock,
    "Google Play Brazil": "Region: Brazil (BRL)\nBuy specific amounts for Brazil Region accounts." + generalDetailsBlock,
    "Google Play South Korea": "Region: South Korea (Won)\nBuy specific amounts for Korea Region accounts." + generalDetailsBlock,
    "Google Play India": "Region: India (INR)\nBuy specific amounts for India Region accounts." + generalDetailsBlock,
    "Google Play Australia": "Region: Australia (AUD)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Germany": "Region: Germany (EUR)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play France": "Region: France (EUR)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Italy": "Region: Italy (EUR)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Switzerland": "Region: Switzerland (CHF)\nBuy specific amounts or custom amount." + generalDetailsBlock,
    "Google Play Canada": "Region: Canada (CAD)\nBuy specific amounts." + generalDetailsBlock,
    "Google Play UAE": "Region: UAE (AED)\nCustom amount only." + generalDetailsBlock,
    "Google Play Poland": "Region: Poland (PLN)\nBuy specific amounts." + generalDetailsBlock
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
    // ADD NEW REGIONS SUPPORT
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
  // Store all product cards once the DOM is ready
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
    // Hide all views first
    Object.values(dom.views).forEach(v => v.classList.remove('active'));
      
    // Add active class and ensure animation restarts by re-adding the class
    if (dom.views[viewName]) {
      dom.views[viewName].classList.add('active');
    }
      
    // Control search bar visibility based on view
    if (viewName === 'home') {
        dom.search.container.style.display = 'flex';
    } else {
        dom.search.container.style.display = 'none';
        // Reset search field and filter state when leaving home
        dom.search.input.value = '';
        filterProducts('');
    }
  }
    
  /* =========================
      SEARCH LOGIC 
      ========================= */
  function filterProducts(query) {
    query = query.toLowerCase().trim();
      
    // Show/hide the clear button
    dom.search.clearBtn.style.display = query.length > 0 ? 'block' : 'none';
      
    // Toggle the search state class on the home view
    dom.views.home.classList.toggle('is-searching', query.length > 0);

    if (query.length === 0) {
        // If query is empty, ensure all cards are visible and remove search-match class
        productCards.forEach(card => card.classList.remove('search-match'));
        return;
    }

    let matchCount = 0;
      
    productCards.forEach(card => {
        const name = card.dataset.productName.toLowerCase();
        
        // Check if the product name contains the query
        if (name.includes(query)) {
            card.classList.add('search-match');
            matchCount++;
        } else {
            card.classList.remove('search-match');
        }
    });
  }

  /* =========================
      POPULAR SECTION LOGIC
      ========================= */
  const popularList = ["Express Vpn", "ChatGPT Plus", "CapCut", "Netflix", "Wink"];
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
    // Speed changed to 120 as requested
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

  /* =========================
      PRODUCT PAGE LOGIC
      ========================= */
  function openProduct(productName) {
    lastScroll = window.scrollY;
      
    // --- Handle Regional Products (Google Play Gift Card) ---
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
    const isPlatformNested = firstValue && typeof firstValue === 'object' && !Array.isArray(firstValue) && (Object.keys(firstValue).includes('Share') || Object.keys(firstValue).includes('Private') || Object.keys(firstValue).includes('Pro Share') || Object.keys(firstValue).includes('Pro Private'));

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
            let style = '';
            if (productName === 'Express Vpn') {
                if (sectionName === 'Share') {
                    title = 'Share 1 device Only'; 
                } else if (sectionName === 'Private') {
                    title = 'Private Own 9 Devices';
                    style = 'style="color: #ffeb3b;"'; 
                }
            } else if (productName === 'HBO Max') {
                if (sectionName.includes('(ULTIMATE)')) {
                    title = 'HBO MAX (ULTIMATE) 1 Month';
                } else if (sectionName.includes('Private Whole Account')) {
                    title = 'Private Whole Account (1 Month)';
                }
            } else if (productName === 'Netflix') {
                 if (sectionName.includes('1 Profile')) {
                    title = '1 Profile';
                } else if (sectionName.includes('Whole Account')) {
                    title = 'Whole Account';
                }
            } else if (productName === 'Spotify') {
                // ADDED: Visual hook for VPN-Free
                title += ' <span style="background:#39ff14; color:#000; padding:2px 6px; border-radius:4px; font-size:11px; margin-left:8px; font-weight:900; box-shadow:0 0 5px #39ff14;">VPNမလို</span>';
            }
            
            return `<div class="plan-box"><div class="plan-title" ${style}>${title}</div><div class="plan-rows">${rows}</div></div>`;
        }).join("");
    }

    // --- FIX: Override Image Logic ---
    let heroImageSrc = imageFor[productName];
    // If opening a Google Play specific region (e.g. Google Play India), force the base image
    if (productName.startsWith("Google Play")) {
        heroImageSrc = imageFor["Google Play Gift Card"];
    }

    const pageHTML = `
      <button class="back-btn" id="product-back-btn">← Back</button>
      <div class="product-hero">
        <div class="hero-img-wrap"><img src="${heroImageSrc || imageFor['Google Play Gift Card']}" alt="${escapeHTML(productName)} logo" /></div>
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
    
    // --- UPDATED: DYNAMIC CUSTOM CALCULATOR FOR MULTIPLE REGIONS ---
    const customConf = customConfigs[productName];
    if (customConf) {
        const customHTML = `
        <div class="plan-box">
          <div class="plan-title">Custom Amount (${customConf.min} - ${customConf.max} ${customConf.curr})</div>
          <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
             <label style="font-size:14px; color:#ccc;">Enter Amount</label>
             <div style="display:flex; gap:10px;">
                <input type="number" id="custom-amount-input" min="${customConf.min}" max="${customConf.max}" placeholder="${customConf.min}-${customConf.max}" 
                       style="flex:1; padding:12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:white; font-size:16px;">
                <div id="custom-calc-price" style="align-self:center; font-weight:bold; color:#00e676; min-width:100px; text-align:right;">0 Kyats</div>
             </div>
             <button id="btn-add-custom" class="btn btn-primary" style="width:100%;">Add to Cart</button>
          </div>
        </div>`;
        
        // Insert it BEFORE the Popular Section
        const popularSection = dom.views.product.querySelector('.popular-section');
        popularSection.insertAdjacentHTML('beforebegin', customHTML);
        
        // Attach Logic
        const input = document.getElementById('custom-amount-input');
        const priceDisplay = document.getElementById('custom-calc-price');
        const addBtn = document.getElementById('btn-add-custom');
        
        input.addEventListener('input', () => {
             const val = parseFloat(input.value);
             // VALIDATION VISUAL
             if (!val || val < customConf.min || val > customConf.max) {
                 // ERROR STATE (Red Button Style)
                 addBtn.style.backgroundColor = '#ff4444'; 
                 addBtn.textContent = `⚠️ Limit: ${customConf.min} - ${customConf.max}`;
                 priceDisplay.textContent = "0 Kyats";
             } else {
                 // VALID STATE
                 addBtn.style.removeProperty('background-color'); // Revert to CSS
                 addBtn.textContent = "Add to Cart";
                 const price = Math.floor(val * customConf.rate);
                 priceDisplay.textContent = formatKyats(price);
             }
        });
        
        addBtn.addEventListener('click', () => {
             const val = parseFloat(input.value);
             if (!val || val < customConf.min || val > customConf.max) {
                 // The button is already red, but we prevent action
                 return;
             }
             const price = Math.floor(val * customConf.rate);
             const item = { 
                 product: productName, 
                 section: "Custom Amount", 
                 duration: `${customConf.curr}${val}`, 
                 unitPrice: price, 
                 priceText: formatKyats(price) 
             };
             addToCart(item);
             
             // Visual feedback
             addBtn.textContent = "Added!";
             setTimeout(() => addBtn.textContent = "Add to Cart", 1000);
        });
    }

    renderPopular("popular-product", productName);
    showView('product');
    window.scrollTo(0, 0);
  }

  // --- Render Region Grid for Gift Cards ---
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
      </div>
      `;
      
      dom.views.product.innerHTML = pageHTML;
      showView('product');
      window.scrollTo(0, 0);
  }

  /* =========================
      CHECKOUT FLOW
      ========================= */
  function getNoteForCartItem(item) {
    const productName = item.product.replace(/ \(.+\)$/, '');
    
    // Explicitly hide notes for TikTok Livestream plans to prevent the "NoDrop" text from appearing via fallback
    if (productName === "TikTok Non Official" && item.section.toLowerCase().includes("livestream")) {
        return null; 
    }
    
    const fullText = moreDetailsByProduct[productName]; 
    
    if (productName === "InShot") {
        return `Mod appမဟုတ်ပါဘူး။Android onlyပဲသူံးလို့ရပါတယ်။ Playstore ကappမာပဲသုံးလို့ရပါမယ်။
Warranty 3လပေးပါတယ်။
Share plan မို့လို့ 1 device ပဲသုံးလို့ရပါမယ်။`;
    }

    if (!fullText) return null;
    
    const rawDetails = fullText.trim();
    
    const sectionHeaders = /^(Share|Private|SemiPrivate|FullPrivate|Tinder Plus Share|Login|Gift Plan & Link Plan|Gift Plan|Link Plan|Views \(NoDrop\)|Likes \(NoDrop\)|Comment - Emoji Type|Comment - Custom Type|Package Plan|Livestream Views|Livestream Likes|Livestream Share|Post Views|Positive Reactions|Negative Reactions|Custom Reactions|Premium Reactions|Members \(30Days Refill\)|Livestream Views|Comment - Impression Type|Comment - Custom Type|Video Views|Video Likes|Post Likes|Profile Followers|Page Followers|Live Stream Views|Video Views & Reels|Likes|Followers|Personal Plus \(Share\)|Personal Plus \(Private\)|Business - Invite Own Email|Business - Own|Private Own Mail|Private \(Own Mail\)|Base Service|1 Profile\(Semiprivate\)|5 Profiles\(Whole Account\)|Nitro Basic \(Key\)|Individual|Invite with email|Sharing Pro|Plan Basic|Plan Premium|HBO MAX \(ULTIMATE\) 1 Month|Private Whole Account \(1 Month\)|1 Profile|Whole Account|OwnMail Private|Individual Plan|Business Own\(Full Warranty\)|Business Plus Own\(Full Warranty\)|Business Plus Own|Normal Plan|Family Head\(Can Invite 5 email\)|Invite Private|Web Private|Pro Share|Pro Private|Lifetime Premium|Educational\(Invite\)|Individual Plan\(Private\)|Stars|Japan Region \(¥\)|US Region \(\$\)|UK Region \(£\)|Custom Amount|Turkey Region \(TL\)|Indonesia Region \(IDR\)|Brazil Region \(BRL\)|Korea Region \(₩\)|India Region \(₹\)|Australia Region \(A\$\)|Germany Region \(€\)|France Region \(€\)|Italy Region \(€\)|Switzerland Region \(CHF\)|Canada Region \(C\$\)|UAE Region \(AED\)|Poland Region \(PLN\))/i; 
    
    const lines = rawDetails.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    let targetSection = item.section.replace(/ \(.*\)/, ''); 
    
    const sectionStartIndex = lines.findIndex(line => line.toLowerCase().includes(targetSection.toLowerCase()));

    if (productName === 'Telegram' && (item.section === 'Gift Plan' || item.section === 'Link Plan')) {
        targetSection = 'Gift Plan & Link Plan';
    }
    const sectionStartIndex_fixed = lines.findIndex(line => line.toLowerCase().includes(targetSection.toLowerCase()));

    if (sectionStartIndex_fixed !== -1) {
      let sectionEndIndex = lines.findIndex((line, index) => index > sectionStartIndex_fixed && (sectionHeaders.test(line) || line.includes("We only accept KBZpay")));
      if (sectionEndIndex === -1) sectionEndIndex = lines.length;
      
      let noteLines = lines.slice(sectionStartIndex_fixed + 1, sectionEndIndex).filter(l => l.length > 0);
      let noteText = noteLines.join('\n');
      
      if (productName === "NordVpn" || productName === "Surfshark Vpn") {
          const vpnAlert = "CAN'T USE IN MYANMAR";
          noteText = vpnAlert + '\n' + noteText;
      }
      
      let filteredNotes = noteText.split('\n').filter(line => line.trim().length > 0);

      const rawVpnAlertTag = "CAN'T USE IN MYANMAR"; 
      filteredNotes = filteredNotes.filter(line => !line.includes(rawVpnAlertTag));


      if (productName === 'Telegram') {
          const durationLine = `• ${item.duration} — ${item.priceText}`;
          let generalNote = '';
          
          if (item.section === 'Gift Plan' || item.section === 'Link Plan') {
              generalNote = 'GiftPlan and Link Plan are same premium features.\nContact admin for more details.';
              
              filteredNotes = filteredNotes.filter(line => !line.includes('—')); 
              filteredNotes = [durationLine].concat(generalNote.split('\n').map(l => l.trim()));

          } else if (item.section === 'Login') {
              const loginNote = '• Login planကကျနော်တို့ဘက်ကအကောင့်ထဲဝင်ပီး Premium ဝယ်ပေးမာပါ။2 to 3Minလောက်ကြာနိုင်ပါတယ်။';

              filteredNotes = [durationLine, loginNote];
          }
      } else if (productName === 'HBO Max') {
          // STRICT filter for HBO Max
          if (item.duration === "1P 2U") { // Check duration, not section
              filteredNotes = filteredNotes.filter(line => line.includes("1P 2U") || line.includes("1 Profile / 2 Users"));
              // --- INJECTED BURMESE NOTE (1P 2U) ---
              filteredNotes.push("ဒါက ကိုယ်ကတခြားတယောက်နဲ့သုံးရတာကိုပြောတာပါ။");
          } else if (item.duration === "Semiprivate") { // Check duration
               filteredNotes = filteredNotes.filter(line => line.includes("Semiprivate") || line.includes("1 Profile / Semi-Private"));
               // --- INJECTED BURMESE NOTE (Semiprivate) ---
               filteredNotes.push("ဒါကကိုယ့် device နှစ်ခုသုံးလို့ရပါတယ်။");
          } else if (item.section.includes("Private Whole Account")) {
               filteredNotes = filteredNotes.filter(line => line.includes("Private") || line.includes("5 Profile"));
          }
      } else if (productName === 'CapCut') {
           // STRICT filter for CapCut to avoid overlapping "Private" and "Private Own Mail" text
           if (item.section === "Private") {
               filteredNotes = filteredNotes.filter(line => !line.toLowerCase().includes("own mail"));
           }
      } else if (productName === 'Netflix') {
          // STRICT filter for Netflix to hide/show warranty text
          if (item.section === "1 Profile") {
              // The warranty note is under "1 Profile" in moreDetailsByProduct, so it's naturally included.
              // Just ensure it's there.
          } else if (item.section === "Whole Account") {
              // Explicitly filter OUT the warranty note if it somehow got included
              filteredNotes = filteredNotes.filter(line => !line.includes("warrantyအပြည့်ပေး"));
          }
      } else {
          const durationRegex = /\b(\d+\s*(?:Month|Months|Year|Week|Lifetime|Days|Stars|TL|IDR|BRL|₹|₩|\$|£|€|CHF|C\$|AED|PLN)):?.*|6-Months accounts are rare.*/gi; 
          
          filteredNotes = filteredNotes.filter(line => {
              if (line.toLowerCase().includes('device') || line.toLowerCase().includes('warranty') || line.toLowerCase().includes('guarantee') || line.toLowerCase().includes('profile') || line.toLowerCase().includes('account') || line.toLowerCase().includes('users') || line.toLowerCase().includes('screen') || line.toLowerCase().includes('phones') || line.toLowerCase().includes('sharing') || line.toLowerCase().includes('history') || line.toLowerCase().includes('အဆင်ပြေ') || line.includes('သက်တန်းတိုး') || line.includes('Official app') || line.includes('Username') || line.includes('Region') || line.includes('Buy specific')) { 
                  return true;
              }
              if (durationRegex.test(line)) {
                  return line.includes(item.duration);
              }
              return true;
          });
      }

      return filteredNotes.filter(l => l.trim().length > 0).join('\n').trim();
    }
    
    return rawDetails.replace(generalDetailsBlock.trim(), '');
  }
  
  function goCheckoutView() {
    if (!cart.length) { alert("Your cart is empty."); return; }
    lastViewBeforeCheckout = dom.views.product.classList.contains('active') ? 'product' : 'home';
    try { localStorage.setItem('blp_cart', JSON.stringify(cart)); } catch {}
    
    const copyBtn = dom.checkout.copyReceiptBtn;
    copyBtn.textContent = 'Copy';
    copyBtn.classList.remove('copied');
    copyBtn.disabled = false;

    // --- QUANTITY WARNING ---
    let quantityWarning = '';
    const multiQuantityItem = cart.find(item => item.qty > 1 && item.product === 'Express Vpn' && item.section === 'Share');
    
    if (multiQuantityItem) {
        const qty = multiQuantityItem.qty;
        let burmeseQtyText;
        
        if (qty >= 2 && qty <= 8) { 
            burmeseQtyText = `ဒါက${qty}လစာဝယ်တာမဟုတ်ပါဘူး။1လစာကိုမ Phone ${qty}လုံးစာယူတဲ့သဘောပါ။`;
            burmeseQtyText = burmeseQtyText.replace(/(\d+)/g, '<span class="warning-num">$1</span>');
        } else {
            burmeseQtyText = `This is a multi-device purchase, not a multi-month subscription.`;
        }
        
        quantityWarning = `<div class="payment-warning-block">
            <div class="nt-line" style="color: #ffca28; font-weight: 700; text-transform: uppercase;">
                ATTENTION: YOU HAVE ITEMS WITH QUANTITY > 1.
            </div>
            <div class="nt-line burmese-font">
                ${burmeseQtyText}
            </div>
            <div class="nt-line" style="color: #ffcdd2;">
                NOT extending the duration. Please confirm this is correct for your ORDER.
            </div>
        </div>`;
    }

    // --- NETFLIX QUANTITY WARNING (NEW) ---
    const netflixMultiItem = cart.find(item =>
        item.product === 'Netflix' &&
        item.section === '1 Profile' &&
        item.duration === '(Semiprivate 2 devices 1Month)' &&
        item.qty > 1
    );

    if (netflixMultiItem) {
        const qty = netflixMultiItem.qty;
        // User requested text: "ဒါက[qty]လစာဆိုပေမဲ့တစ်လတခါအကောင့်ပြောင်းနေရမာပဲမလို့တစ်လချင်းပဲယူရင်ယူပါ"
        let burmeseText = `ဒါက${qty}လစာဆိုပေမဲ့တစ်လတခါအကောင့်ပြောင်းနေရမာပဲမလို့တစ်လချင်းပဲယူရင်ယူပါ`;
        burmeseText = burmeseText.replace(/(\d+)/g, '<span class="warning-num">$1</span>');

        quantityWarning += `<div class="payment-warning-block">
            <div class="nt-line" style="color: #ffca28; font-weight: 700; text-transform: uppercase;">
                ATTENTION: MULTIPLE MONTHS SELECTED
            </div>
            <div class="nt-line burmese-font">
                ${burmeseText}
            </div>
        </div>`;
    }

    // --- EXPRESS VPN SHARE CUSTOM NOTE ---
    let expressVpnShareNote = null;
    const expressVpnShareItem = cart.find(item => 
        item.product === 'Express Vpn' && 
        item.section === 'Share' && 
        item.duration === '1 Month'
    );

    if (expressVpnShareItem) {
        const qty = expressVpnShareItem.qty;
        
        if (qty >= 1 && qty <= 7) {
            const remainingUsers = 8 - qty;
            const userCountText = (remainingUsers === 1) ? `1` : `${remainingUsers}`;
            const firstLine = `Share ကတခြားလူ ${userCountText} ‌ယောက်နဲ့တူတူသုံးရတာမျိုးပါ`;
            
            expressVpnShareNote = `
${firstLine}
            
တခါတလေအကောင့်ကထွက်တာမျိုးနေဖြစ်နိုင်တယ်but ပြန်ဝင်လို့ရပါတယ်

ပီးတော့စဝယ်တဲ့ရက်ကနေ premium ရက် 25ကနေ 31ရက်ကြားက stock ရှိတာရမာပါ။
`;
        }
    }

    // --- TIKTOK WARNING LOGIC ---
    let tiktokWarningHtml = '';
    const hasTikTokNoDrop = cart.some(item => 
        item.product === 'TikTok Non Official' && 
        (item.section.includes('Views (NoDrop)') || item.section.includes('Likes (NoDrop)')) &&
        !item.section.toLowerCase().includes('livestream')
    );

    if (hasTikTokNoDrop) {
        tiktokWarningHtml = `<div class="payment-warning-block">
            <div class="nt-line burmese-font">No dropဆိုပေမဲ့ TikTok ကစာပို့ပီးဖျက်ချသွားရင်တာ့ပြန်မထည့်ပေးပါဘူး။ထည့်ရင်လဲအကောင့် warning ထိမာပါ။</div>
        </div>`;
    }

    // --- NORD/SURFSHARK VPN CHECKOUT WARNING ---
    let vpnAlertBlock = '';
    const needsVpnAlert = cart.some(item => item.product === 'NordVpn' || item.product === 'Surfshark Vpn');
    if (needsVpnAlert) {
      vpnAlertBlock = `<div class="payment-warning-block vpn-warning">
          <div class="nt-line vpn-alert-text" style="color: #ff5757; font-weight: 800; text-transform: uppercase;">
              CAN'T USE IN MYANMAR
          </div>
      </div>`;
    }
    
    const uniqueProductNotes = new Map();

    cart.forEach(item => {
        const productKey = item.product + item.section; 
        let noteContent = getNoteForCartItem(item); 
        
        if (item.product === 'Express Vpn' && item.section === 'Share' && item.duration === '1 Month' && expressVpnShareNote !== null) {
             noteContent = expressVpnShareNote;
        }

        // FORCE RENEW NOTE FOR YOUTUBE
        if (item.product === 'YouTube') {
            if (!noteContent.includes("Renew")) {
                noteContent += "\nRenew လို့ရပါတယ်။သက်တန်းတိုးရင်တော့ 1Month ကို 6000ပါ။";
            }
        }

        if (noteContent && noteContent.length > 0) {
            if (!uniqueProductNotes.has(productKey)) {
                uniqueProductNotes.set(productKey, { item, noteContent });
            }
        }
    });

    // --- MERGE TIKTOK NODROP NOTES ---
    const tiktokViewsKey = "TikTok Non OfficialViews (NoDrop)";
    const tiktokLikesKey = "TikTok Non OfficialLikes (NoDrop)";

    if (uniqueProductNotes.has(tiktokViewsKey) && uniqueProductNotes.has(tiktokLikesKey)) {
        // Get the note content from one (they are identical)
        const noteData = uniqueProductNotes.get(tiktokViewsKey);
        
        // Remove both individual entries
        uniqueProductNotes.delete(tiktokViewsKey);
        uniqueProductNotes.delete(tiktokLikesKey);
        
        // Create a merged entry
        // We need to mock the 'item' structure for the title generator later
        const mergedItem = {
            product: "TikTok Non Official",
            section: "Views,Likes (NoDrop)" 
        };
        
        // Add back to map with a new unique key
        uniqueProductNotes.set("TikTokMergedNoDrop", { 
            item: mergedItem, 
            noteContent: noteData.noteContent 
        });
    }
    
    const noteBlocks = Array.from(uniqueProductNotes.values()).map(({ item, noteContent }) => {
      const title = `${item.product} • ${item.section}`;
      
      return `<div style="margin-bottom:12px"><strong>${escapeHTML(title)}</strong>
        ${noteContent.split('\n').filter(l => l.trim().length > 0).map(l => {
          const trimmed = l.trim();
          
          if (trimmed.includes('ဒါက') || trimmed.includes('•') || trimmed.includes('renew') || item.product === 'Telegram' || item.product === 'Express Vpn' || item.product === 'ChatGPT Plus' || item.product === 'PicsArt' || item.product === 'Canva' || item.product === 'Microsoft 365' || item.product === 'Netflix' || item.product === 'CapCut' || item.product === 'Spotify' || item.product === 'Apple Music' || item.product === 'YouTube' || item.product === 'InShot' || item.product === 'HBO Max' || trimmed.includes('Deactivate errorဖြစ်နိုင်လို့') || trimmed.includes('Any kinds of Website')) { 
              let burmeseText = trimmed.replace(/(\d+)\s*(‌ယောက်)/g, '$1 $2');
              if (item.product === 'Microsoft 365' && burmeseText.includes('သုံးလို့ရသွားမာပါ။')) {
                  burmeseText = burmeseText.replace('သုံးလို့ရသွားမာပါ။', '<span style="white-space: nowrap;">သုံးလို့ရသွားမာပါ။</span>');
              }
              return `<div class="nt-line burmese-font" style="font-weight: 400; opacity: .95;">${burmeseText}</div>`;
          }

          return `<div class="nt-line" style="font-weight: 400; opacity: .95;">${escapeHTML(trimmed)}</div>`;
        }).join('')}
      </div>`;
    }).filter(Boolean);

    // --- NEW: Constant Netflix UHD Block ---
    let netflixBlock = '';
    if (cart.some(item => item.product === 'Netflix')) {
        netflixBlock = `<div style="margin-bottom:12px"><strong>Netflix Features</strong>
            ${netflixUhdNote.split('\n').filter(l=>l.trim()).map(l => `<div class="nt-line" style="font-weight: 400; opacity: .95;">${escapeHTML(l.trim())}</div>`).join('')}
        </div>`;
    }

    let finalHtml = quantityWarning + tiktokWarningHtml + vpnAlertBlock + (noteBlocks.length > 0 ? noteBlocks.join('') : (hasTikTokNoDrop ? "" : "<em>No specific notes for your items.</em>")) + netflixBlock + formatNotes(paymentInfoBlock.trim());
    
    dom.checkout.noteText.innerHTML = finalHtml;

    const telegramCustomPlans = ['1 Year', 'Gift Plan', 'Link Plan'];
    const requiresCustomTelegram = cart.some(item => 
        item.product === 'Telegram' && (item.section === 'Login' && item.duration.includes('1 Year') || telegramCustomPlans.some(plan => item.section.includes(plan)))
    );
    
    const checkoutLink = requiresCustomTelegram ? 'https://t.me/Fury_edtz' : 'https://t.me/Thetpaing102';
    dom.checkout.nextBtn.href = checkoutLink;

    dom.checkout.noteStep.style.display = 'block';
    dom.checkout.receiptStep.style.display = 'none';
    dom.checkout.nextBtn.style.display = 'none';

    showView('checkout');
    window.scrollTo(0, 0);
    dom.cart.bar.style.display = 'none';
  }

  function buildReceipt() {
    const c = JSON.parse(localStorage.getItem('blp_cart') || '[]');
    if (!c.length) { dom.checkout.receiptStep.innerHTML = '<p>Your cart is empty.</p>'; return; }
    
    const items = c.map(i => ({ name: i.product, plan: i.section, duration: i.duration, qty: i.qty, sub: i.unitPrice * i.qty }));
    const total = items.reduce((s, x) => s + x.sub, 0);

    if (items.length === 1) {
      const x = items[0];
      dom.checkout.receipts.single.style.display = 'block';
      dom.checkout.receipts.multi.style.display = 'none';
      dom.checkout.receipts.r1_item.textContent = x.name;
      dom.checkout.receipts.r1_plan.textContent = x.plan;
      dom.checkout.receipts.r1_duration.textContent = x.duration + (x.qty > 1 ? ` × ${x.qty}` : '');
      dom.checkout.receipts.r1_price.textContent = formatKyats(x.sub);
    } else {
        dom.checkout.receipts.single.style.display = 'none';
        dom.checkout.receipts.multi.style.display = 'block';
        const itemsHtml = items.map(item => `
            <div class="receipt-line-item">
                <div class="title">${escapeHTML(item.name)}${item.qty > 1 ? ` (x${item.qty})` : ''}</div>
                <div class="details">${escapeHTML(item.plan)} • ${escapeHTML(item.duration)}</div>
                <div class="price">${formatKyats(item.sub)}</div>
            </div>
        `).join('');
        dom.checkout.receipts.rm_itemList.innerHTML = itemsHtml;
        dom.checkout.receipts.rm_total.textContent = formatKyats(total);
    }
    
    const textLines = items.map(item =>
        `- ${item.name} (${item.plan} • ${item.duration})${item.qty > 1 ? ` x${item.qty}` : ''}\n  Price: ${formatKyats(item.sub)}`
    );
    const clipboardText = textLines.join('\n\n') + `\n-------------------\nTotal: ${formatKyats(total)}`;
    dom.checkout.receiptText.value = clipboardText;
  }

  /* =========================
      FORMATTERS
      ========================= */
  function formatDetails(raw) {
    const headers = /^(Share|Private|SemiPrivate|FullPrivate|Tinder Plus Share|Login|Gift Plan & Link Plan|Gift Plan|Link Plan|Views \(NoDrop\)|Likes \(NoDrop\)|Comment - Emoji Type|Comment - Custom Type|Package Plan|Livestream Views|Livestream Likes|Livestream Share|Post Views|Positive Reactions|Negative Reactions|Custom Reactions|Premium Reactions|Members \(30Days Refill\)|Livestream Views|Comment - Impression Type|Comment - Custom Type|Video Views|Video Likes|Post Likes|Profile Followers|Page Followers|Live Stream Views|Video Views & Reels|Likes|Followers|Personal Plus \(Share\)|Personal Plus \(Private\)|Business - Invite Own Email|Business - Own|Private Own Mail|Private \(Own Mail\)|Base Service|1 Profile\(Semiprivate\)|5 Profiles\(Whole Account\)|Nitro Basic \(Key\)|Individual|Invite with email|Sharing Pro|Plan Basic|Plan Premium|HBO MAX \(ULTIMATE\) 1 Month|Private Whole Account \(1 Month\)|1 Profile|Whole Account|OwnMail Private|Individual Plan|Business Own\(Full Warranty\)|Business Plus Own\(Full Warranty\)|Business Plus Own|Normal Plan|Family Head\(Can Invite 5 email\)|Invite Private|Web Private|Pro Share|Pro Private|Lifetime Premium|Educational\(Invite\)|Individual Plan\(Private\)|Stars|Japan Region \(¥\)|US Region \(\$\)|UK Region \(£\)|Custom Amount)/i; 
    
    const vpnAlertTag = 'CAN\'T USE IN MYANMAR';
    
    let mainDetailsRaw = raw.replace(new RegExp(vpnAlertTag.replace(/[\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '').replace(generalDetailsBlock, '').trim(); 
    
    const paymentDetailsRaw = generalDetailsBlock.trim();
    
    const mainHtml = mainDetailsRaw.split(/\n+/).map(line => {
      let t = line.trim(); if (!t) return "";
      if (headers.test(t)) return `<div class="md-h">${escapeHTML(t)}</div>`;
      
      if (t.includes('ဒါကကိုယ်သုံးနေတဲ့ Emailကို GPT Plus ပြောင်းပေးတာဖြစ်ပီး history ကလဲကိုယ့်အကောင့်ပဲမို့ private history နဲ့သုံးရမာပါ။')) {
          return `<div class="md-p burmese-font">${escapeHTML(t)}</div>`;
      }
      
      if (t.includes('—') && t.includes('Kyats') && t.includes('Month') && t.includes('Login')) {
          return `<div class="md-p burmese-font">${escapeHTML(t)}</div>`;
      }
      
      return `<div class="md-p">${escapeHTML(t)}</div>`;
    }).join("");
    
    const paymentHtml = `<div class="payment-warning-block">${
        paymentDetailsRaw.split(/\n+/).map(line => {
            let t = line.trim(); if (!t) return "";
            return `<div class="md-p">${escapeHTML(t)}</div>`;
        }).join("")
    }</div>`;
    
    return mainHtml + paymentHtml; 
  }
  
  function formatNotes(raw) {
    const containsPaymentInfo = raw.includes(paymentInfoBlock.trim());
    
    const lines = String(raw).split(/\n+/).map(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return "";
        
        if (trimmedLine.includes('CAN\'T USE IN MYANMAR')) {
              return `<div class="vpn-alert">${trimmedLine}</div>`;
        }
        
        if (trimmedLine.includes('ဒါက') || trimmedLine.includes('This is a multi-device purchase')) {
            return `<div class="nt-line burmese-font">${trimmedLine}</div>`;
        }

        if (trimmedLine.includes('ဒါက') || trimmedLine.includes('•') && trimmedLine.includes('Kyats')) {
            return `<div class="nt-line burmese-font">${escapeHTML(trimmedLine)}</div>`;
        }
        
        if (trimmedLine.includes('Share ကတခြားလူ')) {
            const burmeseText = trimmedLine.replace(/(\d+)\s*(‌ယောက်)/g, '$1 $2');
             return `<div class="nt-line burmese-font">${burmeseText}</div>`;
        }

        if (trimmedLine.includes('Deactivate errorဖြစ်နိုင်လို့')) {
            return `<div class="nt-line burmese-font">${escapeHTML(trimmedLine)}</div>`;
        }

        return `<div class="nt-line" style="font-weight: 400; opacity: .95;">${escapeHTML(trimmedLine)}</div>`;
    }).join("");
    
    if (containsPaymentInfo) {
        return `<div class="payment-warning-block">${lines}</div>`;
    }
    return lines;
  }

  /* =========================
      INITIALIZATION & EVENT LISTENERS
      ========================= */
    
  dom.search.input.addEventListener('input', (e) => {
    if (dom.views.home.classList.contains('active')) {
      filterProducts(e.target.value);
    }
  });
    
  dom.search.clearBtn.addEventListener('click', () => {
    dom.search.input.value = '';
    dom.search.input.focus(); 
    filterProducts('');
  });

  document.addEventListener('DOMContentLoaded', () => {
    productCards = Array.from(dom.views.home.querySelectorAll('.card[data-product-name]'));
    renderPopular("popular-home"); 
    dom.search.container.style.display = 'flex';
  });

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goCheckoutView();
      });
  }
    
  document.body.addEventListener('click', async (e) => {
    const target = e.target;

    const productCard = target.closest('[data-product-name]');
    if (productCard && (productCard.classList.contains('card') || productCard.classList.contains('pop-card'))) {
      productCard.classList.add('tap-anim');
      setTimeout(() => productCard.classList.remove('tap-anim'), 120);

      openProduct(productCard.dataset.productName);
      return;
    }

    if (target.id === 'product-back-btn') {
      // If we are deep inside a Google Play region sub-menu, go back to the Google Play main menu (Region Selector)
      const currentTitle = document.querySelector('.hero-title').innerText;
      if (currentTitle.includes('Google Play') && !currentTitle.includes('Gift Card')) {
          renderRegionalSelector("Google Play Gift Card", regionalProducts["Google Play Gift Card"]);
          return;
      }
      
      showView('home');
      window.scrollTo(0, lastScroll);
      return;
    }
    
    const moreDetailsBtn = target.closest('.hero-more');
    if (moreDetailsBtn) {
      moreDetailsBtn.classList.add('tap-anim');
      setTimeout(() => moreDetailsBtn.classList.remove('tap-anim'), 120);
        
      const productName = moreDetailsBtn.dataset.productName;
      const raw = moreDetailsByProduct[productName] || "More details coming soon.";
      dom.explain.text.innerHTML = formatDetails(raw);
      dom.explain.overlay.style.display = "grid";
      return;
    }

    const whyBuyBtn = target.closest('#why-buy-btn');
    if (whyBuyBtn) {
      whyBuyBtn.classList.add('tap-anim');
      setTimeout(() => whyBuyBtn.classList.remove('tap-anim'), 120);
      dom.whyBuy.overlay.style.display = "grid";
      return;
    }

    if (target.id === 'explain-ok-btn' || target.closest('#explain-ok-btn')) {
      dom.explain.overlay.style.display = "none";
      return;
    }
    
    if (target.id === 'why-buy-back-btn' || target.closest('#why-buy-back-btn')) {
      dom.whyBuy.overlay.style.display = "none";
      return;
    }

    const tapTarget = target.closest('.tap-anim-target');
    if (tapTarget) {
      tapTarget.classList.add('tap-anim');
      setTimeout(() => tapTarget.classList.remove('tap-anim'), 120);
    }
    
    const qtyBtn = target.closest('.qty-btn');
    if (qtyBtn) {
      try {
        const item = JSON.parse(qtyBtn.dataset.item);
        if (qtyBtn.dataset.action === "inc") addToCart(item);
        else if (qtyBtn.dataset.action === "dec") decFromCart(item);
      } catch {}
      return;
    }
    
    const removeBtn = target.closest('.remove-btn');
    if (removeBtn) {
      removeItemFromCart(removeBtn.dataset.cartKey);
      return;
    }

    if (target.id === 'cart-toggle-btn') {
      dom.cart.bar.classList.toggle('collapsed');
      requestAnimationFrame(() => {
        let cartBarHeight = dom.cart.bar.classList.contains('collapsed') ? 60 : dom.cart.bar.offsetHeight;
        document.body.style.paddingBottom = (cartBarHeight) + "px";
      });
      return;
    }

    if (target.id === 'clear-cart-btn') {
      clearCart();
      return;
    }
    
    if (target.id === 'checkout-back-btn') {
      if (cart.length) dom.cart.bar.style.display = 'block';
      showView(lastViewBeforeCheckout);
      return;
    }

    if (target.id === 'note-ok-btn' || target.closest('#note-ok-btn')) {
      dom.checkout.noteStep.style.display = 'none';
      dom.checkout.receiptStep.style.display = 'block';
      buildReceipt();

      dom.checkout.receiptStep.style.pointerEvents = 'none';
      setTimeout(() => {
        dom.checkout.receiptStep.style.pointerEvents = 'auto';
      }, 50);
      return;
    }
    
    if (target.id === 'copy-receipt-btn' || target.closest('#copy-receipt-btn')) {
      const ta = dom.checkout.receiptText;
      const btn = dom.checkout.copyReceiptBtn;
      
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(ta.value);
        } else {
          ta.select();
          ta.setSelectionRange(0, 99999);
          document.execCommand('copy');
        }
        
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        btn.disabled = true;
        
        dom.checkout.nextBtn.style.display = 'inline-block';

      } catch (err) {
        console.error('Failed to copy:', err);
      }
      return;
    }
  });

})();