import React from 'react'
import { Fontisto } from '@expo/vector-icons'
import { ImageBackground, Text, View, FlatList } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import { Background } from '../../components/Background'
import { ListHeader } from '../../components/ListHeader'
import { Header } from '../../components/Header'
import { theme } from '../../global/themes'
import BannerImg from '../../assets/banner.png'
import { styles } from './styles'
import { Member } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Augusto',
            avatar_url: 'https://github.com/kuribOwOh.png',
            status: 'onfline'
        },
        {
            id: '2',
            username: 'Fulano',
            avatar_url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhentaku.com%2Fwp-content%2Fuploads%2F2020%2F04%2FAlucard.png&f=1&nofb=1',
            status: 'online'
        },
    ]

    return (
        <Background>
            <Header
                title='Detalhes'
                action={
                    <BorderlessButton>
                        <Fontisto
                            name='share'
                            size={20}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />
            <ImageBackground source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>Macaco Ajato</Text>
                    <Text style={styles.subtitle}>SUCUMBA</Text>
                </View>
            </ImageBackground>
            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />
            <FlatList
                data={members}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Member data={item} />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                style={styles.members}
            />
            <View style={styles.footer}>
                <ButtonIcon title="Entrar na partida" />
            </View>
        </Background >
    )
}