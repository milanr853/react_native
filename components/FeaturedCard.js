import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';


function FeaturedCard({ imageUrl, title, rating, category, location, description, address }) {
    const navigation = useNavigation()

    const navigateToRestaurantScreen = () => {
        navigation.navigate("Restaurant", {
            imageUrl,
            title,
            rating,
            category,
            location,
            description,
            address
        })
    }


    return (
        <TouchableOpacity className={`bg-white h-[220px] w-[225px] rounded-md mr-4 relative shadow-sm shadow-black`}
            onPress={navigateToRestaurantScreen}
        >
            <View className="h-[60%]">
                <Image className="h-full object-contain rounded-t-md" source={{ uri: imageUrl }} alt="featured" />
            </View>
            <View className="h-[40%] p-2 ">
                <Text className="font-bold text-lg">{title}</Text>
                <View className="flex-row space-x-1">
                    <StarIcon size={20} color="lightgray" />
                    <Text className={rating >= 4 ? "text-green-500" : "text-orange-500"}>{rating}</Text>
                    <Text className="text-gray-400">{category}</Text>
                </View>
                <View className="flex-row space-x-1">
                    <MapPinIcon size={20} color="lightgray" />
                    <Text className="text-gray-400">{location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default FeaturedCard