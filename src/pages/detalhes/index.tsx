import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { api } from "../../api/api";
import { MoedasProps } from "../home";
import { FaArrowAltCircleLeft } from "react-icons/fa";
interface DetailsProps {
  [key: string]: MoedasProps;
}

export function Detalhes() {
  const { searchMoeda } = useParams();
  const [detail, setDetail] = useState<DetailsProps>();

  const searchApi = useCallback(async () => {
    try {
      const { data }: { data: DetailsProps } = await api.get(
        `/json/last/${searchMoeda}`
      );

      setDetail(data);
    } catch (error) {
      console.log(error);
    }
  }, [searchMoeda]);

  useEffect(() => {
    searchApi();
  }, [searchApi]);
  function formataMoeda(valor: number, moeda: string) {
    const formatterCurrency = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: moeda,
    });
    return formatterCurrency.format(valor);
  }
  return (
    <div className="flex justify-center items-center flex-col w-full max-w-2xl mt-32 m-auto">
      <div className="w-11/12 max-w-3xl pb-4">
        <Link to={"/"} className="text-blue-600">
          <FaArrowAltCircleLeft size={30} />
        </Link>
      </div>
      <div className="flex flex-col bg-gray-600 w-11/12 max-w-3xl rounded-md p-3">
        <h1 className="font-bold text-center text-white mb-4">Cotação</h1>
        {detail &&
          Object.entries(detail).map(([chave, valores]) => (
            <ul className="text-white" key={chave}>
              <li className="flex justify-between">
                <span className="font-medium">Nome</span>
                {valores.name}
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Compra</span>
                {formataMoeda(Number(valores.ask), valores.codein.slice(0, 3))}
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Venda</span>
                {formataMoeda(Number(valores.bid), valores.codein.slice(0, 3))}
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Variação</span>
                {valores.varBid}
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Maxima</span>
                {formataMoeda(Number(valores.high), valores.codein.slice(0, 3))}
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Minima</span>
                {formataMoeda(Number(valores.low), valores.codein.slice(0, 3))}
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Ultima atualização</span>
                {valores.create_date}
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
}
