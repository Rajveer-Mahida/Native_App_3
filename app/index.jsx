import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../components/SafeView'

const index = () => {
  return (
    <SafeView>
      <Text style={{fontSize: 20,padding: 20}}>index</Text>
    </SafeView>
  )
}

export default index

const styles = StyleSheet.create({})