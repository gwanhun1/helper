import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";

import type { Worry } from "@/data";
import { DEMO_CENTER } from "@/data";
import { colors, fontSize, fontWeight, radius, shadow } from "@/theme";

import { MapPin } from "../molecules/MapPin";
import { PinBody, PinIcon } from "../molecules/PinBubble";

/**
 * 동적 require — 네이티브 모듈이 link 안 되면 placeholder 폴백.
 * 순수 RN 환경에서는 정상 로드.
 */
let NaverMapView: any = null;
let NaverMapMarkerOverlay: any = null;
try {
  const nm = require("@mj-studio/react-native-naver-map");
  NaverMapView = nm.NaverMapView;
  NaverMapMarkerOverlay = nm.NaverMapMarkerOverlay;
} catch (e) {
  // 네이티브 모듈 미링크 - 폴백 placeholder가 동작
}

const PIN_SIZE = 48;
const PIN_HEIGHT = PIN_SIZE + 6;
const SLOT_PAD = 12;

// 봉투 아이콘 — "한 번 호흡 후 휴식" 패턴 (잔잔, 가끔 유혹)
const ICON_AMPLITUDE = 0.18;
const ICON_BUMP_MS = 850;
const ICON_REST_MS = 2400;
const ICON_CYCLE_MS = ICON_BUMP_MS + ICON_REST_MS;
const TICK_MS = 60;

// 핫 핀 위 툴팁 — 잠깐 떴다 사라짐
const TOOLTIP_INITIAL_DELAY_MS = 1800;
const TOOLTIP_VISIBLE_MS = 2600;
const TOOLTIP_HIDDEN_MS = 6000;
const TOOLTIP_W = 150;
const TOOLTIP_H = 32;
const TOOLTIP_TAIL = 8;
const TOOLTIP_GAP = 4; // 꼬리 끝과 핀 사이 간격
// 자식 stack 높이 = 알약 + 꼬리 절반(나머지는 알약과 겹침)
const TOOLTIP_STACK_H = TOOLTIP_H + TOOLTIP_TAIL / 2;
const TOOLTIP_TOTAL_H = TOOLTIP_STACK_H + TOOLTIP_GAP + PIN_HEIGHT;

type Props = {
  worries: Worry[];
  onPinPress: (id: string) => void;
  /** viewport 안에 보이는 worry 수가 바뀔 때마다 호출 */
  onVisibleCountChange?: (count: number) => void;
};

/**
 * 단일 마커 — 본체(정지) + 봉투(독립 phase로 scale 변동) 두 layer로 분리.
 *
 * NaverMapMarkerOverlay는 mount 시점에 한 번 정적 캡처되므로 React tree의
 * Animated.View 변경은 마커에 반영되지 않음. 대신 marker의 width/height props 자체를
 * native side에서 변동시켜 봉투 layer만 살짝 커졌다 작아짐.
 */
