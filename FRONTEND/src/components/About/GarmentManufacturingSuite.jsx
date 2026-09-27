import React, { useState, useRef, useEffect, useReducer, useMemo, useCallback } from 'react';

// =================================================================
// 1. MANUFACTURING DATA, TEXTILE GRADES & UNIFORM VERTICALS
// =================================================================

const UNIFORM_CATEGORIES = {
  corporate: {
    label: 'Corporate & Tech',
    tops: [
      { id: 'polo', name: 'Executive Piqué Polo', defaultGsm: '220 GSM', blend: '100% Combed Bio-Wash Piqué' },
      { id: 'oxford', name: 'Structured Oxford Shirt', defaultGsm: '160 GSM', blend: '80/20 Cotton-Rich Pinpoint' }
    ],
    bottoms: [
      { id: 'trousers', name: 'Tailored Chino Trousers', defaultGsm: '260 GSM', blend: '98% Cotton / 2% Elastane Twill' }
    ]
  },
  healthcare: {
    label: 'Medical & Scrubs',
    tops: [
      { id: 'scrub-top', name: 'V-Neck Clinical Scrub', defaultGsm: '190 GSM', blend: '72% Poly / 21% Rayon / 7% Spandex' }
    ],
    bottoms: [
      { id: 'scrub-pant', name: 'Cargo Medical Pant', defaultGsm: '190 GSM', blend: '4-Way Stretch Antimicrobial Twill' }
    ]
  },
  hospitality: {
    label: 'Hospitality & F&B',
    tops: [
      { id: 'chef-shirt', name: 'Bistro Service Shirt', defaultGsm: '180 GSM', blend: '65/35 Heavy Duty Poly-Cotton' },
      { id: 'polo', name: 'Front-Desk Piqué Polo', defaultGsm: '220 GSM', blend: '100% Ring-Spun Cotton' }
    ],
    bottoms: [
      { id: 'trousers', name: 'Spill-Resistant Chinos', defaultGsm: '240 GSM', blend: 'Water-Repellent Poly-Cotton Twill' },
      { id: 'shorts', name: 'Resort Staff Shorts', defaultGsm: '200 GSM', blend: 'Lightweight Stretch Canvas' }
    ]
  },
  education: {
    label: 'School & University',
    tops: [
      { id: 'tee', name: 'Heavyweight Campus Tee', defaultGsm: '200 GSM', blend: '100% Ring-Spun Combed Jersey' },
      { id: 'polo', name: 'School Crested Polo', defaultGsm: '230 GSM', blend: 'Heavyweight Durable Cotton Piqué' }
    ],
    bottoms: [
      { id: 'trousers', name: 'Formal Pleated Trousers', defaultGsm: '250 GSM', blend: 'Crease-Resistant Poly-Viscose' },
      { id: 'shorts', name: 'Junior Tailored Shorts', defaultGsm: '220 GSM', blend: 'Reinforced Drill Twill' }
    ]
  }
};

const FABRIC_TECHNOLOGIES = [
  { id: 'standard', name: 'Bio-Washed Combed', tag: 'Standard Comfort', upcharge: 0 },
  { id: 'antimicrobial', name: 'SILVADUR™ Antimicrobial', tag: 'Clinical Grade', upcharge: 1.85 },
  { id: 'stainshield', name: 'Teflon™ Stain & Spill Shield', tag: 'High Durability', upcharge: 2.20 },
  { id: 'coolmax', name: 'Moisture-Wicking DryTech', tag: 'Breathable Knit', upcharge: 1.50 }
];

const INDUSTRIAL_PALETTES = [
  { id: 'p-navy', name: 'Institutional Navy', pantone: '19-4024 TCX', hex: '#1C2836', shade: '#111A24' },
  { id: 'p-white', name: 'Optic Hospital White', pantone: '11-0601 TCX', hex: '#F6F7FA', shade: '#D8DBE2' },
  { id: 'p-slate', name: 'Executive Graphite', pantone: '18-4005 TCX', hex: '#373A40', shade: '#232529' },
  { id: 'p-scrub', name: 'Clinical Ceil Blue', pantone: '14-4115 TCX', hex: '#7BA0C0', shade: '#537697' },
  { id: 'p-forest', name: 'Heritage Bottle Green', pantone: '19-5513 TCX', hex: '#1C3829', shade: '#102319' },
  { id: 'p-burgundy', name: 'Academy Maroon', pantone: '19-1627 TCX', hex: '#5B1E28', shade: '#3A1017' }
];

const TIER_QUANTITIES = [
  { min: 50, discount: 0, label: 'MOQ (50-99 pcs)' },
  { min: 100, discount: 0.15, label: 'Commercial (100-499 pcs)' },
  { min: 500, discount: 0.28, label: 'Enterprise (500+ pcs)' }
];

