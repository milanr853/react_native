import React, { useEffect, useState } from 'react'
import { Image, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch } from 'react-redux'
import { incrementItem, decrementItem } from '../redux/basketSlice'

function DishCard({ dish: { name, description, price, image, id }, selectedItems }) {
    const [itemCount, setItemCount] = useState(0)

    useEffect(() => {
        const item = selectedItems.find(obj => obj.id === id)
        if (item) setItemCount(item.totalCount)
        else setItemCount(0)
    }, [selectedItems])

    const dispatch = useDispatch()

    const AddToCart = (dish) => {
        dispatch(incrementItem(dish))
    }

    const RemoveFromCart = (dish) => {
        dispatch(decrementItem(dish))
    }



    return (
        <View className="bg-white p-4 mb-2 space-y-4">
            <View className="flex-row">
                <View className="flex-1 space-y-2">
                    <Text className="text-lg">{name}</Text>
                    <Text className="text-gray-400">{description}</Text>
                    <Text className="text-gray-400">Rs. {price}</Text>
                </View>
                <View >
                    <Image className="w-[100px] h-[100px]" source={{ uri: image }} />
                </View>
            </View>

            <View className="flex-row space-x-4 items-center">
                <TouchableOpacity disabled={!itemCount} onPress={() => { if (itemCount > 0) RemoveFromCart({ id }) }}>
                    <MinusCircleIcon color="teal" size={40} />
                </TouchableOpacity>

                <Text>{itemCount}</Text>

                <TouchableOpacity onPress={() => { AddToCart({ name, description, price, image, totalCount: 1, id }) }}>
                    <PlusCircleIcon color="teal" size={40} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DishCard