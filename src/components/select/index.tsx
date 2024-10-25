import { useEffect, useState } from "react";
import { selectCombinacoes } from "../../combinacoesMoedas/combinacoesMoedas";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface MoedaProps {
  codigo: string;
  descricao: string;
}

export function Select() {
  const [moedas, setMoeda] = useState<MoedaProps[]>([]);
  const [searchMoeda, setSearchMoeda] = useState("");
  const navi = useNavigate();
  useEffect(() => {
    const orderedSelectCombinacoes: MoedaProps[] = Object.entries(
      selectCombinacoes
    )
      .sort((a, b) => a[1].localeCompare(b[1])) // Ordena com base nos valores (a[1] e b[1])
      .map(([codigo, descricao]) => ({ codigo, descricao }));

    setMoeda(orderedSelectCombinacoes);
  }, []);

  function handleClick() {
    if (!searchMoeda) {
      return;
    }
    navi(`/detalhes/${searchMoeda}`);
  }
  return (
    <div className="flex gap-2 w-full justify-center">
      <select
        onChange={(e) => setSearchMoeda(e.target.value)}
        value={searchMoeda}
        className="py-2 w-full max-w-3xl outline-none"
      >
        <option value="" disabled selected>
          Selecione uma moeda...
        </option>
        {moedas.map((moeda, index) => (
          <option key={index} value={moeda.codigo}>
            {moeda.descricao}
          </option>
        ))}
      </select>
      <button
        onClick={handleClick}
        className="border border-white py-1 px-3 rounded-md"
      >
        <FaSearch color="white" />
      </button>
    </div>
  );
}