const AnimatedNaverMarker = ({
  worry,
  isHot,
  onPress,
}: {
  worry: Worry;
  isHot?: boolean;
  onPress: () => void;
}) => {
  // 각 마커가 독립 phase로 시작 — cycle 안의 어느 지점에서 시작할지 random
  const phaseOffsetMs = useMemo(() => Math.random() * ICON_CYCLE_MS, []);
  const startTimeRef = useRef(Date.now());
  const [iconScale, setIconScale] = useState(1);

  useEffect(() => {
    const iv = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current + phaseOffsetMs;
      const cyclePos = elapsed % ICON_CYCLE_MS;

      let next = 1;
      if (cyclePos < ICON_BUMP_MS) {
        const t = cyclePos / ICON_BUMP_MS;
        next = 1 + ICON_AMPLITUDE * Math.sin(t * Math.PI);
      }
      setIconScale((prev) =>
        Math.abs(prev - next) > 0.002 ? next : prev,
      );
    }, TICK_MS);
    return () => clearInterval(iv);
  }, [phaseOffsetMs]);

  // 핫 핀 툴팁 — 가끔 떴다 사라짐 (mount/unmount로 토글)
  const [tooltipVisible, setTooltipVisible] = useState(false);
  useEffect(() => {
    if (!isHot) {
      setTooltipVisible(false);
      return;
    }
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    const show = () => {
      setTooltipVisible(true);
      hideTimer = setTimeout(
        () => setTooltipVisible(false),
        TOOLTIP_VISIBLE_MS,
      );
    };
    const initTimer = setTimeout(show, TOOLTIP_INITIAL_DELAY_MS);
    const iv = setInterval(
      show,
      TOOLTIP_VISIBLE_MS + TOOLTIP_HIDDEN_MS,
    );
    return () => {
      clearTimeout(initTimer);
      if (hideTimer) clearTimeout(hideTimer);
      clearInterval(iv);
    };
  }, [isHot]);

  // 본체 마커 — 정지된 width/height
  const bodyW = PIN_SIZE + SLOT_PAD;
  const bodyH = PIN_HEIGHT + SLOT_PAD;

  // 아이콘 마커 — 본체와 같은 layout 위에서 scale만 변동
  const iconW = bodyW * iconScale;
  const iconH = bodyH * iconScale;

  return (
    <>
      {/* 본체 layer — 정지 */}
      <NaverMapMarkerOverlay
        latitude={worry.lat!}
        longitude={worry.lng!}
        width={bodyW}
        height={bodyH}
        anchor={{ x: 0.5, y: 1 }}
        zIndex={1}
        onTap={onPress}
      >
        <View
          key={`body-${worry.id}-${worry.replyCount}-${worry.isMine}-${isHot ? 1 : 0}`}
          collapsable={false}
          style={styles.markerSlot}
        >
          <PinBody
            replyCount={worry.replyCount}
            isMine={worry.isMine}
            isHot={isHot}
            size={PIN_SIZE}
          />
        </View>
      </NaverMapMarkerOverlay>

      {/* 아이콘 layer — 봉투만 scale 변동 */}
      <NaverMapMarkerOverlay
        latitude={worry.lat!}
        longitude={worry.lng!}
        width={iconW}
        height={iconH}
        anchor={{ x: 0.5, y: 1 }}
        zIndex={2}
        onTap={onPress}
      >
        <View
          key={`icon-${worry.id}-${worry.isMine}`}
          collapsable={false}
          style={styles.markerSlot}
        >
          <PinIcon isMine={worry.isMine} size={PIN_SIZE} />
        </View>
      </NaverMapMarkerOverlay>

      {/* 핫 핀 툴팁 — conditional render로 가끔 등장 */}
      {isHot && tooltipVisible && (
        <NaverMapMarkerOverlay
          latitude={worry.lat!}
          longitude={worry.lng!}
          width={TOOLTIP_W}
          height={TOOLTIP_TOTAL_H}
          anchor={{ x: 0.5, y: 1 }}
          zIndex={5}
        >
          <View
            key={`tooltip-${worry.id}`}
            collapsable={false}
            style={styles.tooltipWrap}
          >
            <Text style={styles.tooltipBubble} allowFontScaling={false}>
              🔥 가장 핫한 고민
            </Text>
            <View style={styles.tooltipTail} />
          </View>
        </NaverMapMarkerOverlay>
      )}
    </>
  );
};

/**
 * 가장 답장이 많은 worry id 추출 — 동률이면 첫 번째.
 * replyCount가 모두 0이면 null.
 */
const findHotId = (worries: Worry[]): string | null => {
  let hot: Worry | null = null;
  for (const w of worries) {
    if (w.replyCount > 0 && (!hot || w.replyCount > hot.replyCount)) {
      hot = w;
    }
  }
  return hot?.id ?? null;
};

/**
 * worry가 region(viewport) 안에 있는지 체크.
 * Region: south-west 점(latitude/longitude) + north-east까지의 delta.
 */
type ViewRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const isInRegion = (region: ViewRegion, lat: number, lng: number) =>
  lat >= region.latitude &&
  lat <= region.latitude + region.latitudeDelta &&
  lng >= region.longitude &&
  lng <= region.longitude + region.longitudeDelta;

