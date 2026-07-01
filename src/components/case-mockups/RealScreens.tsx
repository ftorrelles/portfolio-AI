'use client';
import { useState, useEffect, type CSSProperties, type ReactNode } from 'react';

// Real screen recreations for the Case Studies device frame. Copied and
// adapted from the equivalent (already-shipped) component in the nexdevp
// repo — same real content/colors per product, just re-keyed by
// {caseSlug, screenSlug} to match this repo's messages.json schema instead
// of nexdevp's numeric (case, innerTab) index pairs, and using this repo's
// path-based locale convention instead of next-intl's useLocale().

type Locale = 'es' | 'en';

function Grow({ pct, axis = 'x', color, radius, duration = 950 }: { pct: number; axis?: 'x' | 'y'; color: string; radius?: string; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setV(pct), 40);
    return () => clearTimeout(t);
  }, [pct]);
  const style: CSSProperties = {
    background: color,
    borderRadius: radius,
    transition: `width ${duration}ms cubic-bezier(.2,.7,.3,1), height ${duration}ms cubic-bezier(.2,.7,.3,1)`,
    ...(axis === 'x' ? { width: `${v}%`, height: '100%' } : { height: `${v}%`, width: '100%' }),
  };
  return <div style={style} />;
}

function Counter({ to, money = false }: { to: number; money?: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    let st: number | null = null;
    const step = (ts: number) => {
      if (st === null) st = ts;
      const p = Math.min((ts - st) / 1100, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(to * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const d = setTimeout(() => { raf = requestAnimationFrame(step); }, 150);
    return () => { clearTimeout(d); cancelAnimationFrame(raf); };
  }, [to]);
  if (money) return <>{'$' + Math.round(n).toLocaleString('en-US') + '.00'}</>;
  return <>{Math.round(n).toLocaleString('es')}</>;
}

function t(loc: Locale, es: string, en: string) {
  return loc === 'en' ? en : es;
}

function ConstructionHeader({ loc }: { loc: Locale }) {
  return (
    <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(34,181,97,.03)' }}>
      <div className="flex gap-1.5">{['#ef5350', '#fbc02d', '#22b561'].map((col) => <span key={col} className="w-2 h-2 rounded-full" style={{ background: col }} />)}</div>
      <span className="text-[9px] uppercase" style={{ letterSpacing: '.15em', color: 'rgba(34,181,97,.55)' }}>{t(loc, 'gestión de obra', 'construction budgets')}</span>
      <span className="text-[9px] animate-pulse" style={{ color: 'rgba(34,181,97,.5)' }}>● live</span>
    </div>
  );
}

function CocinerHospHeader({ loc }: { loc: Locale }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5" style={{ background: '#15543a' }}>
      <span className="text-[12px] font-semibold text-white">🏥 CocinerHosp</span>
      <span className="text-[9px]" style={{ color: 'rgba(255,255,255,.7)' }}>{t(loc, 'mar 30 jun', 'Tue Jun 30')}</span>
    </div>
  );
}

function SpeakPathHeader() {
  return (
    <div className="flex items-center justify-between px-3 py-2.5" style={{ background: '#fff', borderBottom: '1px solid #e6e9f2' }}>
      <span className="text-[13px] font-extrabold" style={{ color: '#2546d6' }}>SpeakPath</span>
      <span className="text-[14px]" style={{ color: '#8a90a0' }}>≡</span>
    </div>
  );
}

function ConstructionRentabilidad({ loc }: { loc: Locale }) {
  return (
    <>
      <ConstructionHeader loc={loc} />
      <div className="px-3.5 py-4" style={{ background: '#0a0c0d', minHeight: '260px' }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[13px] font-semibold text-white m-0 mb-0.5">{t(loc, 'Rentabilidad de la obra', 'Project profitability')}</p>
            <p className="text-[11px] text-nex-grey m-0">{t(loc, 'Ganancia estimada al cerrar', 'Estimated profit at close-out')}</p>
          </div>
          <span className="text-[10px] text-nex-grey border border-white/15 rounded-full px-2.5 py-0.5">{t(loc, 'En ejecución', 'In progress')}</span>
        </div>
        <div className="flex items-baseline justify-between my-1.5 mb-3">
          <p className="text-[32px] font-extrabold text-white m-0"><Counter to={2550} money /></p>
          <span className="text-[12px] text-nex-grey">{t(loc, 'margen', 'margin')} <span className="text-nex-green">30%</span></span>
        </div>
        <p className="text-[10px] text-nex-grey m-0 mb-1.5">{t(loc, 'De lo que paga el cliente', 'Of what the client pays')} ($11,049.99)</p>
        <div className="flex h-[9px] rounded-md overflow-hidden" style={{ background: 'rgba(255,255,255,.05)' }}>
          <Grow pct={71.6} color="#6b7280" /><Grow pct={5.3} color="#3a4250" /><Grow pct={23.1} color="#22b561" />
        </div>
        <div className="flex gap-3 my-2 mb-2.5 flex-wrap text-[10px] text-nex-grey">
          <span><span style={{ color: '#6b7280' }}>●</span> {t(loc, 'Gastado', 'Spent')} <b className="text-white font-semibold">$7,910</b></span>
          <span><span style={{ color: '#3a4250' }}>●</span> {t(loc, 'Por gastar', 'To spend')} <b className="text-white font-semibold">$589.99</b></span>
          <span><span style={{ color: '#22b561' }}>●</span> {t(loc, 'Ganancia', 'Profit')} <b className="text-nex-green font-semibold">$2,550</b></span>
        </div>
        <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(34,181,97,.06)', border: '1px solid rgba(34,181,97,.15)' }}>
          <p className="text-[10.5px] text-nex-grey m-0 leading-relaxed">
            {t(loc, 'Tu ganancia está protegida mientras el gasto no supere el costo presupuestado', 'Your profit is protected as long as spending stays under the budgeted cost')} (<span className="text-white">$8,499.99</span>).
          </p>
        </div>
      </div>
    </>
  );
}

function ConstructionPresupuestadoVsReal({ loc }: { loc: Locale }) {
  const stats: [string, string, string][] = [
    [t(loc, 'Presup.', 'Budget'), '$8,500', '#f5f5f5'],
    [t(loc, 'Real', 'Actual'), '$7,910', '#f5f5f5'],
    [t(loc, 'Desv.', 'Dev.'), '−$590', '#22b561'],
    [t(loc, 'Ejec.', 'Exec.'), '93%', '#f5f5f5'],
  ];
  const rows: [string, string, string, string, string, boolean][] = [
    ['● ' + t(loc, 'Materiales', 'Materials'), '$620', '$620', '0%', '#8a8c8b', true],
    [t(loc, 'Piedra', 'Stone'), '$20', '$30', '+50%', '#ef5350', false],
    ['● ' + t(loc, 'Mano de obra', 'Labor'), '$7,000', '$7,100', '+1%', '#fbc02d', true],
    [t(loc, 'Maestro de obra', 'Foreman'), '$2,000', '$2,600', '+30%', '#ef5350', false],
    ['● ' + t(loc, 'Equipos', 'Equipment'), '$380', '$190', '−50%', '#22b561', true],
  ];
  return (
    <>
      <ConstructionHeader loc={loc} />
      <div className="px-3.5 py-4" style={{ background: '#0a0c0d', minHeight: '260px' }}>
        <p className="text-[13px] font-semibold text-white m-0 mb-2.5">{t(loc, 'Presupuestado vs Real', 'Budgeted vs actual')}</p>
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {stats.map(([k, v, col]) => (
            <div key={k} className="rounded-lg px-2 py-1.5" style={{ border: '1px solid rgba(255,255,255,.06)' }}>
              <p className="text-[9px] text-nex-grey m-0 mb-0.5">{k}</p>
              <p className="text-[13px] font-bold m-0" style={{ color: col }}>{v}</p>
            </div>
          ))}
        </div>
        <table className="w-full border-collapse text-[11px]">
          <tbody>
            <tr className="text-nex-grey">
              <td className="py-1">{t(loc, 'Concepto', 'Item')}</td>
              <td className="text-right">{t(loc, 'Presup.', 'Budget')}</td>
              <td className="text-right">{t(loc, 'Real', 'Actual')}</td>
              <td className="text-right">{t(loc, 'Desv.', 'Dev.')}</td>
            </tr>
            {rows.map(([name, p, r, d, col, head], i) => (
              <tr key={i} style={head ? { borderTop: '1px solid rgba(255,255,255,.05)' } : undefined}>
                <td className={head ? 'py-1.5 text-white' : 'py-1.5 pl-3.5 text-nex-grey'}>{name}</td>
                <td className="text-right" style={{ color: head ? '#8a8c8b' : '#6b7280' }}>{p}</td>
                <td className="text-right" style={{ color: head ? '#8a8c8b' : '#6b7280' }}>{r}</td>
                <td className="text-right" style={{ color: col }}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ConstructionPresupuestos({ loc }: { loc: Locale }) {
  const items: [string, string, string, string, string][] = [
    ['PRE-2026-0006', t(loc, 'Remodelación oficinas centrales', 'Head office remodel'), '$11,500', t(loc, 'En ejecución', 'In progress'), '#22b561'],
    ['PRE-2026-0005', t(loc, 'Ampliación de bodega norte', 'North warehouse expansion'), '$14,970', t(loc, 'En revisión', 'Under review'), '#3b82f6'],
    ['PRE-2026-0004', t(loc, 'Instalación eléctrica nave 2', 'Electrical install, bay 2'), '$8,500', t(loc, 'En ejecución', 'In progress'), '#22b561'],
  ];
  return (
    <>
      <ConstructionHeader loc={loc} />
      <div className="px-3.5 py-4" style={{ background: '#0a0c0d', minHeight: '260px' }}>
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-[13px] font-semibold text-white m-0">{t(loc, 'Presupuestos', 'Budgets')}</p>
          <span className="text-[10px] text-black bg-nex-green font-semibold px-2.5 py-1 rounded-md">{t(loc, '+ Nuevo', '+ New')}</span>
        </div>
        <div className="flex flex-col gap-2">
          {items.map(([code, name, amt, st, col]) => (
            <div key={code} className="rounded-r-lg px-3 py-2.5" style={{ border: '1px solid rgba(255,255,255,.07)', borderLeft: `3px solid ${col}` }}>
              <div className="flex justify-between"><span className="text-[9px] text-nex-grey">{code}</span><span className="text-[10px]" style={{ color: col }}>● {st}</span></div>
              <div className="flex justify-between items-center mt-0.5"><span className="text-[12px] text-white font-medium">{name}</span><span className="text-[14px] font-bold text-white">{amt}</span></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CocinerHospCalcular({ loc }: { loc: Locale }) {
  const quickPicks: [string, boolean][] = [
    [t(loc, 'Muslo pollo', 'Chicken thigh'), true],
    [t(loc, 'Contramuslo', 'Chicken leg'), false],
    [t(loc, 'Pescado', 'Fish'), false],
    [t(loc, 'Albóndigas', 'Meatballs'), false],
    [t(loc, 'Hamburguesa', 'Burger'), false],
    [t(loc, '+ Otro', '+ Other'), false],
  ];
  const facts: [string, string][] = [
    [t(loc, 'Unid./caja', 'Units/box'), '20'],
    [t(loc, 'Unid./ración', 'Units/serving'), '2'],
    [t(loc, 'Merma %', 'Waste %'), '30'],
  ];
  return (
    <>
      <CocinerHospHeader loc={loc} />
      <div className="px-3.5 py-4" style={{ background: '#f3f5f3', minHeight: '260px' }}>
        <div className="rounded-[10px] p-3 mb-2.5" style={{ background: '#15543a' }}>
          <p className="text-[10px] m-0 mb-0.5" style={{ color: 'rgba(255,255,255,.8)', letterSpacing: '.05em' }}>{t(loc, 'ALMUERZO · Total pacientes', 'LUNCH · Total patients')}</p>
          <p className="text-[26px] font-extrabold text-white m-0"><Counter to={414} /></p>
        </div>
        <div className="flex gap-4 mb-2.5 text-[11px]">
          <span className="font-semibold" style={{ color: '#15543a' }}>{t(loc, 'Proteína', 'Protein')}</span>
          <span style={{ color: '#9aa89f' }}>{t(loc, 'Guarnición', 'Side')}</span>
        </div>
        <div className="rounded-lg p-2 mb-2" style={{ background: '#fff', border: '1px solid #e3e7e3' }}>
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-semibold" style={{ color: '#2c3a32' }}>{t(loc, 'Muslo pollo', 'Chicken thigh')}</span>
            <span className="text-[11px]" style={{ color: '#9aa89f' }}>✕</span>
          </div>
        </div>
        <p className="text-[10px] m-0 mb-1.5" style={{ color: '#7a8a80' }}>{t(loc, 'Proteína — selección rápida', 'Protein — quick select')}</p>
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          {quickPicks.map(([n, act]) => (
            <div key={n} className="rounded-md text-center py-2 text-[10px]" style={act ? { background: '#15543a', color: '#fff', fontWeight: 600 } : { background: '#fff', border: '1px solid #e3e7e3', color: '#3a4a40' }}>{n}</div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {facts.map(([k, v]) => (
            <div key={k}>
              <p className="text-[9px] m-0 mb-1" style={{ color: '#7a8a80' }}>{k}</p>
              <div className="rounded-md px-2 py-1.5 text-[12px] flex justify-between items-center" style={{ background: '#fff', border: '1px solid #e3e7e3', color: '#2c3a32' }}>
                {v}{k.includes('Merma') || k.includes('Waste') ? <span className="text-[8px] px-1 rounded" style={{ background: '#e3efe8', color: '#15543a' }}>auto</span> : null}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-md text-center py-2.5 text-[12px] font-semibold text-white" style={{ background: '#15543a' }}>{t(loc, 'Calcular', 'Calculate')}</div>
      </div>
    </>
  );
}

function CocinerHospDashboard({ loc }: { loc: Locale }) {
  const cards: [string, string, string, string, string, string][] = [
    ['526', t(loc, 'Barquetas este mes', 'Trays this month'), '#15543a', '#e3efe8', '#cfe3d6', '#5a7065'],
    ['75', t(loc, 'Media barquetas/día', 'Avg trays/day'), '#b06f12', '#faecd0', '#f0dcb0', '#8a6a3a'],
    ['19', t(loc, 'Elaboraciones', 'Preparations'), '#1e3a8a', '#e6ecf6', '#d2deef', '#46587f'],
    ['0', t(loc, 'Barquetas hoy', 'Trays today'), '#15543a', '#e3efe8', '#cfe3d6', '#5a7065'],
  ];
  const days = [100, 87, 0, 85, 75, 0, 0];
  const dayLabels = loc === 'en' ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'] : ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  return (
    <>
      <CocinerHospHeader loc={loc} />
      <div className="px-3.5 py-4" style={{ background: '#f3f5f3', minHeight: '260px' }}>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {cards.map(([n, l, col, bg, bd, sub]) => (
            <div key={l} className="rounded-[9px] px-2.5 py-2" style={{ background: bg, border: `1px solid ${bd}` }}>
              <p className="text-[21px] font-extrabold m-0 leading-none" style={{ color: col }}>{n}</p>
              <p className="text-[9.5px] m-0 mt-0.5" style={{ color: sub }}>{l}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[10px] px-3 py-2.5" style={{ background: '#fff', border: '1px solid #e3e7e3' }}>
          <p className="text-[11px] font-semibold text-center m-0 mb-2.5" style={{ color: '#2c3a32' }}>{t(loc, 'Semana — 8 a 14 jun', 'Week — Jun 8–14')}</p>
          <div className="flex items-end justify-between gap-1.5" style={{ height: '66px' }}>
            {days.map((h, i) => (
              <div key={i} className="flex-1 flex items-end h-full">
                {h > 0 ? <Grow pct={h} axis="y" color="#9cc0a8" radius="4px 4px 0 0" /> : <div className="w-full rounded-[3px]" style={{ height: '3px', background: '#e0e5e0' }} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {dayLabels.map((d, i) => <span key={i} className="flex-1 text-center text-[8.5px]" style={{ color: '#8a9a8f' }}>{d}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}

function CocinerHospDietasBlandas({ loc }: { loc: Locale }) {
  return (
    <>
      <CocinerHospHeader loc={loc} />
      <div className="px-3.5 py-4" style={{ background: '#f3f5f3', minHeight: '260px' }}>
        <p className="text-[12px] font-bold m-0 mb-0.5" style={{ color: '#2c3a32' }}>🍲 {t(loc, 'Dietas Blandas', 'Soft diets')}</p>
        <p className="text-[10px] m-0 mb-2.5" style={{ color: '#7a8a80' }}>{t(loc, 'Producción fija diaria — no depende del nº de pacientes', 'Fixed daily production — independent of patient count')}</p>
        <div className="rounded-[10px] p-3 text-center mb-2.5" style={{ background: '#15543a' }}>
          <p className="text-[10px] m-0 mb-0.5" style={{ color: 'rgba(255,255,255,.8)', letterSpacing: '.05em' }}>{t(loc, 'TOTAL BOLSAS CONGELADAS / DÍA', 'TOTAL FROZEN BAGS / DAY')}</p>
          <p className="text-[26px] font-extrabold text-white m-0">47</p>
        </div>
        <div className="rounded-lg px-2.5 py-2 mb-2.5 text-center" style={{ background: '#fff', border: '1px solid #e3e7e3' }}>
          <span className="text-[10.5px]" style={{ color: '#3a4a40' }}>{t(loc, 'Papas', 'Potato')} <b>41</b> · {t(loc, 'Zanahoria', 'Carrot')} <b>2</b> · {t(loc, 'Calabaza', 'Squash')} <b>1</b> · {t(loc, 'Calabacín', 'Zucchini')} <b>3</b></span>
        </div>
        <div className="rounded-lg px-3 py-2.5" style={{ background: '#fff', border: '1px solid #e3e7e3' }}>
          <p className="text-[11px] font-semibold m-0 mb-2" style={{ color: '#2c3a32' }}>🍲 {t(loc, 'Chinos — 22 barquetas × 3 kg = 66 kg/día', 'Purées — 22 trays × 3 kg = 66 kg/day')}</p>
          <table className="w-full text-[10.5px] border-collapse">
            <tbody>
              <tr style={{ color: '#8a9a8f' }}>
                <td className="py-0.5">{t(loc, 'Tipo', 'Type')}</td>
                <td className="text-right">{t(loc, 'Bolsas', 'Bags')}</td>
                <td className="text-right">{t(loc, 'Bruto', 'Gross')}</td>
              </tr>
              {[t(loc, 'Zanahoria', 'Carrot'), t(loc, 'Calabaza', 'Squash'), t(loc, 'Calabacín', 'Zucchini')].map((ty, i) => (
                <tr key={i} style={{ background: i % 2 === 1 ? '#f6f8f6' : '#fff', borderTop: i === 0 ? '1px solid #eef1ee' : undefined }}>
                  <td className="py-1" style={{ color: '#2c3a32' }}>{ty}</td>
                  <td className="text-right" style={{ color: '#3a4a40' }}>4</td>
                  <td className="text-right" style={{ color: '#3a4a40' }}>10 kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SpeakPathDashboard() {
  return (
    <>
      <SpeakPathHeader />
      <div className="px-3.5 py-4" style={{ background: '#f6f7fb', minHeight: '260px' }}>
        <p className="text-[20px] font-extrabold m-0 mb-0.5" style={{ color: '#0f1730' }}>Welcome back, Francisco!</p>
        <p className="text-[12px] m-0 mb-3.5" style={{ color: '#6a7290' }}>Ready to keep improving your English?</p>
        <p className="text-[11px] font-semibold m-0 mb-2" style={{ color: '#2c3550' }}>Your courses</p>
        <div className="rounded-[11px] p-3" style={{ background: '#fff', border: '1px solid #e6e9f2' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[14px] font-bold" style={{ color: '#1a2238' }}>SpeakPath Foundations</span>
            <span className="text-[11px] text-black bg-nex-green font-semibold rounded-md px-2.5 py-1">Continue →</span>
          </div>
          <div className="h-[7px] rounded overflow-hidden" style={{ background: '#e6e9f2' }}><Grow pct={8} color="#234fe0" radius="4px" /></div>
          <p className="text-[10px] m-0 mt-1.5" style={{ color: '#8a90a0' }}>2 / 25 lessons · 8%</p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[['📚', 'My Courses', 'Browse your curriculum'], ['📅', 'My Lessons', 'Upcoming classes']].map(([ic, ti, d]) => (
            <div key={ti} className="rounded-[11px] p-3" style={{ background: '#fff', border: '1px solid #e6e9f2' }}>
              <p className="text-[18px] m-0">{ic}</p>
              <p className="text-[12px] font-semibold m-0 mt-1.5 mb-0.5" style={{ color: '#1a2238' }}>{ti}</p>
              <p className="text-[10px] m-0 leading-snug" style={{ color: '#8a90a0' }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SpeakPathCurriculum() {
  const units: [string, string, string, number][] = [
    ['1 · Meeting People', '5 lessons', '2 / 5 lessons', 40],
    ['2 · My World', '4 lessons', '0 / 4 lessons', 0],
    ['3 · Daily Life', '4 lessons', '0 / 4 lessons', 0],
  ];
  return (
    <>
      <SpeakPathHeader />
      <div className="px-3.5 py-4" style={{ background: '#f6f7fb', minHeight: '260px' }}>
        <div className="rounded-[11px] p-3 mb-2.5" style={{ background: '#234fe0' }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[15px] font-extrabold text-white m-0 mb-0.5">SpeakPath Foundations</p>
              <p className="text-[10px] m-0" style={{ color: 'rgba(255,255,255,.8)' }}>6 units · 25 lessons</p>
            </div>
            <span className="text-[11px] font-bold rounded-full px-2.5 py-0.5" style={{ color: '#234fe0', background: '#fff' }}>A1</span>
          </div>
          <div className="h-[6px] rounded my-2 mb-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,.25)' }}><Grow pct={8} color="#fff" radius="4px" /></div>
          <p className="text-[10px] m-0" style={{ color: 'rgba(255,255,255,.85)' }}>2 / 25 lessons · 8%</p>
        </div>
        <p className="text-[11px] font-semibold m-0 mb-2" style={{ color: '#2c3550' }}>Course content</p>
        <div className="flex flex-col gap-1.5">
          {units.map(([title, n, prog, pct], i) => (
            <div key={i} className="rounded-r-[9px] px-3 py-2" style={{ background: '#fff', border: '1px solid #e6e9f2', borderLeft: `3px solid ${pct ? '#234fe0' : '#cdd4e6'}` }}>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-semibold" style={{ color: '#1a2238' }}>{title}</span>
                <span className="text-[9px] rounded-full px-1.5 py-0.5" style={{ color: '#5a6480', background: '#eef1f8' }}>{n}</span>
              </div>
              {pct > 0 && <div className="h-[4px] rounded my-1.5 mb-0.5 overflow-hidden" style={{ background: '#e6e9f2' }}><Grow pct={pct} color="#234fe0" radius="3px" /></div>}
              <span className="text-[9px] block mt-1.5" style={{ color: '#8a90a0' }}>{prog}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SpeakPathRoleplay() {
  const lines: [string, string, string][] = [
    ['Ana', 'Hello! Good morning.', '#eaf0ff'],
    ['Tom', 'Good morning! How are you?', '#f0f2f7'],
    ['Ana', "I'm fine, thank you. And you?", '#eaf0ff'],
  ];
  return (
    <>
      <SpeakPathHeader />
      <div className="px-3.5 py-4" style={{ background: '#f6f7fb', minHeight: '260px' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[12px] font-bold" style={{ color: '#1a2238' }}>🎭 Role-play: meeting someone new</span>
          <span className="text-[9px]" style={{ color: '#8a90a0' }}>17 min</span>
        </div>
        <div className="rounded-[9px] px-3 py-2.5 mb-2.5" style={{ background: '#eaf0ff', border: '1px solid #d4e0ff' }}>
          <p className="text-[10.5px] m-0 leading-relaxed" style={{ color: '#3a4868' }}>Act out a real-life situation. You play one person, your teacher plays the other — in 3 steps, so by the end you can do it on your own.</p>
        </div>
        <p className="text-[11px] font-bold m-0 mb-2" style={{ color: '#1a2238' }}>Step 1 — Read it together</p>
        <div className="flex flex-col gap-1.5">
          {lines.map(([who, txt, bg], i) => (
            <div key={i}>
              <span className="text-[9px] font-semibold" style={{ color: '#234fe0' }}>{who}</span>
              <div className="rounded-[9px] px-2.5 py-1.5 text-[11px]" style={{ background: bg, color: '#1a2238' }}>{txt}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const REGISTRY: Record<string, (loc: Locale) => ReactNode> = {
  'construction-budget::rentabilidad': (loc) => <ConstructionRentabilidad loc={loc} />,
  'construction-budget::presupuestado-vs-real': (loc) => <ConstructionPresupuestadoVsReal loc={loc} />,
  'construction-budget::presupuestos': (loc) => <ConstructionPresupuestos loc={loc} />,
  'cocinerhosp::dashboard': (loc) => <CocinerHospDashboard loc={loc} />,
  'cocinerhosp::calcular': (loc) => <CocinerHospCalcular loc={loc} />,
  'cocinerhosp::dietas-blandas': (loc) => <CocinerHospDietasBlandas loc={loc} />,
  'speakpath::dashboard': () => <SpeakPathDashboard />,
  'speakpath::curriculum': () => <SpeakPathCurriculum />,
  'speakpath::roleplay': () => <SpeakPathRoleplay />,
};

export function getRealScreenMockup(caseSlug: string, screenSlug: string, loc: Locale): ReactNode | null {
  const fn = REGISTRY[`${caseSlug}::${screenSlug}`];
  return fn ? fn(loc) : null;
}
