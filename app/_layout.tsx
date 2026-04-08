import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
       <Stack.Screen name="weatherscreen" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
} 


// import { Ionicons } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// const API_Key = '53036a77e02765a04977a0883e474078'
// const index = () => { 
//   const [city,setcity] = useState('') 
//   const [weather,setweather] = useState(null)
//   console.log("weather",weather)  
//   const [filteredCities, setFilteredCities] = useState([]);  
//  const weatherIcon = (condition:any) => {
//   switch(condition) {
//     case 'Clear':
//       return 'sunny';     
//     case 'Clouds':
//       return 'cloud';       
//     case 'Rain':
//       return 'rainy';      
//     case 'Thunderstorm':
//       return 'thunderstorm';
//     case 'Snow':
//       return 'snow';
//     default:
//       return 'partly-sunny';
//   }
// }; 
// const Iconcolor = (condition:any) => {
//   switch(condition) {
//     case 'Clear':
//       return 'orange';     
//     case 'Clouds':
//       return 'gray';       
//     case 'Rain':
//       return '#3478f5';      
//     case 'Thunderstorm':
//       return '#1c45fa';
//     case 'Snow':
//       return '#D3D3D3';
//     default:
//       return '#FFD54F';
//   }
// }; 
// const handleSearch = (text:any) => {
//   setcity(text);          
//   getCities(text);  
// };
// const getweather = (city:string) => {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`) 
//   .then(res => res.json()) 
//   .then(data => { 
//       console.log(data.weather);
//     if(data.cod!== 200){
//       Alert.alert('city not found');
//       setweather(null);
//     } else {
//       setweather(data); 
//       setcity('') 
//                 setFilteredCities([]);     
//     } 
//   })
//   .catch(err => Alert.alert('Network Error')) 
// } 
// const getCities = async (text) => {
//   if (text.length < 2) {
//     setFilteredCities([]);
//     return;
//   }
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${API_Key}`
//     );
//     const data = await response.json();
//     setFilteredCities(data); 
//   } catch (error) {
//     console.log(error);
//     Alert.alert('Error', 'Could not fetch city suggestions');
//   }
// };
//   return (
//     <View style={{flex:1}}>
//     <ImageBackground
//     source={require('../assets/images/cloudy.png')} 
//     style={{width:'100%',height:'100%'}}
//     > 
//     <View  style={{marginTop:hp('8'),position:'relative', alignSelf:'center'}}> 
//       <Text style={styles.text}>Search city name</Text> 
//       <View style={{flexDirection:'row',alignItems:'center'}}>
//       <TextInput 
//       style={styles.input}
//       placeholder='search'
//       value={city}
//       onChangeText={handleSearch}
//       /> 
//       <TouchableOpacity style={styles.icon} onPress={()=>getweather(city)} >
//       <Ionicons   name='search-outline' color={'black'} size={22}/> 
//       </TouchableOpacity>
//       </View> 
//        {filteredCities.length > 0 && (
//   <View style={{
//     backgroundColor: '#dad0d0d2',
//     width: wp('70'),
//     borderRadius: 10,
//     marginTop: hp('1')
//   }}>
//     {filteredCities.map((item, index) => (
//       <TouchableOpacity
//         key={index}
//         onPress={() => {
//           getweather(item?.name)
//           setcity(item?.name);          
//           setFilteredCities([]);    
//         }}
//       >
//         <Text style={{ padding: 10 }}>
//           {item.name}, {item.country}
//         </Text>
//       </TouchableOpacity>
//     ))}
//   </View>
// )}
//     </View> 
//     {weather &&(
//       <View style={{marginTop:hp('4'),alignItems:'center'}}> 
//        <Ionicons
//   name={weatherIcon(weather?.weather[0]?.main)}
//   size={60}
//   color={Iconcolor(weather?.weather[0]?.main)}
// />
//         <Text style={styles.weathertext}> city: {weather.name}, {weather.sys.country}</Text> 
//          <Text style={styles.weathertext}>{weather.weather[0].description}</Text> 
//           <Text style={styles.weathertext}>Temp: {weather.main.temp}°C</Text> 
//            <Text style={styles.weathertext}> Humidity: {weather.main.humidity}</Text> 
//             <Text style={styles.weathertext}> Wind: {weather.wind.speed}</Text>
//       </View>
//     )}
//      </ImageBackground>
//     </View> 
  
//   )
// }

// export default index 
// const styles = StyleSheet.create({
//   input:{
//     width:wp('70'), 
//     height:hp('5.5'), 
//     borderRadius:19, 
//     borderWidth:2,
//     marginTop:hp('2'),
//     borderColor:'#615f5f'
//   },
//   text:{
//     textAlign:'center',
//     justifyContent:'center',
//     fontSize:hp('3'),
//     fontWeight:'600'
//   },
//   icon:{
//   position:'absolute', 
//   marginLeft:wp('61'),
//   marginTop:hp('2')

//   },
//   weathertext:{
//     fontSize: hp('3'),
//     fontWeight: '500',
//     color: '#000'
//   }
// })
