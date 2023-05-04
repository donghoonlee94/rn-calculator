import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useState } from 'react';


const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
}

const colorMap = {
  reset: COLOR.RESET,
  operator: COLOR.OPERATOR,
  num: COLOR.NUM,
};

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type }) => {
  const backgroundColor = colorMap[type] || 'transparent';

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{ 
        flex,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderWidth: 0.2,
        borderColor: "black",
      }}>
      <Text style={{ color: 'white', fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  )
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justifyContent: center;
  alignItems: flex-end;
  padding: 10px 5px;
`


export default () => {
  const [input, setInput] = useState(0); // number
  const [currentOperator, setCurrentOperator] = useState(null); // - + / * 
  const [result, setResult] = useState(null) // number
  const [tempInput, setTempInput] = useState(null);
  const [tempOperator, setTempOperator] = useState(null);

  return (
    <View style={{ flex: 1, width: 250, justifyContent: 'center' }}>
      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: 'white', fontSize: 35, textAlign: 'right' }}>{input}</Text>
      </InputContainer>

      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button
          type="reset"
          text="AC"
          onPress={() => null}
          flex={3}
        />
        <Button
          type="operator"
          text="/"
          onPress={() => null}
          flex={1}
        />
      </ButtonContainer>

      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7,8,9].map(num => (
          <Button
            key={num}
            type="num"
            text={`${num}`}
            onPress={() => null}
            flex={1}
          />        
        ))}        
        <Button
          type="operator"
          text="X"
          onPress={() => null}
          flex={1}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4,5,6].map(num => (
          <Button
            key={num}
            type="num"
            text={`${num}`}
            onPress={() => null}
            flex={1}
          />        
        ))}
        <Button
          type="operator"
          text="-"
          onPress={() => null}
          flex={1}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1,2,3].map(num => (
          <Button
            key={num}
            type="num"
            text={`${num}`}
            onPress={() => null}
            flex={1}
          />        
        ))}        
        <Button
          type="operator"
          text="+"
          onPress={() => null}
          flex={1}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button
          type="num"
          text="0"
          onPress={() => null}
          flex={3}
        />
        <Button
          type="operator"
          text="="
          onPress={() => null}
          flex={1}
        />
      </ButtonContainer>
    </View>
  )
}