import AlunoRow from "./AlunoRow";

// Props: data (objeto completo), onFieldChange(path, value)
export default function AlunosPanel({ data, onFieldChange }) {
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  const counts = {};
  empresas.forEach(e => {
    counts[e] = {
      "Scrum Master": 0, "Owner/Stakeholder": 0,
      "Product Owner-CaÃ§a": 0, "Product Owner-Transporte": 0,
      "Developer-CaÃ§a": 0, "Developer-Transporte": 0,
    };
  });
  const buyerCounts = { "Comprador - Governo": 0, "Comprador - Militar": 0, "Comprador - Setor Privado": 0 };

  data.alunos.forEach(a => {
    if (a.papel === "Comprador - Governo" || a.papel === "Comprador - Militar" || a.papel === "Comprador - Setor Privado") {
      buyerCounts[a.papel]++;
    } else if (a.papel === "Scrum Master" || a.papel === "Owner/Stakeholder") {
      if (counts[a.empresa]) counts[a.empresa][a.papel]++;
    } else if (a.papel === "Product Owner" || a.papel === "Developer") {
      if (counts[a.empresa] && a.time) counts[a.empresa][a.papel + "-" + a.time]++;
    }
  });

  const naoAtribuidos = data.alunos.filter(a => !a.papel).length;

  return (
    <div className="panel">
      <h2>Alunos</h2>
      <div className="desc">
        Atribua cada aluno a um papel e equipe. A turma nÃ£o escolhe o lado â€” a atribuiÃ§Ã£o Ã© feita aqui pelo professor.
      </div>

      <table className="roster-table">
        <thead>
          <tr>
            <th style={{ width: "2.5rem" }}>#</th>
            <th style={{ width: "16rem" }}>Nome</th>
            <th>Papel</th>
            <th>Empresa</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.alunos.map((a, i) => (
            <AlunoRow key={a.id} aluno={a} index={i} empresas={empresas} onFieldChange={onFieldChange} />
          ))}
        </tbody>
      </table>

      <div className={"note " + (naoAtribuidos > 0 ? "note-orange" : "note-green")} style={{ marginTop: "1rem" }}>
        {naoAtribuidos} de {data.alunos.length} alunos ainda sem papel atribuÃ­do.
      </div>

      <h2 style={{ marginTop: "1.6rem" }}>Resumo de Vagas Preenchidas</h2>
      <div className="grid2">
        {empresas.map(e => (
          <div className="mini-card" key={e}>
            <h3>{e}</h3>
            <div className="mini-row"><label>Scrum Master</label><span className="pts">{counts[e]["Scrum Master"]} / 1</span></div>
            <div className="mini-row"><label>Owner/Stakeholder</label><span className="pts">{counts[e]["Owner/Stakeholder"]} / 1</span></div>
            <div className="mini-row"><label>PO â€” {data.teamNames[e].CaÃ§a}</label><span className="pts">{counts[e]["Product Owner-CaÃ§a"]} / 1</span></div>
            <div className="mini-row"><label>PO â€” {data.teamNames[e].Transporte}</label><span className="pts">{counts[e]["Product Owner-Transporte"]} / 1</span></div>
            <div className="mini-row"><label>Devs â€” {data.teamNames[e].CaÃ§a}</label><span className="pts">{counts[e]["Developer-CaÃ§a"]} / 4</span></div>
            <div className="mini-row"><label>Devs â€” {data.teamNames[e].Transporte}</label><span className="pts">{counts[e]["Developer-Transporte"]} / 5</span></div>
          </div>
        ))}
      </div>

      <div className="mini-card" style={{ marginTop: "1rem" }}>
        <h3>Compradores</h3>
        <div className="mini-row"><label>Governo</label><span className="pts">{buyerCounts["Comprador - Governo"]} / 1</span></div>
        <div className="mini-row"><label>Militar</label><span className="pts">{buyerCounts["Comprador - Militar"]} / 1</span></div>
        <div className="mini-row"><label>Setor Privado</label><span className="pts">{buyerCounts["Comprador - Setor Privado"]} / 1</span></div>
      </div>
    </div>
  );
}