// =================================================================
// 2. PRODUCTION ORDER REDUCER
// =================================================================

const initialOrderState = {
  category: 'corporate',
  topStyle: 'polo',
  bottomStyle: 'trousers',
  fabricTech: 'standard',
  primaryColor: INDUSTRIAL_PALETTES[0],
  accentColor: INDUSTRIAL_PALETTES[1],
  bottomColor: INDUSTRIAL_PALETTES[2],
  brandingMethod: 'embroidery', // 'embroidery' | 'screenprint' | 'heattransfer'
  brandText: 'CORP LOGO',
  brandPosition: 'left-chest',
  sizes: { S: 15, M: 35, L: 35, XL: 15, '2XL': 0 },
  leadTimeDays: 14
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY': {
      const cat = UNIFORM_CATEGORIES[action.payload];
      return {
        ...state,
        category: action.payload,
        topStyle: cat.tops[0].id,
        bottomStyle: cat.bottoms[0].id
      };
    }
    case 'SET_TOP_STYLE': return { ...state, topStyle: action.payload };
    case 'SET_BOTTOM_STYLE': return { ...state, bottomStyle: action.payload };
    case 'SET_FABRIC_TECH': return { ...state, fabricTech: action.payload };
    case 'SET_PRIMARY_COLOR': return { ...state, primaryColor: action.payload };
    case 'SET_BOTTOM_COLOR': return { ...state, bottomColor: action.payload };
    case 'SET_BRAND_TEXT': return { ...state, brandText: action.payload.slice(0, 16).toUpperCase() };
    case 'SET_BRANDING_METHOD': return { ...state, brandingMethod: action.payload };
    case 'UPDATE_SIZE_QTY': {
      const newSizes = { ...state.sizes, [action.size]: Math.max(0, parseInt(action.qty) || 0) };
      return { ...state, sizes: newSizes };
    }
    default: return state;
  }
}

// =================================================================
// 3. MAIN COMPONENT: B2B UNIFORM CONFIGURATOR
// =================================================================

