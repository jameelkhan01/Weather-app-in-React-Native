import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';

export default function index() {
    const router = useRouter();
    useEffect(()=>{
        setTimeout(()=>{
            router.replace('/weatherscreen')
        }, 3000);
    },[])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#f5ef91'}}>
      <Image  source={require('../assets/images/sun1.png')} 
      style={{width:'50%',height:'25%',borderRadius:30}}
      />
    </View>
  )
}
