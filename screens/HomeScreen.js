import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AdjustmentsVerticalIcon, ArrowRightIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon } from "react-native-heroicons/outline";
import CategoryCard from '../components/CategoryCard';
import FeaturedCard from '../components/FeaturedCard';

import { Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;


function HomeScreen() {
    const navigation = useNavigation()

    const [searchText, setSearchText] = useState("")

    // Hiding header of React Navigation
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const categoriesList = [
        { id: "1", imageUrl: 'https://bityl.co/Ifk9', title: 'South Indian' },
        { id: "2", imageUrl: 'https://bityl.co/Ifk9', title: 'Pizzas' },
        { id: "3", imageUrl: 'https://bityl.co/Ifk9', title: 'Non veg' },
        { id: "4", imageUrl: 'https://bityl.co/Ifk9', title: 'Dessert' },
        { id: "5", imageUrl: 'https://bityl.co/Ifk9', title: 'Noodles' },
        { id: "6", imageUrl: 'https://bityl.co/Ifk9', title: 'Drinks' },
    ];

    const featuredList = [
        { id: "1", imageUrl: 'https://bityl.co/IgJ9', title: 'KFC', rating: 4.5, category: 'Non Veg', location: '3 km', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tortor nibh, eget egestas arcu ornare sit amet. Phasellus quis massa vel lorem vestibulum porttitor.', address: "Jaydev Vihar" },

        { id: "2", imageUrl: 'https://bityl.co/IgJH', title: 'Burger King', rating: 4, category: 'Burger', location: '2.2 km', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tortor nibh, eget egestas arcu ornare sit amet. Phasellus quis massa vel lorem vestibulum porttitor.', address: "Dn Regalia" },

        { id: "3", imageUrl: 'https://bityl.co/Ifm2', title: 'Rajbhog', rating: 3.7, category: 'South Indian', location: 'Near by', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tortor nibh, eget egestas arcu ornare sit amet. Phasellus quis massa vel lorem vestibulum porttitor.', address: "Khandagiri" },

        { id: "4", imageUrl: 'https://bityl.co/Ifm5', title: 'Subway', rating: 4.4, category: 'Offer', location: '4 km', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tortor nibh, eget egestas arcu ornare sit amet. Phasellus quis massa vel lorem vestibulum porttitor.', address: "Satya Nagar" },

        { id: "5", imageUrl: 'https://bityl.co/IgJz', title: 'Baskin Robins', rating: 4, category: 'Dessert', location: 'Near by', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tortor nibh, eget egestas arcu ornare sit amet. Phasellus quis massa vel lorem vestibulum porttitor.', address: 'Patrapada' },

        { id: "6", imageUrl: 'https://bityl.co/IgJe', title: 'Keventers', rating: 3.4, category: 'Drinks', location: 'Near by', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam interdum tortor nibh, eget egestas arcu ornare sit amet. Phasellus quis massa vel lorem vestibulum porttitor.', address: 'Patrapada' },
    ]


    return (
        /* 
        To prevent our content from overlapping with the notch on an Android device.
        The SafeAreaView component should be used as the root component of your screen instead of View.
        To prevent our content from overlapping with the notch on an Android device, 
        we should modify our snippet and add a paddingTop to the SafeAreaView
        */

        <SafeAreaView
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
            }}
            className="bg-gray-200 w-[100vw] h-[100vh] ">
            <StatusBar style='auto' hidden={false} />

            {/* Header section */}
            <View className="bg-white box-border p-4 relative">
                <View className="flex-row items-center justify-between space-x-2 ">

                    <View className='flex-row items-center space-x-4'>
                        <View className='h-[35px] w-[35px] bg-slate-900 rounded-full flex justify-center items-center'>
                            <Text className="font-semibold text-2xl text-teal-600">Go</Text>
                        </View>
                        <View className='space-y-1'>
                            <Text className="text-gray-400">Deliver Now</Text>
                            <View className="flex-row items-center space-x-1">
                                <Text className='font-bold text-lg'>
                                    Current Location
                                </Text>
                                < ChevronDownIcon size={20} color='black' />
                            </View>
                        </View>
                    </View>

                    <View className='h-[35px] w-[35px] bg-slate-900 rounded-full flex justify-center items-center'>
                        <UserIcon size={24} color='white' />
                    </View>
                </View>

                <View className="flex-row space-x-2 items-center mt-4">
                    <View className="flex-1 flex-row items-center space-x-1 px-2 bg-slate-200">
                        <MagnifyingGlassIcon size={20} color='gray' />
                        <TextInput
                            className="flex-1 text-gray-400"
                            style={styles.input}
                            onChangeText={() => { }}
                            placeholder='Resturants and cusines'
                            value={searchText}
                        />
                    </View>
                    <AdjustmentsVerticalIcon size={24} color='teal' />
                </View>
            </View>

            {/* Body Section */}
            <ScrollView contentContainerStyle={{ paddingLeft: 16, paddingBottom: 32 }}>
                {/* Categories List Section */}
                <FlatList className="box-border relative"
                    data={categoriesList}
                    renderItem={({ item, index }) => <CategoryCard imageUrl={item.imageUrl} title={item.title} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    showsHorizontalScrollIndicator={false}
                />

                {/* Featured Row */}
                <View className="flex-row justify-between pr-4">
                    <View>
                        <Text className="font-bold text-xl">Featured</Text>
                        <Text className="text-gray-400">Lorem ipsum dores ipsat!!</Text>
                    </View>
                    <ArrowRightIcon size={20} color="teal" />
                </View>

                <FlatList className="box-border relative"
                    data={featuredList}
                    renderItem={({ item, index }) =>
                        <FeaturedCard imageUrl={item.imageUrl} title={item.title}
                            rating={item.rating} category={item.category} location={item.location} description={item.description} address={item.address} />}

                    keyExtractor={item => item.id}
                    horizontal={true}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    showsHorizontalScrollIndicator={false}
                />

                {/* Offers Row */}
                <View className="flex-row justify-between pr-4">
                    <View>
                        <Text className="font-bold text-xl">Offers Near To You</Text>
                        <Text className="text-gray-400">Lorem ipsum dores ipsat!!</Text>
                    </View>
                    <ArrowRightIcon size={20} color="teal" />
                </View>

                <FlatList className="box-border relative"
                    data={featuredList}
                    renderItem={({ item, index }) =>
                        <FeaturedCard imageUrl={item.imageUrl} title={item.title}
                            rating={item.rating} category={item.category} location={item.location} description={item.description} address={item.address} />}

                    keyExtractor={item => item.id}
                    horizontal={true}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        padding: 10,
    },
});


export default HomeScreen