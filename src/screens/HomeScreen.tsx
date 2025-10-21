import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { MenuItemType } from '../types/Types';
import MenuItem from '../components/MenuItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Image } from 'react-native';







type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  menuItems: MenuItemType[];
};

const HomeScreen: React.FC<Props> = ({ navigation, menuItems }) => {
  const courses = ['Starters', 'Mains', 'Desserts'];

  

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpg.png')} style={styles.logo} />

      <Text style={styles.header}>Chef Christoffel's Menu</Text>
      
      
      <Button title="Chef Admin" onPress={() => navigation.navigate('Chef')} />

      {courses.map(course => (
        <View key={course}>
          <Text style={styles.courseHeader}>{course} </Text>
          <FlatList
            data={menuItems.filter(item => item.course === course)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MenuItem item={item} />}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  courseHeader: { fontSize: 18, marginTop: 15, fontWeight: '600' },
  logo: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  alignSelf: 'flex-start',
 
},

});

export default HomeScreen;
