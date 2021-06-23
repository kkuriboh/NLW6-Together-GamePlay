import React, { useState } from 'react'
import { FlatList, View } from 'react-native'

import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { Profile } from '../../components/Profile'
import { ListHeader } from '../../components/ListHeader'
import { Appointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'

export function Home() {
    const [category, setCategory] = useState('')

    const appointments = [{
        id: '1',
        guild: {
            id: '1',
            name: 'Macaco ajato',
            icon: null,
            owner: true
        },
        category: '1',
        date: '22/06 às 20:40h',
        description: 'Comi bnana'
    },
    {
        id: '2',
        guild: {
            id: '5',
            name: 'Trabalhadores',
            icon: null,
            owner: true
        },
        category: '1',
        date: '07/08 às 21:00h',
        description: 'Comi bnana'
    },
    {
        id: '3',
        guild: {
            id: '9',
            name: 'Miguezeiros',
            icon: null,
            owner: true
        },
        category: '1',
        date: '26/12 às 19:30h',
        description: 'Comi bnana'
    }]

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory("") : setCategory(categoryId)
    }

    return (
        <View>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
            </View>
            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />
            <View style={styles.content}>
                <ListHeader title='Partidas agendadas'
                    subtitle='Total 6'
                />
                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Appointment data={item} />
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}