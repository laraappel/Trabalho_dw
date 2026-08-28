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
  { id: "setup", label: "ConfiguraÃ§Ã£o" },
  { id: "sm", label: "Scrum Master" },
  { id: "owner", label: "Owner" },
  { id: "po", label: "Product Owner" },
  { id: "dev", label: "Developers" },
  { id: "buyerProf", label: "Compradores (Perfil)" },
  { id: "buyerProduct", label: "Compradores (Produto)" },
  { id: "corrupsab", label: "CorrupÃ§Ã£o & Sabotagem" },
  { id: "alunos", label: "Alunos" },
  { id: "escalacao", label: "EscalaÃ§Ã£o" },
  { id: "result", label: "Resultado Final" },
];

export default function App() {
  const [data, setData] = useState(() => buildInitialData("Maverick Aviation", "SkyForge Ind. AeronÃ¡utica"));
  const [tab, setTab] = useState("setup");

  const onFieldChange = (path, value) => updateByPath(setData, path, value);

  // which = "A" ou "B" â€” renomear empresa precisa propagar pra teamNames,
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
          <h1>Painel de AvaliaÃ§Ã£o â€” SimulaÃ§Ã£o Scrum Competitiva</h1>
          <div className="sub">Empresa A: {data.meta.empresaA} Â· Empresa B: {data.meta.empresaB}</div>
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
