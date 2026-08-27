import React from "react";

export default function CompanyBlock({ empresa, data }) {
  const alunosEmpresa = data.alunos.filter(
    (aluno) => aluno.empresa === empresa
  );

  const times = ["Caça", "Transporte"];

  return (
    <div className="company-block">
      <h3>{empresa}</h3>

      <div className="grid2">
        {times.map((time) => {
          const alunosTime = alunosEmpresa.filter(
            (aluno) => aluno.time === time
          );

          return (
            <div className="mini-card" key={time}>
              <h4>{data.teamNames[empresa]?.[time] || time}</h4>

              {alunosTime.length === 0 ? (
                <div className="desc">
                  Nenhum aluno escalado.
                </div>
              ) : (
                <div>
                  {alunosTime.map((aluno) => (
                    <div className="student-line" key={aluno.id}>
                      <strong>{aluno.nome}</strong>
                      <span>{aluno.papel || "Sem papel"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}