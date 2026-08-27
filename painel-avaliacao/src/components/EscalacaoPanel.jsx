import React from "react";

import CompanyBlock from "./CompanyBlock";

export default function EscalacaoPanel({ data }) {
  const empresas = [
    data.meta.empresaA,
    data.meta.empresaB,
  ];

  return (
    <div className="panel">
      <h2>Escalação</h2>

      <div className="desc">
        Visualização dos alunos distribuídos entre as empresas e seus
        respectivos times.
      </div>

      {empresas.map((empresa) => (
        <CompanyBlock
          key={empresa}
          empresa={empresa}
          data={data}
        />
      ))}
    </div>
  );
}