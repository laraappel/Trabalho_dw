$ErrorActionPreference = "Stop"
Write-Host "Criando arquivos do painel (Parte 1 + 2 + 3)..."

New-Item -ItemType Directory -Force -Path "src" | Out-Null
New-Item -ItemType Directory -Force -Path "src\components" | Out-Null
New-Item -ItemType Directory -Force -Path "src\components\campos" | Out-Null
New-Item -ItemType Directory -Force -Path "src\data" | Out-Null
New-Item -ItemType Directory -Force -Path "src\utils" | Out-Null

$content = @'
:root{
  --dark:#455F51; --dark-dk:#324339; --teal:#029676; --blue:#0989B1;
  --green:#549E39; --orange:#E8871E; --red:#B33A3A;
  --ink:#232323; --muted:#6E6E6E; --line:#DCE4DF;
  --bg:#F7F8F6; --card:#FFFFFF; --light-dark:#EAF0EC; --light-teal:#E4F3EE;
  --light-blue:#E7F3F7; --light-green:#EAF3EE; --light-orange:#FCEFDD; --light-red:#F7E9E9;
}
html{font-size:16px;}
*{box-sizing:border-box;}
body{margin:0;font-family:'Calibri','Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--ink);font-size:1rem;}
h1,h2,h3{font-family:Georgia,'Cambria',serif;margin:0;}
img{max-width:100%;display:block;}

.topbar{
  position:sticky;top:0;z-index:20;background:var(--dark-dk);color:#fff;
  padding:0.9rem 1.4rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.6rem;
  box-shadow:0 2px 8px rgba(0,0,0,0.15);
}
.topbar h1{font-size:1.2rem;font-weight:700;}
.topbar .sub{font-size:0.75rem;color:#BFD3C5;font-style:italic;margin-top:0.1rem;}
.topbar-actions{display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;}

.btn{
  border:none;border-radius:0.45rem;padding:0.55rem 1rem;font-size:0.8rem;font-weight:600;cursor:pointer;
  display:inline-flex;align-items:center;gap:0.4rem;transition:filter .15s;font-family:inherit;
}
.btn:hover{filter:brightness(1.08);}
.btn:active{filter:brightness(0.95);}
.btn-save{background:var(--teal);color:#fff;}
.btn-load{background:#fff;color:var(--dark-dk);}
.btn-reset{background:transparent;color:#E9C4B8;border:1px solid #7A5850;}

.fontctrl{display:flex;align-items:center;gap:0.25rem;background:rgba(255,255,255,.08);border-radius:0.45rem;padding:0.2rem;}
.fontctrl button{
  background:transparent;border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:0.35rem;
  width:1.8rem;height:1.8rem;font-size:0.85rem;font-weight:700;cursor:pointer;
}
.fontctrl button:hover{background:rgba(255,255,255,.15);}
.fontctrl .lbl{font-size:0.7rem;color:#BFD3C5;padding:0 0.3rem;}

.tabs{
  display:flex;gap:0.25rem;padding:0 1.4rem;background:var(--dark);flex-wrap:wrap;
  position:sticky;top:3.6rem;z-index:19;
}
.tab{
  padding:0.65rem 0.9rem;font-size:0.8rem;font-weight:600;color:#DCEAE2;cursor:pointer;
  border-bottom:3px solid transparent;white-space:nowrap;
}
.tab:hover{color:#fff;}
.tab.active{color:#fff;border-bottom-color:var(--orange);}

.wrap{max-width:1300px;margin:0 auto;padding:1.6rem 1.4rem 5rem;}
.panel{background:var(--card);border:1px solid var(--line);border-radius:0.6rem;padding:1.4rem 1.5rem;margin-bottom:1.2rem;}
.panel h2{font-size:1.4rem;color:var(--dark-dk);margin-bottom:0.25rem;}
.panel .desc{font-size:0.82rem;color:var(--muted);font-style:italic;margin-bottom:1rem;}

.fields-row{display:flex;gap:1.4rem;flex-wrap:wrap;margin-bottom:1.1rem;}
.field{display:flex;flex-direction:column;gap:0.25rem;}
.field label{font-size:0.7rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.03em;}
.field input[type=text]{
  border:1px solid var(--line);border-radius:0.4rem;padding:0.45rem 0.6rem;font-size:0.88rem;min-width:11rem;
  font-family:inherit;
}

table{border-collapse:collapse;width:100%;font-size:0.82rem;}
th{
  background:var(--dark);color:#fff;font-size:0.72rem;text-transform:uppercase;letter-spacing:.02em;
  padding:0.55rem 0.5rem;text-align:center;font-weight:700;
}
td{border:1px solid var(--line);padding:0.4rem 0.45rem;text-align:center;vertical-align:middle;}
tr:nth-child(even) td{background:#FAFBFA;}
.sprint-label{font-weight:700;color:var(--dark-dk);background:var(--light-dark)!important;}

select, .obs-input{
  border:1px solid var(--line);border-radius:0.35rem;padding:0.3rem 0.4rem;font-size:0.8rem;font-family:inherit;
  width:100%;background:#fff;
}
.obs-input{text-align:left;min-width:7rem;}

.note{
  margin-top:1rem;padding:0.75rem 1rem;border-radius:0.5rem;font-size:0.82rem;font-style:italic;
  border-left:4px solid; line-height:1.5;
}
.note-dark{background:var(--light-dark);border-color:var(--dark);}
.note-teal{background:var(--light-teal);border-color:var(--teal);}
.note-blue{background:var(--light-blue);border-color:var(--blue);}
.note-green{background:var(--light-green);border-color:var(--green);}
.note-orange{background:var(--light-orange);border-color:var(--orange);}
.note-red{background:var(--light-red);border-color:var(--red);}

.grid2{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem;}
@media (max-width:820px){.grid2{grid-template-columns:1fr;}}

.mini-card{border:1px solid var(--line);border-radius:0.5rem;padding:1rem 1.1rem;background:#FCFDFC;}
.mini-card h3{font-size:0.95rem;color:var(--dark-dk);margin-bottom:0.6rem;}
.mini-row{display:flex;align-items:center;justify-content:space-between;gap:0.6rem;margin-bottom:0.6rem;font-size:0.82rem;}
.mini-row label{flex:1;color:var(--ink);}
.pts{font-weight:700;}
.pts.neg{color:var(--red);}
.pts.pos{color:var(--green);}

.dash-card{border-radius:0.6rem;padding:1.2rem;color:#fff;position:relative;overflow:hidden;}
.dash-card h3{font-size:0.85rem;text-transform:uppercase;letter-spacing:.04em;opacity:.85;margin-bottom:0.4rem;}
.dash-card .big{font-size:2.3rem;font-weight:800;font-family:Georgia,serif;}
.dash-card .breakdown{margin-top:0.7rem;font-size:0.75rem;opacity:.9;line-height:1.7;}
.dash-card .breakdown div{display:flex;justify-content:space-between;}

.weights-panel{display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1.1rem;}
.weight-field{display:flex;flex-direction:column;gap:0.2rem;}
.weight-field label{font-size:0.68rem;color:var(--muted);font-weight:700;}
.weight-field input{width:4.3rem;border:1px solid var(--line);border-radius:0.35rem;padding:0.3rem 0.4rem;font-size:0.82rem;}

.checkbox-row{display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;}
.footer-note{font-size:0.68rem;color:var(--muted);text-align:center;margin-top:1.8rem;}

/* Alunos tab */
.roster-table td{text-align:left;}
.roster-search{margin-bottom:1rem;}
.roster-search input{border:1px solid var(--line);border-radius:0.4rem;padding:0.5rem 0.7rem;font-size:0.88rem;width:100%;max-width:22rem;font-family:inherit;}
.tag-unassigned{color:var(--red);font-weight:700;font-size:0.75rem;}
.tag-assigned{color:var(--teal);font-weight:700;font-size:0.75rem;}

/* Escalação tab */
.company-block{margin-bottom:1.6rem;}
.company-header{display:flex;align-items:center;gap:1rem;margin-bottom:0.9rem;}
.company-header img{width:5.5rem;height:5.5rem;object-fit:contain;background:#fff;border:1px solid var(--line);border-radius:0.5rem;padding:0.3rem;}
.company-header h2{font-size:1.5rem;}
.teams-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
@media (max-width:820px){.teams-grid{grid-template-columns:1fr;}}
.team-card{border:1px solid var(--line);border-radius:0.6rem;overflow:hidden;background:#fff;}
.team-card .team-img{width:100%;height:9rem;object-fit:cover;background:#eee;}
.team-card .team-body{padding:0.9rem 1rem;}
.team-card h3{font-size:1.05rem;color:var(--dark-dk);margin-bottom:0.6rem;}
.role-list{list-style:none;margin:0;padding:0;}
.role-list li{display:flex;justify-content:space-between;gap:0.6rem;padding:0.3rem 0;border-bottom:1px dashed var(--line);font-size:0.82rem;}
.role-list li:last-child{border-bottom:none;}
.role-list .role-badge{font-size:0.68rem;font-weight:700;text-transform:uppercase;color:#fff;padding:0.1rem 0.45rem;border-radius:0.3rem;white-space:nowrap;}
.buyers-strip{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem;}
.buyer-card{flex:1;min-width:14rem;border:1px solid var(--line);border-radius:0.6rem;overflow:hidden;background:#fff;}
.buyer-card img{width:100%;height:7rem;object-fit:cover;}
.buyer-card .buyer-body{padding:0.8rem 1rem;}
.buyer-card h3{font-size:0.95rem;color:var(--dark-dk);margin-bottom:0.5rem;}

'@
Set-Content -Path "src\App.css" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\App.css"

$content = @'
import { useState } from "react";
import { buildInitialData } from "./data/initialData";
import { updateByPath } from "./utils/updateByPath";

import SetupPanel from "./components/SetupPanel";
import ScrumMasterPanel from "./components/ScrumMasterPanel";
import OwnerPanel from "./components/OwnerPanel";
import ProductOwnerPanel from "./components/ProductOwnerPanel";
import DevPanel from "./components/DevPanel";
import BuyerProfilePanel from "./components/BuyerProfilePanel";
import BuyerProductPanel from "./components/BuyerProductPanel";
import CorrupcaoSabotagemPanel from "./components/CorrupcaoSabotagemPanel";
import ResultPanel from "./components/ResultPanel";
import AlunosPanel from "./components/AlunosPanel";
import EscalacaoPanel from "./components/EscalacaoPanel";

const TABS = [
  { id: "setup", label: "Configuração" },
  { id: "sm", label: "Scrum Master" },
  { id: "owner", label: "Owner" },
  { id: "po", label: "Product Owner" },
  { id: "dev", label: "Developers" },
  { id: "buyerProf", label: "Compradores (Perfil)" },
  { id: "buyerProduct", label: "Compradores (Produto)" },
  { id: "corrupsab", label: "Corrupção & Sabotagem" },
  { id: "alunos", label: "Alunos" },
  { id: "escalacao", label: "Escalação" },
  { id: "result", label: "Resultado Final" },
];

export default function App() {
  const [data, setData] = useState(() => buildInitialData("Maverick Aviation", "SkyForge Ind. Aeronáutica"));
  const [tab, setTab] = useState("setup");

  const onFieldChange = (path, value) => updateByPath(setData, path, value);

  // which = "A" ou "B" — renomear empresa precisa propagar pra teamNames,
  // corrupcao.empresaCorruptora, sabotagem.empresaSabotador, e todas as linhas
  // que guardam o nome da empresa como string.
  function onRenameEmpresa(which, novoNome) {
    setData((prev) => {
      const key = which === "A" ? "empresaA" : "empresaB";
      const oldVal = prev.meta[key];
      if (!novoNome || novoNome === oldVal) return prev;
      const rename = (v) => (v === oldVal ? novoNome : v);

      const teamNames = { ...prev.teamNames };
      if (teamNames[oldVal]) {
        teamNames[novoNome] = teamNames[oldVal];
        delete teamNames[oldVal];
      }

      return {
        ...prev,
        meta: { ...prev.meta, [key]: novoNome },
        sm: prev.sm.map((r) => ({ ...r, empresa: rename(r.empresa) })),
        owner: prev.owner.map((r) => ({ ...r, empresa: rename(r.empresa) })),
        po: prev.po.map((r) => ({ ...r, empresa: rename(r.empresa) })),
        dev: prev.dev.map((r) => ({ ...r, empresa: rename(r.empresa) })),
        buyerProduct: prev.buyerProduct.map((r) => ({ ...r, empresa: rename(r.empresa) })),
        alunos: prev.alunos.map((a) => ({ ...a, empresa: rename(a.empresa) })),
        corrupcao: { ...prev.corrupcao, empresaCorruptora: rename(prev.corrupcao.empresaCorruptora) },
        sabotagem: { ...prev.sabotagem, empresaSabotador: rename(prev.sabotagem.empresaSabotador) },
        teamNames,
      };
    });
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1>Painel de Avaliação — Simulação Scrum Competitiva</h1>
          <div className="sub">Empresa A: {data.meta.empresaA} · Empresa B: {data.meta.empresaB}</div>
        </div>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <div key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>

      <div className="wrap">
        {tab === "setup" && (
          <SetupPanel
            meta={data.meta}
            teamNames={data.teamNames}
            weights={data.weights}
            onFieldChange={onFieldChange}
            onRenameEmpresa={onRenameEmpresa}
          />
        )}
        {tab === "sm" && <ScrumMasterPanel rows={data.sm} onFieldChange={onFieldChange} />}
        {tab === "owner" && <OwnerPanel rows={data.owner} onFieldChange={onFieldChange} />}
        {tab === "po" && <ProductOwnerPanel rows={data.po} onFieldChange={onFieldChange} />}
        {tab === "dev" && <DevPanel rows={data.dev} onFieldChange={onFieldChange} />}
        {tab === "buyerProf" && <BuyerProfilePanel rows={data.buyerProf} onFieldChange={onFieldChange} />}
        {tab === "buyerProduct" && <BuyerProductPanel rows={data.buyerProduct} onFieldChange={onFieldChange} />}
        {tab === "corrupsab" && <CorrupcaoSabotagemPanel data={data} onFieldChange={onFieldChange} />}
        {tab === "result" && <ResultPanel data={data} />}
        {tab === "alunos" && <AlunosPanel data={data} onFieldChange={onFieldChange} />}
        {tab === "escalacao" && <EscalacaoPanel data={data} />}
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\App.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\App.jsx"

$content = @'
import { PAPEIS, TIMES } from "../data/initialData";

// Props: aluno, index, empresas (array com as 2 empresas), onFieldChange(path, value)
export default function AlunoRow({ aluno: a, index: i, empresas, onFieldChange }) {
  const needsEmpresa =
    a.papel === "Scrum Master" || a.papel === "Owner/Stakeholder" ||
    a.papel === "Product Owner" || a.papel === "Developer";
  const needsTime = a.papel === "Product Owner" || a.papel === "Developer";

  return (
    <tr>
      <td>{a.id}</td>
      <td style={{ textAlign: "left" }}>{a.nome}</td>
      <td>
        <select value={a.papel} onChange={e => onFieldChange(`alunos.${i}.papel`, e.target.value)}>
          {PAPEIS.map(p => (
            <option key={p} value={p}>{p === "" ? "— não atribuído —" : p}</option>
          ))}
        </select>
      </td>
      <td>
        {needsEmpresa && (
          <select value={a.empresa} onChange={e => onFieldChange(`alunos.${i}.empresa`, e.target.value)}>
            <option value="">—</option>
            {empresas.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        )}
      </td>
      <td>
        {needsTime && (
          <select value={a.time} onChange={e => onFieldChange(`alunos.${i}.time`, e.target.value)}>
            <option value="">—</option>
            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        )}
      </td>
    </tr>
  );
}

'@
Set-Content -Path "src\components\AlunoRow.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\AlunoRow.jsx"

$content = @'
import AlunoRow from "./AlunoRow";

// Props: data (objeto completo), onFieldChange(path, value)
export default function AlunosPanel({ data, onFieldChange }) {
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  const counts = {};
  empresas.forEach(e => {
    counts[e] = {
      "Scrum Master": 0, "Owner/Stakeholder": 0,
      "Product Owner-Caça": 0, "Product Owner-Transporte": 0,
      "Developer-Caça": 0, "Developer-Transporte": 0,
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
        Atribua cada aluno a um papel e equipe. A turma não escolhe o lado — a atribuição é feita aqui pelo professor.
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
        {naoAtribuidos} de {data.alunos.length} alunos ainda sem papel atribuído.
      </div>

      <h2 style={{ marginTop: "1.6rem" }}>Resumo de Vagas Preenchidas</h2>
      <div className="grid2">
        {empresas.map(e => (
          <div className="mini-card" key={e}>
            <h3>{e}</h3>
            <div className="mini-row"><label>Scrum Master</label><span className="pts">{counts[e]["Scrum Master"]} / 1</span></div>
            <div className="mini-row"><label>Owner/Stakeholder</label><span className="pts">{counts[e]["Owner/Stakeholder"]} / 1</span></div>
            <div className="mini-row"><label>PO — {data.teamNames[e].Caça}</label><span className="pts">{counts[e]["Product Owner-Caça"]} / 1</span></div>
            <div className="mini-row"><label>PO — {data.teamNames[e].Transporte}</label><span className="pts">{counts[e]["Product Owner-Transporte"]} / 1</span></div>
            <div className="mini-row"><label>Devs — {data.teamNames[e].Caça}</label><span className="pts">{counts[e]["Developer-Caça"]} / 4</span></div>
            <div className="mini-row"><label>Devs — {data.teamNames[e].Transporte}</label><span className="pts">{counts[e]["Developer-Transporte"]} / 5</span></div>
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

'@
Set-Content -Path "src\components\AlunosPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\AlunosPanel.jsx"

$content = @'
import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import DecisaoSelect from "./campos/DecisaoSelect";

// Props: rows (data.buyerProduct), onFieldChange(path, value)
export default function BuyerProductPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Ficha do Comprador — Avaliação do Produto</h2>
      <div className="desc">
        Transcreva aqui os dados que cada comprador preencheu na ficha em papel, ao final de cada Sprint.
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>Empresa</th>
            <th>Produto</th>
            <th>Padrão<br />Técnico</th>
            <th>Padrão<br />Visual</th>
            <th>Prazo</th>
            <th>Com.<br />Owner (1-5)</th>
            <th>Sinal</th>
            <th>Decisão</th>
            <th>Nota (1-5)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.comprador}</td>
              <td>{r.empresa}</td>
              <td>{r.produto}</td>
              <td>
                <SimNaoSelect value={r.pt} onChange={v => onFieldChange(`buyerProduct.${i}.pt`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.pv} onChange={v => onFieldChange(`buyerProduct.${i}.pv`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.prazo} onChange={v => onFieldChange(`buyerProduct.${i}.prazo`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.comOwner} onChange={v => onFieldChange(`buyerProduct.${i}.comOwner`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.sinal} onChange={v => onFieldChange(`buyerProduct.${i}.sinal`, v)} />
              </td>
              <td>
                <DecisaoSelect value={r.decisao} onChange={v => onFieldChange(`buyerProduct.${i}.decisao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.nota} onChange={v => onFieldChange(`buyerProduct.${i}.nota`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-orange">
        Militar só avalia Caça; Setor Privado só avalia Transporte; Governo avalia os dois. Linhas
        fora do papel do comprador podem ficar em branco.
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\BuyerProductPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\BuyerProductPanel.jsx"

$content = @'
import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (data.buyerProf), onFieldChange(path, value)
export default function BuyerProfilePanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Compradores — Desempenho no Papel</h2>
      <div className="desc">Avaliação do professor sobre como cada comprador exerceu seu papel.</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>Aplicou o checklist<br />de verificação?</th>
            <th>Decisões coerentes<br />com o papel?</th>
            <th>Feedback construtivo<br />nas Reviews?</th>
            <th>Nota (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.comprador}</td>
              <td>
                <SimNaoSelect value={r.checklist} onChange={v => onFieldChange(`buyerProf.${i}.checklist`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.decisoes} onChange={v => onFieldChange(`buyerProf.${i}.decisoes`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.feedback} onChange={v => onFieldChange(`buyerProf.${i}.feedback`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.nota} onChange={v => onFieldChange(`buyerProf.${i}.nota`, v)} />
              </td>
              <td>
                <ObsInput value={r.obs} onChange={v => onFieldChange(`buyerProf.${i}.obs`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-orange">
        Critério-guia: avalie se o comprador aplicou o checklist a cada Sprint, se as decisões
        foram coerentes com o papel, e se o feedback nas Reviews foi útil.
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\BuyerProfilePanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\BuyerProfilePanel.jsx"

$content = @'
import { TEAM_IMAGES, ROLE_COLORS, TIMES } from "../data/initialData";

function papelBadgeColor(papel) {
  return ROLE_COLORS[papel] || "#6E6E6E";
}

// Props: empresa (nome), data (objeto completo, usa data.alunos/teamNames)
export default function CompanyBlock({ empresa, data }) {
  const imgs = TEAM_IMAGES[empresa] || {};
  const sm = data.alunos.find(a => a.papel === "Scrum Master" && a.empresa === empresa);
  const owner = data.alunos.find(a => a.papel === "Owner/Stakeholder" && a.empresa === empresa);
  const teamRoster = time =>
    data.alunos.filter(a => a.empresa === empresa && a.time === time && (a.papel === "Product Owner" || a.papel === "Developer"));

  return (
    <div className="company-block">
      <div className="company-header">
        <img src={imgs.logo || ""} alt={empresa} />
        <div>
          <h2>{empresa}</h2>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Scrum Master: {sm ? sm.nome : <span className="tag-unassigned">não atribuído</span>} ·
            {" "}Owner: {owner ? owner.nome : <span className="tag-unassigned">não atribuído</span>}
          </div>
        </div>
      </div>
      <div className="teams-grid">
        {TIMES.map(t => {
          const roster = teamRoster(t).sort((a, b) => (a.papel === "Product Owner" ? -1 : 1));
          return (
            <div className="team-card" key={t}>
              <img className="team-img" src={imgs[t] || ""} alt={data.teamNames[empresa][t]} />
              <div className="team-body">
                <h3>{data.teamNames[empresa][t]}</h3>
                <ul className="role-list">
                  {roster.length === 0 ? (
                    <li><span className="tag-unassigned">ninguém atribuído ainda</span></li>
                  ) : (
                    roster.map(a => (
                      <li key={a.id}>
                        <span>{a.nome}</span>
                        <span className="role-badge" style={{ background: papelBadgeColor(a.papel) }}>
                          {a.papel === "Product Owner" ? "PO" : "Dev"}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\CompanyBlock.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\CompanyBlock.jsx"

$content = @'
import { TIMES, BUYERS } from "../data/initialData";
import { computeCorrupcaoPontos, computeSabotagemPontos } from "../utils/scoring";

// Props: data (objeto completo, usa data.meta/corrupcao/sabotagem), onFieldChange(path, value)
export default function CorrupcaoSabotagemPanel({ data, onFieldChange }) {
  const c = data.corrupcao;
  const s = data.sabotagem;
  const cPts = computeCorrupcaoPontos(c);
  const sPts = computeSabotagemPontos(s);
  const empresas = [data.meta.empresaA, data.meta.empresaB];
  const compradoresSemMilitar = BUYERS.filter(b => b !== "Militar");

  return (
    <div className="panel">
      <h2>Corrupção &amp; Sabotagem</h2>
      <div className="desc">
        Estes dois mecanismos são baseados em regras fixas — os pontos abaixo são calculados automaticamente.
      </div>
      <div className="grid2">
        <div className="mini-card">
          <h3>🔒 Corruptor (Owner)</h3>

          <div className="mini-row">
            <label>Empresa do corruptor</label>
            <select
              value={c.empresaCorruptora}
              onChange={e => onFieldChange("corrupcao.empresaCorruptora", e.target.value)}
            >
              {empresas.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
            <input
              type="checkbox"
              id="cd1"
              checked={c.primeiraDescoberta}
              onChange={e => onFieldChange("corrupcao.primeiraDescoberta", e.target.checked)}
            />
            <label htmlFor="cd1">1ª descoberta ocorreu</label>
          </div>

          {c.primeiraDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (1ª vez)</label>
              <select
                value={c.primeiroComprador}
                onChange={e => onFieldChange("corrupcao.primeiroComprador", e.target.value)}
              >
                <option value="">—</option>
                {compradoresSemMilitar.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          )}

          <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
            <input
              type="checkbox"
              id="cd2"
              checked={c.segundaDescoberta}
              disabled={!c.primeiraDescoberta}
              onChange={e => onFieldChange("corrupcao.segundaDescoberta", e.target.checked)}
            />
            <label htmlFor="cd2">2ª descoberta ocorreu (mesmo assim)</label>
          </div>

          {c.segundaDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (2ª vez)</label>
              <select
                value={c.segundoComprador}
                onChange={e => onFieldChange("corrupcao.segundoComprador", e.target.value)}
              >
                <option value="">—</option>
                {compradoresSemMilitar.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          )}

          <div className="mini-row" style={{ borderTop: "1px solid var(--line)", paddingTop: "0.6rem", marginTop: "0.4rem" }}>
            <label><strong>Pontos do corruptor</strong></label>
            <span className={"pts" + (cPts.corruptor < 0 ? " neg" : "")}>{cPts.corruptor.toFixed(1)}</span>
          </div>
          {Object.keys(cPts.compradores).map(b => (
            <div className="mini-row" key={b}>
              <label>Pontos — {b}</label>
              <span className={"pts" + (cPts.compradores[b] < 0 ? " neg" : "")}>{cPts.compradores[b].toFixed(1)}</span>
            </div>
          ))}

          <div className="note note-red" style={{ marginTop: "0.8rem" }}>
            O corruptor nunca troca de papel e continua negociando normalmente, mesmo após ser descoberto.
          </div>
        </div>

        <div className="mini-card">
          <h3>🔒 Sabotador (Developer)</h3>

          <div className="mini-row">
            <label>Empresa do sabotador</label>
            <select
              value={s.empresaSabotador}
              onChange={e => onFieldChange("sabotagem.empresaSabotador", e.target.value)}
            >
              {empresas.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="mini-row">
            <label>Time do sabotador</label>
            <select
              value={s.timeSabotador}
              onChange={e => onFieldChange("sabotagem.timeSabotador", e.target.value)}
            >
              {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="mini-row">
            <label>Tipo de ação</label>
            <select
              value={s.tipoAcao}
              onChange={e => onFieldChange("sabotagem.tipoAcao", e.target.value)}
            >
              <option value="vazar">Vazar informação</option>
              <option value="atrapalhar">Atrapalhar decisões/produção</option>
            </select>
          </div>

          <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
            <input
              type="checkbox"
              id="sd1"
              checked={s.descoberto}
              onChange={e => onFieldChange("sabotagem.descoberto", e.target.checked)}
            />
            <label htmlFor="sd1">Sabotador foi descoberto</label>
          </div>

          {s.descoberto && (
            <>
              <div className="mini-row">
                <label>Denúncias consecutivas recebidas</label>
                <select
                  value={s.denunciasConsecutivas}
                  onChange={e => onFieldChange("sabotagem.denunciasConsecutivas", Number(e.target.value))}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
              <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
                <input
                  type="checkbox"
                  id="sd2"
                  checked={s.areaSoubeECalou}
                  onChange={e => onFieldChange("sabotagem.areaSoubeECalou", e.target.checked)}
                />
                <label htmlFor="sd2">PO/colegas da área sabiam e ficaram calados</label>
              </div>
            </>
          )}

          <div className="mini-row" style={{ borderTop: "1px solid var(--line)", paddingTop: "0.6rem", marginTop: "0.4rem" }}>
            <label><strong>Pontos do sabotador</strong></label>
            <span className={"pts" + (sPts.sabotador < 0 ? " neg" : "")}>{sPts.sabotador.toFixed(1)}</span>
          </div>
          <div className="mini-row">
            <label><strong>Pontos da área/time</strong></label>
            <span className={"pts" + (sPts.area < 0 ? " neg" : sPts.area > 0 ? " pos" : "")}>
              {sPts.area > 0 ? "+" : ""}{sPts.area.toFixed(1)}
            </span>
          </div>
          <div className="mini-row">
            <label><strong>Demitido?</strong></label>
            <span className="pts">{sPts.demitido ? "SIM — vai para o time RIVAL" : "Não"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\CorrupcaoSabotagemPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\CorrupcaoSabotagemPanel.jsx"

$content = @'
import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (STATE.dev), onFieldChange(path, value)
export default function DevPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Developers</h2>
      <div className="desc">
        Avaliação por time — com muitos alunos em produção, a qualidade do produto é o principal
        indicador de entendimento do processo pelo grupo.
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Time</th>
            <th>Qualidade do<br />produto (1-5)</th>
            <th>Seguiu o<br />processo?</th>
            <th>Colaboração<br />do time (1-5)</th>
            <th>Nota Time (1-5)</th>
            <th>Destaque individual (opcional)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.empresa}</td>
              <td>{r.time}</td>
              <td>
                <ScoreSelect value={r.qualidade} onChange={v => onFieldChange(`dev.${i}.qualidade`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.processo} onChange={v => onFieldChange(`dev.${i}.processo`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.colaboracao} onChange={v => onFieldChange(`dev.${i}.colaboracao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.notaTime} onChange={v => onFieldChange(`dev.${i}.notaTime`, v)} />
              </td>
              <td>
                <ObsInput
                  value={r.destaque}
                  onChange={v => onFieldChange(`dev.${i}.destaque`, v)}
                  placeholder="nome (se houver)"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-green">
        Reserve a coluna de destaque individual apenas para casos que realmente chamem atenção,
        positiva ou negativamente.
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\DevPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\DevPanel.jsx"

$content = @'
import { BUYERS, BUYER_IMAGES } from "../data/initialData";
import CompanyBlock from "./CompanyBlock";

// Props: data (objeto completo)
export default function EscalacaoPanel({ data }) {
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  return (
    <div className="panel">
      <h2>Escalação</h2>
      <div className="desc">
        Visão de equipe, com a identidade visual de cada empresa — útil para projetar em sala.
      </div>

      {empresas.map(e => (
        <CompanyBlock key={e} empresa={e} data={data} />
      ))}

      <h2 style={{ marginTop: "0.4rem" }}>Compradores</h2>
      <div className="buyers-strip">
        {BUYERS.map(b => {
          const aluno = data.alunos.find(a => a.papel === "Comprador - " + b);
          return (
            <div className="buyer-card" key={b}>
              <img src={BUYER_IMAGES[b]} alt={b} />
              <div className="buyer-body">
                <h3>{b}</h3>
                <div>{aluno ? aluno.nome : <span className="tag-unassigned">não atribuído</span>}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\EscalacaoPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\EscalacaoPanel.jsx"

$content = @'
import { sprintCellLabel } from "../utils/sprintLabel";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (STATE.owner), onFieldChange(path, value)
export default function OwnerPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Stakeholder / Owner</h2>
      <div className="desc">
        Avaliação de comunicação e negociação — independente dos pontos de corrupção,
        registrados na aba "Corrupção &amp; Sabotagem".
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Comunicação com<br />a equipe (1-5)</th>
            <th>Negociação com<br />compradores (1-5)</th>
            <th>Alinhamento com<br />SM/PO sobre qualidade (1-5)</th>
            <th>Nota Geral (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.empresa}</td>
              <td>
                <ScoreSelect value={r.comunicacao} onChange={v => onFieldChange(`owner.${i}.comunicacao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.negociacao} onChange={v => onFieldChange(`owner.${i}.negociacao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.alinhamento} onChange={v => onFieldChange(`owner.${i}.alinhamento`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.notaGeral} onChange={v => onFieldChange(`owner.${i}.notaGeral`, v)} />
              </td>
              <td>
                <ObsInput value={r.obs} onChange={v => onFieldChange(`owner.${i}.obs`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-blue">
        Esta nota avalia o desempenho no papel — não confunda com os pontos ganhos/perdidos no
        mecanismo de corrupção, calculados automaticamente na aba própria.
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\OwnerPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\OwnerPanel.jsx"

$content = @'
import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (STATE.po), onFieldChange(path, value)
export default function ProductOwnerPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Product Owner</h2>
      <div className="desc">Um Product Owner por time (2 times por empresa).</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Time</th>
            <th>Requisitos<br />claros ao time?</th>
            <th>Acompanhou os<br />testes de perto?</th>
            <th>Reunião de<br />priorização ocorreu?</th>
            <th>Nota (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.empresa}</td>
              <td>{r.time}</td>
              <td>
                <SimNaoSelect value={r.requisitos} onChange={v => onFieldChange(`po.${i}.requisitos`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.testes} onChange={v => onFieldChange(`po.${i}.testes`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.reuniao} onChange={v => onFieldChange(`po.${i}.reuniao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.nota} onChange={v => onFieldChange(`po.${i}.nota`, v)} />
              </td>
              <td>
                <ObsInput value={r.obs} onChange={v => onFieldChange(`po.${i}.obs`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-teal">
        Critério-guia: o PO é avaliado pela clareza dos requisitos e pelo acompanhamento ativo da
        produção — não pela qualidade técnica do avião em si.
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\ProductOwnerPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\ProductOwnerPanel.jsx"

$content = @'
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
        Cálculo automático a partir das médias lançadas em cada aba, ajustado pelos pontos de
        corrupção/sabotagem. Use como referência — a decisão final da nota é sempre sua.
      </div>
      <div className="grid2">
        {scores.map((s, i) => (
          <div className="dash-card" style={{ background: colors[i] }} key={s.empresa}>
            <h3>{s.empresa}</h3>
            <div className="big">{s.final !== null ? s.final.toFixed(2) : "—"}</div>
            <div className="breakdown">
              {s.parts.map(p => (
                <div key={p.key}>
                  <span>{p.key}</span>
                  <span>{p.val !== null ? p.val.toFixed(2) : "—"}</span>
                </div>
              ))}
              <div style={{ marginTop: "0.4rem", borderTop: "1px solid rgba(255,255,255,.3)", paddingTop: "0.4rem" }}>
                <span>Ajuste (corrupção/sabotagem)</span>
                <span>{s.ajuste >= 0 ? "+" : ""}{s.ajuste.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="note note-orange" style={{ marginTop: "1.1rem" }}>
        A nota final é uma média ponderada das notas médias por papel (pesos configuráveis em
        "Configuração"), somada aos pontos fixos de corrupção/sabotagem. Ela não substitui seu julgamento.
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\ResultPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\ResultPanel.jsx"

$content = @'
import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (STATE.sm), onFieldChange(path, value)
export default function ScrumMasterPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Scrum Master</h2>
      <div className="desc">
        Avaliação de processo — um Scrum Master por empresa, atendendo os dois times.
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Conduziu os eventos<br />corretamente?</th>
            <th>Removeu<br />impedimentos?</th>
            <th>Ajudou o time a<br />melhorar entre Sprints?</th>
            <th>Nota (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.empresa}</td>
              <td>
                <SimNaoSelect value={r.conduziu} onChange={v => onFieldChange(`sm.${i}.conduziu`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.removeu} onChange={v => onFieldChange(`sm.${i}.removeu`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.ajudou} onChange={v => onFieldChange(`sm.${i}.ajudou`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.nota} onChange={v => onFieldChange(`sm.${i}.nota`, v)} />
              </td>
              <td>
                <ObsInput value={r.obs} onChange={v => onFieldChange(`sm.${i}.obs`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-dark">
        Critério-guia: o SM não é avaliado por produzir, mas por garantir que o Scrum aconteça de
        verdade e por ajudar o time a evoluir de uma Sprint para a outra.
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\ScrumMasterPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\ScrumMasterPanel.jsx"

$content = @'
// Props esperadas (fornecidas pelo App.jsx — Parte 1):
// - meta: { turma, data, empresaA, empresaB, fontScale }
// - teamNames: { [nomeEmpresa]: { Caça, Transporte } }
// - weights: { sm, owner, po, dev, buyer }
// - onFieldChange(path, value): atualiza um campo qualquer pelo "caminho"
//     (mesmo princípio do setByPath original, ex: "meta.turma", "weights.sm")
// - onRenameEmpresa(which, novoNome): which = "A" ou "B" — renomear empresa
//     precisa de tratamento especial porque o nome é também a chave de
//     teamNames, então não dá pra usar onFieldChange genérico aqui.
//     Combinar com quem fizer o App.jsx/hooks de estado.

const WEIGHT_LABELS = {
  sm: "Scrum Master",
  owner: "Owner",
  po: "Product Owner",
  dev: "Developers",
  buyer: "Avaliação dos Compradores",
};

export default function SetupPanel({ meta, teamNames, weights, onFieldChange, onRenameEmpresa }) {
  return (
    <div className="panel">
      <h2>Configuração</h2>
      <div className="desc">
        Identificação da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Turma</label>
          <input
            type="text"
            value={meta.turma}
            onChange={e => onFieldChange("meta.turma", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Data</label>
          <input
            type="text"
            value={meta.data}
            onChange={e => onFieldChange("meta.data", e.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa A</label>
          <input
            type="text"
            value={meta.empresaA}
            onChange={e => onRenameEmpresa("A", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Caça — Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA].Caça}
            onChange={e => onFieldChange(`teamNames.${meta.empresaA}.Caça`, e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA].Transporte}
            onChange={e => onFieldChange(`teamNames.${meta.empresaA}.Transporte`, e.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome — Empresa B</label>
          <input
            type="text"
            value={meta.empresaB}
            onChange={e => onRenameEmpresa("B", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Caça — Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB].Caça}
            onChange={e => onFieldChange(`teamNames.${meta.empresaB}.Caça`, e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte — Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB].Transporte}
            onChange={e => onFieldChange(`teamNames.${meta.empresaB}.Transporte`, e.target.value)}
          />
        </div>
      </div>

      <div className="note note-dark">
        Dica: os nomes de empresa já vêm pré-preenchidos a partir das imagens que você enviou
        (Maverick Aviation e SkyForge Ind. Aeronáutica). Pode alterar se quiser.
      </div>

      <h2 style={{ marginTop: "1.6rem" }}>Pesos da Nota Final</h2>
      <div className="desc">
        Ajuste o peso de cada papel no cálculo da nota final da empresa (aba "Resultado Final").
      </div>
      <div className="weights-panel">
        {Object.keys(weights).map(k => (
          <div className="weight-field" key={k}>
            <label>{WEIGHT_LABELS[k]}</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={weights[k]}
              onChange={e => onFieldChange(`weights.${k}`, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

'@
Set-Content -Path "src\components\SetupPanel.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\SetupPanel.jsx"

$content = @'
export default function DecisaoSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      <option value="A">Aceitou</option>
      <option value="I">Ignorou</option>
      <option value="D">Denunciou</option>
    </select>
  );
}

'@
Set-Content -Path "src\components\campos\DecisaoSelect.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\campos\DecisaoSelect.jsx"

$content = @'
export default function ObsInput({ value, onChange, placeholder }) {
  return (
    <input
      className="obs-input"
      type="text"
      value={value}
      placeholder={placeholder || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

'@
Set-Content -Path "src\components\campos\ObsInput.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\campos\ObsInput.jsx"

$content = @'
export default function ScoreSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      {[1, 2, 3, 4, 5].map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  );
}

'@
Set-Content -Path "src\components\campos\ScoreSelect.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\campos\ScoreSelect.jsx"

$content = @'
export default function SimNaoSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      <option value="S">Sim</option>
      <option value="N">Não</option>
    </select>
  );
}

'@
Set-Content -Path "src\components\campos\SimNaoSelect.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\components\campos\SimNaoSelect.jsx"

$content = @'
// =====================================================================
// CONSTANTS
// =====================================================================
export const SPRINTS = [1, 2, 3];
export const TIMES = ["Caça", "Transporte"];
export const BUYERS = ["Governo", "Militar", "Setor Privado"];
export const PAPEIS = [
  "", "Scrum Master", "Product Owner", "Owner/Stakeholder", "Developer",
  "Comprador - Governo", "Comprador - Militar", "Comprador - Setor Privado",
];

export const SEED_NAMES = [
  "ALAN FERREIRA DE OLIVEIRA", "ANDRÉ LUIZ VICENZI RIGO", "ARTHUR HENRIQUE LORENZETT",
  "BRUNO DE DAVID REIS", "CARLOS EDUARDO ALMEIDA DA CONCEICAO", "CARLOS JHONATAS DE SOUZA AMORIM",
  "CAUAN BRUNO ALTHAUS RIFFEL", "FILIPE GABRIEL HOLLMANN", "FILIPE JOSÉ DA COSTA NUNES",
  "GABRIEL CRISTIAN VIVIAN SOMARIVA", "GABRIEL DE CARVALHO BARRETO", "GIOVANI RICARDO POTT",
  "GUSTAVO SCHWITZKI PERETTI", "ISAEL SOARES DOS SANTOS", "JADSON BUTZK",
  "JÉSSICA FERNANDA RUBAS", "JOÃO VITOR RAIMUNDI", "KAUAN LUCAS TOLDO",
  "LEONARDO SCHIMIDT LOPES", "LORENZO PIVA MAY", "MARIA EDUARDA EMELAU JOBIM",
  "MATTEO DALLA COSTA THOMÉ", "NATAN ELIAS PATZLAFF", "NICOLAS LISBOA FIGUEIREDO MULLER",
  "NICOLE BONASSI BET", "RAFAEL WILLIAM HAUPT FLORES", "SAMIRA GREGORIO VIEIRA",
  "VICENTE DAGOSTIN PILONETTO", "VINICIUS TEBALDI BORSATTI", "WILLIAM KUNZLER",
  "YASMIN MARIA ZERBIELLI",
];

// OBS: caminhos de imagem devem apontar para /images/... (pasta public/images)
export const TEAM_IMAGES = {
  "Maverick Aviation": { logo: "/images/maverick_caca.jpg", Caça: "/images/maverick_caca.jpg", Transporte: "/images/maverick_cargo.jpg" },
  "SkyForge Ind. Aeronáutica": { logo: "/images/skyforge_caca.jpg", Caça: "/images/skyforge_caca.jpg", Transporte: "/images/skyforge_cargo.jpg" },
};

export const BUYER_IMAGES = {
  "Governo": "/images/governo_caca.jpg",
  "Militar": "/images/militar.jpg",
  "Setor Privado": "/images/empresa_privada.jpg",
};

export const ROLE_COLORS = {
  "Scrum Master": "#455F51", "Product Owner": "#029676", "Owner/Stakeholder": "#0989B1",
  "Developer": "#549E39", "Comprador - Governo": "#E8871E", "Comprador - Militar": "#B33A3A",
  "Comprador - Setor Privado": "#E8871E",
};

// =====================================================================
// DATA MODEL
// =====================================================================

// Monta o estado inicial do painel a partir dos nomes das duas empresas.
// Usado pelo App.jsx tanto para começar do zero quanto (com o mesmo
// princípio) para popular o estado quando dados salvos são carregados.
export function buildInitialData(empresaA, empresaB) {
  const empresas = [empresaA, empresaB];
  const sm = [], owner = [];
  SPRINTS.forEach(sp => empresas.forEach(emp => {
    sm.push({ sprint: sp, empresa: emp, conduziu: "", removeu: "", ajudou: "", nota: "", obs: "" });
    owner.push({ sprint: sp, empresa: emp, comunicacao: "", negociacao: "", alinhamento: "", notaGeral: "", obs: "" });
  }));

  const po = [], dev = [];
  SPRINTS.forEach(sp => empresas.forEach(emp => TIMES.forEach(t => {
    po.push({ sprint: sp, empresa: emp, time: t, requisitos: "", testes: "", reuniao: "", nota: "", obs: "" });
    dev.push({ sprint: sp, empresa: emp, time: t, qualidade: "", processo: "", colaboracao: "", notaTime: "", destaque: "" });
  })));

  const buyerProf = [];
  SPRINTS.forEach(sp => BUYERS.forEach(b => {
    buyerProf.push({ sprint: sp, comprador: b, checklist: "", decisoes: "", feedback: "", nota: "", obs: "" });
  }));

  const buyerProduct = [];
  SPRINTS.forEach(sp => {
    empresas.forEach(emp => {
      buyerProduct.push({ sprint: sp, comprador: "Governo", empresa: emp, produto: "Caça", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
      buyerProduct.push({ sprint: sp, comprador: "Governo", empresa: emp, produto: "Transporte", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
      buyerProduct.push({ sprint: sp, comprador: "Militar", empresa: emp, produto: "Caça", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
      buyerProduct.push({ sprint: sp, comprador: "Setor Privado", empresa: emp, produto: "Transporte", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
    });
  });

  const corrupcao = { empresaCorruptora: empresaA, primeiraDescoberta: false, primeiroComprador: "", segundaDescoberta: false, segundoComprador: "" };
  const sabotagem = { empresaSabotador: empresaA, timeSabotador: "Caça", tipoAcao: "atrapalhar", denunciasConsecutivas: 0, descoberto: false, areaSoubeECalou: false };
  const weights = { sm: 1, owner: 1, po: 1, dev: 2, buyer: 2 };
  const teamNames = {
    [empresaA]: { Caça: "Esquadrão Falcon", Transporte: "Falcon Carggo" },
    [empresaB]: { Caça: "SkyForge Combat", Transporte: "SkyForge Transport" },
  };
  const alunos = SEED_NAMES.map((nome, i) => ({ id: i + 1, nome, empresa: "", time: "", papel: "" }));

  return {
    meta: { turma: "", data: "", empresaA, empresaB, fontScale: 16 },
    sm, owner, po, dev, buyerProf, buyerProduct, corrupcao, sabotagem, weights, teamNames, alunos,
  };
}

// Média simples, ignorando valores vazios/não numéricos.
export function avg(arr) {
  const nums = arr.map(v => parseFloat(v)).filter(v => !isNaN(v));
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

'@
Set-Content -Path "src\data\initialData.js" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\data\initialData.js"

$content = @'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

'@
Set-Content -Path "src\main.jsx" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\main.jsx"

$content = @'
import { avg } from "../data/initialData";

export function computeCorrupcaoPontos(c) {
  let corruptor = 0;
  const compradores = {};
  if (c.primeiraDescoberta) {
    corruptor -= 1;
    if (c.primeiroComprador) compradores[c.primeiroComprador] = (compradores[c.primeiroComprador] || 0) - 1;
  }
  if (c.segundaDescoberta) {
    corruptor -= 1;
    if (c.segundoComprador) compradores[c.segundoComprador] = (compradores[c.segundoComprador] || 0) - 1;
  }
  return { corruptor, compradores };
}

export function computeSabotagemPontos(s) {
  let sabotador = 0, area = 0, demitido = false;
  if (s.descoberto) {
    sabotador -= 1;
    area += s.areaSoubeECalou ? -1 : 1;
    if (s.tipoAcao === "vazar" && s.denunciasConsecutivas >= 1) demitido = true;
    if (s.tipoAcao === "atrapalhar" && s.denunciasConsecutivas >= 2) demitido = true;
  }
  return { sabotador, area, demitido };
}

export function computeEmpresaScore(data, empresa) {
  const w = data.weights;
  const smAvg = avg(data.sm.filter(r => r.empresa === empresa).map(r => r.nota));
  const ownerAvg = avg(data.owner.filter(r => r.empresa === empresa).map(r => r.notaGeral));
  const poAvg = avg(data.po.filter(r => r.empresa === empresa).map(r => r.nota));
  const devAvg = avg(data.dev.filter(r => r.empresa === empresa).map(r => r.notaTime));
  const buyerAvg = avg(data.buyerProduct.filter(r => r.empresa === empresa).map(r => r.nota));

  const parts = [
    { key: "Scrum Master", val: smAvg, w: w.sm },
    { key: "Owner", val: ownerAvg, w: w.owner },
    { key: "Product Owner", val: poAvg, w: w.po },
    { key: "Developers", val: devAvg, w: w.dev },
    { key: "Avaliação dos Compradores", val: buyerAvg, w: w.buyer },
  ];

  let sumW = 0, sumV = 0;
  parts.forEach(p => {
    if (p.val !== null) {
      sumW += p.w;
      sumV += p.val * p.w;
    }
  });
  const base = sumW > 0 ? sumV / sumW : null;

  let ajuste = 0;
  const cPts = computeCorrupcaoPontos(data.corrupcao);
  const sPts = computeSabotagemPontos(data.sabotagem);
  if (data.corrupcao.empresaCorruptora === empresa) ajuste += cPts.corruptor;
  if (data.sabotagem.empresaSabotador === empresa) ajuste += sPts.sabotador + sPts.area;

  return { base, ajuste, final: base !== null ? base + ajuste : null, parts };
}

'@
Set-Content -Path "src\utils\scoring.js" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\utils\scoring.js"

$content = @'
// Mostra o número da sprint só na primeira linha de cada grupo,
// pra não repetir "Sprint 1" em toda linha da tabela.
export function sprintCellLabel(rows, i, key) {
  if (i === 0) return "Sprint " + rows[i].sprint;
  return rows[i][key] !== rows[i - 1][key] ? "Sprint " + rows[i].sprint : "";
}

'@
Set-Content -Path "src\utils\sprintLabel.js" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\utils\sprintLabel.js"

$content = @'
// Atualiza um valor dentro de um objeto/array aninhado, de forma imutável,
// a partir de um caminho tipo "sm.3.nota" ou "weights.dev" ou "meta.turma".
// Equivalente ao setByPath do app.js original, mas sem mutar o estado direto.
function setByPath(obj, keys, value) {
  if (keys.length === 0) return value;
  const [key, ...rest] = keys;
  const idx = /^\d+$/.test(key) ? Number(key) : key;

  if (Array.isArray(obj)) {
    const arr = [...obj];
    arr[idx] = setByPath(arr[idx], rest, value);
    return arr;
  }
  return { ...obj, [idx]: setByPath(obj[idx], rest, value) };
}

export function updateByPath(setData, path, value) {
  setData((prev) => setByPath(prev, path.split("."), value));
}

'@
Set-Content -Path "src\utils\updateByPath.js" -Value $content -Encoding utf8 -NoNewline
Write-Host "  ok: src\utils\updateByPath.js"

Write-Host "Pronto! Todos os arquivos foram criados/atualizados."
Write-Host "Total de arquivos: 24"