export default function UniformManufacturingStudio() {
  const [order, dispatch] = useReducer(orderReducer, initialOrderState);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'branding' | 'bulk' | 'techpack'
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isAutoSpin, setIsAutoSpin] = useState(false);

  // References for Zero-Rerender 360° Physics
  const rigRef = useRef(null);
  const angleDisplayRef = useRef(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafIdRef = useRef(null);

  // --- Decoupled Physics Loop (No State Re-creation) ---
  const updateRigTransform = useCallback(() => {
    if (isDraggingRef.current) {
      // Direct drag velocity applied in pointermove
    } else if (isAutoSpin) {
      rotationRef.current = (rotationRef.current + 0.4) % 360;
    } else {
      velocityRef.current *= 0.90; // Natural inertia friction
      rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
      if (Math.abs(velocityRef.current) < 0.01) velocityRef.current = 0;
    }

    if (rotationRef.current < 0) rotationRef.current += 360;

    // Mutate the 3D rig transform ONLY (zoom is isolated on parent wrapper)
    if (rigRef.current) {
      rigRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }

    // Direct DOM readout to avoid component render cycles
    if (angleDisplayRef.current) {
      const deg = Math.round(rotationRef.current);
      const viewStr = (deg >= 45 && deg < 135) ? 'Left Profile' :
                      (deg >= 135 && deg < 225) ? 'Back Spec' :
                      (deg >= 225 && deg < 315) ? 'Right Profile' : 'Frontal Spec';
      angleDisplayRef.current.innerText = `${deg}° — ${viewStr}`;
    }

    rafIdRef.current = requestAnimationFrame(updateRigTransform);
  }, [isAutoSpin]);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(updateRigTransform);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [updateRigTransform]);

  // Pointer gesture handlers with pointer capture
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = deltaX * 0.45;
    rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
  };

  const snapAngle = (targetDeg) => {
    velocityRef.current = 0;
    rotationRef.current = targetDeg;
    if (isAutoSpin) setIsAutoSpin(false);
  };

  // --- Live Manufacturing Order Calculations ---
  const productionMetrics = useMemo(() => {
    const totalUnits = Object.values(order.sizes).reduce((a, b) => a + b, 0);
    const meetsMoq = totalUnits >= 50;

    // Base garment manufacturing cost
    let unitBase = order.topStyle === 'polo' ? 14.50 :
                   order.topStyle === 'oxford' ? 19.80 :
                   order.topStyle === 'scrub-top' ? 16.20 : 10.50;

    unitBase += (order.bottomStyle === 'trousers' || order.bottomStyle === 'scrub-pant') ? 18.50 : 12.00;

    // Add textile treatment
    const tech = FABRIC_TECHNOLOGIES.find(t => t.id === order.fabricTech);
    unitBase += tech ? tech.upcharge : 0;

    // Add Branding / Customization costs
    const brandingCost = order.brandingMethod === 'embroidery' ? 2.40 : 1.50;
    unitBase += brandingCost;

    // Apply Tiered Quantity Volume Discount
    let discountPct = 0;
    if (totalUnits >= 500) discountPct = 0.28;
    else if (totalUnits >= 100) discountPct = 0.15;

    const finalUnitPrice = unitBase * (1 - discountPct);
    const subtotal = finalUnitPrice * totalUnits;
    const toolingSetupFee = totalUnits > 0 ? (order.brandingMethod === 'embroidery' ? 45.00 : 30.00) : 0; // One-time digitization/film fee
    const grandTotal = subtotal + toolingSetupFee;

    return {
      totalUnits,
      meetsMoq,
      unitPrice: finalUnitPrice.toFixed(2),
      discountPct: (discountPct * 100).toFixed(0),
      setupFee: toolingSetupFee.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      estimatedLeadTime: totalUnits > 500 ? '18-22 Business Days' : '10-14 Business Days'
    };
  }, [order]);

  const activeCategory = UNIFORM_CATEGORIES[order.category];

  return (
    <div className="mfg-studio-container">
      {/* Precision Industrial CSS Palette */}
      <style>{`
        .mfg-studio-container {
          --mfg-dark: #0F141C;
          --mfg-panel: #171E2B;
          --mfg-border: #273142;
          --mfg-accent: #2563EB;
          --mfg-accent-hover: #1D4ED8;
          --mfg-cyan: #06B6D4;
          --mfg-text-primary: #F8FAFC;
          --mfg-text-muted: #94A3B8;
          --mfg-warn: #F59E0B;
          --mfg-success: #10B981;

          --garment-top: ${order.primaryColor.hex};
          --garment-top-shade: ${order.primaryColor.shade};
          --garment-bot: ${order.bottomColor.hex};
          --garment-bot-shade: ${order.bottomColor.shade};

          width: 100%;
          min-height: 100vh;
          background-color: var(--mfg-dark);
          color: var(--mfg-text-primary);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Top Operational Header */
        .mfg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 28px;
          border-bottom: 1px solid var(--mfg-border);
          background: #111722;
        }
        .mfg-brand-title {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mfg-cert-badge {
          background: rgba(16, 185, 129, 0.12);
          color: var(--mfg-success);
          border: 1px solid rgba(16, 185, 129, 0.3);
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }

        /* Two-Column Studio Layout */
        .mfg-body {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          flex: 1;
          min-height: calc(100vh - 65px);
        }
        @media (max-width: 1024px) {
          .mfg-body { grid-template-columns: 1fr; }
        }

        /* 360 Turntable Viewport Stage */
        .viewport-stage {
          position: relative;
          background: radial-gradient(circle at 50% 40%, #1E2738 0%, #0D121A 85%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-right: 1px solid var(--mfg-border);
          overflow: hidden;
          user-select: none;
          touch-action: none;
        }

        .stage-hud {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 20;
        }
        .hud-metric {
          font-size: 12px;
          font-family: ui-monospace, monospace;
          background: rgba(15, 20, 28, 0.8);
          border: 1px solid var(--mfg-border);
          padding: 6px 12px;
          border-radius: 6px;
          color: var(--mfg-text-muted);
        }
        .hud-metric strong { color: var(--mfg-text-primary); }

        /* The Isolated Zoom Wrapper: Fixes scale/rotate collision */
        .zoom-stage-wrapper {
          position: relative;
          width: 100%;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          perspective: 1200px;
        }
        .zoom-stage-wrapper:active { cursor: grabbing; }

        /* The Inner 3D Rig: Manipulated exclusively by rotationRef via RAF */
        .turntable-rig {
          position: relative;
          width: 250px;
          height: 500px;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .garment-svg-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6));
        }
        .face-rear {
          transform: rotateY(180deg);
        }

        .floor-shadow {
          position: absolute;
          bottom: 25px;
          width: 220px;
          height: 20px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 75%);
          border-radius: 50%;
          pointer-events: none;
        }

        .stage-controls {
          display: flex;
          gap: 8px;
          z-index: 20;
          background: rgba(23, 30, 43, 0.7);
          padding: 5px;
          border-radius: 8px;
          border: 1px solid var(--mfg-border);
        }
        .stage-btn {
          background: transparent;
          border: none;
          color: var(--mfg-text-muted);
          font-size: 12px;
          font-weight: 500;
          padding: 5px 11px;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.2s;
        }
        .stage-btn:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .stage-btn.active { color: #fff; background: var(--mfg-accent); }

        /* Manufacturing Configuration Panel */
        .config-panel {
          background: var(--mfg-panel);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          max-height: calc(100vh - 65px);
        }

        .nav-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #111722;
          border-bottom: 1px solid var(--mfg-border);
        }
        .nav-tab-btn {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--mfg-text-muted);
          padding: 14px 8px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .nav-tab-btn.active {
          color: #fff;
          border-color: var(--mfg-accent);
          background: rgba(37, 99, 235, 0.05);
        }

        .tab-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .field-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--mfg-text-muted);
        }
        .field-sub { font-size: 12px; color: var(--mfg-cyan); font-family: monospace; }

        .btn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 8px;
        }
        .spec-select-card {
          background: #0F141D;
          border: 1px solid var(--mfg-border);
          border-radius: 8px;
          padding: 10px 12px;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
        }
        .spec-select-card.active {
          border-color: var(--mfg-accent);
          background: rgba(37, 99, 235, 0.08);
        }
        .spec-name { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 2px; }
        .spec-desc { font-size: 11px; color: var(--mfg-text-muted); }

        /* Color Swatches with Pantone Code */
        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
          gap: 8px;
        }
        .pantone-chip {
          background: #0F141D;
          border: 1px solid var(--mfg-border);
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pantone-chip.active { border-color: #fff; }
        .chip-preview { height: 26px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); }
        .chip-title { font-size: 10px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .chip-code { font-size: 8.5px; font-family: monospace; color: var(--mfg-text-muted); }

        /* Size Matrix Input Table */
        .size-matrix {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
        }
        .size-matrix th {
          font-size: 11px;
          font-weight: 600;
          color: var(--mfg-text-muted);
          padding: 8px;
          background: #0E141E;
          border: 1px solid var(--mfg-border);
          text-align: center;
        }
        .size-matrix td {
          border: 1px solid var(--mfg-border);
          padding: 6px;
          text-align: center;
        }
        .size-input {
          width: 50px;
          background: #0F141D;
          border: 1px solid var(--mfg-border);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-align: center;
          padding: 6px 4px;
          border-radius: 4px;
        }
        .size-input:focus { outline: none; border-color: var(--mfg-accent); }

        /* Order Summary & RFQ Bar */
        .order-action-footer {
          margin-top: auto;
          background: #101621;
          border-top: 1px solid var(--mfg-border);
          padding: 18px 24px;
        }
        .pricing-breakdown {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }
        .price-final { font-size: 24px; font-weight: 700; color: #fff; }
        .moq-alert {
          font-size: 11px;
          font-weight: 600;
          color: var(--mfg-warn);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .rfq-btn {
          width: 100%;
          background: var(--mfg-accent);
          color: #fff;
          border: none;
          font-size: 14px;
          font-weight: 700;
          padding: 13px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rfq-btn:hover { background: var(--mfg-accent-hover); }
        .rfq-btn:disabled { background: #2A3446; color: var(--mfg-text-muted); cursor: not-allowed; }
      `}</style>

      {/* Top Header */}
      <header className="mfg-header">
        <div className="mfg-brand-title">
          <span>APEX APPAREL TECH // B2B UNIFORM SUITE</span>
          <span className="mfg-cert-badge">OEKO-TEX® Standard 100 Certified</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--mfg-text-muted)' }}>
          Lead Time: <strong style={{ color: '#fff' }}>{productionMetrics.estimatedLeadTime}</strong>
        </div>
      </header>

      {/* Main Studio Area */}
      <div className="mfg-body">

        {/* 360° Studio Viewport */}
        <div className="viewport-stage">
          <div className="stage-hud">
            <div className="hud-metric">
              Turntable: <strong ref={angleDisplayRef}>0° — Frontal Spec</strong>
            </div>
            <div className="hud-metric">
              Dye Code: <strong>{order.primaryColor.pantone}</strong>
            </div>
          </div>

          {/* The Outer Scale Wrapper (Prevents Rotate/Scale Clashing) */}
          <div 
            className="zoom-stage-wrapper" 
            style={{ transform: `scale(${zoomLevel})` }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* The Inner 3D Rig (Only handles rotateY) */}
            <div className="turntable-rig" ref={rigRef}>
              <FrontGarmentSVG order={order} />
              <BackGarmentSVG order={order} />
            </div>
            <div className="floor-shadow" />
          </div>

          {/* Turntable Control Bar */}
          <div className="stage-controls">
            <button className="stage-btn" onClick={() => snapAngle(0)}>Front</button>
            <button className="stage-btn" onClick={() => snapAngle(90)}>Profile</button>
            <button className="stage-btn" onClick={() => snapAngle(180)}>Back (Specs)</button>
            <button 
              className={`stage-btn ${isAutoSpin ? 'active' : ''}`}
              onClick={() => setIsAutoSpin(!isAutoSpin)}
            >
              {isAutoSpin ? 'Pause Spin' : 'Auto 360°'}
            </button>
            <button className="stage-btn" onClick={() => setZoomLevel(prev => prev === 1 ? 1.15 : 1)}>
              {zoomLevel > 1 ? 'Fit View' : 'Inspect 115%'}
            </button>
          </div>
        </div>

        {/* Configuration Deck */}
        <div className="config-panel">
          {/* Navigation Tabs */}
          <div className="nav-tabs">
            <button className={`nav-tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>
              1. Uniform Base
            </button>
            <button className={`nav-tab-btn ${activeTab === 'fabric' ? 'active' : ''}`} onClick={() => setActiveTab('fabric')}>
              2. Textile & Dye
            </button>
            <button className={`nav-tab-btn ${activeTab === 'branding' ? 'active' : ''}`} onClick={() => setActiveTab('branding')}>
              3. Embroidery/Logo
            </button>
            <button className={`nav-tab-btn ${activeTab === 'bulk' ? 'active' : ''}`} onClick={() => setActiveTab('bulk')}>
              4. Quantities & RFQ
            </button>
          </div>

          {/* TAB 1: BASE UNIFORM STYLES */}
          {activeTab === 'specs' && (
            <div className="tab-content">
              <div>
                <div className="form-label-row">
                  <span className="field-title">Industry Sector</span>
                </div>
                <div className="btn-grid">
                  {Object.keys(UNIFORM_CATEGORIES).map(key => (
                    <div 
                      key={key}
                      className={`spec-select-card ${order.category === key ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'SET_CATEGORY', payload: key })}
                    >
                      <div className="spec-name">{UNIFORM_CATEGORIES[key].label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="form-label-row">
                  <span className="field-title">Upper Garment Silhouette</span>
                </div>
                <div className="btn-grid">
                  {activeCategory.tops.map(top => (
                    <div
                      key={top.id}
                      className={`spec-select-card ${order.topStyle === top.id ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'SET_TOP_STYLE', payload: top.id })}
                    >
                      <div className="spec-name">{top.name}</div>
                      <div className="spec-desc">{top.defaultGsm} • {top.blend}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="form-label-row">
                  <span className="field-title">Lower Garment Silhouette</span>
                </div>
                <div className="btn-grid">
                  {activeCategory.bottoms.map(bot => (
                    <div
                      key={bot.id}
                      className={`spec-select-card ${order.bottomStyle === bot.id ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'SET_BOTTOM_STYLE', payload: bot.id })}
                    >
                      <div className="spec-name">{bot.name}</div>
                      <div className="spec-desc">{bot.defaultGsm} • {bot.blend}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEXTILE TREATMENT & PANTONE PALETTES */}
          {activeTab === 'fabric' && (
            <div className="tab-content">
              <div>
                <div className="form-label-row">
                  <span className="field-title">Performance Finishes</span>
                </div>
                <div className="btn-grid">
                  {FABRIC_TECHNOLOGIES.map(tech => (
                    <div
                      key={tech.id}
                      className={`spec-select-card ${order.fabricTech === tech.id ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'SET_FABRIC_TECH', payload: tech.id })}
                    >
                      <div className="spec-name">{tech.name}</div>
                      <div className="spec-desc">{tech.tag} {tech.upcharge > 0 ? `(+$${tech.upcharge}/unit)` : '(Included)'}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="form-label-row">
                  <span className="field-title">Upper Body Color Standard</span>
                  <span className="field-sub">{order.primaryColor.pantone}</span>
                </div>
                <div className="color-grid">
                  {INDUSTRIAL_PALETTES.map(col => (
                    <div 
                      key={col.id}
                      className={`pantone-chip ${order.primaryColor.id === col.id ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'SET_PRIMARY_COLOR', payload: col })}
                    >
                      <div className="chip-preview" style={{ background: col.hex }} />
                      <div className="chip-title">{col.name}</div>
                      <div className="chip-code">{col.pantone}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="form-label-row">
                  <span className="field-title">Bottom Garment Color Standard</span>
                  <span className="field-sub">{order.bottomColor.pantone}</span>
                </div>
                <div className="color-grid">
                  {INDUSTRIAL_PALETTES.map(col => (
                    <div 
                      key={col.id}
                      className={`pantone-chip ${order.bottomColor.id === col.id ? 'active' : ''}`}
                      onClick={() => dispatch({ type: 'SET_BOTTOM_COLOR', payload: col })}
                    >
                      <div className="chip-preview" style={{ background: col.hex }} />
                      <div className="chip-title">{col.name}</div>
                      <div className="chip-code">{col.pantone}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM BRANDING & EMBROIDERY */}
          {activeTab === 'branding' && (
            <div className="tab-content">
              <div>
                <div className="form-label-row">
                  <span className="field-title">Application Method</span>
                </div>
                <div className="btn-grid">
                  <div 
                    className={`spec-select-card ${order.brandingMethod === 'embroidery' ? 'active' : ''}`}
                    onClick={() => dispatch({ type: 'SET_BRANDING_METHOD', payload: 'embroidery' })}
                  >
                    <div className="spec-name">Direct Embroidery</div>
                    <div className="spec-desc">High-density Madeira thread (+45 setup)</div>
                  </div>
                  <div 
                    className={`spec-select-card ${order.brandingMethod === 'screenprint' ? 'active' : ''}`}
                    onClick={() => dispatch({ type: 'SET_BRANDING_METHOD', payload: 'screenprint' })}
                  >
                    <div className="spec-name">Screen / High-Density Print</div>
                    <div className="spec-desc">Crisp plastisol ink (+30 setup)</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="form-label-row">
                  <span className="field-title">Logo / Insignia Text Preview</span>
                  <span className="field-sub">Left Chest Placement</span>
                </div>
                <input 
                  type="text" 
                  value={order.brandText}
                  onChange={(e) => dispatch({ type: 'SET_BRAND_TEXT', payload: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#0E141E',
                    border: '1px solid var(--mfg-border)',
                    padding: '10px 14px',
                    color: '#fff',
                    borderRadius: '6px',
                    fontWeight: '600',
                    boxSizing: 'border-box'
                  }}
                  placeholder="ENTER BRAND/TEXT"
                />
              </div>
            </div>
          )}

          {/* TAB 4: BULK ORDER MATRIX & TIERS */}
          {activeTab === 'bulk' && (
            <div className="tab-content">
              <div>
                <div className="form-label-row">
                  <span className="field-title">Commercial Volume Tiers</span>
                </div>
                <div className="btn-grid">
                  {TIER_QUANTITIES.map(tier => (
                    <div key={tier.min} className="spec-select-card" style={{ borderColor: productionMetrics.totalUnits >= tier.min ? 'var(--mfg-success)' : 'var(--mfg-border)' }}>
                      <div className="spec-name">{tier.label}</div>
                      <div className="spec-desc">{tier.discount > 0 ? `${tier.discount * 100}% Production Discount` : 'Base Standard Pricing'}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="form-label-row">
                  <span className="field-title">Size Breakdown Matrix</span>
                  <span className="field-sub">Total Units: {productionMetrics.totalUnits}</span>
                </div>

                <table className="size-matrix">
                  <thead>
                    <tr>
                      {Object.keys(order.sizes).map(s => <th key={s}>{s}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.keys(order.sizes).map(s => (
                        <td key={s}>
                          <input 
                            className="size-input"
                            type="number"
                            min="0"
                            value={order.sizes[s]}
                            onChange={(e) => dispatch({ type: 'UPDATE_SIZE_QTY', size: s, qty: e.target.value })}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pricing & RFQ Confirmation Action Bar */}
          <div className="order-action-footer">
            <div className="pricing-breakdown">
              <div>
                <div style={{ fontSize: '11px', color: 'var(--mfg-text-muted)' }}>
                  ESTIMATED UNIT RATE ({productionMetrics.totalUnits} Units)
                </div>
                <div className="price-final">${productionMetrics.unitPrice} <span style={{ fontSize: '13px', color: 'var(--mfg-text-muted)', fontWeight: 400 }}>/ set</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--mfg-text-muted)' }}>ESTIMATED TOTAL (EX-FACTORY)</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--mfg-cyan)' }}>
                  ${productionMetrics.grandTotal}
                </div>
              </div>
            </div>

            {!productionMetrics.meetsMoq && (
              <div className="moq-alert" style={{ marginBottom: '12px' }}>
                ⚠ Minimum Order Quantity (MOQ) is 50 units. Please add {50 - productionMetrics.totalUnits} more units to proceed.
              </div>
            )}

            <button 
              className="rfq-btn" 
              disabled={!productionMetrics.meetsMoq}
              onClick={() => alert(`Factory Request Submitted!\nSKU: ${order.category.toUpperCase()}-${order.topStyle.toUpperCase()}\nUnits: ${productionMetrics.totalUnits}\nEst. Production Completion: ${productionMetrics.estimatedLeadTime}`)}
            >
              Generate Manufacturing Tech-Pack & Quote
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// =================================================================
// 4. MEMOIZED PRODUCTION APPAREL GRAPHICS WITH EMBROIDERY
// =================================================================

const FrontGarmentSVG = React.memo(function FrontGarmentSVG({ order }) {
  const isPolo = order.topStyle === 'polo';
  const isScrub = order.topStyle === 'scrub-top';
  const isOxford = order.topStyle === 'oxford';
  const isShorts = order.bottomStyle === 'shorts';

  return (
    <svg className="garment-svg-face face-front" viewBox="0 0 240 500">
      <defs>
        {/* Realistic Fabric Drape Noise */}
        <filter id="mfgFabricDrape" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0" result="coloredNoise"/>
          <feComposite in="SourceGraphic" in2="coloredNoise" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
        </filter>

        {/* 3D Thread Embroidery Filter */}
        <filter id="embroideryThread" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0.5" dy="0.8" stdDeviation="0.4" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* Model Head, Neck & Hair Silhouette */}
      <path fill="#2B2625" d="M102 36 C102 22, 138 22, 138 36 C144 38, 142 46, 139 52 C137 54, 102 54, 101 52 C98 46, 96 38, 102 36 Z"/>
      <path fill="#DFB190" d="M106 44 C106 38, 134 38, 134 44 C134 58, 128 72, 120 73 C112 72, 106 58, 106 44 Z"/>
      <path fill="#DFB190" d="M113 69 L127 69 L132 88 L108 88 Z"/>

      {/* Forearms */}
      <path fill="#DFB190" d="M86 102 L70 156 L64 212 L73 214 L81 160 L94 110 Z"/>
      <path fill="#DFB190" d="M154 102 L170 156 L176 212 L167 214 L159 160 L146 110 Z"/>

      {/* Bare Legs for Shorts */}
      {isShorts && (
        <g id="bare-legs">
          <path fill="#DFB190" d="M96 280 L94 420 L108 420 L113 280 Z"/>
          <path fill="#DFB190" d="M144 280 L146 420 L132 420 L127 280 Z"/>
        </g>
      )}

      {/* UPPER BODY: REALISTIC GARMENT GEOMETRY */}
      <g id="upper-body-spec" filter="url(#mfgFabricDrape)">
        {/* Main Torso */}
        <path fill="var(--garment-top)" d="M96 90 L144 90 L154 122 L149 198 C134 200, 106 200, 91 198 L86 122 Z"/>
        {/* Sleeves */}
        <path fill="var(--garment-top)" d="M96 90 L74 128 L90 136 L98 108 Z"/>
        <path fill="var(--garment-top)" d="M144 90 L166 128 L150 136 L142 108 Z"/>

        {/* POLO SHIRT COLLAR & PLACKET */}
        {isPolo && (
          <g id="polo-details">
            <path fill="var(--garment-top-shade)" d="M106 88 L120 98 L114 86 Z"/>
            <path fill="var(--garment-top-shade)" d="M134 88 L120 98 L126 86 Z"/>
            <rect fill="var(--garment-top-shade)" x="117.5" y="98" width="5" height="35" rx="1"/>
            <circle cx="120" cy="106" r="1.2" fill="#FFFFFF"/>
            <circle cx="120" cy="120" r="1.2" fill="#FFFFFF"/>
          </g>
        )}

        {/* MEDICAL SCRUB V-NECK & CHEST POCKET */}
        {isScrub && (
          <g id="scrub-details">
            <path fill="#DFB190" d="M112 88 L128 88 L120 108 Z"/>
            <path fill="var(--garment-top-shade)" d="M110 88 L120 108 L116 110 L108 88 Z"/>
            <path fill="var(--garment-top-shade)" d="M130 88 L120 108 L124 110 L132 88 Z"/>
            {/* Chest Pocket */}
            <path fill="var(--garment-top-shade)" opacity="0.4" d="M100 120 L112 120 L112 138 L100 138 Z"/>
          </g>
        )}

        {/* OXFORD BUTTON-DOWN PLACKET */}
        {isOxford && (
          <g id="oxford-details">
            <rect fill="var(--garment-top-shade)" x="117.5" y="92" width="5" height="106"/>
            {[100, 116, 132, 148, 164, 180].map(y => (
              <circle key={y} cx="120" cy={y} r="1.3" fill="#FAF8F5"/>
            ))}
          </g>
        )}

        {/* CUSTOM EMBROIDERY / LOGO STITCHING (Left Chest) */}
        {order.brandText && (
          <g id="brand-insignia" filter={order.brandingMethod === 'embroidery' ? 'url(#embroideryThread)' : undefined}>
            <text 
              x="132" 
              y="126" 
              fill="#FFFFFF"
              fontSize="4.8"
              fontWeight="700"
              fontFamily="monospace"
              letterSpacing="0.05em"
            >
              {order.brandText}
            </text>
            <circle cx="145" cy="124.5" r="1.5" fill="#06B6D4"/>
          </g>
        )}
      </g>

      {/* LOWER BODY: PANTS VS SHORTS */}
      <g id="lower-body-spec" filter="url(#mfgFabricDrape)">
        {!isShorts ? (
          <g id="trouser-geometry">
            <path fill="var(--garment-bot)" d="M90 198 L150 198 L154 220 L145 428 L126 428 L121 245 L119 245 L114 428 L95 428 L86 220 Z"/>
            {/* Center Ironed Crease Lines */}
            <line x1="104.5" y1="230" x2="104.5" y2="424" stroke="var(--garment-bot-shade)" strokeWidth="0.8"/>
            <line x1="135.5" y1="230" x2="135.5" y2="424" stroke="var(--garment-bot-shade)" strokeWidth="0.8"/>
          </g>
        ) : (
          <g id="shorts-geometry">
            <path fill="var(--garment-bot)" d="M90 198 L150 198 L153 220 L146 295 L124 295 L121 240 L119 240 L116 295 L94 295 L87 220 Z"/>
            <rect fill="var(--garment-bot-shade)" opacity="0.4" x="94" y="288" width="22" height="7"/>
            <rect fill="var(--garment-bot-shade)" opacity="0.4" x="124" y="288" width="22" height="7"/>
          </g>
        )}
      </g>

      {/* Shoes */}
      <g id="safety-shoes">
        <ellipse cx="104" cy="438" rx="14" ry="7" fill="#1C1D21"/>
        <ellipse cx="136" cy="438" rx="14" ry="7" fill="#1C1D21"/>
      </g>
    </svg>
  );
});

const BackGarmentSVG = React.memo(function BackGarmentSVG({ order }) {
  const isShorts = order.bottomStyle === 'shorts';

  return (
    <svg className="garment-svg-face face-rear" viewBox="0 0 240 500">
      {/* Head Back */}
      <path fill="#2B2625" d="M102 36 C102 20, 138 20, 138 36 C142 48, 140 68, 134 72 C126 69, 114 69, 106 72 C100 68, 98 48, 102 36 Z"/>
      <path fill="#DFB190" d="M112 69 L128 69 L132 88 L108 88 Z"/>

      {/* Arms Back */}
      <path fill="#DFB190" d="M86 102 L70 156 L64 212 L73 214 L81 160 L94 110 Z"/>
      <path fill="#DFB190" d="M154 102 L170 156 L176 212 L167 214 L159 160 L146 110 Z"/>

      {/* Bare Legs for Shorts Back */}
      {isShorts && (
        <g id="bare-legs-back">
          <path fill="#DFB190" d="M96 280 L94 420 L108 420 L113 280 Z"/>
          <path fill="#DFB190" d="M144 280 L146 420 L132 420 L127 280 Z"/>
        </g>
      )}

      {/* Upper Garment Back (Yoke Seam) */}
      <g id="upper-body-back">
        <path fill="var(--garment-top)" d="M96 88 L144 88 L154 122 L149 198 C134 200, 106 200, 91 198 L86 122 Z"/>
        <path fill="var(--garment-top)" d="M96 88 L74 128 L90 136 L98 108 Z"/>
        <path fill="var(--garment-top)" d="M144 88 L166 128 L150 136 L142 108 Z"/>
        <line x1="95" y1="116" x2="145" y2="116" stroke="var(--garment-top-shade)" strokeWidth="1.2"/>
      </g>

      {/* Lower Garment Back (Pockets) */}
      <g id="lower-body-back">
        {!isShorts ? (
          <g>
            <path fill="var(--garment-bot)" d="M90 198 L150 198 L154 220 L145 428 L126 428 L121 245 L119 245 L114 428 L95 428 L86 220 Z"/>
            <rect fill="var(--garment-bot-shade)" opacity="0.4" x="97" y="218" width="16" height="18" rx="1"/>
            <rect fill="var(--garment-bot-shade)" opacity="0.4" x="127" y="218" width="16" height="18" rx="1"/>
          </g>
        ) : (
          <g>
            <path fill="var(--garment-bot)" d="M90 198 L150 198 L153 220 L146 295 L124 295 L121 240 L119 240 L116 295 L94 295 L87 220 Z"/>
            <rect fill="var(--garment-bot-shade)" opacity="0.4" x="97" y="218" width="15" height="16" rx="1"/>
            <rect fill="var(--garment-bot-shade)" opacity="0.4" x="128" y="218" width="15" height="16" rx="1"/>
          </g>
        )}
      </g>

      {/* Shoes Back */}
      <ellipse cx="104" cy="438" rx="13" ry="7" fill="#1C1D21"/>
      <ellipse cx="136" cy="438" rx="13" ry="7" fill="#1C1D21"/>
    </svg>
  );
});