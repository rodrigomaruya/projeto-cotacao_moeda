import { useEffect, useState } from "react";
import { selectCombinacoes } from "../../combinacoesMoedas/combinacoesMoedas";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface MoedaProps {
  chave: string;
  valor: string;
}

export function Select() {
  const [moedas, setMoeda] = useState<MoedaProps[]>([]);
  const [searchMoeda, setSearchMoeda] = useState("");
  const navi = useNavigate();
  useEffect(() => {
    const arrayDeObjetos = Object.entries(selectCombinacoes).map(
      ([chave, valor]) => {
        return { chave, valor };
      }
    );
    setMoeda(arrayDeObjetos);
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
        {moedas.map((moeda, index) => (
          <option key={index} value={moeda.chave}>
            {moeda.valor}
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
