import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { getAspectRatioSize } from 'react-native-zoom-toolkit';

type GalleryImageProps = {
    uri: string;
    index: number;
};

const GalleryImage: React.FC<GalleryImageProps> = ({ uri, index }) => {
    const { width, height } = useWindowDimensions();
    const [resolution, setResolution] = useState<{
        width: number;
        height: number;
    }>({
        width: 1,
        height: 1,
    });

    const size = getAspectRatioSize({
        aspectRatio: resolution.width / resolution.height,
        width: height > width ? width : undefined,
        height: height > width ? undefined : height,
    });

    const tap = Gesture.Tap()
        .onStart(() => {
            Alert.alert('TAP TEXT')
        })
        .hitSlop({ top: 20, bottom: 20, left: 20, right: 20 })
        .runOnJS(true)

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <Image
                source={{ uri }}
                style={size}
                resizeMethod={'scale'}
                resizeMode={'cover'}
                onLoad={(e) => {
                    setResolution({
                        width: e.nativeEvent.source.width,
                        height: e.nativeEvent.source.height,
                    });
                }}
            />
            <GestureDetector gesture={tap}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        zIndex: 33,
                    }}
                    // onPress={() => { Alert.alert('press mes') }}
                >
                    <Text style={{ color: 'white' }}>CLICK ME</Text>
                </TouchableOpacity>
            </GestureDetector>
        </View>
    );
};

export default GalleryImage;