import { StyleSheet } from "react-native"
import { getBottomSpace } from "react-native-iphone-x-helper"
import { theme } from "../../global/themes"

export const styles = StyleSheet.create({
    container: {
        width: 48,
        height: 48,
        backgroundColor: theme.colors.line,
        color: theme.colors.heading,
        borderRadius: 8,
        fontFamily: theme.fonts.text400,
        marginRight: 4,
        textAlign: 'center',
        borderColor: theme.colors.secondary70,
        borderWidth: 1
    },
})