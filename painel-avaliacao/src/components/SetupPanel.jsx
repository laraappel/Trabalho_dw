const WEIGHT_LABELS = {
  sm: "Scrum Master", owner: "Owner", po: "Product Owner",
  dev: "Developers", buyer: "Avaliação dos Compradores",
};

export default function SetupPanel({ data, setData }) {
  const m = data.meta;

  function updateMeta(field, value) {
    setData(prev => ({ ...prev, meta: { ...prev.meta, [field]: value } }));
  }

  function updateTeamName(empresa, time, value) {
    setData(prev => ({
      ...prev,
      teamNames: { ...prev.teamNames, [empresa]: { ...prev.teamNames[empresa], [time]: value } },
    }));
  }

  function updateWeight(key, value) {
    setData(prev => ({ ...prev, weights: { ...prev.weights, [key]: value } }));
  }

  // renomeia a empresa e atualiza o nome em todo lugar que referencia ela
  function renameEmpresa(which, novoNome) {
    setData(prev => {
      const oldA = prev.meta.empresaA, oldB = prev.meta.empresaB;
      const oldVal = which === "empresaA" ? oldA : oldB;
      if (!novoNome || novoNome === oldVal) return prev;
      const rename = v => v === oldVal ? novoNome : v;

      const teamNames = { ...prev.teamNames };
      if (teamNames[oldVal]) {
        teamNames[novoNome] = teamNames[oldVal];
        delete teamNames[oldVal];
      }

      return {
        ...prev,
        meta: { ...prev.meta, [which]: novoNome },
        sm: prev.sm.map(r => ({ ...r, empresa: rename(r.empresa) })),
        owner: prev.owner.map(r => ({ ...r, empresa: rename(r.empresa) })),
        po: prev.po.map(r => ({ ...r, empresa: rename(r.empresa) })),
        dev: prev.dev.map(r => ({ ...r, empresa: rename(r.empresa) })),
        buyerProduct: prev.buyerProduct.map(r => ({ ...r, empresa: rename(r.empresa) })),
        alunos: prev.alunos.map(a => ({ ...a, empresa: rename(a.empresa) })),
        corrupcao: { ...prev.corrupcao, empresaCorruptora: rename(prev.corrupcao.empresaCorruptora) },
        sabotagem: { ...prev.sabotagem, empresaSabotador: rename(prev.sabotagem.empresaSabotador) },
        teamNames,
      };
    });
  }

  return (
    <div className="panel">
      <h2>Configuração</h2>
      <div className="desc">Identificação da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.</div>

      <div className="fields-row">
        <div className="field">
          <label>Turma</label>
          <input type="text" value={m.turma} onChange={(e) => updateMeta("turma", e.target.value)} />
        </div>
        <div className="field">
          <label>Data</label>
          <input type="text" value={m.data} onChange={(e) => updateMeta("data", e.target.value)} />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa A</label>
          <input type="text" value={m.empresaA} onChange={(e) => renameEmpresa("empresaA", e.target.value)} />
        </div>
        <div className="field">
          <label>Time Caça — Empresa A</label>
          <input type="text" value={data.teamNames[m.empresaA].Caça}
            onChange={(e) => updateTeamName(m.empresaA, "Caça", e.target.value)} />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa A</label>
          <input type="text" value={data.teamNames[m.empresaA].Transporte}
            onChange={(e) => updateTeamName(m.empresaA, "Transporte", e.target.value)} />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa B</label>
          <input type="text" value={m.empresaB} onChange={(e) => renameEmpresa("empresaB", e.target.value)} />
        </div>
        <div className="field">
          <label>Time Caça — Empresa B</label>
          <input type="text" value={data.teamNames[m.empresaB].Caça}
            onChange={(e) => updateTeamName(m.empresaB, "Caça", e.target.value)} />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa B</label>
          <input type="text" value={data.teamNames[m.empresaB].Transporte}
            onChange={(e) => updateTeamName(m.empresaB, "Transporte", e.target.value)} />
        </div>
      </div>

      <div className="note note-dark">
        Os nomes de empresa já vêm pré-preenchidos (Maverick Aviation e SkyForge Ind. Aeronáutica). Pode alterar se quiser.
      </div>

      <h2 style={{ marginTop: "1.6rem" }}>Pesos da Nota Final</h2>
      <div className="desc">Ajuste o peso de cada papel no cálculo da nota final da empresa (aba "Resultado Final").</div>
      <div className="weights-panel">
        {Object.keys(data.weights).map(k => (
          <div className="weight-field" key={k}>
            <label>{WEIGHT_LABELS[k]}</label>
            <input type="number" min="0" step="0.5" value={data.weights[k]}
              onChange={(e) => updateWeight(k, parseFloat(e.target.value))} />
          </div>
        ))}
      </div>
    </div>
  );
}
