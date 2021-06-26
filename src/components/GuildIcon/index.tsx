import React from "react"
import { Image, View } from "react-native"

import { styles } from './styles'

import DiscordSvg from '../../assets/discord.svg'

const { cdn_image } = process.env

type Props = {
    guildId: string
    iconId: string | null
}

export function GuildIcon({ guildId, iconId }: Props) {
    let x = ''
    if (iconId !== null) {
        x = iconId
    }
    const iconFileFormat = x.substring(0, 2) !== 'a_' ? ".png" : ".gif"
    const uri = `${cdn_image}/icons/${guildId}/${iconId}${iconFileFormat}`
    return (
        <View style={styles.container}>
            {
                iconId ?
                    <Image
                        source={{ uri }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    :
                    <DiscordSvg
                        height={40}
                        width={40}
                    />
            }
        </View>
    )
}