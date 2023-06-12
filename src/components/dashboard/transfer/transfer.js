import Footer from "../../footer/footer";
import Header from "../../header/header";
import "./transfer.css";
import { useEffect, useState } from "react";
import { Button, Form, Select, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { actionCreator } from "../../../state";
function Transfer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [coin, setCoin] = useState('');
  const [liveRate, setLiveRate] = useState({});
  const navigateToDashboard = () => {
    navigate('/dashboard');
  }
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
  },[])
  useEffect(() => {
    console.log(liveRate);
},[liveRate]);
 
  const onClickAdd = () =>{
    const uuid = uuidv4();
    const uniqueId = uuid.replace(/-/g, '');
    const newCoin ={
      Id: uniqueId,
      key: uniqueId,
      liveRate: '',
      coin
    }
    dispatch(actionCreator.addCoin(newCoin))
    setCoin('');
    navigateToDashboard()
  }

  return (
    <>
     <Header></Header>
     <div className="transfer">
     <Form 
          form={form}
          className="form"
          labelCol={{span: 10}}
          style={{maxWidth: 1000}}
          layout="horizontal"
          onFinishFailed={(error) => {
            console.log({error});
          }}
        >
          <Form.Item name="TransferAddress" label="Transfer Address: ">
            <Input placeholder="Enter Transfer Address" />
          </Form.Item>
          <Form.Item label="Select">
            <Select onChange={(value) => setCoin(value)}>
            {Object.keys(liveRate)?.map((key) => (
                <Select.Option key={key} value={key}>
                  {key}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
             <Button type="primary" htmlType="submit" onClick={onClickAdd}>Add</Button>
          </Form.Item>
        </Form>
    </div>
    <Footer></Footer>
  </>
    
  );
}

export default Transfer;