export type WorryMapHandle = {
  /** 특정 좌표로 카메라 이동 */
  animateTo: (lat: number, lng: number, zoom?: number) => void;
  /** 현위치 오버레이(파란 점) 모드 변경 — 'NoFollow'면 점만 표시, 'None'이면 끔 */
  setLocationTracking: (mode: "None" | "NoFollow" | "Follow") => void;
};

export const WorryMap = forwardRef<WorryMapHandle, Props>(
  ({ worries, onPinPress, onVisibleCountChange }, ref) => {
  // 현재 viewport region — 카메라 멈출 때마다 갱신
  const [region, setRegion] = useState<ViewRegion | null>(null);
  const mapRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    animateTo: (lat, lng, zoom) => {
      mapRef.current?.animateCameraTo?.({
        latitude: lat,
        longitude: lng,
        zoom: zoom ?? 17,
        duration: 600,
      });
    },
    setLocationTracking: (mode) => {
      mapRef.current?.setLocationTrackingMode?.(mode);
    },
  }));

  // viewport 안에 보이는 worries — region이 아직 없으면 전체로 폴백
  const visibleWorries = useMemo(() => {
    if (!region) return worries;
    return worries.filter(
      (w) =>
        w.lat != null &&
        w.lng != null &&
        isInRegion(region, w.lat, w.lng),
    );
  }, [region, worries]);

  // 보이는 worry 수가 바뀔 때마다 부모에게 알림
  useEffect(() => {
    onVisibleCountChange?.(visibleWorries.length);
  }, [visibleWorries.length, onVisibleCountChange]);

  // hot pin도 viewport 안에서 결정
  const hotId = useMemo(() => findHotId(visibleWorries), [visibleWorries]);

  // 네이버 지도 사용 가능 → 실제 지도 렌더
  if (NaverMapView && NaverMapMarkerOverlay) {
    return (
      <NaverMapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialCamera={{
          latitude: DEMO_CENTER.lat,
          longitude: DEMO_CENTER.lng,
          zoom: 17,
        }}
        isShowLocationButton={false}
        isShowZoomControls={false}
        isShowCompass={false}
        isShowScaleBar={false}
        onCameraIdle={(params: any) => setRegion(params.region)}
      >
        {worries
          .filter((w) => w.lat != null && w.lng != null)
          .map((w) => (
            <AnimatedNaverMarker
              key={w.id}
              worry={w}
              isHot={w.id === hotId}
              onPress={() => onPinPress(w.id)}
            />
          ))}
      </NaverMapView>
    );
  }

  // 폴백 placeholder
  return (
    <View style={styles.placeholderLayer}>
      {worries.map((w, i) => (
        <MapPin
          key={w.id}
          x={w.x}
          y={w.y}
          replyCount={w.replyCount}
          isMine={w.isMine}
          isHot={w.id === hotId}
          delay={i * 220}
          onPress={() => onPinPress(w.id)}
        />
      ))}
    </View>
  );
  },
);
WorryMap.displayName = "WorryMap";

const styles = StyleSheet.create({
  placeholderLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#EAEEF2",
  },
  markerSlot: {
    width: PIN_SIZE + SLOT_PAD,
    height: PIN_HEIGHT + SLOT_PAD,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  // 핫 핀 툴팁
  tooltipWrap: {
    width: TOOLTIP_W,
    height: TOOLTIP_TOTAL_H,
    alignItems: "center",
    // 위쪽엔 툴팁, 아래엔 핀 공간(빈 영역)
  },
  tooltipBubble: {
    backgroundColor: colors.navy,
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.full,
    overflow: "hidden",
    ...shadow.lifted,
  },
  tooltipTail: {
    width: TOOLTIP_TAIL,
    height: TOOLTIP_TAIL,
    backgroundColor: colors.navy,
    transform: [{ rotate: "45deg" }],
    marginTop: -TOOLTIP_TAIL / 2,
  },
});
