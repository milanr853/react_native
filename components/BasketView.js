import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../redux/modalViewSlice'

function BasketView() {
    const dispatch = useDispatch()

    // const [dynamicStyles, setDynamicStyles] = useState(null);

    const selectedItems = useSelector(store => store.basket.items)

    const openBasketModal = () => {
        dispatch(showModal())
    }


    return (
        <>
            {selectedItems.length ?
                <TouchableOpacity activeOpacity={1} onPress={openBasketModal} className="absolute w-[92%] rounded-md bottom-2 bg-teal-500 h-[60px] items-center flex-row justify-between px-4">
                    <View className="px-3 py-2 rounded-md bg-teal-700">
                        <Text className="font-bold text-white">{
                            selectedItems.reduce((acc, obj) => {
                                const { totalCount } = obj
                                acc += parseInt(totalCount)
                                return acc
                            }, 0)
                        }</Text>
                    </View>
                    <Text className="font-bold text-white text-lg">View Basket</Text>
                    <Text className="text-white font-bold">Rs. {
                        selectedItems.reduce((acc, obj) => {
                            const { totalCount, price } = obj
                            acc += parseInt(totalCount) * parseInt(price)
                            return acc
                        }, 0)
                    }</Text>
                </TouchableOpacity>
                : <></>}
        </>
    )
}



export default BasketView