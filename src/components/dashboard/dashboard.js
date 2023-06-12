import Footer from "../footer/footer";
import Header from "../header/header";
import "./dashboard.css";
import { Space, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../../state";
function Dashboard() {
  const coinReducerState = useSelector(state => state.coinReducer);
  const dispatch = useDispatch();
  const dataSource = useMemo(() => {
    return coinReducerState.userCoinData;
  }, [coinReducerState.userCoinData])
  const onClickDelete = (recordId) => {
    dispatch(actionCreator.removeCoin(recordId));
  } 
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'coin',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: 'Live Rate',
      dataIndex: 'liveRate',
      key: 'liveRate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/transfer/${record.Id}`}>Transfer</Link>
          <Button type="primary" htmlType="submit" onClick={onClickDelete.bind(null, record.Id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  const [liveRate, setLiveRate] = useState({});
  const [data, setdata] = useState(dataSource);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR')
        const data = await response.json();
        setLiveRate(data);
      }catch(error) {
        console.log(error)
      }
    }
    fetchData();
  },[coinReducerState])
  useEffect(() => {
        dataSource?.forEach(coin => {
          coin['liveRate'] = liveRate[coin.coin]
        })
        setdata(dataSource);
  },[liveRate, dataSource]);

  return (
    <>
     <Header></Header>
     <div className="dashboard">
      <Table dataSource={data || []} columns={columns} />;
    </div>
    <Footer></Footer>
  </>
    
  );
}

export default Dashboard;
