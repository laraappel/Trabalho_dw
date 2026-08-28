import { computeEmpresaScore } from "../utils/scoring";

// Props: data (objeto completo)
export default function ResultPanel({ data }) {
  const empresas = [data.meta.empresaA, data.meta.empresaB];
  const colors = [
    "linear-gradient(135deg, #455F51, #324339)",
    "linear-gradient(135deg, #0989B1, #065E77)",
  ];
  const scores = empresas.map(e => ({ empresa: e, ...computeEmpresaScore(data, e) }));

  return (
    <div className="panel">
      <h2>Resultado Final</h2>
      <div className="desc">
        CÃ¡lculo automÃ¡tico a partir das mÃ©dias lanÃ§adas em cada aba, ajustado pelos pontos de
        corrupÃ§Ã£o/sabotagem. Use como referÃªncia â€” a decisÃ£o final da nota Ã© sempre sua.
      </div>
      <div className="grid2">
        {scores.map((s, i) => (
          <div className="dash-card" style={{ background: colors[i] }} key={s.empresa}>
            <h3>{s.empresa}</h3>
            <div className="big">{s.final !== null ? s.final.toFixed(2) : "â€”"}</div>
            <div className="breakdown">
              {s.parts.map(p => (
                <div key={p.key}>
                  <span>{p.key}</span>
                  <span>{p.val !== null ? p.val.toFixed(2) : "â€”"}</span>
                </div>
              ))}
              <div style={{ marginTop: "0.4rem", borderTop: "1px solid rgba(255,255,255,.3)", paddingTop: "0.4rem" }}>
                <span>Ajuste (corrupÃ§Ã£o/sabotagem)</span>
                <span>{s.ajuste >= 0 ? "+" : ""}{s.ajuste.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="note note-orange" style={{ marginTop: "1.1rem" }}>
        A nota final Ã© uma mÃ©dia ponderada das notas mÃ©dias por papel (pesos configurÃ¡veis em
        "ConfiguraÃ§Ã£o"), somada aos pontos fixos de corrupÃ§Ã£o/sabotagem. Ela nÃ£o substitui seu julgamento.
      </div>
    </div>
  );
}
