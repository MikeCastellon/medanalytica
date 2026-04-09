import { useState, useCallback } from 'react';
import { CRISGOLD_QUADRANTS } from '../lib/utils';
import {
  QUADRANT_LOGIC_TEXT,
  DDR_SECTIONS,
  NUTRITION_FOUNDATION,
  DRAINAGE_PRODUCTS,
  DIGESTION_PRODUCTS,
  RESILIENCE_PRODUCTS,
  DIGESTION_CORE_PRINCIPLE,
  SECTION_EXPLANATION,
  getProductsForSection,
  validateDigestionSelections,
  computeDigestionDefaults,
} from '../lib/drainage-digestion';

/* ── Shared Styles ── */

const pillStyle = (bg, color, border) => ({
  fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px',
  background: bg, color, border: `1px solid ${border || color}40`, whiteSpace: 'nowrap',
});

const checkboxLabel = { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text2)', cursor: 'pointer', userSelect: 'none' };

const btnSmall = { background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '3px 8px', fontSize: '10.5px', color: 'var(--text3)', cursor: 'pointer' };

/* ── RemedyRow ── */

function RemedyRow({ product, included, expanded, onToggleInclude, onToggleExpand, onRemove, showExplanation, onToggleExplanation }) {
  const blocked = product.isBlocked;
  const unavailable = !product.isAvailable;

  if (unavailable) return null;

  const rowOpacity = blocked ? 0.45 : included ? 1 : 0.55;

  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '10px 0', opacity: rowOpacity }}>
      {/* Collapsed row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => !blocked && onToggleExpand()}
          style={{ ...btnSmall, fontSize: '12px', padding: '2px 6px', border: 'none', color: blocked ? 'var(--text3)' : 'var(--navy)' }}
          disabled={blocked}
          title={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? '▾' : '▸'}
        </button>

        <div style={{ flex: 1, minWidth: '180px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: blocked ? 'var(--text3)' : 'var(--navy)' }}>
            {product.name}
          </span>
          {product.brand && (
            <span style={{ fontSize: '11px', color: 'var(--text3)', marginLeft: '6px' }}>({product.brand})</span>
          )}
          <span style={{ fontSize: '12px', color: 'var(--text2)', marginLeft: '10px' }}>
            — {product.dose}
          </span>
        </div>

        {product.tag && (
          <span style={pillStyle('var(--bg3)', 'var(--text2)', 'var(--border)')}>
            {product.tag}
          </span>
        )}

        {blocked ? (
          <span style={{ fontSize: '10.5px', color: '#c0392b', fontStyle: 'italic' }}>
            {product.blockReason || 'Not available in this quadrant'}
          </span>
        ) : (
          <>
            <label style={checkboxLabel} className="no-print">
              <input type="checkbox" checked={included} onChange={onToggleInclude} />
              Include
            </label>
            <button onClick={onRemove} style={{ ...btnSmall, color: '#c0392b', borderColor: '#fca5a540' }} className="no-print" title="Remove">
              ✕
            </button>
          </>
        )}
      </div>

      {/* Expanded card */}
      {expanded && !blocked && (
        <div style={{ marginTop: '10px', marginLeft: '28px', padding: '12px 16px', background: 'var(--bg3)', borderRadius: '8px', fontSize: '12.5px', lineHeight: '1.7' }}>
          {product.clinicalRole && (
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: 'var(--navy)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Clinical Role</strong>
              <div style={{ color: 'var(--text2)' }}>{product.clinicalRole}</div>
            </div>
          )}
          {product.indications && product.indications.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: 'var(--navy)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>When CRIS Suggests This</strong>
              <ul style={{ margin: '4px 0 0 16px', padding: 0, color: 'var(--text2)' }}>
                {product.indications.map((ind, i) => <li key={i}>{ind}</li>)}
              </ul>
            </div>
          )}
          {product.whyItMatters && (
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: 'var(--navy)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Why This Matters</strong>
              <div style={{ color: 'var(--text2)' }}>{product.whyItMatters}</div>
            </div>
          )}
          {product.commonMistakes && product.commonMistakes.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#b45309', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Common Mistakes</strong>
              <ul style={{ margin: '4px 0 0 16px', padding: 0, color: '#b45309' }}>
                {product.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          )}
          {product.patientExplanation && (
            <div style={{ marginBottom: '8px', padding: '8px 12px', background: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
              <strong style={{ color: '#1e40af', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Patient Explanation</strong>
              <div style={{ color: '#1e3a5f', marginTop: '2px' }}>{product.patientExplanation}</div>
            </div>
          )}
          {product.scientificSummary && (
            <div style={{ fontSize: '11px', color: 'var(--text3)', fontStyle: 'italic', marginTop: '4px' }}>
              {product.scientificSummary}
            </div>
          )}
          <div style={{ marginTop: '10px', display: 'flex', gap: '16px', flexWrap: 'wrap' }} className="no-print">
            <label style={checkboxLabel}>
              <input type="checkbox" checked={included} onChange={onToggleInclude} />
              Include remedy in report
            </label>
            <label style={checkboxLabel}>
              <input type="checkbox" checked={showExplanation} onChange={onToggleExplanation} />
              Include explanation in report
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SubSection ── */

function SubSection({ title, subtitle, products, included, onToggleInclude, showExplanation, onToggleExplanation, explanation, productStates, onProductChange, expanded, onToggleExpanded, children }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      {/* Sub-section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '2px solid var(--border)', flexWrap: 'wrap' }}>
        <button onClick={onToggleExpanded} style={{ ...btnSmall, border: 'none', fontSize: '13px', color: 'var(--navy)', fontWeight: '700' }}>
          {expanded ? '▾' : '▸'}
        </button>
        <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--navy)', flex: 1 }}>
          {title}
        </div>
        {subtitle && <div style={{ fontSize: '11px', color: 'var(--text3)', fontStyle: 'italic' }}>{subtitle}</div>}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} className="no-print">
          <label style={checkboxLabel}>
            <input type="checkbox" checked={included} onChange={onToggleInclude} />
            Include in report
          </label>
          <label style={checkboxLabel}>
            <input type="checkbox" checked={showExplanation} onChange={onToggleExplanation} />
            Show explanation
          </label>
        </div>
      </div>

      {expanded && (
        <div style={{ paddingLeft: '4px' }}>
          {/* Section explanation */}
          {showExplanation && explanation && (
            <div style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: '1.7', padding: '8px 12px', margin: '8px 0', background: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
              {explanation}
            </div>
          )}

          {/* Extra children (e.g. core principle bar) */}
          {children}

          {/* Product rows */}
          {products.map(p => {
            const state = productStates[p.id] || {};
            return (
              <RemedyRow
                key={p.id}
                product={p}
                included={state.included ?? p.defaultIncluded}
                expanded={state.expanded ?? false}
                showExplanation={state.showExplanation ?? false}
                onToggleInclude={() => onProductChange(p.id, 'included', !(state.included ?? p.defaultIncluded))}
                onToggleExpand={() => onProductChange(p.id, 'expanded', !(state.expanded ?? false))}
                onToggleExplanation={() => onProductChange(p.id, 'showExplanation', !(state.showExplanation ?? false))}
                onRemove={() => onProductChange(p.id, 'removed', true)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── NutritionPanel ── */

function NutritionPanel({ includeInReport, onToggleInclude, showExplanation, onToggleExplanation }) {
  const n = NUTRITION_FOUNDATION;
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '2px solid var(--border)', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--navy)', flex: 1 }}>
          Nutrition (Foundation)
        </div>
        <span style={pillStyle('#e6f5ef', '#0e7a55')}>{n.dietName}</span>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} className="no-print">
          <label style={checkboxLabel}>
            <input type="checkbox" checked={includeInReport} onChange={onToggleInclude} />
            Include in report
          </label>
          <label style={checkboxLabel}>
            <input type="checkbox" checked={showExplanation} onChange={onToggleExplanation} />
            Show explanation
          </label>
        </div>
      </div>

      <div style={{ padding: '12px 16px', marginTop: '4px', background: 'var(--bg3)', borderRadius: '8px', fontSize: '12.5px', lineHeight: '1.7' }}>
        {showExplanation && (
          <div style={{ marginBottom: '12px', padding: '8px 12px', background: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe', color: '#1e3a5f' }}>
            {n.explanation}
          </div>
        )}
        <div style={{ marginBottom: '8px' }}>
          <strong style={{ color: 'var(--navy)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Goals</strong>
          <ul style={{ margin: '4px 0 0 16px', padding: 0, color: 'var(--text2)' }}>
            {n.goals.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>
        <div>
          <strong style={{ color: 'var(--navy)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Core Foods</strong>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', marginTop: '4px', color: 'var(--text2)' }}>
            <div><strong>Protein:</strong> {n.foods.protein}</div>
            <div><strong>Vegetables:</strong> {n.foods.vegetables}</div>
            <div><strong>Fats:</strong> {n.foods.fats}</div>
            <div><strong>Fruits:</strong> {n.foods.fruits}</div>
          </div>
        </div>
        {showExplanation && n.patientExplanation && (
          <div style={{ marginTop: '10px', padding: '8px 12px', background: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
            <strong style={{ color: '#0e7a55', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Patient Explanation</strong>
            <div style={{ color: '#166534', marginTop: '2px' }}>{n.patientExplanation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ValidationBanner ── */

function ValidationBanner({ errors, warnings }) {
  if (errors.length === 0 && warnings.length === 0) return null;
  return (
    <div style={{ margin: '8px 0' }}>
      {errors.map((e, i) => (
        <div key={`e${i}`} style={{ fontSize: '11.5px', padding: '6px 10px', marginBottom: '4px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', color: '#991b1b' }}>
          <strong>Error:</strong> {e}
        </div>
      ))}
      {warnings.map((w, i) => (
        <div key={`w${i}`} style={{ fontSize: '11.5px', padding: '6px 10px', marginBottom: '4px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', color: '#92400e' }}>
          <strong>Warning:</strong> {w}
        </div>
      ))}
    </div>
  );
}

/* ── CustomRemedyInput ── */

function CustomRemedyInput({ onAdd }) {
  const [text, setText] = useState('');
  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };
  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', padding: '8px 0' }} className="no-print">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="Type custom remedy or note here..."
        style={{ flex: 1, border: '1px solid var(--border)', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', background: 'var(--bg2)', color: 'var(--navy)' }}
      />
      <button onClick={handleAdd} style={{ ...btnSmall, background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)', fontWeight: '600' }}>
        + Add
      </button>
    </div>
  );
}

/* ── Main Component ── */

export default function DrainageDigestionSection({ quadrant }) {
  const q = quadrant || null;
  const qDef = q ? CRISGOLD_QUADRANTS[q] : null;
  const qLogic = q ? QUADRANT_LOGIC_TEXT[q] : null;

  // Section-level state
  const [sectionInclude, setSectionInclude] = useState(true);
  const [sectionExplanation, setSectionExplanation] = useState(false);
  const [quadrantExplanation, setQuadrantExplanation] = useState(false);

  // Nutrition state
  const [nutritionInclude, setNutritionInclude] = useState(true);
  const [nutritionExplanation, setNutritionExplanation] = useState(false);

  // Sub-section expanded state — primary category expanded by default based on quadrant
  const primarySection = (quadrant === 'Q3' || quadrant === 'Q4') ? 'resilience' : 'drainage';
  const [subExpanded, setSubExpanded] = useState({
    drainage: primarySection === 'drainage',
    digestion: false,
    resilience: primarySection === 'resilience',
  });
  const toggleSubExpanded = useCallback((key) => setSubExpanded(prev => ({ ...prev, [key]: !prev[key] })), []);

  // Sub-section include/explanation state
  const [subIncludes, setSubIncludes] = useState({ drainage: true, digestion: true, resilience: true });
  const [subExplanations, setSubExplanations] = useState({ drainage: false, digestion: false, resilience: false });
  const toggleSubInclude = useCallback((key) => setSubIncludes(prev => ({ ...prev, [key]: !prev[key] })), []);
  const toggleSubExplanation = useCallback((key) => setSubExplanations(prev => ({ ...prev, [key]: !prev[key] })), []);

  // Product state: { [productId]: { included, expanded, showExplanation, removed } }
  const [productStates, setProductStates] = useState({});
  const handleProductChange = useCallback((productId, field, value) => {
    setProductStates(prev => ({
      ...prev,
      [productId]: { ...prev[productId], [field]: value },
    }));
  }, []);

  // Custom remedies per sub-section
  const [customRemedies, setCustomRemedies] = useState({ drainage: [], digestion: [], resilience: [] });
  const addCustomRemedy = useCallback((section, text) => {
    setCustomRemedies(prev => ({
      ...prev,
      [section]: [...prev[section], { id: `custom-${Date.now()}`, text, included: true }],
    }));
  }, []);

  // Compute digestion validation
  const digestionSelections = {};
  const digestionProducts = q ? getProductsForSection('digestion', q) : [];
  digestionProducts.forEach(p => {
    const state = productStates[p.id];
    digestionSelections[p.id] = {
      included: state?.included ?? p.defaultIncluded,
    };
  });
  const validation = q ? validateDigestionSelections(digestionSelections, q) : { valid: true, errors: [], warnings: [] };

  // Filter out removed products
  const filterRemoved = (products) => products.filter(p => !productStates[p.id]?.removed);

  // No quadrant — show fallback
  if (!q) {
    return (
      <div className="cc" style={{ marginBottom: '16px', textAlign: 'center', padding: '28px 22px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text3)' }}>
          Quadrant not yet determined — upload HQP data to activate Drainage, Digestion & Resilience recommendations.
        </div>
      </div>
    );
  }

  const drainageProducts = filterRemoved(getProductsForSection('drainage', q));
  const filteredDigestion = filterRemoved(digestionProducts);
  const resilienceProducts = filterRemoved(getProductsForSection('resilience', q));

  // Active product counter
  const activeCount = Object.entries(productStates).filter(([, s]) => s?.included !== false).length;

  return (
    <div className="cc" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--navy)', flex: 1 }}>
          Drainage, Digestion & Resilience Support
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} className="no-print">
          <label style={checkboxLabel}>
            <input type="checkbox" checked={sectionInclude} onChange={() => setSectionInclude(!sectionInclude)} />
            Include section in report
          </label>
          <label style={checkboxLabel}>
            <input type="checkbox" checked={sectionExplanation} onChange={() => setSectionExplanation(!sectionExplanation)} />
            Include section explanation
          </label>
        </div>
      </div>

      {/* Section explanation */}
      {sectionExplanation && (
        <div style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: '1.7', padding: '8px 12px', marginBottom: '10px', background: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
          {SECTION_EXPLANATION.main}
        </div>
      )}

      {/* Active product counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <span style={pillStyle(activeCount > 5 ? '#fef3c7' : 'var(--bg3)', activeCount > 5 ? '#92400e' : 'var(--text2)', activeCount > 5 ? '#f59e0b' : 'var(--border)')}>
          Active Protocol {activeCount}/5
        </span>
        {activeCount > 5 && (
          <span style={{ fontSize: '11.5px', color: '#b45309', fontWeight: '600' }}>
            Too many products selected — reduce for patient compliance
          </span>
        )}
      </div>

      {/* Quadrant Logic Bar — always visible */}
      <div style={{ padding: '10px 14px', marginBottom: '12px', borderRadius: '8px', background: qDef.bg, border: `1px solid ${qDef.color}30` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ ...pillStyle(qDef.color, '#fff'), fontSize: '11px', fontWeight: '700' }}>
            {q}
          </span>
          <span style={{ fontSize: '12.5px', fontWeight: '600', color: qDef.color }}>{qDef.label}</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--navy2)', marginTop: '4px' }}>
          {qLogic.interpretation}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--navy)', fontWeight: '600', marginTop: '2px' }}>
          Goal: {qLogic.goal}
        </div>
        {qLogic.clinicalStrategy && (
          <ul style={{ marginTop: '6px', paddingLeft: '16px', fontSize: '12px', color: 'var(--text2)' }}>
            {qLogic.clinicalStrategy.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        )}
        {qLogic.warning && (
          <div style={{ fontSize: '11.5px', color: '#c0392b', marginTop: '6px', padding: '4px 8px', background: '#fef2f2', borderRadius: '4px' }}>
            ⚠ {qLogic.warning}
          </div>
        )}
        <div style={{ marginTop: '6px' }} className="no-print">
          <label style={checkboxLabel}>
            <input type="checkbox" checked={quadrantExplanation} onChange={() => setQuadrantExplanation(!quadrantExplanation)} />
            Include quadrant explanation in report
          </label>
        </div>
        {quadrantExplanation && (
          <div style={{ fontSize: '12px', color: 'var(--text2)', marginTop: '6px', lineHeight: '1.6' }}>
            {qDef.description}
          </div>
        )}
      </div>

      {/* 1. Nutrition */}
      <NutritionPanel
        includeInReport={nutritionInclude}
        onToggleInclude={() => setNutritionInclude(!nutritionInclude)}
        showExplanation={nutritionExplanation}
        onToggleExplanation={() => setNutritionExplanation(!nutritionExplanation)}
      />

      {/* 2. Drainage */}
      <SubSection
        title="Drainage"
        subtitle="Open elimination pathways before deeper intervention"
        products={drainageProducts}
        included={subIncludes.drainage}
        onToggleInclude={() => toggleSubInclude('drainage')}
        showExplanation={subExplanations.drainage}
        onToggleExplanation={() => toggleSubExplanation('drainage')}
        explanation={SECTION_EXPLANATION.drainage}
        productStates={productStates}
        onProductChange={handleProductChange}
        expanded={subExpanded.drainage}
        onToggleExpanded={() => toggleSubExpanded('drainage')}
      >
        <CustomRemedyInput onAdd={(text) => addCustomRemedy('drainage', text)} />
        {customRemedies.drainage.map(cr => (
          <div key={cr.id} style={{ borderBottom: '1px solid var(--border)', padding: '8px 0', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ flex: 1, color: 'var(--navy)' }}>{cr.text}</span>
            <span style={pillStyle('#fef3e2', '#b45309')}>Custom</span>
            <label style={checkboxLabel} className="no-print">
              <input type="checkbox" checked={cr.included} onChange={() => {
                setCustomRemedies(prev => ({
                  ...prev,
                  drainage: prev.drainage.map(c => c.id === cr.id ? { ...c, included: !c.included } : c),
                }));
              }} />
              Include
            </label>
          </div>
        ))}
      </SubSection>

      {/* 3. Digestion */}
      <SubSection
        title="Digestion"
        subtitle={DIGESTION_CORE_PRINCIPLE}
        products={filteredDigestion}
        included={subIncludes.digestion}
        onToggleInclude={() => toggleSubInclude('digestion')}
        showExplanation={subExplanations.digestion}
        onToggleExplanation={() => toggleSubExplanation('digestion')}
        explanation={SECTION_EXPLANATION.digestion}
        productStates={productStates}
        onProductChange={handleProductChange}
        expanded={subExpanded.digestion}
        onToggleExpanded={() => toggleSubExpanded('digestion')}
      >
        {/* Validation */}
        <ValidationBanner errors={validation.errors} warnings={validation.warnings} />

        <CustomRemedyInput onAdd={(text) => addCustomRemedy('digestion', text)} />
        {customRemedies.digestion.map(cr => (
          <div key={cr.id} style={{ borderBottom: '1px solid var(--border)', padding: '8px 0', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ flex: 1, color: 'var(--navy)' }}>{cr.text}</span>
            <span style={pillStyle('#fef3e2', '#b45309')}>Custom</span>
            <label style={checkboxLabel} className="no-print">
              <input type="checkbox" checked={cr.included} onChange={() => {
                setCustomRemedies(prev => ({
                  ...prev,
                  digestion: prev.digestion.map(c => c.id === cr.id ? { ...c, included: !c.included } : c),
                }));
              }} />
              Include
            </label>
          </div>
        ))}
      </SubSection>

      {/* 4. Resilience Support — hidden if no products for this quadrant */}
      {resilienceProducts.some(p => p.isAvailable) && (
        <SubSection
          title="Resilience Support"
          subtitle="Stabilize recovery capacity during treatment"
          products={resilienceProducts}
          included={subIncludes.resilience}
          onToggleInclude={() => toggleSubInclude('resilience')}
          showExplanation={subExplanations.resilience}
          onToggleExplanation={() => toggleSubExplanation('resilience')}
          explanation={SECTION_EXPLANATION.resilience}
          productStates={productStates}
          onProductChange={handleProductChange}
          expanded={subExpanded.resilience}
          onToggleExpanded={() => toggleSubExpanded('resilience')}
        >
          <CustomRemedyInput onAdd={(text) => addCustomRemedy('resilience', text)} />
          {customRemedies.resilience.map(cr => (
            <div key={cr.id} style={{ borderBottom: '1px solid var(--border)', padding: '8px 0', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ flex: 1, color: 'var(--navy)' }}>{cr.text}</span>
              <span style={pillStyle('#fef3e2', '#b45309')}>Custom</span>
              <label style={checkboxLabel} className="no-print">
                <input type="checkbox" checked={cr.included} onChange={() => {
                  setCustomRemedies(prev => ({
                    ...prev,
                    resilience: prev.resilience.map(c => c.id === cr.id ? { ...c, included: !c.included } : c),
                  }));
                }} />
                Include
              </label>
            </div>
          ))}
        </SubSection>
      )}
    </div>
  );
}
