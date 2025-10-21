import React,{useState} from "react";
import{View,TextInput,Button,StyleSheet,Text,FlatList,Alert}from'react-native';
import{MenuItemType,Course}from '../types/Types'
import RNPickerSelect from 'react-native-picker-select'
import{v4 as uuidv4}from 'uuid'
import { Image } from 'react-native';

type Props ={
  menuItems:MenuItemType[];
  setMenuItems:React.Dispatch<React.SetStateAction<MenuItemType[]>>
}

const ChefScreen: React.FC<Props>=({menuItems,setMenuItems})=>{
  const[name,setName]=useState('');
  const[desc,setDesc]=useState('');
  const[price,setPrice]=useState('');
  const[course,setCourse]=useState<Course|null>(null);

  const addItem=()=>{
    if(!name||!desc||!price||!course){
      Alert.alert('Missing Info,Please fill out all fields')
      return;
    }

    const newItem:MenuItemType={
      id:uuidv4(),
      name,
     description:desc,
     price:parseFloat(price),
     course,
    };

    setMenuItems([...menuItems,newItem]);
    setName('');
    setDesc('');
    setPrice('');
    setCourse(null);

  };

  const removeItem = (id:string)=>{
    setMenuItems(menuItems.filter(item=>item.id!==id));
  };

  return(
    <View style={styles.container}>
       <Image source={require('../../assets/logo.jpg.png')} style={styles.logo} />
      
      <Text style={styles.header}>Add New Dish</Text>
      <TextInput placeholder="Name" value={name}onChangeText={setName}
      style={styles.input}/>
      <TextInput placeholder="Description" value={desc}onChangeText={setDesc}
      style={styles.input}/> 
      <TextInput placeholder="Price"keyboardType="numeric" value={price}
      onChangeText={setPrice} style={styles.input}/>

      <RNPickerSelect
      placeholder={{label:'Select Course',value:null}}
      onValueChange={(value:Course)=>setCourse(value)}
      items={[
        {label:'Starters',value:'Starters'},
        {label:'Mains',value:'Mains'},
        {label:'Desserts',value:'Desserts'}

      ]}

      style={{inputIOS:styles.input,inputAndroid:styles.input}}
      />

      <Button title="Add Dish"onPress={addItem}/>

      <Text style={styles.header}>Remove Dishes</Text>
      <FlatList
      data={menuItems}
      keyExtractor={item=>item.id}
      renderItem={({item }) => (
        <View style={styles.item}>
          <Text>{item.name}</Text>
          <Button title="Remove"onPress={()=>removeItem(item.id)}/>
            </View>
      )}
      />
        
      

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 5 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
logo: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  alignSelf:'flex-start'
  }


  });

  export default ChefScreen;







  










