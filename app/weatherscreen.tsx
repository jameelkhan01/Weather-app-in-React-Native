import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const API_Key = '53036a77e02765a04977a0883e474078';

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const weatherIcon = (condition:any) => {
    switch (condition) {
      case 'Clear':
        return 'sunny';
      case 'Clouds':
        return 'cloud';
      case 'Rain':
        return 'rainy';
      case 'Thunderstorm':
        return 'thunderstorm';
      case 'Snow':
        return 'snow';
      default:
        return 'partly-sunny';
    }
  };
  const iconColor = (condition:any) => {
    switch (condition) {
      case 'Clear':
        return 'orange';
      case 'Clouds':
        return 'gray';
      case 'Rain':
        return '#3478f5';
      case 'Thunderstorm':
        return '#1c45fa';
      case 'Snow':
        return '#D3D3D3';
      default:
        return '#FFD54F';
    }
  };
  const getWeather = (cityName:any) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          Alert.alert('City not found');
          setWeather(null);
        } else {
          setWeather(data);
          setCity('');
          setFilteredCities([]);
        }
      })
      .catch(() => Alert.alert('Network Error'));
  };
  const handleSearch = (text:any) => {
    setCity(text);
    getCities(text);
  };

  const getCities = async (text:any) => {
    if (text.length < 2) {
      setFilteredCities([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${API_Key}`
      );
      const data = await res.json();
      setFilteredCities(data);
    } catch {
      Alert.alert('Error fetching cities');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/cloudy.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Search city name</Text>

          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              placeholder="Search ..."
              placeholderTextColor="#777"
              value={city}
              onChangeText={handleSearch}
            />

            <TouchableOpacity onPress={() => getWeather(city)}>
              <Ionicons name="search-outline" size={22} color="#000" />
            </TouchableOpacity>
          </View>
          {filteredCities.length > 0 && (
            <View style={styles.dropdown}>
              {filteredCities.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    getWeather(item?.name);
                    setCity(item?.name);
                    setFilteredCities([]);
                  }}
                >
                  <Text>
                    {item.name}, {item.country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {weather && (
          <View style={styles.card}>
            <Ionicons
              name={weatherIcon(weather?.weather[0]?.main)}
              size={70}
              color={iconColor(weather?.weather[0]?.main)}
            />

            <Text style={styles.city}>
              {weather.name}, {weather.sys.country}
            </Text>

            <Text style={styles.desc}>
              {weather.weather[0].description}
            </Text>

            <Text style={styles.temp}>
              {weather.main.temp}°C
            </Text>

            <View style={styles.row}>
              <Text>💧 {weather.main.humidity}%</Text>
              <Text>🌬 {weather.wind.speed}</Text>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default WeatherScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: hp('8'),
    alignItems: 'center',
  },

  heading: {
    fontSize: hp('3'),
    fontWeight: '700',
    color: '#000',
  },

  searchBox: { 
    marginTop:hp('3'),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('85'),
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: hp('6'),
    elevation: 5,
  },

  input: {
    flex: 1,
  },

  dropdown: {
    width: wp('85'),
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop:hp ('1'),
   elevation: 5,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },

  card: {
    marginTop: hp('8'),
    width: wp('85'),
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },

  city: {
    fontSize: hp('3'),
    fontWeight: '700',
    marginTop:hp('1'),
  },

  desc: {
    fontSize: hp('2'),
    color: '#555',
  },

  temp: {
    fontSize: hp('5'),
    fontWeight: 'bold',
    marginVertical: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
