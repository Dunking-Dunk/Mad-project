import * as Notifications from "expo-notifications";
import registerNNPushToken, { registerIndieID } from "native-notify";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const useNotification = () => {
  registerNNPushToken(6812, "hIdJXJ415JJ7O0VRhedjiQ");
  registerIndieID("client", 6812, "hIdJXJ415JJ7O0VRhedjiQ");
};

export { useNotification };
