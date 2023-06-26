"use client";
import { Card, Divider, AreaChart, Title } from "@tremor/react";
import { gql, useQuery } from "urql";

interface ILPDataItem {
  id: string;
  amount: string;
  pid: string;
  timestamp: number;
  user: string;
}

const valueFormatter = (number: number) => {
  return `${Intl.NumberFormat("us").format(number).toString()} JPEG`;
};

const valueFormatterDepositWithdraw = (number: number) => {
  return `${Intl.NumberFormat("us")
    .format(number)
    .toString()} JPEG/ETH LP Token`;
};

const getPoolDataQuery = gql`
  query getPoolData {
    claims(orderBy: "timestamp", orderDirection: "desc", first: 40) {
      id
      pid
      amount
      user
      timestamp
    }

    deposits(orderBy: "timestamp", orderDirection: "desc", first: 40) {
      id
      pid
      amount
      user
      timestamp
    }

    withdraws(orderBy: "timestamp", orderDirection: "desc", first: 40) {
      id
      pid
      amount
      user
      timestamp
    }
  }
`;

export default function Metrics() {
  const [result] = useQuery({
    query: getPoolDataQuery,
  });

  const { data: gData, fetching, error } = result;

  const claimsData = (gData?.claims || []).map(
    ({ timestamp, amount, pid, user }: ILPDataItem) => ({
      timestamp: new Date(timestamp * 1e3).toDateString(),
      amount: (parseFloat(amount) / 1e18).toFixed(0),
      pid,
      user,
    })
  );

  const depositsData = (gData?.deposits || []).map(
    ({ timestamp, amount, pid, user }: ILPDataItem) => ({
      timestamp: new Date(timestamp * 1e3).toDateString(),
      amount: (parseFloat(amount) / 1e18).toFixed(0),
      pid,
      user,
    })
  );

  const withdrawsData = (gData?.withdraws || []).map(
    ({ timestamp, amount, pid, user }: ILPDataItem) => ({
      timestamp: new Date(timestamp * 1e3).toDateString(),
      amount: (parseFloat(amount) / 1e18).toFixed(0),
      pid,
      user,
    })
  );

  // console.log({ gData });

  return (
    <Card className="mx-auto">
      <Title>Deposits</Title>
      {/* <Metric>$ 10,300</Metric> */}
      <AreaChart
        className="mt-8 h-44"
        data={depositsData}
        categories={["amount"]}
        index="timestamp"
        colors={["indigo"]}
        valueFormatter={valueFormatterDepositWithdraw}
        showYAxis={false}
        showLegend={false}
        autoMinValue
        stack
      />

      <Divider />

      <Title>Withdarws</Title>
      {/* <Metric>645</Metric> */}
      <AreaChart
        className="mt-8 h-44"
        data={withdrawsData}
        categories={["amount"]}
        index="timestamp"
        colors={["indigo"]}
        valueFormatter={valueFormatterDepositWithdraw}
        showYAxis={false}
        showLegend={false}
        autoMinValue
        stack
      />
      <Divider />
      <Title>Claims</Title>
      {/* <Metric>$ 12,699</Metric> */}
      <AreaChart
        className="mt-8 h-[200px]"
        data={claimsData}
        categories={["amount"]}
        index="timestamp"
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        autoMinValue
        stack
      />
    </Card>
  );
}
