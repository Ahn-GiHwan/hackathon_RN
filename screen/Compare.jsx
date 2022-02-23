import React, { useEffect } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert } from "react-native";
import { create, list, updateName } from "../api/set";
import { useQuery } from "react-query";
import { saramDetail } from "../api/saram";
import dayjs from "dayjs";
import { getMemo, setMemo } from "../api/memo";

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const Title = styled.Text`
  width: 100%;
  padding: 10px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  background-color: #b6c8f9;
`;

const CompareBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

const View = styled.View`
  flex: 1;
  align-items: center;
`;

const InfoText = styled.Text`
  max-width: 200px;
  padding: 10px;
  font-size: 14px;
`;

const MemoText = styled(InfoText)``;

const SaveBtn = styled.TouchableOpacity``;

const MemoBtns = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const SaveText = styled.Text`
  border-radius: 10px;
  padding: 5px;
  font-weight: 600;
  font-size: 14px;
  color: white;
  background-color: #4876ef;
  overflow: hidden;
`;

const MemoBtn = styled.Text`
  border-radius: 10px;
  padding: 5px;
  font-weight: 600;
  font-size: 14px;
  color: white;
  background-color: green;
  overflow: hidden;
`;

const Compare = ({ route: { params }, navigation: { setOptions } }) => {
  const { params: setData } = params;
  const { name, _id } = params;
  const { refetch } = useQuery("setList", list);

  const { data: oneData, isLoading: oneLoading } = useQuery(
    [setData[0].id, setData[0].id],
    saramDetail
  );

  const {
    data: oneMemo,
    isLoading: oneMemoLoading,
    refetch: oneMemoRefetch,
    isRefetching: oneMemoRefetching,
  } = useQuery([`${setData[0].id}Memo`, setData[0].id], getMemo);

  const { data: twoData, isLoading: twoLoading } = useQuery(
    [setData[1].id, setData[1].id],
    saramDetail
  );

  const {
    data: twoMemo,
    isLoading: twoMemoLoading,
    refetch: twoMemoRefetch,
    isRefetching: twoMemoRefetching,
  } = useQuery([`${setData[1].id}Memo`, setData[1].id], getMemo);

  const setName = () => {
    Alert.prompt(
      "비교 저장하기",
      "이름을 정해주세요",
      async (text) => {
        try {
          await create(text, setData);
          Alert.alert("저장 완료", "저장이 완료되었습니다.");
          setOptions({
            headerTitle: text,
          });
          refetch();
        } catch (error) {
          Alert.alert("저장 실패", "저장에 실패하였습니다.");
        }
      },
      "plain-text"
    );
  };

  const editName = () => {
    Alert.prompt(
      "이름 수정",
      "이름을 수정해주세요",
      async (text) => {
        try {
          await updateName(text, _id);
          Alert.alert("수정 완료", "수정이 완료되었습니다.");
          setOptions({
            headerTitle: text,
          });
          refetch();
        } catch (error) {
          console.log(error);
          Alert.alert("수정 실패", "수정에 실패하였습니다.");
        }
      },
      "plain-text",
      name
    );
  };

  const headerRight = () => {
    if (name) {
      return (
        <SaveBtn onPress={editName}>
          <SaveText>수정하기</SaveText>
        </SaveBtn>
      );
    } else
      return (
        <SaveBtn onPress={setName}>
          <SaveText>저장하기</SaveText>
        </SaveBtn>
      );
  };

  useEffect(() => {
    setOptions({
      headerRight,
      headerTitle: name && name,
    });
  }, []);

  const changeMemo = async (id, type) => {
    Alert.prompt(
      "메모",
      "메모를 적어주세요",
      async (text) => {
        try {
          await setMemo(id, text);
          type ? oneMemoRefetch() : twoMemoRefetch();
          Alert.alert("수정 완료", "수정이 완료되었습니다.");
          refetch();
        } catch (error) {
          console.log(error);
          Alert.alert("수정 실패", "수정에 실패하였습니다.");
        }
      },
      "plain-text",
      type ? oneMemo.text : twoMemo.text
    );
  };

  if (oneLoading || twoLoading) return <ActivityIndicator size="large" />;
  else
    return (
      <Container>
        <Title>공고 이름</Title>
        <CompareBox>
          <View>
            <InfoText>{oneData[0].position.title}</InfoText>
          </View>
          <View>
            <InfoText>{twoData[0].position.title}</InfoText>
          </View>
        </CompareBox>
        <Title>회사</Title>
        <CompareBox>
          <View>
            <InfoText>{oneData[0].company.detail.name}</InfoText>
          </View>
          <View>
            <InfoText>{twoData[0].company.detail.name}</InfoText>
          </View>
        </CompareBox>
        <Title>직무</Title>
        <CompareBox>
          <View>
            <InfoText>{oneData[0].keyword}</InfoText>
          </View>
          <View>
            <InfoText>{twoData[0].keyword}</InfoText>
          </View>
        </CompareBox>
        <Title>경력요건</Title>
        <CompareBox>
          <View>
            <InfoText>{oneData[0].position["experience-level"].name}</InfoText>
          </View>
          <View>
            <InfoText>{twoData[0].position["experience-level"].name}</InfoText>
          </View>
        </CompareBox>
        <Title>학력요건</Title>
        <CompareBox>
          <View>
            <InfoText>
              {oneData[0].position["required-education-level"].name}
            </InfoText>
          </View>
          <View>
            <InfoText>
              {twoData[0].position["required-education-level"].name}
            </InfoText>
          </View>
        </CompareBox>
        <Title>연봉</Title>
        <CompareBox>
          <View>
            <InfoText>{oneData[0].salary.name}</InfoText>
          </View>
          <View>
            <InfoText>{twoData[0].salary.name}</InfoText>
          </View>
        </CompareBox>
        <Title>마감일</Title>
        <CompareBox>
          <View>
            <InfoText>
              {dayjs(
                new Date(Number(oneData[0]["expiration-timestamp"]) * 1000)
              ).format("YYYY.MM.DD")}
            </InfoText>
          </View>
          <View>
            <InfoText>
              {dayjs(
                new Date(Number(twoData[0]["expiration-timestamp"]) * 1000)
              ).format("YYYY.MM.DD")}
            </InfoText>
          </View>
        </CompareBox>
        <Title>메모</Title>
        <CompareBox>
          <View>
            {oneMemoLoading || oneMemoRefetching ? (
              <ActivityIndicator />
            ) : (
              <MemoText>{oneMemo?.text || "내용 없음"}</MemoText>
            )}
          </View>
          <View>
            {twoMemoLoading || twoMemoRefetching ? (
              <ActivityIndicator />
            ) : (
              <MemoText>{twoMemo?.text || "내용 없음"}</MemoText>
            )}
          </View>
        </CompareBox>
        <CompareBox>
          <MemoBtns onPress={() => changeMemo(oneData[0].id, true)}>
            <MemoBtn>수정하기</MemoBtn>
          </MemoBtns>
          <MemoBtns onPress={() => changeMemo(twoData[0].id, false)}>
            <MemoBtn>수정하기</MemoBtn>
          </MemoBtns>
        </CompareBox>
      </Container>
    );
};

export default Compare;
