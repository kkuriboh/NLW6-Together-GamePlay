import React, { useState } from 'react'
import { Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ModalView } from '../../components/ModalView'
import { CategorySelect } from '../../components/CategorySelect'
import { Header } from '../../components/Header'
import { theme } from '../../global/themes'
import { styles } from './styles'
import { GuildIcon } from '../../components/GuildIcon'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Guilds } from '../Guilds'
import { GuildProps } from '../../components/Guild'
import { Background } from '../../components/Background'
import { collection_appointments } from '../../Config/database'
import { useNavigation } from '@react-navigation/native'

export function AppointmentCreate() {
    const [category, setCategory] = useState('')
    const [openGuildsModal, setOpenGuildsModal] = useState(false)
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [description, setDescription] = useState('')

    const navigation = useNavigation()

    function handleOpenGuilds() {
        setOpenGuildsModal(true)
    }
    function handleGuildSelect(guildSelect: GuildProps) {
        setGuild(guildSelect)
        setOpenGuildsModal(false)
    }
    function handleCloseGuilds() {
        setOpenGuildsModal(false)
    }
    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory("") : setCategory(categoryId)
    }

    async function handleSave() {
        const newAppoinment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        }
        const storage = await AsyncStorage.getItem(collection_appointments)
        const appointments = storage ? JSON.parse(storage) : []

        await AsyncStorage.setItem(
            collection_appointments,
            JSON.stringify([...appointments, newAppoinment])
        )
        navigation.navigate('Home')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Header
                title='Agendar partida'
            />
            <Background>
                <ScrollView>

                    <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
                        Categoria
                    </Text>

                    <CategorySelect hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />
                                }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um servidor'}
                                    </Text>
                                </View>
                                <Feather name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>
                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e mês
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Horário
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.field, { marginBottom: 12, alignContent: 'center' }]}>
                        <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
                            Descrição
                        </Text>
                        <Text style={styles.limit}>
                            Max 100 caracteres
                        </Text>
                    </View>
                    <View style={styles.ta}>
                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                        <View style={styles.footer}>
                            <Button title="Agendar"
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                    <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                        <Guilds handleGuildSelect={handleGuildSelect} />
                    </ModalView>
                </ScrollView >
            </Background>
        </KeyboardAvoidingView>
    )
}