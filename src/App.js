import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import Icon from './assets/img/question.png';
import "react-simple-keyboard/build/css/index.css";
import styled from 'styled-components';
import axios from 'axios';
import { Modal, notification } from 'antd';
import 'antd/dist/antd.css';
import {
  CloseCircleOutlined,
  FullscreenOutlined
} from '@ant-design/icons';
import './assets/css/table.css';

const screenfull = require('screenfull');

const Wrapper = styled.div`
  padding: 20px;
`

const Row = styled.table`
  width: 100%;
  height: auto;
`

const Rowtr = styled.tr`
  width: 100%;
  height: auto;
`

const Colimg = styled.td`
  width: 20%;
  padding: 20px;
`

const Coltext = styled.td`
  width: 80%;
  padding: 20px;
`

const Text = styled.p`
  font-size: 70px;
  color: #fff;
  font-style: bold;
  margin-bottom:5px;
`

const Text2 = styled.p`
  font-size: 50px;
  color: #fff;
  font-style: bold;
  margin-top:5px;
`

const InputStyle = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom:30px;
  border: 2px solid #8e44ad;
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 8px;

  font-size: 25px;
  margin-bottom:30px;
  background-color: #2ecc71;
  border: 2px solid #2ecc71;
  color: white;
  font-weight: bold;
`;

const ButtonFullScreen = styled.button`
  border-radius: 8px;
  font-size: 25px;
  margin-bottom:30px;
  border: 2px solid #8e44ad;
  color: white;
  font-weight: bold;
  float: right;
`;



//import "./styles.css";

function App() {

  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false)

  const keyboard = useRef();

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
      });
    }
  }, [])

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };

  const modalTrigger = () => {
    setModal(!modal)
  }

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const getData = async () => {
    console.log(input)
    if (input === '') {
      notification.open({
        message: 'Nomor berkas tidak boleh kosong',
        description:
          '',
        icon: <CloseCircleOutlined style={{ color: '#e74c3c' }} />,
      });
    } else {
      axios.get(`https://sicantikws.layanan.go.id/api/TemplateData/keluaran/10916.json?no_permohonan=${input}`)
        .then(res => {
          console.log(res.data.data.berkas.length)
          if (res.data.data.berkas.length === 0) {
            notification.open({
              message: 'Data tidak ditemukan',
              description:
                '',
              icon: <CloseCircleOutlined style={{ color: '#e74c3c' }} />,
            });
          } else {
            setData(res.data.data.berkas)
            console.log(res.data.data.berkas.reverse())
            setInput('');
            keyboard.current.setInput('');
            modalTrigger()
          }

        }
        )
    }

  }

  const onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <Wrapper>
      <ButtonFullScreen style={{ backgroundColor: '#9b59b6' }} onClick={toggleFullScreen}><FullscreenOutlined /></ButtonFullScreen>
      <Row>
        <Rowtr>
          <Colimg>
            <img src={Icon} style={{ width: 250 }} />
          </Colimg>
          <Coltext>
            <Text>Bingung berkas perizinan SiCantik anda?</Text>
            <Text2>Cari berkas perizinan anda disini</Text2>
          </Coltext>
        </Rowtr>
      </Row>
      <Row>
        <Rowtr>
          <Coltext>
            <InputStyle
              value={input}
              placeholder={"Masukan Nomor Permohonan Izin Anda"}
              onChange={onChangeInput}
            />
          </Coltext>
          <Colimg>
            <ButtonStyle onClick={getData} >Cari</ButtonStyle>
          </Colimg>
        </Rowtr>
      </Row>
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          layoutName={layout}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>

      <Modal
        title="Tracking Berkas Perizinan"
        centered
        visible={modal}
        //onOk={createorupdate}
        onCancel={modalTrigger}
        footer={null}
        width={700}
      >
        {/* <table class='table is-striped is-narrow is-hoverable is-fullwidth'>
						<tr>
								<td>Nomor Permohonan {data.data.data[0]}</td>
								<td>{data.berkas.no_permohonan}</td>
                </tr>
							"</tr>"+
							"<tr>"+
								"<td>Nama Pemohon</td>"+
								"<td>"+response['data']['berkas'][2]['nama']+"</td>"+
							"</tr>"+
							"<tr>"+
								"<td>Tempat Lahir</td>"+
								"<td>"+response['data']['berkas'][2]['tempat_lahir']+"</td>"+
							"</tr>"+
							"<tr>"+
								"<td>Tanggal Lahir</td>"+
								"<td>"+response['data']['berkas'][2]['tanggal_lahir']+"</td>"+
							"</tr>"+
							"<tr>"+
								"<td>Jenis Izin</td>"+
								"<td>"+response['data']['berkas'][2]['jenis_izin']+"</td>"+
							"</tr>"+
						</table> */}
        <table style={{ fontWeight: 'bold', fontSize: 14, width: '100%' }} className="table1">
          <thead>
            <tr>
              <td>No</td>
              <td>Nama Proses</td>
              <td>Status</td>
            </tr>
          </thead>
          {data.reverse().map((item, index) =>
            <tr>
              <td>{index + 1}</td>
              <td>{item.nama_proses}</td>
              <td style={item.status === 'Selesai' ? { color: 'black' } : item.status === 'Proses' ? { color: '#05c46b' } : { color: '#ffdd59' }}  >{item.status}</td>
            </tr>
          )}

        </table>
      </Modal>
      <div style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
        <p style={{ fontWeight: 'bold', color: 'white' }}>Dinas Penenaman Modal dan tenaga Kerja Kota Singkawang</p>
      </div>
    </Wrapper>
  );
}

export default App