import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import Icon from './assets/img/question.png';
import "react-simple-keyboard/build/css/index.css";
import styled from 'styled-components';

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

const ButtonStyle= styled.button`
  width: 100%;
  height: 70px;
  border-radius: 8px;
  padding: 10px;
  font-size: 25px;
  margin-bottom:30px;
  background-color: #2ecc71;
  border: 2px solid #2ecc71;
`;

//import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

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
      <Row>
        <Rowtr>
          <Colimg>
            <img src={Icon} style={{ width: 250 }} />
          </Colimg>
          <Coltext>
            <Text>Bingung berkas perizinan anda?</Text>
            <Text2>Cari berkas perizinan anda disini</Text2>
          </Coltext>
        </Rowtr>
      </Row>
      <Row>
        <Rowtr>
          <Coltext>
            <InputStyle
              value={input}
              placeholder={"Masukan Kode Berkas Izin Anda"}
              onChange={onChangeInput}
            />
          </Coltext>
          <Colimg>
            <ButtonStyle >Cari</ButtonStyle>
          </Colimg>
        </Rowtr>
      </Row>
      <div style={{paddingLeft:20, paddingRight: 20}}>
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      </div>
    </Wrapper>
  );
}

export default App