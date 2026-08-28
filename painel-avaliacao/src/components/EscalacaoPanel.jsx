import { BUYERS, BUYER_IMAGES } from "../data/initialData";
import CompanyBlock from "./CompanyBlock";

// Props: data (objeto completo)
export default function EscalacaoPanel({ data }) {
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  return (
    <div className="panel">
      <h2>EscalaÃ§Ã£o</h2>
      <div className="desc">
        VisÃ£o de equipe, com a identidade visual de cada empresa â€” Ãºtil para projetar em sala.
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
                <div>{aluno ? aluno.nome : <span className="tag-unassigned">nÃ£o atribuÃ­do</span>}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
