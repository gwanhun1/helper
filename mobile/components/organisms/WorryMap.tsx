import { StyleSheet, View } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";

import type { Worry } from "@/data";
import { DEMO_CENTER } from "@/data";

import { MapPin } from "../molecules/MapPin";
import { PinBubble } from "../molecules/PinBubble";

/**
 * Expo Go에서는 네이티브 모듈이 없으므로 placeholder 모드.
 * Dev client / 스토어 빌드에서만 NaverMapView 사용.
 */
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

// 동적 require — Expo Go에선 native module이 없어 import 시 에러 가능성을 막음
let NaverMapView: any = null;
let NaverMapMarkerOverlay: any = null;
if (!isExpoGo) {
  try {
    const nm = require("@mj-studio/react-native-naver-map");
    NaverMapView = nm.NaverMapView;
    NaverMapMarkerOverlay = nm.NaverMapMarkerOverlay;
  } catch (e) {
    // dev client 빌드 전 - 무시
  }
}

const PIN_SIZE = 44;
const PIN_HEIGHT = PIN_SIZE + 6; // body + tail half (꼬리 절반이 아래로 튀어나옴)
const SLOT_PAD = 12; // ME / 카운트 뱃지가 본체 밖으로 살짝 튀어나오는 여유

type Props = {
  worries: Worry[];
  onPinPress: (id: string) => void;
};

export const WorryMap = ({ worries, onPinPress }: Props) => {
  // 네이버 지도 사용 가능 → 실제 지도 렌더
  if (NaverMapView && NaverMapMarkerOverlay) {
    return (
      <NaverMapView
        style={StyleSheet.absoluteFill}
        initialCamera={{
          latitude: DEMO_CENTER.lat,
          longitude: DEMO_CENTER.lng,
          zoom: 15.5,
        }}
        isShowLocationButton={false}
        isShowZoomControls={false}
        isShowCompass={false}
        isShowScaleBar={false}
      >
        {worries
          .filter((w) => w.lat != null && w.lng != null)
          .map((w) => (
            <NaverMapMarkerOverlay
              key={w.id}
              latitude={w.lat!}
              longitude={w.lng!}
              width={PIN_SIZE + SLOT_PAD}
              height={PIN_HEIGHT + SLOT_PAD}
              anchor={{ x: 0.5, y: 1 }}
              onTap={() => onPinPress(w.id)}
            >
              <View
                key={`${w.id}-${w.replyCount}-${w.isMine}`}
                collapsable={false}
                style={styles.markerSlot}
              >
                <PinBubble
                  replyCount={w.replyCount}
                  isMine={w.isMine}
                  size={PIN_SIZE}
                />
              </View>
            </NaverMapMarkerOverlay>
          ))}
      </NaverMapView>
    );
  }

  // 폴백 placeholder — Expo Go에서 UI 구조 확인용
  return (
    <View style={styles.placeholderLayer}>
      {worries.map((w, i) => (
        <MapPin
          key={w.id}
          x={w.x}
          y={w.y}
          replyCount={w.replyCount}
          isMine={w.isMine}
          delay={i * 220}
          onPress={() => onPinPress(w.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#EAEEF2",
  },
  markerSlot: {
    width: PIN_SIZE + SLOT_PAD,
    height: PIN_HEIGHT + SLOT_PAD,
    alignItems: "center",
    justifyContent: "flex-end", // 핀이 slot 하단에 붙음 → 꼬리 끝이 좌표
  },
});
