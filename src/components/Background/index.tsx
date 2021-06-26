import React, { ReactNode } from "react"
import { LinearGradient } from "expo-linear-gradient"

import { styles } from "./styles"
import { theme } from "../../global/themes"

type Props = {
    children: ReactNode
}

export function Background({ children }: Props) {
    const { secondary40, secondary50 } = theme.colors

    return (
        <LinearGradient style={styles.container} colors={[secondary40, secondary50]}>
            {children}
        </LinearGradient>
    )
}