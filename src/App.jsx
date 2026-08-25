import { useState } from "react";
import { buildInitialData } from "./data/initialData";
import SetupPanel from "./components/SetupPanel";
import ScrumMasterPanel from "./components/ScrumMasterPanel";
import OwnerPanel from "./components/OwnerPanel";
import ProductOwnerPanel from "./components/ProductOwnerPanel";
import DevPanel from "./components/DevPanel";

const TABS = [
  { id: "setup", label: "Configuração" },
  { id: "sm", label: "Scrum Master" },
  { id: "owner", label: "Owner" },
  { id: "po", label: "Product Owner" },
  { id: "dev", label: "Developers" },
  { id: "alunos", label: "Alunos" },
  { id: "buyer", label: "Compradores" },
  { id: "corrupsab", label: "Corrupção & Sabotagem" },
  { id: "final", label: "Resultado Final" },
];

export default function App() {
  const [data, setData] = useState(() => buildInitialData("Maverick Aviation", "SkyForge Ind. Aeronáutica"));
  const [tab, setTab] = useState("setup");

  function renderPanel() {
    if (tab === "setup") return <SetupPanel data={data} setData={setData} />;
    if (tab === "sm") return <ScrumMasterPanel data={data} setData={setData} />;
    if (tab === "owner") return <OwnerPanel data={data} setData={setData} />;
    if (tab === "po") return <ProductOwnerPanel data={data} setData={setData} />;
    if (tab === "dev") return <DevPanel data={data} setData={setData} />;
    return (
      <div className="panel">
        <h2>Em construção</h2>
        <div className="desc">Essa aba ainda vai ser feita em outra parte do trabalho.</div>
      </div>
    );
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
        {TABS.map(t => (
          <div key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>

      <div className="wrap">
        {renderPanel()}
        <div className="footer-note">Parte 2: Configuração, Scrum Master, Owner, Product Owner e Developers.</div>
      </div>
    </div>
  );
}
