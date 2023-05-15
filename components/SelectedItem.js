import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../redux/modalViewSlice'
import { clearList, removeItem } from '../redux/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native';

function SelectedItem() {
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const [orderPlaced, setOrderPlaced] = useState(false)

    const selectedItems = useSelector(store => store.basket.items)

    const totalDisplayPrice = selectedItems.reduce((acc, obj) => {
        const { totalCount, price } = obj
        acc += parseInt(totalCount) * parseInt(price)
        return acc
    }, 0)

    const closeBasketModal = () => {
        dispatch(hideModal())
    }

    const showModal = useSelector(store => store.modal.display)

    const removeItemFromList = (id) => {
        dispatch(removeItem(id))
    }

    const placeOrder = () => {
        dispatch(clearList())
        setOrderPlaced(true)
        setTimeout(() => {
            dispatch(hideModal())
            setOrderPlaced(false)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0, // Reset to the first screen in the stack
                    routes: [{ name: 'Home' }], // Replace the stack with the 'Home' screen
                })
            );
        }, 2000)
    }


    return (
        <>
            {
                showModal ?
                    <View className="absolute w-full h-full items-center justify-center" style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}>
                        {orderPlaced ?
                            <View className="w-[200px] h-[200px] bg-yellow-500 rounded-md justify-center items-center">
                                <Text className="text-lg text-gray-500">Order Placed</Text>
                            </View>
                            :
                            <View className="w-[90%] h-[90%] bg-white " >
                                <TouchableOpacity onPress={closeBasketModal} className="justify-end flex-row box-border p-2 border-b border-gray-200">
                                    <XMarkIcon size={40} color="black" />
                                </TouchableOpacity>
                                <ScrollView className="bg-gray-100 flex-1 box-border py-4">
                                    {selectedItems.length ?
                                        selectedItems.map(obj => {
                                            const { name, image, id, totalCount, price } = obj
                                            return (
                                                <View key={id} className="bg-white border-b border-gray-100 flex-row items-center justify-between box-border px-4 py-2">
                                                    <View className="flex-row items-center space-x-2">
                                                        <Text className="text-gray-400">{totalCount} X </Text>
                                                        <View className="h-[50px] w-[50px]">
                                                            <Image className="object-contain w-full h-full rounded-full" source={{
                                                                uri: image
                                                            }} />
                                                        </View>
                                                        <Text className="text-gray-400">{name}</Text>
                                                    </View>

                                                    <View className="flex-row space-x-4">
                                                        <Text className="text-gray-400">{totalCount * price}</Text>
                                                        <TouchableOpacity onPress={() => removeItemFromList(id)}>
                                                            <Text className="text-teal-500">Remove</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })
                                        :
                                        <View className="w-full justify-center items-center">
                                            <Text className="text-gray-400 text-xl">No item selected</Text>
                                        </View>}
                                </ScrollView>

                                <View className="bg-white w-full box-border p-4 space-y-2">
                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-400">Subtotal</Text>
                                        <Text className="text-gray-400">Rs. {
                                            totalDisplayPrice
                                        }</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="text-gray-400">Delivery Fee</Text>
                                        <Text className="text-gray-400">Rs. {
                                            Math.round(0.1 * totalDisplayPrice)
                                        }</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="font-bold">Order Total</Text>
                                        <Text className="font-bold">Rs. {Math.round(totalDisplayPrice + 0.1 * totalDisplayPrice)}</Text>
                                    </View>
                                    <View className="py-1"></View>
                                    <TouchableOpacity onPress={placeOrder} className="bg-teal-500 flex-row justify-center items-center py-2 rounded-md">
                                        <Text className="text-white text-lg">Place Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                    </View>
                    :
                    <></>
            }
        </>
    )
}

export default SelectedItem