import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert, RefreshControl } from "react-native";
import { useQuery } from "react-query";
import { deleteSet, list, updateName } from "../api/set";
import { FontAwesome5 } from "@expo/vector-icons";

const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background-color: white;
`;

const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  padding: 10px;
`;

const SetInfoBox = styled.TouchableOpacity``;

const Title = styled.Text`
  margin-right: 10px;
  font-weight: 800;
  font-size: 18px;
`;

const CompanyList = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const Company = styled.Text`
  margin-right: 5px;
  border: 1px solid skyblue;
  border-radius: 5px;
  padding: 3px;
  font-size: 12px;
`;

const Btns = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EditBox = styled.TouchableOpacity`
  margin-right: 5px;
`;

const DeleteBox = styled.TouchableOpacity``;

const ErrorText = styled.Text`
  width: 100%;
  text-align: center;
`;

const CompareList = ({ navigation: { navigate } }) => {
  const { data, isLoading, refetch, isRefetching } = useQuery("setList", list);

  const moveDetail = (ids, name, _id) => {
    if (ids.length !== 2)
      Alert.alert("실패", "앱에서는 2개의 공고만 비교할 수 있습니다.");
    else {
      navigate("Compare", {
        params: [...ids],
        name,
        _id,
      });
    }
  };

  const onUpdateName = (_id, name) => {
    Alert.prompt(
      "이름 수정",
      "이름을 수정해주세요",
      async (text) => {
        try {
          await updateName(text, _id);
          Alert.alert("수정 완료", "수정이 완료되었습니다.");
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

  const onDeleteSet = async (id) => {
    try {
      await deleteSet(id);
      Alert.alert("삭제 완료", "삭제가 완료되었습니다.");
      refetch();
    } catch (error) {
      console.log(error);
      Alert.alert("삭제 실패", "삭제에 실패하였습니다.");
    }
  };

  if (isLoading) return <ActivityIndicator size="large" />;
  else
    return (
      <Container
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {data.length > 0 ? (
          data.map(({ _id, name, ids }) => (
            <SetContainer key={_id}>
              <SetInfoBox onPress={() => moveDetail(ids, name, _id)}>
                <Title>{name}</Title>
                <CompanyList>
                  {ids.map((item) => (
                    <Company key={item.id}>{item.name}</Company>
                  ))}
                </CompanyList>
              </SetInfoBox>
              <Btns>
                <EditBox onPress={() => onUpdateName(_id, name)}>
                  <FontAwesome5 name="edit" size={15} color="black" />
                </EditBox>
                <DeleteBox onPress={() => onDeleteSet(_id)}>
                  <FontAwesome5 name="trash-alt" size={15} color="black" />
                </DeleteBox>
              </Btns>
            </SetContainer>
          ))
        ) : (
          <ErrorText>추가된 비교 리스트가 없습니다.</ErrorText>
        )}
      </Container>
    );
};

export default CompareList;
