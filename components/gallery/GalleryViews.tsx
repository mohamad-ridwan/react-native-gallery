import React, { useCallback, useRef } from 'react';
import {
    stackTransition,
    Gallery,
    type GalleryType,
} from 'react-native-zoom-toolkit';

import GalleryImage from './GalleryImage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const images = [
    'https://kutyaknak.hu/shop_ordered/73803/pic/gsp.jpg',
    'https://cdn.britannica.com/02/132502-050-F4667944/macaw.jpg',
    'https://assets-global.website-files.com/63634f4a7b868a399577cf37/64665685a870fadf4bb171c2_labrador%20americano.jpg',
    'https://i0.wp.com/bcc-newspack.s3.amazonaws.com/uploads/2023/05/052323-Foxes-in-Millennium-Park-Colin-Boyle-9124.jpg?fit=1650%2C1099&ssl=1',
];

const GalleryExample = () => {
    const ref = useRef<GalleryType>(null);

    // Remember to memoize your callbacks properly to keep a decent performance
    const renderItem = useCallback((item: string, index: number) => {
        return <GalleryImage uri={item} index={index} />;
    }, []);

    const keyExtractor = useCallback((item: string, index: number) => {
        return `${item}-${index}`;
    }, []);

    const onTap = useCallback((_: any, index: number) => {
        console.log(`Tapped on index ${index}`);
    }, []);

    const transition = useCallback(stackTransition, []);

    return (
        <GestureHandlerRootView style={{
            flex: 1,
        }}>
            <Gallery
                ref={ref}
                data={images}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onTap={onTap}
                customTransition={transition}
                tapOnEdgeToItem={false}
            />
        </GestureHandlerRootView>
    );
};

export default GalleryExample;