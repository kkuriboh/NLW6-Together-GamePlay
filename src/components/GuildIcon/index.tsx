import React from "react"
import { Image } from "react-native"

import { styles } from './styles'


export function GuildIcon() {
    const uri = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2FLogos%2Fdiscord_logo1600.png&f=1&nofb=1'
    return (
        <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="cover"
        />
    )
}