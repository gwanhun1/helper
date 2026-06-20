import { useCallback, useState } from "react";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "@react-native-community/geolocation";

export type Coords = { lat: number; lng: number };

type UseMyLocation = {
  loading: boolean;
  /** 권한 요청 + 한 번 위치 가져오기. 실패 시 null. */
  request: () => Promise<Coords | null>;
};

/**
 * 사용자 GPS 좌표 한 번 요청.
 * iOS: Info.plist의 NSLocationWhenInUseUsageDescription 필요 (이미 설정됨).
 * Android: ACCESS_FINE_LOCATION 런타임 권한 요청.
 */
export const useMyLocation = (): UseMyLocation => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (): Promise<Coords | null> => {
    setLoading(true);
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한",
            message: "근처에 떠있는 마음을 보여드리려면 위치가 필요해요.",
            buttonPositive: "허용",
            buttonNegative: "거부",
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          return null;
        }
      } else {
        // iOS: requestAuthorization은 비동기 콜백이 아니라 자동 prompt 트리거
        Geolocation.requestAuthorization(
          () => {},
          () => {},
        );
      }

      return await new Promise<Coords | null>((resolve) => {
        Geolocation.getCurrentPosition(
          (pos) => {
            resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          },
          (err) => {
            if (err.code === 1) {
              // PERMISSION_DENIED — 설정 안내
              Alert.alert(
                "위치 권한이 꺼져있어요",
                "설정에서 위치 권한을 허용하면 내 위치를 사용할 수 있어요.",
                [
                  { text: "취소", style: "cancel" },
                  { text: "설정 열기", onPress: () => Linking.openSettings() },
                ],
              );
            }
            resolve(null);
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 },
        );
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, request };
};
