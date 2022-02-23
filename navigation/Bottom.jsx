import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import CompareList from "../screen/CompareList";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { list } from "../api/set";

const Tab = createBottomTabNavigator();

const Bottom = () => {
  const { data } = useQuery("setList", list);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "사람인",
          tabBarLabel: "사람인",
          tabBarIcon: ({ focus, color, size }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SetList"
        component={CompareList}
        options={{
          headerTitle: "비교 리스트",
          tabBarBadge: data && data.length,
          tabBarLabel: "비교 리스트",
          tabBarIcon: ({ focus, color, size }) => (
            <FontAwesome5 name="list" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottom;
