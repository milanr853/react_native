import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';


function CategoryCard({ imageUrl, title, lengthData }) {
    return (
        <TouchableOpacity className={`bg-yellow-500 h-[100px] w-[100px] rounded-md mr-4 relative`}>
            <Text className="absolute z-10 text-white bottom-2 left-2 font-bold">{title}</Text>
            <Image className="w-full h-full object-contain rounded-md" source={{ uri: imageUrl }} alt="category" />
        </TouchableOpacity>
    )
}

export default CategoryCard