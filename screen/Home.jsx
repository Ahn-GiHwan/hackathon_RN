import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { saramList } from "../api/saram";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { itList } from "../api/category";

const Container = styled.View`
  padding: 10px 5px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #c4c4c4;
  border-radius: 24px;
  padding: 10px;
  background-color: white;
`;
const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Icon = styled.View`
  padding: 0 7px;
`;
const Input = styled.TextInput`
  max-width: 200px;
`;

const Btns = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Btn = styled.Text`
  margin-left: 5px;
  border-radius: 10px;
  padding: 5px;
  font-size: 12px;
  color: ${({ select }) => (select ? "white" : "black")};
  background-color: ${({ select }) => (select ? "#383838" : "transparent")};
  overflow: hidden;
`;

const CategoryList = styled.ScrollView`
  margin: 10px 0;
`;

const Category = styled.Text`
  margin-right: 10px;
`;

const InfoContainer = styled.ScrollView`
  background-color: white;
`;

const JobContainer = styled.View`
  margin-top: 10px;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
  padding: 10px;
`;

const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Company = styled.Text`
  font-size: 12px;
  color: gray;
`;

const Title = styled.Text`
  margin: 3px 0;
  font-weight: 800;
  color: #00d3ab;
`;

const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Job = styled.Text`
  margin-right: 5px;
  margin-bottom: 5px;
  border: 1px solid skyblue;
  border-radius: 5px;
  padding: 3px;
  font-size: 10px;
`;

const EndTime = styled.Text`
  margin-right: 5px;
  align-items: flex-end;
  font-size: 12px;
`;

const CompareBtn = styled.TouchableOpacity``;

const CompareBox = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 90px;
  width: 50px;
  height: 50px;
  border: 3px solid #4876ef;
  border-radius: 50px;
  background-color: white;
`;

const Lable = styled.Text`
  position: absolute;
  top: -4px;
  right: 2px;
  border-radius: 10px;
  padding: 2px 5px;
  text-align: center;
  font-size: 12px;
  color: white;
  background-color: #4876ef;
  overflow: hidden;
`;

const Home = ({ navigation: { navigate } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setDate] = useState(null);
  const [value, setValue] = useState("");
  const [compare, setCompare] = useState([]);
  const { data: its, isLoading: itLoading } = useQuery("itList", itList);

  const searchList = async (keywords) => {
    try {
      setIsLoading(true);
      setDate(null);
      const data = await saramList(keywords);
      setDate(data);
    } catch (error) {
      Alert.alert("error");
    } finally {
      setIsLoading(false);
    }
  };

  const saveCompare = (id, name) => {
    if (compare.filter((item) => item.id === id).length > 0) {
      const newCompare = compare.filter((item) => item.id !== id);
      setCompare(newCompare);
    } else if (compare.length === 2)
      Alert.alert("담기 실패", "앱에서는 2개가 최대입니다.");
    else {
      const newCompare = [...compare, { id, name }];
      setCompare(newCompare);
    }
  };

  const goComparePage = () => {
    if (compare.length !== 2)
      Alert.alert("갯수 오류", "공고가 2개 일때만 비교가 가능합니다.");
    else
      navigate("Compare", {
        params: [...compare],
      });
  };

  return (
    <Container>
      <InputContainer>
        <Left>
          <Icon>
            <FontAwesome5 name="search" size={18} color="black" />
          </Icon>
          <Input
            value={value}
            onChangeText={setValue}
            placeholder="키워드를 입력해주세요"
            onSubmitEditing={() => searchList(value)}
          />
        </Left>
        <Btns>
          <Btn select>직무별</Btn>
          <Btn>산업별</Btn>
          <Btn>지역별</Btn>
        </Btns>
      </InputContainer>
      <CategoryList horizontal showsHorizontalScrollIndicator={false}>
        {its &&
          its.map(({ code, name }) => <Category key={code}>{name}</Category>)}
      </CategoryList>
      {isLoading || itLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <InfoContainer>
          {data &&
            data.map((data) => {
              const { id, company, position, salary } = data;
              const jobs = data.keyword.split(",");
              const level = position["experience-level"].name;
              const grade = position["required-education-level"].name;
              const loc = position.location.name?.split(",");
              const endData = dayjs(
                new Date(Number(data["expiration-timestamp"]) * 1000)
              ).format("MM.DD");

              return (
                <JobContainer key={id}>
                  <Top>
                    <Company>{company.detail.name}</Company>
                    <CompareBtn
                      onPress={() => saveCompare(id, company.detail.name)}
                    >
                      <MaterialCommunityIcons
                        name={
                          compare.filter((item) => item.id === id).length > 0
                            ? "pin"
                            : "pin-outline"
                        }
                        size={20}
                        color="black"
                      />
                    </CompareBtn>
                  </Top>
                  <Title>{position.title}</Title>
                  <Info>
                    {jobs.map((name, i) => (
                      <Job key={i}>{name}</Job>
                    ))}
                  </Info>
                  <Info>
                    <EndTime>
                      {loc
                        ? loc[loc.length - 1].replace("&gt; ", "")
                        : "지역 없음"}
                    </EndTime>
                    <EndTime>{salary.name}</EndTime>
                  </Info>
                  <Info>
                    <EndTime>{level}</EndTime>
                    <EndTime>{grade}</EndTime>
                  </Info>
                  <EndTime>마감일 {endData}</EndTime>
                </JobContainer>
              );
            })}
        </InfoContainer>
      )}

      <StatusBar style="auto" />
      {data && (
        <CompareBox onPress={goComparePage}>
          <FontAwesome5 name="bookmark" size={24} color="black" />
          <Lable>{compare.length}</Lable>
        </CompareBox>
      )}
    </Container>
  );
};

export default Home;
