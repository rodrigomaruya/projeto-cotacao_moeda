import { useEffect, useState, useCallback } from "react";
import { api } from "../../api/api";
import { combinacoesMoedas } from "../../combinacoesMoedas/combinacoesMoedas";
import { FaArrowCircleUp } from "react-icons/fa";
import { Select } from "../../components/select";

export interface MoedasProps {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  create_date: string;
  high: string;
  low: string;
  name: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
}
interface DadosProps {
  [key: string]: MoedasProps;
}

export function Home() {
  const [moeda, setMoeda] = useState<DadosProps>({});
  const [quantidadeMoeda, setQuantidadeMoeda] = useState(10);
  const [urlMoeda, setUrlMoeda] = useState(
    "USD-BRL,USD-BRL,CAD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,BTC-BRL,LTC-BRL,JPY-BRL,CHF-BRL"
  );
  function handleTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleMore() {
    setQuantidadeMoeda((quantidade) => quantidade + 10);
  }

  const getMoedas = useCallback(async () => {
    try {
      const cemCombinacoes = combinacoesMoedas.slice(0, quantidadeMoeda);
      setUrlMoeda(cemCombinacoes.join(","));
      const { data } = await api.get(`/json/last/${urlMoeda}`);
      setMoeda(data);
    } catch (error) {
      console.log(error);
    }
  }, [urlMoeda, quantidadeMoeda]);
  useEffect(() => {
    getMoedas();
    const intervalID = setInterval(() => {
      getMoedas();
    }, 5000);

    return () => {
      clearInterval(intervalID);
    };
  }, [getMoedas]);
  function formataMoeda(valor: number, moeda: string) {
    const formatterCurrency = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: moeda,
    });
    return formatterCurrency.format(valor);
  }
  return (
    <div className="w-full  ">
      <div className="w-11/12 m-auto px2">
        <Select />
      </div>
      <table className="table-auto w-11/12 border-separate border-spacing-y-3 m-auto py-4">
        <thead className="table-fixed">
          <tr className="text-white">
            <th scope="col" className="w-1/12">
              Label
            </th>
            <th scope="col" className="w-1/12">
              Nome
            </th>
            <th scope="col" className="w-1/12">
              Compra
            </th>
            <th scope="col" className="w-1/12">
              Venda
            </th>
            <th scope="col" className="w-1/12">
              Variação
            </th>
            <th scope="col" className="w-1/12">
              Máxima
            </th>
            <th scope="col" className="w-1/12">
              Mínimo
            </th>
            <th scope="col" className="w-1/12">
              Ultima atualização
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(moeda).map(([chaves, valores]) => (
            <tr key={chaves} className="text-white text-center">
              <td data-label="label" className="border-b border-gray-400 mt-3">
                {chaves}
              </td>
              <td
                className="break-words whitespace-nowrap overflow-hidden text-ellipsis border-b border-gray-400"
                data-label="nome"
              >
                {valores.name}
              </td>
              <td data-label="compra" className="border-b border-gray-400">
                {formataMoeda(Number(valores.bid), valores.codein.slice(0, 3))}
              </td>
              <td data-label="venda" className="border-b border-gray-400">
                {formataMoeda(Number(valores.ask), valores.codein.slice(0, 3))}
              </td>
              <td data-label="variação" className="border-b border-gray-400">
                {valores.varBid}
              </td>
              <td data-label="maxima" className="border-b border-gray-400">
                {formataMoeda(Number(valores.high), valores.codein.slice(0, 3))}
              </td>
              <td data-label="mínimo" className="border-b border-gray-400">
                {formataMoeda(Number(valores.low), valores.codein.slice(0, 3))}
              </td>
              <td
                data-label="Ultima atualização"
                className="border-b border-gray-400"
              >
                {valores.create_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-start items-center w-11/12 m-auto pb-4">
        <button
          className="bg-blue-500 py-1 px-2 rounded-md text-white "
          onClick={handleMore}
        >
          Mais Moedas
        </button>
      </div>
      <div className="fixed bottom-2 right-3 z-10">
        <button className=" text-blue-600 " onClick={handleTop}>
          <FaArrowCircleUp size={40} />
        </button>
      </div>
    </div>
  );
}
