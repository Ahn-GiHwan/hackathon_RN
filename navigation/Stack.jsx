import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import Bottom from "../navigation/Bottom";
import Compare from "../screen/Compare";

const NavStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NavStack.Navigator screenOptions={{ headerShown: false }}>
      <NavStack.Screen name="Login" component={Login} />
      <NavStack.Screen name="Bottom" component={Bottom} />
      <NavStack.Screen
        name="Compare"
        component={Compare}
        options={{
          headerShown: true,
          headerTitle: "비교하기",
        }}
      />
    </NavStack.Navigator>
  );
};

export default Stack;
