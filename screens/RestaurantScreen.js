import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Platform, NativeModules } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { StarIcon, MapPinIcon, XMarkIcon } from 'react-native-heroicons/solid';
import DishCard from '../components/DishCard';
import { useSelector } from 'react-redux';
import BasketView from '../components/BasketView';
import SelectedItem from '../components/SelectedItem';
const { StatusBarManager } = NativeModules;


function RestaurantScreen() {
    const navigation = useNavigation()

    const { params: {
        imageUrl,
        title,
        rating,
        category,
        location,
        description,
        address
    } } = useRoute()

    // Hiding header of React Navigation
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const takeMeBack = () => {
        navigation.goBack()
    }

    const dishesList = [
        { name: "Seseme Ramen", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", price: "240", image: 'https://bityl.co/IgSU', id: "1" },
        { name: "Chicken Wings", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", price: "420", image: 'https://bityl.co/IgSs', id: "2" },
        { name: "Chicken Burger", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", price: "175", image: 'https://bityl.co/IgSx', id: "3" },
        { name: "Wrap", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", price: "225", image: 'https://bityl.co/IgT3', id: "4" },
    ]

    const selectedItems = useSelector(store => store.basket.items)



    return (
        <SafeAreaView
            // style={{
            //     paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
            // }}
            className="bg-gray-200 w-[100vw] h-[100vh] relative items-center">
            <StatusBar style='light' hidden={false} />

            <ScrollView className='w-full'>
                <View className="bg-white h-[400px]">
                    <View className="h-[55%] relative">
                        <Image className="object-contain h-full w-full" source={{ uri: imageUrl }} />
                        <TouchableOpacity className="absolute h-[30px] w-[30px] bg-white rounded-full top-8 left-4 justify-center items-center" onPress={takeMeBack}>
                            <ArrowLeftIcon color="teal" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View className="h-[45%] box-border p-4 justify-between">
                        <Text className=" font-bold text-2xl">{title}</Text>

                        <View className="flex-row space-x-1">
                            <View className="flex-row space-x-1">
                                <StarIcon size={20} color="lightgray" />
                                <Text className={rating >= 4 ? "text-green-500" : "text-orange-500"}>{rating}</Text>
                                <Text className="text-gray-400">.</Text>
                                <Text className="text-gray-400">{category}</Text>
                            </View>
                            <View className="flex-row space-x-1">
                                <MapPinIcon size={20} color="lightgray" />
                                <Text className="text-gray-400">{`${location} . ${address}`}</Text>
                            </View>
                        </View>

                        <Text className="text-gray-400">{description}</Text>
                    </View>
                </View>

                <View>
                    <Text className="font-bold text-lg p-4">Menu</Text>
                    {
                        dishesList.map(dish => {
                            return (
                                <DishCard dish={dish} key={dish.id} selectedItems={selectedItems} />
                            )
                        })
                    }
                </View>

                <View className="h-[68px]"></View>
            </ScrollView>

            <BasketView />

            <SelectedItem />
        </SafeAreaView>
    )
}

export default RestaurantScreen