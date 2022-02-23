import React, { useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Main = styled.View`
  width: 90%;
  height: 50%;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  padding: 40px 20px 60px;
`;

const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 22px;
`;

const InputContainer = styled.View`
  flex: 3;
`;

const InputBox = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #383838;
  margin-left: 10px;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  padding: 0 10px;
  height: 48px;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #4876ef;
  height: 50px;
`;

const LoginText = styled.Text`
  color: white;
  font-weight: 600;
`;

const Login = ({ navigation: { navigate } }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const onLogin = () => {
    if (id === "" || pw === "")
      Alert.alert("공백 오류", "아이디 또는 비밀번호를 입력해주세요");
    else if (id !== "fast") Alert.alert("아이디 오류", "없는 아이디입니다.");
    else if (pw !== "fast")
      Alert.alert("비밀번호 오류", "비밀번호가 올바르지 않습니다.");
    else navigate("Bottom", { name: "Home" });
  };

  return (
    <Container>
      <Main>
        <Title>Log in</Title>
        <InputContainer>
          <InputBox>
            <Label>아이디</Label>
            <Input
              value={id}
              onChangeText={setId}
              returnKeyType="done"
              placeholder="아이디를 입력해 주세요"
            />
          </InputBox>
          <InputBox>
            <Label>비밀번호</Label>
            <Input
              value={pw}
              onChangeText={setPw}
              secureTextEntry={true}
              returnKeyType="done"
              placeholder="비밀번호를 입력해 주세요"
            />
          </InputBox>
        </InputContainer>
        <Button onPress={onLogin}>
          <LoginText>로그인</LoginText>
        </Button>
      </Main>
      <StatusBar style="auto" />
    </Container>
  );
};

export default Login;
