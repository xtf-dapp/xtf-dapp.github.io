import { CandleResolution, DydxClient, Market } from "@dydxprotocol/v3-client";
import { useEffect, useState } from "react";
import Navbar from "../../navigation/NavigationComponent";
import { Button, Col, Form, Row } from "react-bootstrap";
import DyDxCandleChartComponent from "../dashboard/CandleChartComponent";
import { createChart, ColorType, OhlcData } from 'lightweight-charts';

const DYDX_HOST = 'https://api.stage.dydx.exchange';

const resolutions: string[] = [CandleResolution.ONE_MIN, CandleResolution.FIFTEEN_MINS, CandleResolution.THIRTY_MINS, CandleResolution.ONE_HOUR, CandleResolution.FOUR_HOURS, CandleResolution.ONE_DAY]

function DyDxChartComponent(props: any) {
    const [market, setMarket] = useState<any>(Market.ETH_USD)
    const [resolution, setResolution] = useState<any>(CandleResolution.ONE_DAY)
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

    const public_client = new DydxClient(DYDX_HOST);

    useEffect(
        () => {
            console.log("In DyDxChartComponent")
            load_data_in_time()
            const new_markets: any = []
            public_client.public.getMarkets().then((marketsResponse) => {
                for (var key in marketsResponse.markets) {
                    new_markets.push(marketsResponse.markets[key].market);
                }
            });
        }, []);

    const updateMarket = (tarEnv: any) => {
        setMarket(tarEnv.target.value)
        load_data_in_time()
    }

    const updateResolution = (tarEnv: any) => {
        setResolution(tarEnv.target.value)
        load_data_in_time()
    }

    const convertDate = (date: string) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const load_data_in_time = () => {
        setIsLoading(true)


        public_client.public.getCandles({
            market: market,
            resolution: resolution,
        }).then((response) => {
            console.log(response)
            const candles = response.candles;

            candles.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())

            const updatedData: OhlcData[] = [];

            candles.forEach((item) => {
                console.log(item)
                const ob = { time: new Date(item.updatedAt).getTime() / 1000, open: Number(item.open), high: Number(item.high), low: Number(item.low), close: Number(item.close) } as OhlcData;
                console.log(ob)
                updatedData.push(ob);
            })
            setData(updatedData);
            setIsLoading(false)
        }).catch((error: any) => {
            console.log("error when getting candle data ", error);
            setIsLoading(false)
        })
    }

    return (
        <div>Test12</div>
    );
};



export default DyDxChartComponent;
