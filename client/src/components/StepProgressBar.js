import * as React from 'react'
import { Text, View, StyleSheet } from "react-native";
import Color from '../utils/Color';

function StepperComp({ steps, distance_time }) {
    const [activeStep, setActiveStep] = React.useState(0);

    return (
        <View style={style.stepperContainer}>
            {steps.map((step, index) => {
              return (
                <View key={index} style={style.stepper}>
                  <Text>{index + 1}</Text>
                  <Text  style={style.stopText}>{step.name}</Text>
                    {distance_time && index < distance_time.length && (
                      <View style={style.stepperDetail} >
                          <Text
                    style={style.stepperText}>{(distance_time[index]?.distance / 1000).toFixed(2)
                        } Km</Text>
                        <Text
                        style={style.stepperText}>{Math.floor(distance_time[index]?.duration / 60)
                        } min</Text>
                      </View>
                    )}
                    </View>
                )
            })}
            <View style={style.stepperBar} />
        </View>
    )
}

export default StepperComp

const style = StyleSheet.create({
  stepperContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: 5,
    height: '100%',
  },
  stepperBar: {
    width: 2,
    height: '100%',
    transform: [{rotate: '180deg'}, {translateX: 50}],
    zIndex: 1,
    position: 'absolute',
    left:64,
    borderRadius: 50,
    backgroundColor: Color.bold, 
  },
  stepper: {
    height: 30,
    width: 30,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: Color.white,
    borderRadius: 50,
    borderColor: Color.bold,
    borderWidth: 2
  },
  stepperDetail: {
  position: 'absolute',
    display: 'flex',
    left: 20,
    top:40,
  },
  stepperText: {
    width: 120,
    color: Color.white,
  },
  stopText: {
    color: Color.white,
    width: 100,
    left: 40,
    position: 'absolute',
}
})