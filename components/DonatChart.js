import React, { useEffect, useState, useRef } from 'react'
import { View, Animated, Dimensions, StyleSheet } from 'react-native'
import { Text } from './Themed'
import { Svg, G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const width = Dimensions.get('window').width

export default function DonatChart(props) {
    const {

        radius = width / 6,
        strokeWidth = 3,
        duration = 300,
        delay = 0,
        color = "tomato",
        max = 100,
        percentage = 0,
        react
    } = props
    const animatedValue = useRef(new Animated.Value(0)).current
    const circleRef = useRef()
    const halfCircle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius

    const animation = (toValue) => {
        return Animated.timing(animatedValue, {
            toValue,
            delay,
            duration,
            useNativeDriver: true
        }).start(() => {
            //animation(toValue === 0 ? percentage : 0)
        })
    }

    useEffect(() => {
        animation(percentage)

        animatedValue.addListener(v => {
            if (circleRef?.current) {
                const maxPerc = 100 * v.value / max
                const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100
                circleRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        })
        return () => {
            animatedValue.removeAllListeners()
        }
    }, [max, percentage])
    return (
        <View>
            <Svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        strokeOpacity={0.2}
                        fill="transparent"
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                    />
                </G>
            </Svg>
            <View style={StyleSheet.absoluteFillObject}>
                {props.children}
            </View>
        </View>
    )
}
