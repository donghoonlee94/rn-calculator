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
const Button = ({ text, onPress, flex, type, isSelected }) => {
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
        borderWidth: isSelected ? 1 : 0.2,
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

  const onPressNum = num => {
    if(currentOperator) {
      setResult(input);
      setInput(num);
    }else {
      const newInput = Number(`${input}${num}`);
      setInput(newInput);  
    }
  };

  const onPressOperator = operator => {
    if(operator === '=') {
      let finalResult = result;
      switch(currentOperator) {
        case '+':
          finalResult = result + input;
          break;
        case '-':
          finalResult = result - input;
          break;
        case '*':
          finalResult = result * input;
          break;
        case '/':
          finalResult = result / input;
          break;
        default: 
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
    } else {
      setCurrentOperator(operator);
    }
  }

  const onPressReset = () => {
    setInput(0);
    setCurrentOperator(null);
    setResult(null);
    setTempInput(null);
    setTempOperator(null);
  };

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
          onPress={onPressReset}
          flex={3}
        />
        <Button
          type="operator"
          text="/"
          onPress={() => onPressOperator('/')}
          flex={1}
          isSelected={currentOperator === '/'}
        />
      </ButtonContainer>

      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7,8,9].map(num => (
          <Button
            key={num}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />        
        ))}        
        <Button
          type="operator"
          text="X"
          onPress={() => onPressOperator('*')}
          flex={1}
          isSelected={currentOperator === '*'}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4,5,6].map(num => (
          <Button
            key={num}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />        
        ))}
        <Button
          type="operator"
          text="-"
          onPress={() => onPressOperator('-')}
          flex={1}
          isSelected={currentOperator === '-'}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1,2,3].map(num => (
          <Button
            key={num}
            type="num"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />        
        ))}
        <Button
          type="operator"
          text="+"
          onPress={() => onPressOperator('+')}
          isSelected={currentOperator === '+'}
          flex={1}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button
          type="num"
          text="0"
          onPress={() => onPressNum(0)}
          flex={3}
        />
        <Button
          type="operator"
          text="="
          onPress={() => onPressOperator('=')}
          flex={1}
        />
      </ButtonContainer>
    </View>
  )
}