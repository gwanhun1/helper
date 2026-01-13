import React, { useEffect, useRef } from "react";
import { StyleSheet, BackHandler, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const WEB_URL = "https://worryhelper.shop/";

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (Platform.OS === "android") {
      const onBackPress = () => {
        if (webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        // 웹뷰 성능 및 기능을 위한 기본 설정들
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});
