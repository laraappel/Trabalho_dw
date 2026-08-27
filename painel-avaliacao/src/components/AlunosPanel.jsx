import React from "react";

import AlunoRow from "./AlunoRow";

export default function AlunosPanel({ data, setData }) {
  return (
    <div className="panel">
      <h2>Alunos</h2>

      <div className="desc">
        Defina a empresa, o time e o papel de cada aluno.
      </div>

      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Empresa</th>
            <th>Time</th>
            <th>Papel</th>
          </tr>
        </thead>

        <tbody>
          {data.alunos.map((aluno, index) => (
            <AlunoRow
              key={aluno.id}
              aluno={aluno}
              index={index}
              data={data}
              setData={setData}
            />
          ))}
        </tbody>
      </table>

      <div className="note note-orange">
        Cada aluno deve estar associado a uma empresa, um time e um papel
        durante a simulação.
      </div>
    </div>
  );
}