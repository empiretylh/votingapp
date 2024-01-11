import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';
import axios from 'axios';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const LazyImage = ({ url }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const response = await axios.get(axios.defaults.baseURL + url);
                setImage(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        loadImage();
    }, [url]);

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: windowWidth - 20, height: 250, borderRadius: 25 }}
                        resizeMode={'cover'}
                    />
                )
            )}
        </View>
    );
};

export default LazyImage;